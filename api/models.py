from django.db import models


class Link(models.Model):
    text = models.CharField(max_length=200)
    url = models.CharField(max_length=400)


class Category(models.Model):
    name = models.CharField(max_length=100)
    links = models.ManyToManyField(Link)
