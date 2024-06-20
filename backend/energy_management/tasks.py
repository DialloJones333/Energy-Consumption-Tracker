from celery import shared_task
from datetime import timedelta
from django.utils import timezone
from .models import Device, ConsumptionRecord
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
            unit='kWh'
        )
        # Save the object in the database
        consumption_record.save()
        # Log the output to ensure it is 
        logger.debug(f"Created ConsumptionRecord: {consumption_record}")