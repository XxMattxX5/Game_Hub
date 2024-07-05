from django.shortcuts import render

# Create your views here.
def home(request, *args, **kwargs):
    return render(request, 'game_library/home.html')


