from .utils import *
from .models import Game
from .serializer import GetGamesSerializer

def fetchGames():
    authenticate()
    loadGames()

# def test():
#     games = Game.objects.only("name", "cover_url")[:5]
#     games = GetGamesSerializer(games, many=True).data
#     print(games)
