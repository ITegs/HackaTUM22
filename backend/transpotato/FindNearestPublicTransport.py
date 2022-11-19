import mvg_api
import json


def findnearest(lat, long):
    loc = []
    x = mvg_api.get_nearby_stations(lat, long)
    for i in x:
        prod = ""
        for j in i["products"]:
            prod = prod + ", " + j
        loc.append({"name": i['name'], "type": prod, "distance": i['distance'], "lat": i['latitude'], "long": i['longitude']})
    return(loc)


def gettransport(start, finish):
    startstation = mvg_api.get_id_for_station(start)
    finishstation = mvg_api.get_id_for_station(finish)
    route = mvg_api.get_route(startstation, finishstation)
    return (route)

#print(findnearest(48.122211, 11.525051))
origin = "Garching-Forschungszentrum"
dest = 'Partnachplatz'
route = []

for i in (gettransport(origin, dest)[0]['connectionPartList']):

    # print(mvg_api.get_lines(i['location']['id']))
    add = {'from': (i['from']['name']),'type': (i['label'] + " (" + i['destination'] + ") "), 'to':(i['to']['name'])}
    route.append(add)

print(route)




