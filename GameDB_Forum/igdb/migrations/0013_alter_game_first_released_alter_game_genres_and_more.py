# Generated by Django 5.0.6 on 2024-06-25 20:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('igdb', '0012_alter_game_cover_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='first_released',
            field=models.DateTimeField(blank=True, db_index=True, null=True),
        ),
        migrations.AlterField(
            model_name='game',
            name='genres',
            field=models.CharField(blank=True, db_index=True, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='game',
            name='name',
            field=models.CharField(db_index=True, max_length=50),
        ),
    ]
