from rest_framework.decorators import api_view
from rest_framework import status, response
from django.http import JsonResponse
def unauthorized_user(func):
    def inner1(request, *args, **kwargs):
        print(request.COOKIES)
        if request.user.is_authenticated:
            return func(request, *args, **kwargs)
        else:
            return JsonResponse({},status=401)
    return inner1
