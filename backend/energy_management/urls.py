from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, UserProfileViewSet, DeviceViewSet, ConsumptionRecordViewSet, TipViewSet, NotificationViewSet, RegisterView, LoginView, LogoutView, VerifyTokenView, CurrentUserViewSet


# Creating a router for automatically determining URL conf for API views
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'user-profiles', UserProfileViewSet)
router.register(r'current-user', CurrentUserViewSet, basename='current-user')
router.register(r'update-user', CurrentUserViewSet, basename='update-user')
router.register(r'update-password', CurrentUserViewSet, basename='update-password')
router.register(r'devices', DeviceViewSet, basename='devices')
router.register(r'consumption-records', ConsumptionRecordViewSet, basename='consumption-records')
router.register(r'tips', TipViewSet)
router.register(r'notifications', NotificationViewSet)


# URL patterns for the energy management app
urlpatterns = [
    path("api/", include(router.urls)),  # Include the router URLs
    path("api/register/", RegisterView.as_view(), name="register"),  # Registration endpoint
    path("api/login/", LoginView.as_view(), name="login"),  # Login endpoint
    path("api/verify-token/", VerifyTokenView.as_view(), name="verify_token"), # Verify token endpoint
    path("api/logout/", LogoutView.as_view(), name="logout"),  # Logout endpoint
    path("api/consumption-records/total_consumption/", ConsumptionRecordViewSet.as_view({'get': 'total_consumption'}), name="total_consumption"),
]
