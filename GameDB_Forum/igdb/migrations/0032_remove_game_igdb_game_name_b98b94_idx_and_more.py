# Generated by Django 4.2.13 on 2024-07-05 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('igdb', '0031_remove_game_igdb_game_name_5aaab3_idx_and_more'),
    ]

    operations = [
        migrations.RemoveIndex(
            model_name='game',
            name='igdb_game_name_b98b94_idx',
        ),
        migrations.AddIndex(
            model_name='game',
            index=models.Index(fields=['name'], name='igdb_game_name_5aaab3_idx'),
        ),
    ]
