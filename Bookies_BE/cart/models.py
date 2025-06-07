from django.db import models
from django.contrib.auth.models import User
from books.models import Book
from users.models import Profile
# Create your models here.

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user_cart")
    class Meta:
        db_table = 'cart'


class Cart_Items(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="cart_cart_items")
    book = models.ForeignKey(Book, related_name="book_cart", on_delete=models.CASCADE)
    class Meta:
        db_table = 'cart_items'
        constraints = [
            models.UniqueConstraint(fields=['cart', 'book'], name='unique_cart_book'),
        ]





