from django.urls import path, include
from .views import CartItemsViewSet

urlpatterns = [
    path('save/book/<str:book_id>/', CartItemsViewSet.as_view({'post':'create'})),
    path('get/', CartItemsViewSet.as_view({'get':'retrieve'})),
    path('delete/book/<str:book_id>/', CartItemsViewSet.as_view({'post': 'destroy'})),
    
    
]
