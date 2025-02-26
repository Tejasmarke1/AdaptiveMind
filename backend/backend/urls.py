from django.urls import path
from api.views import home

urlpatterns = [
    path('api/', home, name='home'),
]