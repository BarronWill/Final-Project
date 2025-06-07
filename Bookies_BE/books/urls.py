from django.urls import include, path
from .views import BookViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

urlpatterns = [
    path("create/", BookViewSet.as_view({"post":"create"})),
    path("get_books/", BookViewSet.as_view({"get":"list"})),
    path("get_book/<str:pk>/", BookViewSet.as_view({"get":"retrieve"})),
    path("partial_update/<str:pk>/", BookViewSet.as_view({"patch":"partial_update"})),
    path("update/<str:pk>/", BookViewSet.as_view({"put":"update"})),
    path("delete/<str:pk>/", BookViewSet.as_view({"delete":"destroy"}))
]