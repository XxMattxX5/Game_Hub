# Generated by Django 4.2.13 on 2024-06-27 01:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('igdb', '0015_alter_game_genres'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='name',
            field=models.CharField(db_index=True, max_length=100),
        ),
    ]
