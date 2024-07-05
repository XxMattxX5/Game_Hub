# Generated by Django 4.2.13 on 2024-07-05 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('igdb', '0027_remove_game_igdb_game_name_31d37d_gin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='cover_url',
            field=models.URLField(blank=True, db_index=True, null=True),
        ),
        migrations.AlterField(
            model_name='game',
            name='game_id',
            field=models.CharField(db_index=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='game',
            name='genres',
            field=models.ManyToManyField(blank=True, db_index=True, to='igdb.genre'),
        ),
    ]