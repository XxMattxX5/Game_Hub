from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.response import Response
from requests import Request, post
from .utils import get_game_list
from .models import Token, Game, Video, Screenshot, Genre
from django.utils import timezone
from .serializer import SearchSuggestionsSerializer, GetGamesSerializer , VideoSerializer, ScreenshotSerializer, GenreSerializer
from django.contrib.postgres.search import SearchQuery, SearchVector

# Returns a list of game suggestions based on search_word
class getSuggestions(APIView):
    serializer_class = SearchSuggestionsSerializer

    def get(self, request, search_word, format=None):
        if search_word == 'none':
            data = []
        else:
            games = Game.objects.filter(name__trigram_word_similar=search_word)[:5]
            data = SearchSuggestionsSerializer(games, many=True).data

        return Response(data, status=status.HTTP_200_OK)
    

# Returns a list of games based on search_word
class getGames(APIView):
    serializer_class = GetGamesSerializer

    def get(self, request, format=None):
        sort_option = request.GET.get('sort')
        search_word = request.GET.get('search')
        page_num = request.GET.get('page')
        perPage = 60
        page = int(page_num)
        filter1 = request.GET.get('filter1')
        filter2 = request.GET.get('filter2')
        filter3 = request.GET.get('filter3')
        filters = [filter1,filter2,filter3]
        
        # Gets the 60 games from queryset based on pageRange and games perPage
        games, pages = get_game_list(search_word, perPage, page, sort_option, filters)
        
        
        if type(games) == str:
             return Response({"error": "No Games Found"}, status=status.HTTP_404_NOT_FOUND)
       
        data = GetGamesSerializer(games, many=True).data
        genres = GenreSerializer(Genre.objects.all().order_by("name"), many=True).data
        return Response({"pages": pages, "data":data, "genres":genres}, status=status.HTTP_200_OK)

# Gets the details for game based on game_id
class getGame(APIView):
    
    def get(self, request, game_id, format=''):
        try:
            game = Game.objects.get(game_id=game_id)
        except:
            return Response({"error": "Game Not Found"}, status=status.HTTP_404_NOT_FOUND)
        videos = Video.objects.filter(game=game)
        videos = VideoSerializer(videos, many=True).data
        screenshots = Screenshot.objects.filter(game=game)
        screenshots = ScreenshotSerializer(screenshots, many=True).data
        data = GetGamesSerializer(game).data

        return Response({"data": data, 'videos': videos, "screenshots": screenshots}, status=status.HTTP_200_OK)
    
