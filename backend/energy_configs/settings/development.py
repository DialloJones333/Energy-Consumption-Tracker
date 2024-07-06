from .base import *

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'homeenergymonitor',
        'USER': 'diallojones',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

SECRET_KEY = 'django-insecure-gdc@+&rark5g9sm2&kd_h8v!@4(4opy%e3z71m0@iwhg2vc%b+'