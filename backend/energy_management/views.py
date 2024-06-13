import logging
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.middleware.csrf import get_token
from .serializers import RegisterSerializer, LoginSerializer

# Setting up a logger for debugging purposes
logger = logging.getLogger(__name__)


# View for handling user registration
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
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
            response.set_cookie("csrftoken", get_token(request))
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            response = Response({"token": token.key}, status=status.HTTP_200_OK)
            response.set_cookie("csrftoken", get_token(request))
            return response
        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
        )


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            logger.debug("User %s is logging out", request.user)
            request.user.auth_token.delete()
        except (AttributeError, Token.DoesNotExist):
            logger.error("Token does not exist or other error for user %s", request.user)
        return Response(status=status.HTTP_200_OK)


# ViewSets for other models in my project
from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import UserProfile, Device, ConsumptionRecord, Tip, Notification
from .serializers import UserSerializer, UserProfileSerializer, DeviceSerializer, ConsumptionRecordSerializer, TipSerializer, NotificationSerializer


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
