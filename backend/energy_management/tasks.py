from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum
from django.contrib.auth.models import User
from .models import Device, ConsumptionRecord, MonthlyConsumption, Notification
import logging

# logging for debugging purposes
logger = logging.getLogger(__name__)

@shared_task
def generate_consumption_records():
    now = timezone.now()
    logger.debug(f"Current time: {now}")
    for device in Device.objects.all():
        daily_consumption = device.daily_consumption
        consumption_record = ConsumptionRecord.objects.create(
            device=device,
            date=now.date(),
            timestamp=now,
            consumption=daily_consumption / 12,  # Generate records every 2 hours
            unit="kWh",
        )
        consumption_record.save()
        logger.debug(f"Created ConsumptionRecord: {consumption_record}")

@shared_task
def generate_monthly_consumption():
    now = timezone.now()
    logger.debug(f"Current time: {now}")
    start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    end_of_month = (start_of_month + timezone.timedelta(days=31)).replace(day=1) - timezone.timedelta(seconds=1)
    monthly_data = ConsumptionRecord.objects.filter(
        timestamp__range=(start_of_month, end_of_month)
    ).values("device").annotate(total_consumption=Sum("consumption"))
    for data in monthly_data:
        MonthlyConsumption.objects.update_or_create(
            device_id=data["device"],
            year=now.year,
            month=now.month,
            defaults={"total_consumption": data["total_consumption"]},
        )

@shared_task
def send_weekly_notifications():
    now = timezone.now()
    last_week = now - timedelta(days=7)
    week_before_last = last_week - timedelta(days=7)
    last_week_consumption = ConsumptionRecord.objects.filter(
        timestamp__range=(last_week, now)
    ).aggregate(Sum('consumption'))['consumption__sum'] or 0
    prev_week_consumption = ConsumptionRecord.objects.filter(
        timestamp__range=(week_before_last, last_week)
    ).aggregate(Sum('consumption'))['consumption__sum'] or 0
    if last_week_consumption < prev_week_consumption:
        message = f"Your consumption usage was down {prev_week_consumption - last_week_consumption:.2f} kWh this past week. Keep up the good work!"
    else:
        message = f"Your consumption usage was up {last_week_consumption - prev_week_consumption:.2f} kWh this past week. Visit the tips and tricks page to learn how to keep it down!"
    for user in User.objects.all():
        Notification.objects.create(user=user, message=message, read=False)

@shared_task
def send_monthly_notifications():
    now = timezone.now()
    last_month = now - timedelta(days=30)
    month_before_last = last_month - timedelta(days=30)
    last_month_consumption = ConsumptionRecord.objects.filter(
        timestamp__range=(last_month, now)
    ).aggregate(Sum('consumption'))['consumption__sum'] or 0
    prev_month_consumption = ConsumptionRecord.objects.filter(
        timestamp__range=(month_before_last, last_month)
    ).aggregate(Sum('consumption'))['consumption__sum'] or 0
    if last_month_consumption < prev_month_consumption:
        message = f"Your consumption usage was down {prev_month_consumption - last_month_consumption:.2f} kWh this past month. Keep up the good work!"
    else:
        message = f"Your consumption usage was up {last_month_consumption - prev_month_consumption:.2f} kWh this past month. Visit the tips and tricks page to learn how to keep it down!"
    for user in User.objects.all():
        Notification.objects.create(user=user, message=message, read=False)