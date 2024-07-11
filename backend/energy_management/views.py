import logging
from datetime import timedelta
from rest_framework import status
from django.utils import timezone
from django.db.models import Sum
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.viewsets import ViewSet
from .tasks import generate_consumption_records, generate_monthly_consumption, send_weekly_notifications, send_monthly_notifications
from .serializers import RegisterSerializer, CurrentUserSerializer

# Setting up a logger for debugging purposes
logger = logging.getLogger(__name__)

# View for handling user registration
class RegisterView(APIView):
    permission_classes = [AllowAny]

    # POST method for user registration
    def post(self, request):
        # Check if the request contains valid data
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            # Save the user and users token and return a response
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            response = Response(
                {
                    'token': token.key,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                },
                status=status.HTTP_201_CREATED,
            )
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# View for handling user login
class LoginView(APIView):
    permission_classes = (AllowAny,)

    # POST method for user login
    def post(self, request):
        # Check if the request contains valid data
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        # Check if the user exists and return a response
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response(
                {
                    'token': token.key,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                },
                status=status.HTTP_200_OK,
            )
        return Response(
            {'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST
        )


# View for verifying a users token
class VerifyTokenView(APIView):
    permission_classes = [IsAuthenticated]

    # GET method for verifying token
    def get(self, request):
        # Make a request to get the users data
        user = request.user
        return Response(
            {
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                }
            }
        )


# View for handling user logout
class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    # POST method for user logout
    def post(self, request):
        # Delete the user's token and return a response
        try:
            request.user.auth_token.delete()
            return Response(status=status.HTTP_200_OK)
        except (AttributeError, Token.DoesNotExist):
            return Response(status=status.HTTP_400_BAD_REQUEST)


# ViewSets for models in my project
from rest_framework import viewsets, generics
from rest_framework.decorators import action
from django.contrib.auth.models import User
from .models import (
    UserProfile,
    Device,
    ConsumptionRecord,
    MonthlyConsumption,
    Notification,
    NotificationPreferences,
)
from .serializers import UserSerializer, UserProfileSerializer, DeviceSerializer, ConsumptionRecordSerializer, NotificationPreferencesSerializer, NotificationMessageSerializer, FilteredConsumptionRecordSerializer

# ViewSet for Current User
class CurrentUserViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    # GET method for getting a list of the current users data
    def list(self, request):
        # Get the current user
        user = request.user
        # Serialize the user data and return a response
        serializer = CurrentUserSerializer(user)
        return Response(serializer.data)


    # PUT method for updating the users data
    def put(self, request):
        # Get the current user
        user = request.user
        # Get the data from the request
        data = request.data

        # Update user fields
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.save()

        # Update user profile fields
        user_profile, _ = UserProfile.objects.get_or_create(user=user)
        user_profile.phone_number = data.get('phone_number', user_profile.phone_number)
        user_profile.save()

        # Serialize the updated user data and return a response
        serializer = CurrentUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


    # POST method for changing users passwords
    def post(self, request):
        # Get the current user
        user = request.user
        # Get the data from the request
        data = request.data

        # Get the users password and validate
        current_password = data.get('current_password')
        # Get the users new password
        new_password = data.get('new_password')
        new_password_again = data.get('new_password_again')

        # Validate the users current password
        if not user.check_password(current_password):
            return Response(
                {'error': 'Current password is incorrect'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # If the new passwords does not contain anything
        if not new_password:
            return Response(
                {'error': 'New passwords cannot be blank'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # If new passwords do not match
        if new_password != new_password_again:
            return Response(
                {'error': 'New passwords do not match'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # If the password is valid and they do match set the new password and save the user
        user.set_password(new_password)
        user.save()
        return Response(
            {'status': 'Password changed successfully'}, status=status.HTTP_200_OK
        )


# ViewSet for User model
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# ViewSet for UserProfile model
class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


# ViewSet for Device model
class DeviceViewSet(viewsets.ModelViewSet):
    serializer_class = DeviceSerializer
    permission_classes = [IsAuthenticated]

    # Custom queryset function to filter devices by current user
    def get_queryset(self):
        return Device.objects.filter(user=self.request.user)

    # POST method for add a new device
    def create(self, request):
        # Get the current user
        user = request.user
        # Get the data from the request
        data = request.data

        # Get the devices brand
        brand = data.get('device_brand')
        # Get the device type
        device_type = data.get('device_type')

        # Get the usage hours
        hours_used_per_day = data.get('hours_used')

        # Check if either fields are blank
        if not brand or not device_type or not hours_used_per_day:
            return Response(
                {'error': 'Neither fields can be blank'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Ensure hours_used_per_day is a valid float
        try:
            hours_used_per_day = float(hours_used_per_day)
        except ValueError:
            return Response(
                {'error': 'Average daily usage must be a valid number'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Ensure user cannot input a time over 24 hours
        if hours_used_per_day > 24.0:
            return Response(
                {'error': 'Average daily usage cannot exceed 24 hours'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Update the device model with the data
        device = Device.objects.create(
            user=user, 
            brand=brand, 
            device_type=device_type,
            hours_used_per_day=hours_used_per_day
        )

        # Calculate initial consumption record synchronously
        now = timezone.now()
        daily_consumption = device.daily_consumption
        ConsumptionRecord.objects.create(
            device=device,
            date=now.date(),
            timestamp=now,
            consumption=daily_consumption / 12,  # Adjust as needed for your consumption rate
            unit='kWh'
        )

        # Trigger Celery task for daily consumption updates
        generate_consumption_records.delay()

        # Trigger Celery task for monthly consumption updates
        generate_monthly_consumption.delay()

        # Serialize the newly created device and return it
        serializer = self.get_serializer(device)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # DELETE method for removing a device
    def destroy(self, request, *args, **kwargs):
        # Custom behavior before deletion can be added here
        instance = self.get_object()

        # Example: Log the deletion
        user = request.user
        device_id = instance.id
        device_name = instance.device_type
        print(f"User {user} is deleting device {device_name} with ID {device_id}")

        # Perform the actual deletion
        response = super().destroy(request, *args, **kwargs)

        # Return the response
        return response


# ViewSet for ConsumptionRecord model
class ConsumptionRecordViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ConsumptionRecordSerializer

    # Custom queryset function to filter records by current user
    def get_queryset(self):
        return ConsumptionRecord.objects.filter(device__user=self.request.user)

    # GET method for returning the total consumption of a device
    @action(detail=False, methods=['get'])
    def total_consumption(self, request):
        # Get the current time
        now = timezone.now()
        # Set the start of the day to now and the end of the day to 24 hours from now
        start_of_day = now.replace(hour=0, minute=0, second=0, microsecond=0)
        end_of_day = now.replace(hour=23, minute=59, second=59, microsecond=999999)

        # Fetch consumption records for the current user within the last day
        consumption_records = (
            ConsumptionRecord.objects.filter(
                device__user=request.user,
                timestamp__range=(start_of_day, end_of_day),
            )  # Get the sum of the consumption values for each hour within the last 24 hours.
            .values("timestamp__hour")
            .annotate(total_consumption=Sum("consumption"))
            .order_by("timestamp__hour")  # Sort by hour
        )

        # Log the outputs to determine all is working as expected
        logger.debug(f"Start of day: {start_of_day}")
        logger.debug(f"End of day: {end_of_day}")
        logger.debug(f"Consumption records: {consumption_records}")

        # Return the hour and total consumption from the users consumption records
        data = [
            {
                'hour': record['timestamp__hour'],
                'total_consumption': record['total_consumption']
            }
            for record in consumption_records
        ]

        # Return the data as a response
        return Response(data)


# API view for MonthlyConsumption model
class YearlyConsumptionView(APIView):
    def get(self, request):
        # Get the current year
        year = request.query_params.get('year', timezone.now().year)
        # Get and aggregate the data from the MonthlyConsumption model
        data = (
            MonthlyConsumption.objects.filter(year=year, device__user=request.user)
            .values("month")
            .annotate(total_consumption=Sum("total_consumption"))
        )

        # Get each record of the month and total consumption from the response data
        response_data = [
            {
                "month": record.get("month"),
                "total_consumption": record.get("total_consumption"),
            }
            for record in data
        ]

        # Return the response data
        return Response(response_data)


# API for NotificationPreferences model
class NotificationPreferencesView(APIView):
    permission_classes = [IsAuthenticated]

    # GET method for returning the users notification preferences
    def get(self, request):
        try:
            # Retrieve the notification preferences for the current user
            notification_preferences = NotificationPreferences.objects.get(
                user=request.user
            )
        # If the notification preferences do not exist, create a new one
        except NotificationPreferences.DoesNotExist:
            notification_preferences = NotificationPreferences.objects.create(
                user=request.user
            )
        # Serialize the notification preferences and return it
        serializer = NotificationPreferencesSerializer(notification_preferences)
        return Response(serializer.data)

    # PUT method for updating the users notification preferences
    def put(self, request):
        try:
            # Retrieve the notification preferences for the current user
            notification_preferences = NotificationPreferences.objects.get(
                user=request.user
            )
        # If the notification preferences do not exist, return an error
        except NotificationPreferences.DoesNotExist:
            return Response(
                {"error": "Notification preferences not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        # Validate and update the notification preferences
        serializer = NotificationPreferencesSerializer(
            notification_preferences, data=request.data, partial=True
        )
        # If the notification preferences are valid, save them and return them
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# API view for Notification model
class NotificationView(APIView):
    permission_classes = [IsAuthenticated]

    # GET method for returning the users notifications
    def get(self, request, pk=None):
        # If a pk is provided, return the notification with the matching id
        if pk:
            try:
                # Retrieve the notification with the matching id
                notification = Notification.objects.get(id=pk, user=request.user)
                # Serialize the notification and return it
                serializer = NotificationMessageSerializer(notification)
                return Response(serializer.data)
            # If the notification does not exist, return an error
            except Notification.DoesNotExist:
                return Response(
                    {"error": "Notification not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )
        # If no pk is provided, return all notifications for the current user
        else:
            notifications = Notification.objects.filter(user=request.user)
            serializer = NotificationMessageSerializer(notifications, many=True)
            return Response(serializer.data)

    # PUT method for marking a notification as read or unread
    def put(self, request, pk=None):
        try:
            # Retrieve the notification with the matching id
            notification = Notification.objects.get(id=pk, user=request.user)
            # Update the notification's read status and save it
            notification.read = not notification.read
            notification.save()
            # Serialize the notification and return it
            serializer = NotificationMessageSerializer(notification)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # If the notification does not exist, return an error
        except Notification.DoesNotExist:
            return Response(
                {"error": "Notification not found."}, status=status.HTTP_404_NOT_FOUND
            )


# API view for filtering data from the ConsumptionRecord model
class FilterConsumptionView(APIView):
    permission_classes = [IsAuthenticated]

    # GET method for requesting the filtered consumption data
    def get(self, request):
        # Extract the device id and time frame from the query parameters
        device_id = request.query_params.get('device')
        time_frame = request.query_params.get('time_frame')

        # Calculate the start date based on the current time minus the selected time frame
        now = timezone.now()
        if time_frame == '1 Day':
            start_date = now - timedelta(days=1)
        elif time_frame == '1 Week':
            start_date = now - timedelta(weeks=1)
        elif time_frame == '1 Month':
            start_date = now - timedelta(days=30)
        elif time_frame == '1 Year':
            start_date = now - timedelta(days=365)
        else:
            return Response({"error": "Invalid time frame"}, status=400)

        # If the user has selected 'All' for the device id, retrieve all records
        if device_id == 'All':
            records = ConsumptionRecord.objects.filter(
                device__user=request.user,
                timestamp__range=(start_date, now)
            )
        else:
            # Retrieve the device with the matching id
            try:
                device = Device.objects.get(id=device_id, user=request.user)
            except Device.DoesNotExist:
                return Response({"error": "Device not found"}, status=404)

            # Retrieve the records for the selected device and time frame
            records = ConsumptionRecord.objects.filter(
                device=device,
                timestamp__range=(start_date, now)
            )

        # Serialize the records and return them
        serializer = FilteredConsumptionRecordSerializer(records, many=True)
        return Response(serializer.data)
