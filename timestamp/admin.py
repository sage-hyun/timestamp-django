from django.contrib import admin

# Register your models here.
from .models import Audio, Timestamp, Memo

admin.site.register(Audio)
admin.site.register(Timestamp)
admin.site.register(Memo)