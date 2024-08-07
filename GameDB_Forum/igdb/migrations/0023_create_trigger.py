# Generated by Django 4.2.13 on 2024-07-04 16:32
from django.db import migrations
from django.contrib.postgres.search import SearchVector

def compute_search_vector(apps, schema_editor):
    Game = apps.get_model("igdb", "Game")
    Game.objects.update(search_vector=SearchVector("name"))


class Migration(migrations.Migration):

    dependencies = [
        ('igdb', '0022_remove_game_igdb_game_name_31d37d_gin_and_more'),
    ]

    operations = [
        migrations.RunSQL(
            sql='''
              CREATE TRIGGER search_vector_trigger
              BEFORE INSERT OR UPDATE OF name, search_vector
              ON igdb_game
              FOR EACH ROW EXECUTE PROCEDURE
              tsvector_update_trigger(
                search_vector, 'pg_catalog.english', name
              );
              UPDATE igdb_game SET search_vector = NULL;
            ''',

            reverse_sql = '''
              DROP TRIGGER IF EXISTS search_vector_trigger
              ON igdb_game;
            '''
        ),
          migrations.RunPython(
            compute_search_vector, reverse_code=migrations.RunPython.noop
        ),
    ]
