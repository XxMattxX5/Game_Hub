# Generated by Django 4.2.13 on 2024-07-05 16:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('igdb', '0026_remove_game_igdb_game_name_5aaab3_idx_and_more'),
    ]

    operations = [
        migrations.RemoveIndex(
            model_name='game',
            name='igdb_game_name_31d37d_gin',
        ),
    ]
