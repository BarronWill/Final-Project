from django.db import models

# Create your models here.
class Book(models.Model):
    isbn = models.CharField(max_length=13, primary_key=True)
    book_title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=100, blank=True)
    year_of_publication = models.IntegerField(blank=True )
    book_author = models.CharField(max_length=50)
    summary = models.TextField(max_length=6000, blank=True )
    img_url = models.CharField(max_length=100)
    price = models.IntegerField(default=100)
    is_active = models.IntegerField(default=1)
    
    class Meta:
        db_table = 'book'
     
