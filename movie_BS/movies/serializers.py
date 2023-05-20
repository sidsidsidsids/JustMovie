from rest_framework import serializers
from .models import Movies, Comments, Genre
from accounts.serializers import UserSerializer

class MoviesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movies
        fields = '__all__'

class MovieDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movies
        fields = '__all__'

class CommentsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # 중첩된 시리얼라이저를 사용하여 사용자 필드 표현

    class Meta:
        model = Comments
        fields = ['comment_id', 'content', 'star_score', 'user', 'movie']
        extra_kwargs = {'movie': {'write_only': True}}  # 영화 필드는 쓰기 전용으로 설정하여 응답에 포함되지 않도록 함

    def create(self, validated_data):
        # 현재 인증된 사용자로부터 영화에 대한 코멘트 생성
        user = self.context['request'].user
        comment = Comments.objects.create(
            user=user,
            content=validated_data['content'],
            star_score=validated_data['star_score'],
            movie=validated_data['movie']
        )
        return comment
    
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'