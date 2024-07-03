from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum
from django.contrib.auth.models import User
from .models import Device, ConsumptionRecord, MonthlyConsumption, Notification, NotificationPreferences
import logging

logger = logging.getLogger(__name__)


# Task to generate consumption records
@shared_task
def generate_consumption_records():
    # Get the current time
    now = timezone.now()
    logger.debug(f"Current time: {now}")
    # Generate consumption records for each device
    for device in Device.objects.all():
        daily_consumption = device.daily_consumption
        # Create a new consumption record
        consumption_record = ConsumptionRecord.objects.create(
            device=device,
            date=now.date(),
            timestamp=now,
            consumption=daily_consumption / 12,
            unit="kWh",
        )
        # Save the consumption record
        consumption_record.save()
        logger.debug(f"Created ConsumptionRecord: {consumption_record}")


# Task to generate monthly consumption
@shared_task
def generate_monthly_consumption():
    # Get the current time
    now = timezone.now()
    logger.debug(f"Current time: {now}")
    # Define the start and end of the month
    start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    end_of_month = (start_of_month + timezone.timedelta(days=31)).replace(
        day=1
    ) - timezone.timedelta(seconds=1)
    # Get the monthly consumption
    monthly_data = (
        ConsumptionRecord.objects.filter(
            timestamp__range=(start_of_month, end_of_month)
        )
        .values("device")
        .annotate(total_consumption=Sum("consumption"))
    )
    # Update or create the monthly consumption
    for data in monthly_data:
        MonthlyConsumption.objects.update_or_create(
            device_id=data["device"],
            year=now.year,
            month=now.month,
            defaults={"total_consumption": data["total_consumption"]},
        )


# Task to send weekly notifications
@shared_task
def send_weekly_notifications():
    # Get the current time
    now = timezone.now()
    # Get last week and the week before last week
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

        # Determine if consumption was up or down
        if last_week_consumption > prev_week_consumption:
            message = f"Your consumption usage was up {last_week_consumption - prev_week_consumption:.2f} kWh this past week. Visit the tips and tricks page to learn how to keep it down!"
        else:
            message = f"Your consumption usage was down {prev_week_consumption - last_week_consumption:.2f} kWh this past week. Keep up the good work!"

        # Create the new notification
        Notification.objects.create(
            user=pref.user,
            message=message,
        )


# Task to send monthly notifications
@shared_task
def send_monthly_notifications():
    # Get the current time
    now = timezone.now()
    # Get last month and the month before last month
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

        # Determine if consumption was up or down
        if last_month_consumption > prev_month_consumption:
            message = f"Your consumption usage was up {last_month_consumption - prev_month_consumption:.2f} kWh this past month. Visit the tips and tricks page to learn how to keep it down!"
        else:
            message = f"Your consumption usage was down {prev_month_consumption - last_month_consumption:.2f} kWh this past month. Keep up the good work!"

        # Create the new notification
        Notification.objects.create(
            user=pref.user,
            message=message,
        )