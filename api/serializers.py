from rest_framework import serializers
from rest_framework_bulk import BulkSerializerMixin, BulkListSerializer

from api.models import Category, Link


class LinkSerializer(BulkSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = '__all__'
        list_serializer_class = BulkListSerializer


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


class CategoryListSerializer(serializers.ModelSerializer):
    links = LinkSerializer(read_only=True, many=True)

    class Meta:
        model = Category
        fields = '__all__'

