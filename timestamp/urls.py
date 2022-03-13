from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('book/<int:book_id>/', views.book, name='book'),
    path('song/<int:song_id>/', views.song, name='song'),
]