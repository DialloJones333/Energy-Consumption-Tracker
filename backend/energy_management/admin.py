from django.contrib import admin
from .models import Device, ConsumptionRecord, MonthlyConsumption, Notification, UserProfile

admin.site.register(Device)
admin.site.register(ConsumptionRecord)
admin.site.register(MonthlyConsumption)
admin.site.register(Notification)
admin.site.register(UserProfile)
