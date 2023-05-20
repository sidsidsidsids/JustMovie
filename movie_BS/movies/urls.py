from django.urls import path, include
from .views import genres, movie_list, movie_detail, comments_list, comments_detail

urlpatterns = [
    path('',movie_list, name='movie-list'),
    path('<int:id>',movie_detail, name='movie-detail'),
    path('comment',comments_list, name='comments-list'),
    path('comment/<int:id>',comments_detail, name='comments-detail'),
    path('genres', genres, name='genres'),
]