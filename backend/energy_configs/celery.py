from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'energy_configs.settings.development')

app = Celery('energy_configs')

# Using a string means the worker doesn't have to serialize
# the configuration object to child processes.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()


# Print the details of the task request
@app.task(bind=True)
def debug_task(self):
    print(f"Request: {self.request!r}")


# Dictionary that defines the schedule for generating consumption records
app.conf.beat_schedule = {
    "generate-consumption-records-every-2-hours": {
        "task": "energy_management.tasks.generate_consumption_records",
        "schedule": crontab(minute=0, hour="*/2"),  # Every 2 hours
    },
    "generate-consumption-records-every-month": {
        "task": "energy_management.tasks.generate_monthly_consumption",
        "schedule": crontab(day_of_month="1", hour=0, minute=0),  # Every month
    },
}