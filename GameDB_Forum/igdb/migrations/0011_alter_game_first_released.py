# Generated by Django 5.0.6 on 2024-05-19 23:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('igdb', '0010_alter_game_genres_alter_game_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='first_released',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
