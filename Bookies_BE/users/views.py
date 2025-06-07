from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status, response, views
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from .models import Profile, Address
from .serializers import UserSerializer, LoginSerializer, ProfileSerializer, AddressSerializer
from django.contrib.auth import login, logout, authenticate
from django.middleware.csrf import get_token
from .decorators import unauthorized_user
from django.utils.decorators import method_decorator
from cart.models import Cart
# Create your views here.

@method_decorator(unauthorized_user, name="dispatch")
class UserViewSet(viewsets.ViewSet):
    def list(self, request):
        users = User.objects.all()[:20]
        serializer = UserSerializer(users, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    
    def retrieve(self, request, pk):
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        user = request.data
        serializer = UserSerializer(data=user)
        if serializer.is_valid():
            serializer.save()
            return response.Response("Create successfully", status=status.HTTP_201_CREATED)
        return response.Response("Failed to create a new user", status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, username):
        new = request.data
        old = User.objects.get(username=username)

        serializer = UserSerializer(old, data=new)
        if serializer.is_valid():
            serializer.save()
            return response.Response("Update successfully", status=200)
        return response.Response("Failed to update", status=status.HTTP_400_BAD_REQUEST)
    
    def partial_update(self, request, username):
        new = request.data
        old = User.objects.get(username=username)

        serializer = UserSerializer(old, data=new, partial=True)
        if serializer.is_valid():
            serializer.save()
            return response.Response("Update successfully", status=200)
        return response.Response("Failed to update", status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, username):
        user = User.objects.get(username=username)
        user.delete()
        return response.Response("Delete successfully", status=status.HTTP_204_NO_CONTENT)

class LoginView(views.APIView):
    def post(self, request):
        data = request.data
        serializer = LoginSerializer(data=data)
        if serializer.is_valid():
            username = data.get('username')
            password = data.get('password')
            user = authenticate(request, username=username, password=password)

            if user:
                login(request, user)
                session_key = request.session.session_key
                csrf_token = get_token(request=request)
                # Create a cart when the logined user doesn't have one
                user = User.objects.get(username = data.get("username"))
                if len(Cart.objects.filter(user=user)) == 0:
                    Cart(user=user).save()

                if len(Profile.objects.filter(user=user)) == 0:
                    Profile(user=user, name= user.username).save()

                return response.Response({"sessionid": session_key, "csrftoken": csrf_token}, status=200)
            else:
                return response.Response("Invalid credentials", status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

        return response.Response("wrong format", status=status.HTTP_400_BAD_REQUEST)

class LogoutView(views.APIView):
    @method_decorator(unauthorized_user)
    def delete(self, request):
        logout(request)
        return response.Response("Logout successfully", status=status.HTTP_202_ACCEPTED)

class RegisterView(views.APIView):
    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            serializer.save()

            user = User.objects.get(username=data.get("username"))
            Cart(user=user).save()
            Profile(user=user).save()

            return response.Response("Register successfully", status=200)
            
        return response.Response("Failed to register", status=status.HTTP_400_BAD_REQUEST)
    

class ProfileView(viewsets.ViewSet):
    def retrieve (self, request):
        session_key = request.session.session_key
        session = Session.objects.get(session_key=session_key)
        user_id = session.get_decoded().get('_auth_user_id')
        profile = Profile.objects.get(user_id = user_id)
        address = Address.objects.filter(user_id = user_id)
        serializerProfile = ProfileSerializer(profile)
        serializerAddress = AddressSerializer(address, many=True)
        
        return response.Response({"profile": serializerProfile.data, "address": serializerAddress.data}, status=status.HTTP_200_OK)
    

class AddressViewSet(viewsets.ViewSet):
    def create(self, request):
        data = request.data
        serializer = AddressSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return response.Response("Create successfully", status=status.HTTP_201_CREATED)
        else:
            return response.Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def partial_update(self, request):
        data = request.data
        address_id = data.get("id")
        instance = Address.objects.get(pk=address_id)
        serializer = AddressSerializer(instance=instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return response.Response(status=status.HTTP_200_OK)
        else: 
            return response.Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
