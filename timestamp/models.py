from django.db import models

# Create your models here.
class Audio(models.Model):
    title = models.CharField(max_length=200)
    filepath = models.CharField(max_length=200)
    media_type = models.CharField(
        max_length=10, 
        choices=models.TextChoices('mediaType', 'BOOK SONG').choices, 
        default='SONG')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Timestamp(models.Model):
    second = models.IntegerField()
    audio_id = models.ForeignKey(Audio, on_delete=models.CASCADE)
    stamp_type = models.CharField(
        max_length=10, 
        choices=models.TextChoices('stampType', 'BOOKMARK FAVORITE MEMO TOC MARKER').choices, 
        default='MARKER')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Memo(models.Model):
    timestamp_id = models.ForeignKey(Timestamp, on_delete=models.CASCADE)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Toc(models.Model):
    timestamp_id = models.ForeignKey(Timestamp, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)