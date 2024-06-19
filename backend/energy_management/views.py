import logging
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.viewsets import ViewSet
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
            # Save the user and return a response
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


# ViewSets for other models in my project
from rest_framework import viewsets
from rest_framework.decorators import action
from django.contrib.auth.models import User
from .models import UserProfile, Device, ConsumptionRecord, Tip, Notification
from .serializers import UserSerializer, UserProfileSerializer, DeviceSerializer, ConsumptionRecordSerializer, TipSerializer, NotificationSerializer

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

        # Serialize the newly created device and return it
        serializer = self.get_serializer(device)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# ViewSet for ConsumptionRecord model
class ConsumptionRecordViewSet(viewsets.ModelViewSet):
    queryset = ConsumptionRecord.objects.all()
    serializer_class = ConsumptionRecordSerializer


# ViewSet for Tip model
class TipViewSet(viewsets.ModelViewSet):
    queryset = Tip.objects.all()
    serializer_class = TipSerializer


# ViewSet for Notification model
class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
