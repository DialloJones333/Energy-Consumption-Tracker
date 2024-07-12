from django.apps import AppConfig

# Define the energy management app
class EnergyManagementConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'energy_management'

# Register the energy management app
def ready(self):
        import energy_management.models