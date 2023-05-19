from django.contrib.auth.models import User
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from .models import Movies, Comments
from .serializers import MoviesSerializer, MovieDetailSerializer
from django.shortcuts import get_object_or_404, get_list_or_404

# Create your views here.
@api_view(['GET'])
def movie_list(request):
    movies = get_list_or_404(Movies)
    serialized_movies = MoviesSerializer(movies, many=True)
    return Response(serialized_movies.data)

@api_view(['GET', 'PATCH'])
# @renderer_classes([JSONRenderer])
def movie_detail(request, id):
    movie = get_object_or_404(Movies, movie_id=id)
    if request.method == 'GET':
        serialized_movie = MovieDetailSerializer(movie)
        return Response(serialized_movie.data)