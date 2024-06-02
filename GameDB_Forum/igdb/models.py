from django.db import models

# Igdb Authentication token
class Token(models.Model):
    access_token = models.CharField(max_length=50)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)

# Models for games and there details
class Game(models.Model):
    game_id = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    cover_url = models.URLField(null=True, blank=True)
    first_released = models.DateTimeField( null=True, blank=True)
    storyline = models.CharField(max_length=2000, null=True, blank=True)
    summary = models.CharField(max_length=2000, null=True, blank=True)
    genres = models.CharField(max_length=400, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name

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