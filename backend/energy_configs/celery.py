from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'energy_configs.settings.development')

app = Celery('energy_configs')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')

app.conf.beat_schedule = {
    'generate-consumption-records-every-2-hours': {
        'task': 'energy_management.tasks.generate_consumption_records',
        'schedule': crontab(minute=0, hour='*/2'),  # every 2 hours
    },
}