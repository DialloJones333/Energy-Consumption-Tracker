from celery import shared_task
from django.utils import timezone
from django.db.models import Sum
from .models import Device, ConsumptionRecord, MonthlyConsumption
import logging

# logging for debugging purposes
logger = logging.getLogger(__name__)


# Celery task for generating consumption records
@shared_task
def generate_consumption_records():
    now = timezone.now()
    # Logging current time to ensure it's accurate
    logger.debug(f"Current time: {now}")

    # Loop through each device in the Device model
    for device in Device.objects.all():
        # Apply the daily_consumption property to each device
        daily_consumption = device.daily_consumption
        # Create a ConsumptionRecord object
        consumption_record = ConsumptionRecord.objects.create(
            device=device,
            date=now.date(),
            timestamp=now,
            consumption=daily_consumption / 12,  # Generate records every 2 hours
            unit="kWh",
        )
        # Save the object in the database
        consumption_record.save()
        # Log the output to ensure it is
        logger.debug(f"Created ConsumptionRecord: {consumption_record}")


# Celery task for generating monthly consumption records
@shared_task
def generate_monthly_consumption():
    now = timezone.now()
    # Logging current time to ensure it's accurate
    logger.debug(f"Current time: {now}")
    # Define the start and end of the month
    start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    end_of_month = (start_of_month + timezone.timedelta(days=31)).replace(
        day=1
    ) - timezone.timedelta(seconds=1)

    # Filter the monthly data
    monthly_data = (
        ConsumptionRecord.objects.filter(
            timestamp__range=(start_of_month, end_of_month)
        )
        .values("device")
        .annotate(total_consumption=Sum("consumption"))
    )

    # Update or create a new monthly consumption record
    for data in monthly_data:
        MonthlyConsumption.objects.update_or_create(
            device_id=data["device"],
            year=now.year,
            month=now.month,
            defaults={"total_consumption": data["total_consumption"]},
        )
