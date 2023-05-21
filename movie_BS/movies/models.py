from django.db import models
from accounts.models import Accounts

# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=50)

class Movies(models.Model):
    movie_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    poster_path = models.CharField(max_length=255)
    overview = models.TextField()
    genre_ids = models.ManyToManyField(Genre)
    view_cnt = models.PositiveIntegerField(default=0)
    vote_count = models.PositiveIntegerField(default=0)
    vote_average = models.FloatField(default=0.0)
    backdrop_path = models.CharField(max_length=255, null=True)
    star_score = models.ForeignKey('Comments', null=True, blank=True, related_name='movies', on_delete=models.CASCADE)

class Comments(models.Model):
    comment_id = models.AutoField(primary_key=True)
    content = models.TextField()
    star_score = models.FloatField()
    movie = models.ForeignKey(Movies, on_delete=models.CASCADE)
    user = models.ForeignKey(Accounts, on_delete=models.CASCADE)
    user_profile_img = models.ImageField(upload_to='comment_profile_images/', null=True)
    likes = models.PositiveIntegerField(default=0)
    dislikes = models.PositiveIntegerField(default=0)
