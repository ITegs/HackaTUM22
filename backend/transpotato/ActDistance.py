import geopy.distance



def get(lat, long, finlat, finlong):
    return geopy.distance.geodesic((lat, long), (finlat, finlong)).m

## dictionary of inputs
def calculate(inpt):

    id = inpt['id']
    time = inpt['geoData'][0]['timestamp'] - inpt['geoData'][len(inpt['geoData'])-1]['timestamp'];
    lat = []
    long = []
    distance = 0
    for i in inpt['geoData']:
        lat.append(i["latitude"])
        long.append(i["longitude"])
    for i in range(len(lat)-2):
        distance =distance + get(lat[i], long[i], lat[i+1], long[i+1])
    points = 0
    if(inpt['method']==0):
        points = 0.01
    elif(inpt['method']==1):
        points = 0.012
    elif(inpt['method'] == 2):
        points = 0.005
    elif (inpt['method'] == 3):
        points = 0.0035
    elif(input["method"] == 4):
        points = 0

    retval = {"credits": int(distance*points*2), "duration": -time/60, "distance": int(distance)}
    return retval
#1


