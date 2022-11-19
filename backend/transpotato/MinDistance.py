from datetime import datetime
import googlemaps
import mvg_api
from googlemaps import convert
gmaps = googlemaps.Client(key='AIzaSyA2eF7Qs2jsU8EuoVKJ9pFIUMKMNz79qdY')


def geocode(client, address=None, place_id=None, components=None, bounds=None, region=None,
            language=None):
    """
    Geocoding is the process of converting addresses
    (like ``"1600 Amphitheatre Parkway, Mountain View, CA"``) into geographic
    coordinates (like latitude 37.423021 and longitude -122.083739), which you
    can use to place markers or position the map.
    :param address: The address to geocode.
    :type address: string
    :rtype: list of geocoding results.
    """

    params = {}

    if address:
        params["address"] = address

    if place_id:
        params["place_id"] = place_id

    if components:
        params["components"] = convert.components(components)

    if bounds:
        params["bounds"] = convert.bounds(bounds)

    if region:
        params["region"] = region

    if language:
        params["language"] = language

    return client._request("/maps/api/geocode/json", params).get("results", [])



def getdistance(lat, lon, finlat, finlong):
    # Requires API key
    origin = str(lat) + ", " + str(lon)
    dest = str(finlat) + ", " + str(finlong)
    print(origin + ", " + dest)
    gmaps = googlemaps.Client(key='AIzaSyA2eF7Qs2jsU8EuoVKJ9pFIUMKMNz79qdY')
    # Requires cities name
    my_dist = gmaps.distance_matrix(str(origin),str(dest))['rows'][0]['elements'][0]
    #my_dist = gmaps.distance_matrix('Delhi','Mumbai')['rows'][0]['elements'][0]
    # Printing the result
    return my_dist['distance']['value']

    distance = ((my_dist['distance'])['value'])
    return distance
def totaldistance(lat, lon, finlat, finlong):
    origin = str(lat) + ", " + str(lon)
    dest = str(finlat) + ", " + str(finlong)
    gmaps = googlemaps.Client(key='AIzaSyA2eF7Qs2jsU8EuoVKJ9pFIUMKMNz79qdY')
    final = []
    modes = ["walking", "bicycling"]
    for m in modes:
        now = datetime.now()
        directions_result = gmaps.directions(str(origin),str(dest), mode=m,departure_time=now)

        for j in directions_result:
            for i in j['legs']:
                distance = (i['distance'])['value']
                duration_in_traffic = (i['duration'])['value']
                final.append([distance, duration_in_traffic])
    return final



def gettime(lat, lon, finlat, finlong):
    origin = str(lat) + ", " + str(lon)
    dest = str(finlat) + ", " + str(finlong)
    gmaps = googlemaps.Client(key='AIzaSyA2eF7Qs2jsU8EuoVKJ9pFIUMKMNz79qdY')
    x = mvg_api.get_nearby_stations(lat, lon)
    y = mvg_api.get_nearby_stations(finlat, finlong)
    time = []
    now = datetime.now()
    directions_result = gmaps.directions(str(origin),str(dest), mode="transit",departure_time=now)
    time = 0
    for i in directions_result:
        y = i['legs']
        for j in y:
            legtime = (j['arrival_time'])['value'] - (j['departure_time'])['value']
            time = time + legtime
    return time

lat = 48.262709
long = 11.667338
finlong = 48.182424
finlat = 11.531829

def values(distancestot, transit):
    walktime = distancestot[0][1]
    walkdistance = distancestot[0][0]
    biketime = distancestot[1][1]
    bikedistance = distancestot[1][0]
    electrotime = bikedistance * 8 / 60
    electrodistance = bikedistance
    transittime = transit

    print(walktime)
    print(walkdistance)
    print(biketime)
    print(bikedistance)
    print(electrotime)
    print(electrodistance)
    print(transittime)

## current latitude, current longitude, string of destination name
def ret(lat, long, street):
    adress = (geocode(gmaps, str(str(street) + ",München, DE")))
    finlat = adress[0]['geometry']['location']['lat']
    finlong = adress[0]['geometry']['location']['lng']
    if finlong == long:
        print("Error")
    #dist = getdistance(lat, long, finlat, finlong)
    distancestot = totaldistance(lat, long, finlat, finlong)
    transit = 0
    try:
        transit = gettime(lat, long, finlat, finlong)
    except:
        print("An exception occurred")
    returnval = {"credits": [int(distancestot[1][0]*0.01*2),int(transit*11.111*0.005*2),int(distancestot[0][0]*0.012*2),int(distancestot[1][0]*0.0035*2)], "duration": [int(distancestot[1][1]/60),int(transit/60),int(distancestot[0][1]/60),int(distancestot[1][0]*8/60/60)], "distance": [distancestot[1][0],distancestot[0][0],distancestot[1][0]]}
    return returnval

print(ret(48.262550, 11.667970, "Olympia Einkaufszentrum"))