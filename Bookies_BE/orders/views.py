from django.shortcuts import render
from rest_framework import response, status, viewsets
from orders.models import Order, Order_Detail, Payment
from django.contrib.auth.models import User
from .serializers import OrderSerializer
# Create your views here.

class OrderViewSet(viewsets.ViewSet):
    def list(self, request):
        user = User.objects.get(username = request.user)
        orders = Order.objects.filter(user=user)
        serializer = OrderSerializer(orders, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response("Success",status=status.HTTP_201_CREATED)
        else:
            return response.Response({"error":serializer.errors},status=status.HTTP_400_BAD_REQUEST)
            