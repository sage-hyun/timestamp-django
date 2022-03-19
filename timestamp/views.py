from django.shortcuts import render, get_object_or_404
from .models import Audio, Timestamp

# Create your views here.
def index(request):
    context = {
        'book_list': Audio.objects.filter(media_type='BOOK'),
        'song_list': Audio.objects.filter(media_type='SONG'),
    }
    return render(request, 'index.html', context)

def book(request, book_id):
    book = get_object_or_404(Audio, pk=book_id)
    context = {
        'book_title': book.title,
        'book_filepath': book.filepath,
        'timestamps': Timestamp.objects.filter(audio_id=book_id)
    }
    return render(request, 'book/index.html', context)

def song(request, song_id):
    song = get_object_or_404(Audio, pk=song_id)
    context = {
        'song_title': song.title,
        'song_filepath': song.filepath,
        'timestamps': Timestamp.objects.filter(audio_id=song_id)
    }
    return render(request, 'song/index.html', context)