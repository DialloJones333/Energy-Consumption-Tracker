# Generated by Django 5.0.6 on 2024-06-18 23:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('energy_management', '0004_device_hours_used_per_day'),
    ]

    operations = [
        migrations.AlterField(
            model_name='device',
            name='name',
            field=models.CharField(max_length=30),
        ),
    ]
