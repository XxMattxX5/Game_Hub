# Generated by Django 4.2.13 on 2024-07-05 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('igdb', '0029_alter_game_cover_url_alter_game_game_id_and_more'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='game',
            index=models.Index(fields=['name'], name='igdb_game_name_5aaab3_idx'),
        ),
    ]
