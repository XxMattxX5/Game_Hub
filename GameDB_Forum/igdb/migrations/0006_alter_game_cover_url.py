# Generated by Django 5.0.6 on 2024-05-19 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('igdb', '0005_alter_game_cover_url_alter_game_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='cover_url',
            field=models.URLField(null=True),
        ),
    ]