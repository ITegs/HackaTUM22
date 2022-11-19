from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from snippets.models import GenUser
from snippets.serializers import GenUserSerializer
import uuid

@csrf_exempt
def snippet_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        user = GenUser(id=str(uuid.uuid4()))
        user.save()
        serializer = GenUserSerializer(user)
        return JsonResponse(serializer.data, safe=False)
