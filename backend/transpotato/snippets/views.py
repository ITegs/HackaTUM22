import json
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import serializers
from rest_framework.parsers import JSONParser
from snippets.models import GenUser
from snippets.models import RouteInfo
from snippets.serializers import GenUserSerializer
from snippets.serializers import RouteInfoSerializer
import uuid

from MinDistance import ret

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

@api_view(['POST'])
def route_info(request, pk):
    try:
        user = GenUser.objects.get(pk=pk)
    except GenUser.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'POST':
        data = request.data
        lat = data['latitude']
        long = data['longitude']
        destination = data['destination']
        return HttpResponse(json.dumps(ret(lat, long, destination)), content_type='application/json; charset=utf8')
   
