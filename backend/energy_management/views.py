import logging
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer

# Setting up a logger for debugging purposes
logger = logging.getLogger(__name__)

# View for handling user registration
class RegisterView(APIView):
    # Allowing any user (authenticated or not) to access this view
    permission_classes = [AllowAny]

    # Handling POST requests to the /api/register/ endpoint
    def post(self, request, *args, **kwargs):
        # Logging the received data for debugging
        logger.debug("Received data: %s", request.data)

        # Initializing the serializer with the received data
        serializer = RegisterSerializer(data=request.data)

        # Validating the data
        if serializer.is_valid():
            # If valid, save the new user and return the serialized data with a 201 status
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # If data is not valid, log the errors and return them with a 400 status
        logger.debug("Errors: %s", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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