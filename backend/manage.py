import os
import sys

# Define the main function to manage the Django application
def main():
    # Set the default Django settings module
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'energy_configs.settings.development')
    try:
        # Try to import Django's management command line utility
        from django.core.management import execute_from_command_line
    # If Django is not installed, raise an ImportError
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    # Execute the Django management command line utility
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()