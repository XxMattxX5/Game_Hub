# Generated by Django 5.0.6 on 2024-05-20 19:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('igdb', '0011_alter_game_first_released'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='cover_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]