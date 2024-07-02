from importlib.metadata import requires
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import NotificationPreferences, UserProfile, Device, ConsumptionRecord, MonthlyConsumption, Notification, NotificationPreferences

# Serializer for handling user registration
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password_confirm = serializers.CharField(write_only=True, required=True)

    # Meta class that defines the model and fields to be serialized
    class Meta:
        model = User
        fields = [
            "username",
            "password",
            "password_confirm",
            "email",
            "first_name",
            "last_name",
        ]

    # Validate function to check if the passwords match
    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )
        return attrs

    # Create function to create the user while validating the data
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        return user  # Return the newly created user


# Serializer for handling user login
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    # Validate function to check if the user exists and the password is correct
    def validate(self, data):
        user = User.objects.filter(username=data['username']).first()
        if user and user.check_password(data['password']):
            return user
        raise serializers.ValidationError("Incorrect credentials")


# Serializer for handling current user
class CurrentUserSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(source='userprofile.phone_number', read_only=True)

    # Meta class that defines the model and fields to be serialized
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'phone_number']


# Serializer for handling user logout
class LogoutSerializer(serializers.Serializer):
    pass  # No fields needed for logout


# Serializer for User model
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email']


# Serializer for UserProfile model
class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ['user', 'phone_number']


# Serializer for Device model
class DeviceSerializer(serializers.ModelSerializer):
    daily_consumption = serializers.FloatField(read_only=True)
    class Meta:
        model = Device
        fields = ['id', 'user', 'brand', 'device_type', 'hours_used_per_day', 'daily_consumption']


# Serializer for ConsumptionRecord model
class ConsumptionRecordSerializer(serializers.ModelSerializer):
    device = DeviceSerializer()
    class Meta:
        model = ConsumptionRecord
        fields = ['device', 'date', 'timestamp', 'consumption', 'unit']


# Serializer for MonthlyConsumption model
class MonthlyConsumptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthlyConsumption
        fields = ['device', 'year', 'month', 'total_consumption', 'unit']


# Serializers for Notification model
class NotificationPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationPreferences
        fields = [
            'id', 'user', 'allow_text_notifications', 
            'allow_email_notifications',
            'disable_all_notifications'
        ]


class NotificationMessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = ["id", "user", "message", "read", "created_at"]
