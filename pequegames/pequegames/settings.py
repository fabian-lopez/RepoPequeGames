"""
Django settings for pequegames project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

from unipath import Path
from django.core.urlresolvers import reverse_lazy

ruta = Path(__file__).ancestor(2)

LOGIN_URL               =   reverse_lazy('login')
LOGIN_REDIRECT_URL      =   reverse_lazy('index')
LOGOUT_URL              =   reverse_lazy('logout')

# E M A I L S #
EMAIL_BACKEND = 'djrill.mail.backends.djrill.DjrillBackend'
MANDRILL_API_KEY='bEImvSJ_JOdZgz1J9FaI5Q'
#DEFAULT_FROM_EMAIL = 'kaguzmanf@gmail.com'

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'jo*&kn!21tc8fg8b=s26_qvy_&@=nj^^folr$1%x(fq&wrq*8v'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'pequegames.apps.home',
    'pequegames.apps.peques',
    'pequegames.apps.tutores',
    'pequegames.apps.evaluaciones',
    'pequegames.apps.records',
    'pequegames.apps.juegos',
    'pequegames.apps.logros',
    'djrill',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'pequegames.urls'

WSGI_APPLICATION = 'pequegames.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases

DATABASES = {
    'default': {
       'ENGINE': 	'django.db.backends.mysql',
       'NAME':		'pequegames',
	   'USER':		'root',
	   'PASSWORD':	'',
	   'HOST':		'',
	   'PORT':		'',
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/

TEMPLATE_DIRS       = (ruta.child('templates'),)

STATICFILES_DIRS    = (ruta.child('static'), )

MEDIA_ROOT          = ruta.child('media')

MEDIA_URL           = '/media/'      

STATIC_URL          = '/static/'


