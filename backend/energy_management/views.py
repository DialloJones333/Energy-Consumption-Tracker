from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import UserProfile, Device, ConsumptionRecord, Tip, Notification
from .serializers import UserSerializer, UserProfileSerializer, DeviceSerializer, ConsumptionRecordSerializer, TipSerializer, NotificationSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

class ConsumptionRecordViewSet(viewsets.ModelViewSet):
    queryset = ConsumptionRecord.objects.all()
    serializer_class = ConsumptionRecordSerializer

class TipViewSet(viewsets.ModelViewSet):
    queryset = Tip.objects.all()
    serializer_class = TipSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer