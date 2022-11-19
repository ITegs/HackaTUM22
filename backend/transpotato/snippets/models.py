from django.db import models
import uuid


class GenUser(models.Model):
    #id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    id = models.CharField(default=str(uuid.uuid4()), primary_key=True, max_length=36)