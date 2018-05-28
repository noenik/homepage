from django.contrib import admin

from api.models import Category, Link

admin.site.register((Link, Category))
