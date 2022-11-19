from datetime import datetime
import googlemaps as gmaps
import time
import responses
import requests
import json

api_key ='AIzaSyCNpsMQz4OgocXbWaj8ZljclLlbfEH6QWA'
source = input()
dest = input()

gmaps.configure(api_key='')
new_york_coordinates = (40.75, -74.00)
gmaps.figure(center=new_york_coordinates, zoom_level=12)
