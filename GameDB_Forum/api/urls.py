from django.urls import path
from . import views

urlpatterns = [
    path("is_authenticated/", views.Is_Authenicated.as_view(), name="is_authenticated"),
    path("login/", views.Login.as_view(), name="login"),
    path("logout/", views.logoutUser, name="logout"),
    path("get_user/", views.GetUser.as_view(), name="get_user"),
    path("get_profile/", views.GetProfile.as_view(), name="get_profile"),
    path("update_profile_pic/", views.UpdateProfilePic.as_view(), name="update_profile_pic"),
    path("update_user_info/", views.UpdateUserInfo.as_view(), name="update_user_info"),
    path("register/", views.Register.as_view(), name="register"),
    path("get_posts/", views.PostList.as_view(), name="posts"),
    path("get_suggestions/<str:search_word>", views.GetSuggestions.as_view(), name='get_suggestions'),
    path("post/", views.Post.as_view(), name='get_post_details'),
    path("add_comment/", views.AddComment.as_view(), name='add_comment'),
    path("add_reply/", views.AddReply.as_view(), name='add_reply'),
    
]