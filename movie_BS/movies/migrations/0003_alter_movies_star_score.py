# Generated by Django 3.2.18 on 2023-05-22 06:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0002_alter_comments_user_profile_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movies',
            name='star_score',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
    ]
