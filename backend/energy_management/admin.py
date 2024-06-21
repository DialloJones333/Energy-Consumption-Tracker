from django.contrib import admin
from .models import Device, ConsumptionRecord, MonthlyConsumption, Tip, Notification, UserProfile

admin.site.register(Device)
admin.site.register(ConsumptionRecord)
admin.site.register(MonthlyConsumption)
admin.site.register(Tip)
admin.site.register(Notification)
admin.site.register(UserProfile)
