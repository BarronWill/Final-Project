from rest_framework import serializers
from cart.models import Cart

class CartSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Cart
        fields = "__all__"
    


class CartItemSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Cart_Items
        fields = "__all__"