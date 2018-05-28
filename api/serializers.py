from rest_framework import serializers

from api.models import Category, Link


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


class CategoryListSerializer(serializers.ModelSerializer):
    links = LinkSerializer(read_only=True, many=True)

    class Meta:
        model = Category
        fields = '__all__'
