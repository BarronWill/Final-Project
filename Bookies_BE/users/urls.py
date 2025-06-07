from django.urls import path, include
from .views import UserViewSet, LoginView, LogoutView, ProfileView, AddressViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', UserViewSet, basename='user')
urlpatterns = [
    path('login/', LoginView.as_view(), name="login"),
    path('logout/', LogoutView.as_view(), name="logout"),
    path('get/profile/', ProfileView.as_view({'get':'retrieve'})),
    path('update/address/', AddressViewSet.as_view({'patch': 'partial_update'}) ),
    path('create/address/', AddressViewSet.as_view({'post': 'create'})),
    path('', include(router.urls)),
    
]