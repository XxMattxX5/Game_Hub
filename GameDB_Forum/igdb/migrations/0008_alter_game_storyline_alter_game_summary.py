# Generated by Django 5.0.6 on 2024-05-19 22:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('igdb', '0007_remove_game_description_game_storyline_game_summary'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='storyline',
            field=models.CharField(blank=True, max_length=2000, null=True),
        ),
        migrations.AlterField(
            model_name='game',
            name='summary',
            field=models.CharField(blank=True, max_length=2000, null=True),
        ),
    ]