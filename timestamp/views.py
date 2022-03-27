from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Audio, Timestamp, Memo, Toc
import json

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
        'audio_id': book_id,
        'book_title': book.title,
        'book_filepath': book.filepath,
        'bookmarks': Timestamp.objects.filter(audio_id=book_id, stamp_type="BOOKMARK"),
        'favorites': Timestamp.objects.filter(audio_id=book_id, stamp_type="FAVORITE"),
        'memos': Memo.objects.select_related('timestamp_id').filter(timestamp_id__audio_id=book_id),
        'tocs': Toc.objects.select_related('timestamp_id').filter(timestamp_id__audio_id=book_id),
    }
    return render(request, 'book/index.html', context)

def song(request, song_id):
    song = get_object_or_404(Audio, pk=song_id)
    context = {
        'audio_id': song_id,
        'song_title': song.title,
        'song_filepath': song.filepath,
        'timestamps': Timestamp.objects.filter(audio_id=song_id)
    }
    return render(request, 'song/index.html', context)


def timestamp(request, timestamp_id=None):
    if request.method == 'POST':
        received_json_data = json.loads(request.body)
        second = received_json_data['second']
        audio_id = received_json_data['audio_id']
        stamp_type = received_json_data['stamp_type']
        content = received_json_data['content']

        data = Timestamp(
            second=second,
            audio_id=Audio.objects.get(id=audio_id),
            stamp_type=stamp_type)
        data.save()

        if content:
            try:
                if stamp_type == "MEMO":
                    memo_data = Memo(timestamp_id=data, body=content)
                    memo_data.save()
                elif stamp_type == "TOC":
                    toc_data = Toc(timestamp_id=data, content=content)
                    toc_data.save()
            except Exception as e:
                print(e)
                data.delete()
                return JsonResponse({
                    "error":"Memo content was unable to be saved.",
                }, status=500)
        
        return JsonResponse({
            "message":"Successfully saved.",
            "timestamp_id": data.id,
            "second":second,
            "created_at":data.created_at,
        })
    
    if request.method == 'DELETE':
        ts = Timestamp.objects.get(id=timestamp_id)
        ts.delete()

        return JsonResponse({
            "message":"Successfully deleted.",
        })