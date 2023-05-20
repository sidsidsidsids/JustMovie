# Generated by Django 3.2.18 on 2023-05-20 12:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('comment_id', models.AutoField(primary_key=True, serialize=False)),
                ('content', models.TextField()),
                ('star_score', models.FloatField()),
                ('user_profile_img', models.ImageField(upload_to='comment_profile_images/')),
                ('likes', models.PositiveIntegerField(default=0)),
                ('dislikes', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Movies',
            fields=[
                ('movie_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('poster_path', models.CharField(max_length=255)),
                ('overview', models.TextField()),
                ('view_cnt', models.PositiveIntegerField(default=0)),
                ('vote_count', models.PositiveIntegerField(default=0)),
                ('vote_average', models.FloatField(default=0.0)),
                ('backdrop_path', models.CharField(max_length=255, null=True)),
                ('genre_ids', models.ManyToManyField(to='movies.Genre')),
                ('star_score', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='movies', to='movies.comments')),
            ],
        ),
        migrations.AddField(
            model_name='comments',
            name='movie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.movies'),
        ),
        migrations.AddField(
            model_name='comments',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
