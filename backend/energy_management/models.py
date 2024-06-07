from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import RegexValidator

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(max_length=15, blank=True)

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    instance.userprofile.save()

class Device(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    device_type = models.CharField(max_length=50)
    location = models.CharField(max_length=100, blank=True)

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