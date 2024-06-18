from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import RegexValidator
from django.conf import settings
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(max_length=15, blank=True)
    
    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    instance.userprofile.save()


class Device(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    device_type = models.CharField(max_length=50)
    hours_used_per_day = models.FloatField(default=0.0)


    # Consumption rates (in kWh) for each device type
    CONSUMPTION_RATES = {
        'LED Bulbs': 0.01,
        'Incandescent Bulbs': 0.06,
        'CFL Bulbs': 0.015,
        'Smart Bulbs': 0.01,
        'Smart Plugs': 0.05,
        'Smart Thermostats': 0.1,
        'Fans': 0.05,
        'Televisions': 0.1,
        'Gaming Consoles': 0.2,
        'Desktop Computers': 0.3,
        'Laptops': 0.1
    }


# Calculate the daily consumption of a device based on its type and the number of hours used per day.
    @property
    def daily_consumption(self):
        rate = self.CONSUMPTION_RATES.get(self.device_type, 0)
        return rate * self.hours_used_per_day


class ConsumptionRecord(models.Model):
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    date = models.DateField()
    timestamp = models.DateTimeField(auto_now_add=True)
    consumption = models.FloatField()
    unit = models.CharField(max_length=10, default='kWh')


class Tip(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    # Potential: add fields to categorize tips or link to specific devices


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
