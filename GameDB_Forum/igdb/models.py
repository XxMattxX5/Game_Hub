from django.db import models
from django.contrib.postgres.indexes import GinIndex
from django.contrib.postgres.search import SearchVectorField, SearchVector

# Igdb Authentication token
class Token(models.Model):
    access_token = models.CharField(max_length=50)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)

# Models for games and there details
class Game(models.Model):
    game_id = models.CharField(max_length=50)
    name = models.CharField(max_length=150, db_index=True)
    cover_url = models.URLField(null=True, blank=True)
    first_released = models.DateTimeField( null=True, blank=True, db_index=True)
    storyline = models.CharField(max_length=6000, null=True, blank=True)
    summary = models.CharField(max_length=6000, null=True, blank=True)
    genres = models.ManyToManyField("Genre", blank=True)
    rating = models.IntegerField(null=True, blank=True)
    search_vector = SearchVectorField(null=True)

    def __str__(self):
        return self.name
    
    class Meta:
        indexes = [
            GinIndex(fields=['search_vector']),
            GinIndex(fields=['first_released']),
            models.Index(fields=['name']),
        ]

# Model for video relating to games
class Video(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    url = models.URLField()

    def __str__(self):
        return self.game.name

# Model for screenshot relating to games
class Screenshot(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    url = models.URLField()

    def __str__(self):
        return self.game.name
    
# Model for game genres
class Genre(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
