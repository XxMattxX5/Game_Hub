from rest_framework import serializers
from .models import Game, Video, Screenshot, Genre

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ("name",)

class SearchSuggestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ("game_id",'name', 'cover_url')

class GetGamesSerializer(serializers.ModelSerializer):

    genres = GenreSerializer(many=True, read_only=True)

    class Meta:
        model = Game
        fields = ["game_id","name", "cover_url", "first_released","genres"]

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ["url"]

class ScreenshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Screenshot
        fields = ['url']