from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name='home'),
    
    path("game/<str:game_id>", views.home, name='show_game_details'),
    path("games/", views.home, name='games_search'),
    path("forum/", views.home, name='forum'),
    path("forum/general/", views.home, name='forum'),
    path("forum/games/", views.home, name='forum'),
    path("forum/general/createpost", views.home, name='create_general_post'),
    path("forum/games/createpost", views.home, name='create_game_post'),
    path("forum/general/post/<int:id>", views.home, name='view_general_post'),
    path("forum/games/post/<int:id>", views.home, name='view_game_post'),
    path("contactus/", views.home, name='contactus'),
    path("login/", views.home, name='login'),
    path("register/", views.home, name='register'),
    path("profile/", views.home, name='profile'),
    
    
]