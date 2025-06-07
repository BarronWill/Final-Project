from django.db import models
from users.models import Profile, Address
from books.models import Book
from django.contrib.auth.models import User
# Create your models here.

class Payment(models.Model):
    payment_method = models.CharField(max_length=255, blank=False)
    is_active = models.IntegerField(default=1)

    class Meta:
        db_table = "payment"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="profile_order")
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name="payment_order")
    created_date = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(default=0)
    status_note = models.CharField(max_length=50, default="Not confirmed yet")
    receiver_name = models.CharField(max_length=25)
    phone_number = models.CharField(max_length=11)
    receiver_note = models.CharField(max_length=100)
    address = models.CharField(max_length=100)

    class Meta:
        db_table = "orders"

class Order_Detail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="Order_Order_Detail")
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="Book_Order_Detail")
    quantity = models.IntegerField(default=1)

    class Meta:
        db_table = "order_detail"
        constraints = [
            models.UniqueConstraint(fields=['order', 'book'], name="order_book_unique")
        ]