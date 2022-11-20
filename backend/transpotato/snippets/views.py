import json
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse
from snippets.models import GenUser
from snippets.serializers import GenUserSerializer
import uuid

from MinDistance import ret
from ActDistance import calculate
from Scoreboard import getscore, getdistance, getname, gettop10, getlvl, getmypos

@api_view(['GET'])
def snippet_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        params = request.query_params
        username = ''
        if len(params.getlist('name')) != 0:
            username = params.getlist('name')[0]
        user = GenUser(id=str(uuid.uuid4()), Username=username)
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
        lat = data['location']['latitude']
        long = data['location']['longitude']
        destination = data['destination']
        return HttpResponse(json.dumps(ret(lat, long, destination)), content_type='application/json; charset=utf8')
   
@api_view(['POST'])
def send_trip(request, pk):
    try:
        user = GenUser.objects.get(pk=pk)
    except GenUser.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'POST':
        data = request.data
        return HttpResponse(json.dumps(calculate(data)))

@api_view(['GET'])
def get_score(request, pk):
    try:
        user = GenUser.objects.get(pk=pk)
    except GenUser.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        return HttpResponse(json.dumps(getscore(pk)))

@api_view(['GET'])
def get_distance(request, pk):
    try:
        user = GenUser.objects.get(pk=pk)
    except GenUser.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        return HttpResponse(json.dumps(getdistance(pk)))
    
@api_view(['GET'])
def get_name(request, pk):
    try:
        user = GenUser.objects.get(pk=pk)
    except GenUser.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        return HttpResponse(json.dumps(getname(pk)))

@api_view(['GET'])
def get_lvl(request, pk):
    try:
        user = GenUser.objects.get(pk=pk)
    except GenUser.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        return HttpResponse(json.dumps(getlvl(pk)))

@api_view(['GET'])
def get_my_position(request, pk):
    try:
        user = GenUser.objects.get(pk=pk)
    except GenUser.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        return HttpResponse(json.dumps(getmypos(pk)))

@api_view(['GET'])
def get_top_ten(request):
    if request.method == 'GET':
        return HttpResponse(json.dumps(gettop10()))
