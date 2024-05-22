from django.contrib import admin
from .models import Device, ConsumptionRecord, Tip, Notification, UserProfile

admin.site.register(Device)
admin.site.register(ConsumptionRecord)
admin.site.register(Tip)
admin.site.register(Notification)
admin.site.register(UserProfile)

