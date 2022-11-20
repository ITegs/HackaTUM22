import mvg_api
import json
import GetStations


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


def ret(origin, dest):
    route = []
    for i in (gettransport(origin, dest)[0]['connectionPartList']):

        # print(mvg_api.get_lines(i['location']['id']))
        add = {'from': (i['from']['name']),'type': (i['label'] + " (" + i['destination'] + ") "), 'to':(i['to']['name'])}
        route.append(add)
    return route


def getstations(lat, long, street):
    stations = GetStations.ret(lat, long, street)
    sta1 = stations[0]
    sta2 = stations[1]
    sta1name = findnearest(sta1[0],sta1[1])[0]['name']
    sta2name = findnearest(sta2[0], sta2[1])[0]['name']
    if(sta1 == 0 or sta2 == 0):
        return
    else:
        return ret(sta1name, sta2name)



print(getstations(48.264879, 11.669938, "Kieferngarten"))
