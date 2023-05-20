from django.contrib.auth.models import User
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from .models import Movies, Comments, Genre
from .serializers import GenreSerializer, MoviesSerializer, MovieDetailSerializer, CommentsSerializer
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

@api_view(['GET', 'POST'])
def comments_list(request):
    if request.method == 'GET':
        # 모든 댓글 목록을 가져옴
        comments = Comments.objects.all()
        serializer = CommentsSerializer(comments, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = CommentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
def comments_detail(request, comment_id):
    try:
        comment = Comments.objects.get(comment_id=comment_id)
    except Comments.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        serializer = CommentsSerializer(comment)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CommentsSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=204)

@api_view(['GET'])
def genres(request):
    genres = Genre.objects.all()
    serializer = GenreSerializer(genres, many=True)
    return Response(serializer.data)