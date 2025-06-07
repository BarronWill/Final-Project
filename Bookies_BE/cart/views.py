from django.shortcuts import render, get_object_or_404
from rest_framework import response, status, viewsets
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from .models import Cart_Items, Cart
from books.models import Book
from books.serializers import BookSerializer
from django.contrib.sessions.models import Session
from users.decorators import unauthorized_user
from django.views.decorators.csrf import ensure_csrf_cookie
# Create your views here.
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

# Define this class to override the session for canceling csrf authentication
# class CsrfExemptSessionAuthentication(SessionAuthentication):
#     def enforce_csrf(self, request):
#         return  # Không thực hiện kiểm tra CSRF
    
@method_decorator(unauthorized_user, name="dispatch")
class CartItemsViewSet(viewsets.ViewSet):
    # authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    def retrieve(self, request):
        # session_key = request.session.session_key
        # session = Session.objects.get(session_key=session_key)
        # print(session.session_key, session_key)
        # user_id = session.get_decoded().get('_auth_user_id')
        user = User.objects.get(username=request.user)
        cart = Cart.objects.get(user = user)
        books = Book.objects.filter(book_cart__cart = cart)
        serializer = BookSerializer(books, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    
    # @method_decorator(ensure_csrf_cookie)
    def create(self, request, book_id):
        try:
            user = User.objects.get(username=request.user)
            if Cart.objects.filter(user=user).exists():
                cart = Cart.objects.get(user=user)
                Cart_Items(cart=cart, book_id=book_id).save()
                return response.Response(status=status.HTTP_201_CREATED)
            else:
                raise Exception("There's no cart for this user")
            
        except Exception as e:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, book_id):
        try:
            user = User.objects.get(username=request.user)
            cart = Cart.objects.get(user = user)
            Cart_Items.objects.get(cart=cart, book_id=book_id).delete()
            return response.Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)
        

