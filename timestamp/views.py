from django.shortcuts import render

# Create your views here.
def index(request):
    context = {'book_list': [
        {'id':1, 'title':'Life Without Limits'},
        {'id':2, 'title':'Unashamed'},
    ]
    }
    return render(request, 'index.html', context)

def book(request, book_id):
    context = {
        'book_title': "Life Without Limits",
        'book_filepath': "http://surething.synology.me/audiobook_timestamp/audio/Life_Without_Limits.mp3"
        }
    return render(request, 'book/index.html', context)

def song(request, song_id):
    context = {
        'song_title': "Known, Seen, Loved",
        'song_filepath': ""
        }
    return render(request, 'song/index.html', context)