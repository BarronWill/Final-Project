from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user")
    phonenumber = models.CharField(max_length=12)
    sex = models.IntegerField()
    birthday = models.DateField()
    name = models.CharField(max_length=25)
    class Meta:
        db_table = 'user_profile'


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="address")
    destination = models.CharField(max_length=255)
    nation = models.CharField(max_length=25)
    district = models.CharField(max_length=25)
    city = models.CharField(max_length=25)
    commune = models.CharField(max_length=25)
    receiver_name = models.CharField(max_length=25)
    phonenumber = models.CharField(max_length=12)

    class Meta:
        db_table = 'address'