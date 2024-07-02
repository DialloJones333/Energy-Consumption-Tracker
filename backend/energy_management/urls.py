from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    UserProfileViewSet,
    DeviceViewSet,
    ConsumptionRecordViewSet,
    YearlyConsumptionView,
    NotificationPreferencesView,
    NotificationView,
    RegisterView,
    LoginView,
    LogoutView,
    VerifyTokenView,
    CurrentUserViewSet,
)

router = DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"user-profiles", UserProfileViewSet)
router.register(r"current-user", CurrentUserViewSet, basename="current-user")
router.register(r"update-user", CurrentUserViewSet, basename="update-user")
router.register(r"update-password", CurrentUserViewSet, basename="update-password")
router.register(r"devices", DeviceViewSet, basename="devices")
router.register(
    r"consumption-records", ConsumptionRecordViewSet, basename="consumption-records"
)

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/register/", RegisterView.as_view(), name="register"),
    path("api/login/", LoginView.as_view(), name="login"),
    path("api/verify-token/", VerifyTokenView.as_view(), name="verify_token"),
    path("api/logout/", LogoutView.as_view(), name="logout"),
    path(
        "api/consumption-records/total_consumption/",
        ConsumptionRecordViewSet.as_view({"get": "total_consumption"}),
        name="total_consumption",
    ),
    path(
        "api/yearly-consumption/",
        YearlyConsumptionView.as_view(),
        name="yearly_consumption",
    ),
    path(
        "api/notification-preferences/",
        NotificationPreferencesView.as_view(),
        name="notification-preferences",
    ),
    path("api/notifications/", NotificationView.as_view(), name="notification-list"),
    path(
        "api/notifications/<int:pk>/",
        NotificationView.as_view(),
        name="notification-detail",
    ),
]
