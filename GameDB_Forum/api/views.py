from django.shortcuts import render, redirect
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.core.paginator import Paginator
from django.contrib.auth.models import User
from .models import Profile, GeneralPost, GamePost, Comment, Reply
from igdb.models import Game
from .serializer import *
from django.contrib.contenttypes.models import ContentType
import re
from django.db.models.functions import Lower
from PIL import Image
import base64
from io import BytesIO
from django.core.files.base import ContentFile
from django.contrib.postgres.search import SearchQuery, SearchVector

# Checks if a user is authenticated
class Is_Authenicated(APIView):

    def get(self, request, format=None):
        
        if request.user.is_authenticated:
            return Response({"authenticated" : True}, status=status.HTTP_200_OK)
        else:
            return Response({"authenticated" : False}, status=status.HTTP_401_UNAUTHORIZED)

# Login in user is credentials are correct  
class Login(APIView):

    def post(self, request, format=None):
        # Returns 401 if user is authenticated
        if request.user.is_authenticated:
            return Response({"error": "Already Signed In"}, status=status.HTTP_401_UNAUTHORIZED)
        
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        
        # Checks if inputs were valid
        if user is not None:
            login(request, user)

            profile = user.profile
 
            return Response({ 
                "username": user.username, 
                "profile_pic": profile.profile_pic.url if profile.profile_pic else None
            }, status=status.HTTP_200_OK)
        else:
            
            return Response({"error": "Incorrect username or password."}, status=status.HTTP_400_BAD_REQUEST)

# Gets user's username and profile picture
class GetUser(APIView):

    def get(self, request, format=None):

        # Makes sure user is logged in
        if not request.user.is_authenticated:
            return Response({}, status=status.HTTP_401_UNAUTHORIZED)
        
        user = request.user
        profile = user.profile

        return Response({
            "username": user.username, 
            "profile_pic": profile.profile_pic.url if profile.profile_pic else None
        }, status=status.HTTP_200_OK)

# Gets user profile page information
class GetProfile(APIView):

    def get(self, request, format=None):
        
        # Makes sure user is logged in
        if not request.user.is_authenticated:
            return Response({}, status=status.HTTP_401_UNAUTHORIZED)
        
        user = request.user
        profile = user.profile
        generalPosts = user.general_posts.all()
        gamePosts = user.game_posts.all()
        postCount = gamePosts.count() + generalPosts.count()

        user = UserSerializer(user).data
        generalPosts = GeneralPostSerializer(generalPosts, many=True).data
        gamePosts = GamePostSerializer(gamePosts, many=True).data
        
        # Adds all the post together and sorts them by created_at
        posts = generalPosts + gamePosts
        posts = sorted(posts, key=lambda x: x['created_at'], reverse=True)

        return Response({"user": user, "posts": {"post_list": posts,"post_count": postCount}}, status=status.HTTP_200_OK)

# Lets users update their profile_picture
class UpdateProfilePic(APIView):
    def post(self, request, format=None):
        max_width, max_height = 120, 120

        # Makes sure user is logged in
        if not request.user.is_authenticated:
            return Response({"error": "You must be signed in"}, status=status.HTTP_401_UNAUTHORIZED)

        profile_pic = request.data.get("image")

        # Makes sure an image was uploaded
        if not profile_pic:
            return Response({'error': 'No image uploaded'}, status=status.HTTP_400_BAD_REQUEST)

        # Decodes image
        format, imgstr = profile_pic.split(';base64,') 
        ext = format.split('/')[-1]
        profile_pic = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)

        image = Image.open(profile_pic)

        # Makes sure image is with the height and width limits
        if image.width > max_width or image.height > max_height:
            return Response({"error": "Image too big!"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = request.user
        user.profile.profile_pic = profile_pic
        user.profile.save()

        return Response({}, status=status.HTTP_200_OK)

# Lets user update information from their profile page
class UpdateUserInfo(APIView):

    def post(self, request, format=None):
        error1 = ""
        error2 = ""
        
        # Makes sure user is logged in
        if not request.user.is_authenticated:
            return Response({"error": "You must be signed in"}, status=status.HTTP_401_UNAUTHORIZED)

        newUsername = request.data.get("username")
        newEmail = request.data.get("email")

        # Makes sure new username is valid
        if len(newUsername) < 3:
            error1 = "Username must be creater then 3 characters"
        elif (len(newUsername) > 20):
            error1 = "Username must be 20 characters or less"
        elif (User.objects.filter(username=newUsername)):
            error1 = "Username is already taken"

        # Checks if email is valid
        if (not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', newEmail)):
            error2 = "Email Invalid"
    
        # Returns errors if anywhere found
        if(error1 or error2):
            return Response({"error":{"error1": error1, "error2": error2}}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user

        user.username = newUsername
        user.email = newEmail
        user.save()

        return Response({}, status=status.HTTP_200_OK)

# Logs out user
def logoutUser(request):
    logout(request)
    return HttpResponse("Logout Succesful")

# Registers a new user
class Register(APIView):

    def post(self, request, format=None):
        username = request.data.get("username")
        email = request.data.get("email")
        password1 = request.data.get("password1")
        password2 = request.data.get("password2")
        error1 = ""
        error2 = ""
        error3 = ""
        error4 = ""
        error5 = ""

        # Returns 401 if user is authenticated
        if request.user.is_authenticated:
            error5 = "Already Authenticated"
            return Response({"error": {"error1": error1, "error2": error2, "error3": error3, "error4": error4, "error5": error5}}, status=status.HTTP_401_UNAUTHORIZED)

        # Checks if username is valid
        if (len(username) < 3):
            error1 = "Usernames must 3 characters or greater"
        elif (len(username) > 20):
            error1 = "Usernames can only be 20 characters or less"
        elif (User.objects.filter(username__iexact=username).exists()):
            error1 = "Username is already in use."
        
        # Checks if email is valid
        if (not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email)):
            error2 = "Email Invalid"

        # Checks if password1 is valid
        if (len(password1) < 8):
            error3 = "Passwords must be 8 characters long"
        elif (not re.match(r'[A-Z]', password1)):
            error3 = "Passwords must have 1 capital letter"
        elif (not re.match(r'^(?=.*[^\w\s])|(?=.*\d).*$', password1)):
            error3 = "Passwords must contain one special character or number"
       
        # Checks password2 matches password1
        if(password1 != password2):
            error4 = "Passwords must match"

        # Returns errors if any were found
        if error1 or error2 or error3 or error4:
            return Response({"error": {"error1": error1, "error2": error2, "error3": error3, "error4": error4, "error5": error5}}, status=status.HTTP_400_BAD_REQUEST)
        
        # Creates new user and profile
        user = User.objects.create_user(username=username, email=email, password=password1)
        user.save()
        newProfile = Profile(user=user)
        newProfile.save()

        return Response({"status": "Success"}, status=status.HTTP_200_OK)

# Get a list of posts
class PostList(APIView):
    
    def get(self, request, format="none"):
        postType = request.GET.get("type")
        amount = int(request.GET.get("amount"))
        page = int(request.GET.get("page")) if request.GET.get("page") else 1
        sort = request.GET.get("sort")
        search_term = request.GET.get("search")
        
        # Returns empty object if amount is not set
        if amount == 0:
            return Response({"posts": {}, "count": 0}, status=status.HTTP_200_OK)

        # Grabs post based on postType
        if postType == "general":
            posts = GeneralPost.objects.all()
        elif postType == "game":
            posts = GamePost.objects.all()
            
        # Filters for search_term if one is present
        if search_term:
            vector = SearchVector("title")
            query = SearchQuery(search_term)
            posts = posts.annotate(search=vector).filter(search=query)

        # Orders by sort option
        if sort and sort != "sort_by":
            posts = posts.order_by(Lower(sort))
        else:
            posts = posts.order_by('-created_at')

        p = Paginator(posts, amount)
        posts = p.page(page)
        
        # Creates page number list
        pages = p.get_elided_page_range(page, on_each_side=2, on_ends=1)

        # Serializers posts
        if postType == "general":
            data = GeneralPostSerializer(posts, many=True).data
        if postType == "game":
            data = GamePostSerializer(posts, many=True).data

        return Response({"posts": data, "count": p.count, "pages": pages}, status=status.HTTP_200_OK)
        

# Gets post details including comments and replies and let user create post
class Post(APIView):

    # Create a new post
    def post(self, request, format=None):
            
        postType = request.data.get("postType")
        title = request.data.get("title")
        game_id = request.data.get("game")
        text = request.data.get("text")
        error = ""

        # Returns 401 if user is not authenticated
        if not request.user.is_authenticated:
            error = "You must be signed in"
            return Response({"error": error}, status=status.HTTP_401_UNAUTHORIZED)

        # Makes sure title is valid
        if len(title) < 3 or len(title) > 80:
            error = "Title must be between 3 and 80 characters"
        elif (postType == "games" and Game.objects.filter(game_id=game_id).count() == 0):
            error = "Game not found"
        elif (len(text) < 1):
            error = "Text Area cannot be empty"

        # Returns errors is any are found
        if (error):
            return Response({"error": error}, status=status.HTTP_400_BAD_REQUEST)

        # Creates new post based on type
        if postType == "general":
            post = GeneralPost(author=request.user, title=title, text=text)
            post.save()
        elif postType == "games":
            game = Game.objects.get(game_id=game_id)
            post = GamePost(author=request.user, title=title, game=game,text=text)
            post.save()
                
        return Response({}, status=status.HTTP_200_OK)

    # Get post details
    def get(self,request, format=None):
        postType = request.GET.get('type')
        post_id = request.GET.get('id')

        # Grabs post details using type and post id
        if postType == "general":
            post = GeneralPost.objects.filter(id=post_id)
            content_type = ContentType.objects.get_for_model(GeneralPost)
        elif postType == "games":
            post = GamePost.objects.filter(id=post_id)
            content_type = ContentType.objects.get_for_model(GamePost)
        else:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        
        # Turns error if post was not found
        if not post.exists():
            return Response({"error": "Post doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Serializes post
        if postType == "general":
            post = GeneralPostSerializer(post[0]).data
        if postType == "games":
            post = GamePostSerializer(post[0]).data


        # Gets post comments and replies
        comments = Comment.objects.filter(content_type=content_type, object_id=post_id)
        comments = CommentSerializer(comments, many=True).data

        return Response({"post": post, "comments": comments}, status=status.HTTP_200_OK)

# Adds comment to database if input valid
class AddComment(APIView):

    def post(self, request, format=None):

        # Returns 401 if user is not logged in
        if not request.user.is_authenticated:
            return Response({"error": "Must be signed in"}, status=status.HTTP_401_UNAUTHORIZED)
        
        postType = request.data.get("post_type")
        post_id = request.data.get("post_id")
        comment = request.data.get("comment")
        
        # Gets post comment is about based on post_id and type
        if postType == "general":
            post = GeneralPost.objects.filter(id=post_id)
            content_type = ContentType.objects.get_for_model(GeneralPost)
        elif postType == "games":
            post = GamePost.objects.filter(id=post_id)
            content_type = content_type = ContentType.objects.get_for_model(GamePost)
        else:
            return Response({"error": "Post type doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

        # Returns error if post isn't found
        if not post.exists():
            return Response({"error": "Post not found"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Makes sure post is valid
        if len(comment) <= 0:
            return Response({"error": "Comment can't be empty"}, status=status.HTTP_400_BAD_REQUEST)

        # Creates a new comment
        newComment = Comment(content_type=content_type, object_id=post_id, author=request.user, text=comment)
        newComment.save()

        return Response({}, status=status.HTTP_200_OK)

# Adds reply to database if input is valid
class AddReply(APIView):

    def post(self, request, format=None):

        # Returns 401 if user is not logged in
        if not request.user.is_authenticated:
            return Response({"error": "Must be signed in"}, status=status.HTTP_401_UNAUTHORIZED)
        
        comment_id = request.data.get("comment_id")
        reply = request.data.get("reply")
        
        # Gets comment reply is about
        comment = Comment.objects.filter(id=comment_id)

        # Returns error is comment is not found
        if not comment.exists():
            return Response({"error": "Comment not found"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Makes sure reply is valid
        if len(reply) <= 0:
            return Response({"error": "Reply can't be empty"}, status=status.HTTP_400_BAD_REQUEST)
        
        comment = comment[0]

        # Creates new reply
        newReply = Reply(comment=comment, author=request.user, text=reply)
        newReply.save()
        

        return Response({}, status=status.HTTP_200_OK)

# Gets suggestions for search bar
class GetSuggestions(APIView):

    def get(self, request, search_word, format=None):
        postType = request.GET.get("type")

        # search_term is empty an empty array is returned
        if search_word == 'none':
            data = []
        else:
           if postType == "general":
                posts = GeneralPost.objects.filter(title__trigram_word_similar=search_word)[:5]
                # posts = GeneralPost.objects.annotate(search=vector).filter(search=query)[:5]
                data = GeneralPostSerializer(posts, many=True).data
           elif postType == "games":
                posts = GamePost.objects.filter(title__trigram_word_similar=search_word)[:5]
                data = GamePostSerializer(posts, many=True).data
    

        return Response(data, status=status.HTTP_200_OK)



        