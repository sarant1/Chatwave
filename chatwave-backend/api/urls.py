from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('user', views.user, name='user'),
    path('room', views.room, name='createroom'),
    path('room/<str:email>/', views.room, name='getrooms'),
    path('messages', views.messages, name='messages')
]
