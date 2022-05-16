from .base import BASE_DIR, get_secret, get_env
from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = get_secret("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ["django"]


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": get_secret("DB_ENGINE"),
        "NAME": get_secret("SQL_DATABASE"),
        "USER": get_secret("SQL_USER"),
        "PASSWORD": get_secret("SQL_PASSWORD"),
        "HOST": get_env("SQL_HOST"),
        "PORT": get_env("SQL_PORT"),
        "ATOMIC_REQUESTS": True,
    }
}
