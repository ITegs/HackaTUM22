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








def gettime(lat, lon, finlat, finlong):
    origin = str(lat) + ", " + str(lon)
    dest = str(finlat) + ", " + str(finlong)
    gmaps = googlemaps.Client(key='AIzaSyA2eF7Qs2jsU8EuoVKJ9pFIUMKMNz79qdY')
    now = datetime.now()
    directions_result = gmaps.directions(str(origin),str(dest), mode="transit",departure_time=now)
    ret = []
    steps = directions_result[0]['legs'][0]['steps']
    ret.append([steps[1]['start_location']['lat'], steps[1]['start_location']['lng']])
    ret.append([steps[len(steps)-1]['start_location']['lat'], steps[len(steps)-1]['start_location']['lng']])
    return ret



lat = 48.262709
long = 11.667338
finlong = 48.182424
finlat = 11.531829



def ret(lat, long, street):
    adress = (geocode(gmaps, str(str(street) + ",München, DE")))
    finlat = adress[0]['geometry']['location']['lat']
    finlong = adress[0]['geometry']['location']['lng']
    if finlong == long:
        print("Error")
    #dist = getdistance(lat, long, finlat, finlong)

    transit = 0
    try:
        transit = gettime(lat, long, finlat, finlong)
    except:
        print("An exception occurred")
    return transit
print(ret(lat, long, "Marienplatz"))