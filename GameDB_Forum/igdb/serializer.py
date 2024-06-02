from rest_framework import serializers
from .models import Game, Video, Screenshot

class SearchSuggestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ("game_id",'name', 'cover_url')

class GetGamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = "__all__"

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ["url"]

class ScreenshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Screenshot
        fields = ['url']