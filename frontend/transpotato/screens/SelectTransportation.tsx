import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { View, Text, Card } from "../components/Themed";
import Theme from "../constants/Theme";
import * as Location from "expo-location";

export default function SelectTransportation({ navigation }: any) {
  const [destination, setDestination] = useState<any>("");
  const [id, setId] = useState<any>("");
  const [location, setLocation] = useState<any>();
  const [data, setData] = useState<any>({
    credits: [0, 0, 0, 0],
    duration: [0, 0, 0, 0],
    distance: [0, 0, 0, 0],
  });

  const fetchData = async () => {
    AsyncStorage.getItem("id").then((idd) => {
      setId(idd);
      AsyncStorage.getItem("destination").then((des) => {
        setDestination(des);
        Location.getCurrentPositionAsync({}).then((location) => {
          setLocation(location);
          AsyncStorage.getItem("id").then((value) => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              id: idd,
              destination: des,
              location: location.coords,
            });

            var requestOptions: any = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            fetch(
              "http://192.168.12.1:8000/routeInfo/" + idd + "/",
              requestOptions
            )
              .then((response) => response.json())
              .then((data) => {
                setData(data);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          });
        });
      });
    });
  };

  // fetch from local storage
  const getDestination = async () => {
    try {
      const value = await AsyncStorage.getItem("destination");
      if (value !== null) {
        setDestination(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    // request permission to access location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
    })();
    fetchData();
  }, []);

  function toTravelling(i: number) {
    AsyncStorage.setItem("method", i.toString());
    navigation.navigate("Travelling");
  }

  return (
    <View style={styles.container}>
      <Card size={2} style={styles.desCard}>
        <Text style={styles.destination}>{destination}</Text>
      </Card>
      <Text style={styles.title}>Select type of transportation</Text>

      <View style={styles.select}>
        <View style={styles.transportationRow}>
          <Card
            size={1}
            style={styles.card}
            onTouchStart={() => toTravelling(0)}
          >
            <Ionicons name="bicycle" size={60} color="black" />
            <Text style={styles.credits}>+{data.credits[0]}cr</Text>
            <Text style={styles.time}>~ {data.duration[0]} min</Text>
            <Text style={styles.distance}>~ {data.distance[0]} m</Text>
          </Card>
          <Card
            size={1}
            style={styles.card}
            onTouchStart={() => toTravelling(1)}
          >
            <Ionicons name="walk" size={60} color="black" />
            <Text style={styles.credits}>+{data.credits[2]}cr</Text>
            <Text style={styles.time}>~ {data.duration[2]} min</Text>
            <Text style={styles.distance}>~ {data.distance[2]} m</Text>
          </Card>
        </View>
        <View style={styles.transportationRow}>
          <Card
            size={1}
            style={styles.card}
            onTouchStart={() => toTravelling(2)}
          >
            <Ionicons name="bus" size={60} color="black" />
            <Text style={styles.credits}>+{data.credits[1]}cr</Text>
            <Text style={styles.time}>~ {data.duration[1]} min</Text>
            <Text style={styles.distance}>~ {data.distance[3]} m</Text>
          </Card>
          <Card
            size={1}
            style={styles.card}
            onTouchStart={() => toTravelling(3)}
          >
            <MaterialIcons name="bike-scooter" size={60} color="black" />
            <Text style={styles.credits}>+{data.credits[3]}cr</Text>
            <Text style={styles.time}>~ {data.duration[3]} min</Text>
            <Text style={styles.distance}>~ {data.distance[2]} m</Text>
          </Card>
        </View>
        <Card size={2} style={styles.card} onTouchStart={() => toTravelling(5)}>
          <Text style={styles.cardText}>Nothing above</Text>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  desCard: {
    height: 70,
    padding: 20,
  },
  destination: {
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 1,
    color: Theme.light.acc1,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: Theme.light.acc1,
    textAlign: "center",
    paddingTop: 40,
  },
  select: {
    position: "absolute",
    bottom: 0,
    marginBottom: 50,
  },
  transportationRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  credits: {
    color: Theme.light.acc1,
    fontSize: 15,
    fontWeight: "bold",
  },
  time: {
    color: Theme.light.acc1,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  distance: {
    color: Theme.light.acc1,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardText: {
    fontSize: 20,
  },
});
