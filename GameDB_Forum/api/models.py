from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from igdb.models import Game


# Extends the profile of a user.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    profile_pic = models.ImageField(blank=True, upload_to="images", default='images/blank-profile-picture.png')

    def __str__(self):
        return self.user.username

# Posts about general topics
class GeneralPost(models.Model):
    author = models.ForeignKey(User, related_name='general_posts', on_delete=models.CASCADE)
    title = models.CharField(max_length=400)
    text = models.CharField(max_length=40000)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author.username + " - " + self.title
    
# Posts that are focused on a specify game
class GamePost(models.Model):
    author = models.ForeignKey(User, related_name='game_posts', on_delete=models.CASCADE)
    title = models.CharField(max_length=400)
    game = models.ForeignKey(Game, on_delete=models.SET_NULL, null=True)
    text = models.CharField(max_length=40000)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author.username + " - " + self.title

# Comments on posts
class Comment(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    post = GenericForeignKey('content_type', 'object_id')
    author = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    text = models.CharField(max_length=40000)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def replies(self):
        return self.reply_set.all()

    def __str__(self):
        return self.author.username + " " + str(self.created_at)

# Replies to post comments
class Reply(models.Model):
    comment = models.ForeignKey(Comment, related_name='replies', on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=40000)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author.username + " " + str(self.created_at)
    