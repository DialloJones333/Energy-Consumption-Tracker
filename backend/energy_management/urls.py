from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    UserProfileViewSet,
    DeviceViewSet,
    ConsumptionRecordViewSet,
    TipViewSet,
    NotificationViewSet,
    RegisterView,
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'user-profiles', UserProfileViewSet)
router.register(r'devices', DeviceViewSet)
router.register(r'consumption-records', ConsumptionRecordViewSet)
router.register(r'tips', TipViewSet)
router.register(r'notifications', NotificationViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/register/", RegisterView.as_view(), name="register"),
]
