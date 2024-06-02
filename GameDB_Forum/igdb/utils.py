from .models import Token, Game, Video, Screenshot
from django.utils import timezone
from django.utils.timezone import make_aware
from datetime import timedelta
from requests import post
from django.core.paginator import Paginator
from django.db.models import F 
from .credentials import CLIENT_ID, CLIENT_SECRET


# Adds new or refreshed token to database
def add_or_refresh_token(data):
    access_token = data.get("access_token")
    expires_in = data.get("expires_in")
    token_type = data.get("token_type")
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    token = Token(access_token=access_token, expires_in=expires_in, token_type=token_type)
    token.save()

# Returns a list of games to be displayed
def get_game_list(search_word ,perPage, page, sortOpt, filters):

    # Checks if user is search for specific games
    if search_word != "" and search_word != "null":
        games = Game.objects.filter(name__icontains=search_word)
    else:
        games = Game.objects.all()
        
   
    # Applies filters
    if filters[0] != "null":
        filters[0] = make_aware(timezone.datetime.strptime(filters[0], "%m/%d/%Y"))
        games = games.filter(first_released__lte=filters[0])
        
    if filters[1] != "null":
        filters[1] = make_aware(timezone.datetime.strptime(filters[1], "%m/%d/%Y"))
        games = games.filter(first_released__gte=filters[1])
        
    if filters[2] != "genre":
        games = games.filter(genres__icontains=filters[2])
        

    # returns if no games were found with the search word
    if games.count() <= 0:
             
        return "No games found", []
    
    # Applys sort to list if a sort was selected
    if sortOpt != 'sort_by' and sortOpt != "null":
        if sortOpt == "name":
            games = games.order_by(F("name").desc(nulls_last=True))
        elif sortOpt == "first_released":
                games = games.order_by(F('first_released').asc(nulls_last=True))
    else: 
        games = games.order_by(F("first_released").desc(nulls_last=True))
        
    p = Paginator(games, perPage)

    # Gets page number list for user navigation
    pages = p.get_elided_page_range(page, on_each_side=2, on_ends=1)
    
    #Gets the 60 games from queryset based on pageRange and games perPage
    games = p.get_page(page)

    return games, pages

# Adds new games or updates current games
def add_or_update_game(data):
    games = Game.objects.filter(game_id=data['game_id'])
    missing_info = False
    
    # Checks if games exists in database and checks if its missing information
    if games.exists():
        games = games[0]

        # Finds if anything is missing from the existing game
        if (games.cover_url):
            if (not "t_cover_big" in games.cover_url):
                missing_info = True
        if (not games.cover_url) and ( data['cover']):
            missing_info = True
        elif (not games.first_released) and (data['first_released']):
            missing_info = True
        elif (not games.storyline) and (data['storyline']):
            missing_info = True
        elif (not games.summary) and (data['summary']):
            missing_info = True
        elif (not games.genres) and (data['genres']):
            missing_info = True
        elif (not games.rating) and (data['age_ratings']):
            missing_info = True
        else:
            if not missing_info:
                return
            
    videos = data['videos']
    screenshots = data['screenshots']
    cover = data['cover']
    
    # Changes cover url to get a bigger picture
    if cover:
        cover = cover.get('url')
        cover=cover.replace('t_thumb', 't_cover_big')

    game_id = data['game_id']
    name = data['name']
    first_release = data['first_released']
    genres = []

    # if the game has genres it is joined together into a string 
    if data['genres']:
        for genre in data['genres']:
            genres.append(genre.get('name').replace(" ", ""))
        genres = " ".join(genres)
    else:
        genres = ""
    

    ratings = data['age_ratings']
    if ratings:
        ratings = ratings[0].get('rating')

    # if a game has a first release the datetime object is made timezone aware
    if first_release:
        try:
            first_release = timezone.datetime.fromtimestamp(data["first_released"])
            first_release = make_aware(first_release)
        except:
            first_release = None

    storyline = data['storyline']
    summary = data['summary']

    # Updates existing games with missing info or creates a new one
    if missing_info:
       games.cover_url = cover
       games.first_released = first_release
       games.storyline = storyline
       games.summary = summary
       games.genres = genres
       games.rating = ratings
       games.save(update_fields=['cover_url','first_released','storyline','summary', 'genres', 'rating'])
    else:
        game = Game(game_id=game_id, name=name, cover_url=cover, first_released=first_release, storyline=storyline, summary=summary, genres=genres, rating=ratings)
        game.save()

        if videos:
            for vid in videos:
                vid = f"https://www.youtube.com/embed/{vid.get("video_id")}"
                video = Video(game=game, url=vid)
                video.save()

        if screenshots:
            for shot in screenshots:
                shot = shot.get("url")
                screenshot = Screenshot(game=game, url=shot)
                screenshot.save()
            