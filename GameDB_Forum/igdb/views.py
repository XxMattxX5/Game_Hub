from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.response import Response
from requests import Request, post
from .credentials import CLIENT_ID, CLIENT_SECRET
from .utils import add_or_refresh_token, add_or_update_game, get_game_list
from .models import Token, Game, Video, Screenshot
from django.utils import timezone


from .serializer import SearchSuggestionsSerializer, GetGamesSerializer , VideoSerializer, ScreenshotSerializer


# Gets a token from twitch for the igdb or refreshes the current token.
class Authenticate(APIView):
    def get(self, request, format=None):
        token = Token.objects.all()
        
        # Checks if there is already a token
        if len(token) > 0:
            token = token[0]

            # Checks if the token is expired and refreshes it if it is
            if token.expires_in <= timezone.now():

                # Sends a request for a new token
                response = post("https://id.twitch.tv/oauth2/token", data={
                    "client_id": CLIENT_ID,
                    "client_secret": CLIENT_SECRET,
                    "grant_type": "client_credentials"
                }).json()

                add_or_refresh_token(response)
                
                return Response({"Messsage": "Token has been refreshed"}, status=status.HTTP_200_OK)

            return Response({"Messsage": "Token is still valid"}, status=status.HTTP_425_TOO_EARLY)

        else:
            # Sends a request for a token
            response = post("https://id.twitch.tv/oauth2/token", data={
                    "client_id": CLIENT_ID,
                    "client_secret": CLIENT_SECRET,
                    "grant_type": "client_credentials"
                }).json()

            add_or_refresh_token(response)

        return Response({}, status=status.HTTP_200_OK)

# Loads games from the igdb database in the local database
class LoadGames(APIView):
    def get(self, request, format=None):
        token = Token.objects.all()

        # Checks if there is a valid token
        if len(token) > 0:
            token = token[0]
        else:
            return Response({"Message": "No valid token"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Makes sure games aren't already in the database before grabbing new ones
        Games = Game.objects.all()
        if len(Games) > 0:
            return Response({"Message": "Games are already in the database"}, status=status.HTTP_409_CONFLICT)

        headers = {
            "Client-ID": CLIENT_ID,
            "Authorization": f"Bearer {token.access_token}",
        }
        params = {
            "fields": "id, name, first_release_date, storyline, summary, cover.url, videos.video_id, screenshots.url, age_ratings.rating, genres.name, rating",
            "limit": 100,
            "offset": 0,
        }
        
        # Keeps grabbing 100 games from the igdb database until the response comes back not oke
        while True:
            response = post("https://api.igdb.com/v4/games", params=params, headers=headers)
            if response.ok:
                response = response.json()
                for game in response:
                    game_data = {
                        "game_id": game.get("id"),
                        "name": game.get('name'),
                        "first_released": game.get("first_release_date"),
                        "storyline": game.get("storyline"),
                        "cover": game.get("cover"),
                        "videos": game.get("videos"),
                        "screenshots": game.get("screenshots"),
                        "summary": game.get("summary"),
                        "genres": game.get("genres"),
                        "age_ratings": game.get("age_ratings"),
                    }

                    add_or_update_game(game_data)
                params["offset"] += 100
            else:
                break
        return Response(response, status=status.HTTP_200_OK)

# Returns a list of game suggestions based on search_word
class getSuggestions(APIView):
    serializer_class = SearchSuggestionsSerializer

    def get(self, request, search_word, format=None):
        if search_word == 'none':
            data = []
        else:
            games = Game.objects.filter(name__icontains=search_word)[:5]
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
        return Response({"pages": pages, "data":data}, status=status.HTTP_200_OK)

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
    
