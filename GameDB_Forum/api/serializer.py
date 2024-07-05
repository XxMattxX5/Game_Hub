from rest_framework import serializers
from .models import GamePost, GeneralPost, Comment, Reply, Profile
from igdb.serializer import GetGamesSerializer
from igdb.models import Game
from django.contrib.auth.models import User

class GeneralPostSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)
    class Meta:
        model = GeneralPost
        fields = ("id","author_username", "title", "text", "created_at") 

class GamePostSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)
    game = GetGamesSerializer()

    class Meta:
        model = GamePost
        fields = ("id","author_username", "title", "game", "text", "created_at")

class UserSerializer(serializers.ModelSerializer):
    profile_pic = serializers.CharField(source="profile.profile_pic", read_only=True)
    class Meta:
        model = User
        fields = ("username", "email", "profile_pic", "date_joined") 

class ReplySerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)
    class Meta:
        model = Reply
        fields = ("id","author_username", "text", "created_at")

class CommentSerializer(serializers.ModelSerializer):
    replies = ReplySerializer(many=True, read_only=True)
    author_username = serializers.CharField(source="author.username", read_only=True)
    class Meta:
        model = Comment
        fields = ("id","author_username", "text", "replies","created_at")