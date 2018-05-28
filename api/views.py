from django.shortcuts import render
from rest_framework import generics

from api.models import Category, Link
from api.serializers import CategorySerializer, LinkSerializer, CategoryListSerializer


class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class LinkList(generics.ListCreateAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer


class LinkDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
