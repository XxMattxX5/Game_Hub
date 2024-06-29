from django.urls import path
from . import views

urlpatterns = [
    # path("authenticate", views.Authenticate.as_view(), name='igdb_call'),
    # path("load_games", views.LoadGames.as_view(), name='load_games'),
    path("get_suggestions/<str:search_word>", views.getSuggestions.as_view(), name='get_suggestions'),
    path("get_games", views.getGames.as_view(), name='get_games'),
    path("get_game/<str:game_id>", views.getGame.as_view(), name="get_game_details")
]