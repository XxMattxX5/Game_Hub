# Generated by Django 4.2.13 on 2024-07-05 16:55

import django.contrib.postgres.indexes
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('igdb', '0025_game_igdb_game_name_5aaab3_idx'),
    ]

    operations = [
        migrations.RemoveIndex(
            model_name='game',
            name='igdb_game_name_5aaab3_idx',
        ),
        migrations.AddIndex(
            model_name='game',
            index=django.contrib.postgres.indexes.GinIndex(fields=['name'], name='igdb_game_name_31d37d_gin'),
        ),
    ]
