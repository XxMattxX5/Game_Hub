# Generated by Django 4.2.13 on 2024-07-05 16:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('igdb', '0024_game_igdb_game_first_r_b5c0c8_gin'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='game',
            index=models.Index(fields=['name'], name='igdb_game_name_5aaab3_idx'),
        ),
    ]