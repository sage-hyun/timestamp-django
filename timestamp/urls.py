from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('book/<int:book_id>/', views.book, name='book'),
    path('song/<int:song_id>/', views.song, name='song'),
    path('bookmark/', views.bookmark, name='bookmark'),
    path('favorite/', views.favorite, name='favorite'),
    path('toc/', views.memo, name='toc'),
    path('memo/', views.memo, name='memo'),
    path('marker/', views.marker, name='marker'),
]