import mvg_api


def findnearest(lat, long):
    loc = []
    x = mvg_api.get_nearby_stations(lat, long)
    for i in x:
        prod = ""
        for j in i["products"]:
            prod = prod + ", " + j
        loc.append({"name": i['name'], "type": prod, "distance": i['distance'], "lat": i['latitude'], "long": i['longitude']})