from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum
from django.contrib.auth.models import User
from .models import Device, ConsumptionRecord, MonthlyConsumption, Notification, NotificationPreferences
import logging

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
            consumption=daily_consumption / 12,
            unit="kWh",
        )
        consumption_record.save()
        logger.debug(f"Created ConsumptionRecord: {consumption_record}")


@shared_task
def generate_monthly_consumption():
    now = timezone.now()
    logger.debug(f"Current time: {now}")
    start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    end_of_month = (start_of_month + timezone.timedelta(days=31)).replace(
        day=1
    ) - timezone.timedelta(seconds=1)
    monthly_data = (
        ConsumptionRecord.objects.filter(
            timestamp__range=(start_of_month, end_of_month)
        )
        .values("device")
        .annotate(total_consumption=Sum("consumption"))
    )
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

    # Calculate last week's total consumption
    last_week_consumption = (
        ConsumptionRecord.objects.filter(timestamp__range=(last_week, now)).aggregate(
            Sum("consumption")
        )["consumption__sum"]
        or 0
    )

    # Calculate the week before last week's total consumption
    prev_week_consumption = (
        ConsumptionRecord.objects.filter(
            timestamp__range=(week_before_last, last_week)
        ).aggregate(Sum("consumption"))["consumption__sum"]
        or 0
    )

    # Get all users' notification preferences
    preferences = NotificationPreferences.objects.all()

    for pref in preferences:
        if pref.disable_all_notifications:
            continue

        message = f"Your consumption usage was up {last_week_consumption - prev_week_consumption} kWh this past week. Visit the tips and tricks page to learn how to keep it down!"

        Notification.objects.create(
            user=pref.user,
            message=message,
        )


@shared_task
def send_monthly_notifications():
    now = timezone.now()
    last_month = now - timedelta(days=30)
    month_before_last = last_month - timedelta(days=30)

    # Calculate last month's total consumption
    last_month_consumption = (
        ConsumptionRecord.objects.filter(timestamp__range=(last_month, now)).aggregate(
            Sum("consumption")
        )["consumption__sum"]
        or 0
    )

    # Calculate the month before last month's total consumption
    prev_month_consumption = (
        ConsumptionRecord.objects.filter(
            timestamp__range=(month_before_last, last_month)
        ).aggregate(Sum("consumption"))["consumption__sum"]
        or 0
    )

    # Get all users' notification preferences
    preferences = NotificationPreferences.objects.all()

    for pref in preferences:
        if pref.disable_all_notifications:
            continue

        message = f"Your consumption usage was up {last_month_consumption - prev_month_consumption} kWh this past month. Visit the tips and tricks page to learn how to keep it down!"

        Notification.objects.create(
            user=pref.user,
            message=message,
        )
