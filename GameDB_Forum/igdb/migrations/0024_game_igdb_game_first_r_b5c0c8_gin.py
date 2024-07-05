# Generated by Django 4.2.13 on 2024-07-04 22:58

import django.contrib.postgres.indexes
from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('igdb', '0023_create_trigger'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='game',
            index=django.contrib.postgres.indexes.GinIndex(fields=['first_released'], name='igdb_game_first_r_b5c0c8_gin'),
        ),
        
    ]
