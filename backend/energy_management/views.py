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
                    "token": token.key,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
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
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        # Check if the user exists and return a response
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response(
                {
                    "token": token.key,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                },
                status=status.HTTP_200_OK,
            )
        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
        )


class VerifyTokenView(APIView):
    permission_classes = [IsAuthenticated]

    # GET method for verifying token
    def get(self, request):
        # Make a request to get the users data
        user = request.user
        return Response(
            {
                "user": {
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
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
    @action(detail=False, methods=['put'])
    def update_user(self, request):
        # Get the current user
        user = request.user
        

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
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer


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