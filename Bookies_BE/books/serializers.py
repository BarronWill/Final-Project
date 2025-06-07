from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.Serializer):
    isbn = serializers.CharField(max_length = 13)
    book_title = serializers.CharField(max_length = 100)
    subtitle = serializers.CharField(max_length = 100)
    book_author = serializers.CharField(max_length = 50)
    summary = serializers.CharField(max_length = 6000)
    img_url = serializers.CharField(max_length = 100)
    price = serializers.IntegerField()
    is_active = serializers.IntegerField()
    
    def create (self, validated_data):
        return Book.objects.create(**validated_data)
    
    def update (self, instance, validated_data):
        instance.book_title = validated_data.get("book_title", instance.book_title)
        instance.book_author = validated_data.get("book_author", instance.book_author)
        instance.subtitle = validated_data.get("subtitle", instance.subtitle)
        instance.img_url = validated_data.get("img_url", instance.img_url)
        instance.year_of_publication = validated_data.get("year_of_publication",instance.year_of_publication)
        instance.summary = validated_data.get("summary",instance.summary)
        instance.price = validated_data.get("price", instance.price)
        instance.is_active = validated_data.get("is_active", instance.is_active)
        instance.save()
        return instance