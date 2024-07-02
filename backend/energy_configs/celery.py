from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'energy_configs.settings.development')

app = Celery('energy_configs')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f"Request: {self.request!r}")

app.conf.beat_schedule = {
    "generate-consumption-records-every-2-hours": {
        "task": "energy_management.tasks.generate_consumption_records",
        "schedule": crontab(minute=0, hour="*/2"),  # Every 2 hours
    },
    "generate-consumption-records-every-month": {
        "task": "energy_management.tasks.generate_monthly_consumption",
        "schedule": crontab(day_of_month="1", hour=0, minute=0),  # Every month
    },
    "send-weekly-notifications": {
        "task": "energy_management.tasks.send_weekly_notifications",
        "schedule": crontab(minute=0, hour=0, day_of_week='monday'),  # Every Monday
    },
    "send-monthly-notifications": {
        "task": "energy_management.tasks.send_monthly_notifications",
        "schedule": crontab(minute=0, hour=0, day_of_month='1'),  # Every 1st of the month
    },
}