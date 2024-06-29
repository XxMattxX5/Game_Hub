from django.contrib import admin
from .models import Token, Game, Video, Screenshot, Genre

# Register your models here.
class GameAdmin(admin.ModelAdmin):
    search_fields = ['game_id', 'name']

class VideoAdmin(admin.ModelAdmin):
    search_fields = ['game__game_id']

class ScreenshotAdmin(admin.ModelAdmin):
    search_fields = ['game__game_id']


admin.site.register(Token)
admin.site.register(Game, GameAdmin)
admin.site.register(Video, VideoAdmin)
admin.site.register(Screenshot, ScreenshotAdmin)
admin.site.register(Genre)
