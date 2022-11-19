import uuid
from django.db import models

class genUser(models.Model):
    id = models.UUIDField(
        uuid.uuid4(),
        True,
        True,
        False
    )
    title = models.CharField(max_length=255)
