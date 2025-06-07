from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Address
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=25, min_length=8)
    username = serializers.CharField(max_length=25, min_length=8)
    class Meta:
        model = User
        fields = "__all__"

    def create(request, validated_data):
        return User.objects.create_user(**validated_data)
    
    def update(request, instance, validate_data):
        instance.username = validate_data.get("username", instance.username)
        instance.password = validate_data.get("password", None)
        if instance.password:
            instance.set_password(instance.password)
        instance.is_superuser = validate_data.get("is_superuser", instance.is_superuser)
        instance.first_name = validate_data.get("first_name", instance.first_name)
        instance.last_name = validate_data.get("last_name", instance.last_name)
        instance.email = validate_data.get("email", instance.email)
        instance.is_staff = validate_data.get("is_staff", instance.is_staff)
        instance.is_active = validate_data.get("is_active", instance.is_active)
        instance.save()
        return instance


class LoginSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=25, min_length=8)
    username = serializers.CharField(max_length=25, min_length=8)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"

class AddressSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Address
        fields = "__all__"

        def create(self, validate_data):
            return Address.objects.create(**validate_data)

        def update(self, instance, validate_data):
            instance.phonenumber = validate_data.get("phonenumber", instance.phonenumber)
            instance.city = validate_data.get("city", instance.city)
            instance.district = validate_data.get("district", instance.district)
            instance.nation = validate_data.get("nation", instance.nation)
            instance.commune = validate_data.get("commune", instance.commune)
            instance.destination = validate_data.get("destination", instance.destination)
            instance.receiver_name = validate_data.get("receiver_name", instance.receiver_name)
            instance.save()
            return instance