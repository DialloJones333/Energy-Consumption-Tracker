from celery import shared_task
from datetime import timedelta
from django.utils import timezone
from .models import Device, ConsumptionRecord
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
            consumption=daily_consumption / 12,  # Generate records every 2 hours
            unit='kWh'
        )
        consumption_record.save()
        logger.debug(f"Created ConsumptionRecord: {consumption_record}")