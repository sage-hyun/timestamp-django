from django.contrib import admin

# Register your models here.
from .models import Audio, Lyric, Timestamp, Memo, Toc

admin.site.register(Audio)
admin.site.register(Timestamp)
admin.site.register(Memo)
admin.site.register(Toc)
admin.site.register(Lyric)