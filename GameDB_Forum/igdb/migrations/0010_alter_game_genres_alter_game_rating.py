# Generated by Django 5.0.6 on 2024-05-19 22:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('igdb', '0009_game_genres_game_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='genres',
            field=models.CharField(blank=True, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='game',
            name='rating',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
