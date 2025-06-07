from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, response, status
from .models import Book
from .serializers import BookSerializer
from users.decorators import unauthorized_user
from django.utils.decorators import method_decorator
# Create your views here.
@method_decorator(unauthorized_user, name="dispatch")
class BookViewSet(viewsets.ViewSet):
    def list(self, request):
        books = Book.objects.all()[:20]
        serializer = BookSerializer(books, many=True)
        return response.Response(serializer.data)
    
    def retrieve(self, request, pk):
        book = Book.objects.get(pk=pk)
        serializer = BookSerializer(book)
        return response.Response(serializer.data)
    
    def partial_update(self, request, pk):
        book = Book.objects.get(pk=pk)
        serializer = BookSerializer(book, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
        return response.Response("Update Successfully", status=200)
    
    def update(self, request, pk):
        book = Book.objects.get(pk=pk)
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return response.Response("Update Successfully", status=200)
    
    def create(self, request):
        book = request.data
        serializer = BookSerializer(book)
        if serializer.is_valid():
            serializer.save()
            return response.Response("Create successfully", status=200)
        else:
            return response.Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        book = get_object_or_404(Book, pk=pk)
        book.delete()
        return response.Response("Delete successfully", status=200)