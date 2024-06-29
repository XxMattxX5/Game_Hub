from django.contrib import admin
from .models import *

# Register your models here.
class GeneralPostAdmin(admin.ModelAdmin):
    raw_id_fields = ["author"]

class GamePostAdmin(admin.ModelAdmin):
    raw_id_fields = ["author", "game"]


admin.site.register(Profile)
admin.site.register(GeneralPost, GeneralPostAdmin)
admin.site.register(GamePost, GamePostAdmin)
admin.site.register(Comment)
admin.site.register(Reply)
