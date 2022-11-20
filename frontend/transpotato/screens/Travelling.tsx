import React, { useEffect, useState } from "react";
import { View, Text, Card } from "../components/Themed";
import { StyleSheet } from "react-native";
import { track } from "../variables/track";

import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

export default function Travelling({ navigation }: any) {
  const [running, setRunning] = useState(true);
  const [location, setLocation] = useState<any>();
  const [method, setMethod] = useState(0);
  const [iid, setId] = useState("");

  const getMethod = async () => {
    AsyncStorage.getItem("method").then((valMeth: any) => {
      if (valMeth) {
        setMethod(parseInt(valMeth));
      }
      AsyncStorage.getItem("id").then((value: any) => {
        if (value) {
          setId(value);
        }

        Location.getCurrentPositionAsync({}).then((location) => {
          setLocation(location);
          const latitude = location.coords.latitude;
          const longitude = location.coords.longitude;

          track[0].id = value;
          track[0].method = valMeth;

          track[0].geoData.push({
            timestamp: location.timestamp,
            latitude: latitude,
            longitude: longitude,
          });
        });
      });
    });
  };

  const [interval, setInterval] = useState<any>();

  const loop = () => {
    if (running) {
      console.log("loop");
      getMethod();
      setInterval(setTimeout(loop, 60000));
    }
  };

  const safeResults = async () => {
    fetch("http://192.168.12.1:8000/sendTrip/" + iid + "/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(track),
    })
      .then((response) => response.json())
      .then((json) => {
        AsyncStorage.setItem("newCredits", json.credits).then(() => {
          AsyncStorage.setItem("newDuration", json.duration).then(() => {
            AsyncStorage.setItem("newDistance", json.distance);
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const breakLoop = async () => {
    setRunning(false);
    clearInterval(interval);
    console.log("break");
    console.log(track);
    safeResults().then(() => {
      navigation.navigate("Result");
    });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);

      setRunning(true);
      loop();
    })();

    getMethod();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Keep on {method === 0 ? "cycling" : method === 1 ? "walking" : "moving"}
        !
      </Text>
      <Card style={styles.card} size={2} onTouchStart={breakLoop}>
        <FontAwesome name="close" size={60} color="black" />
        <Text style={styles.title}>Stop tracking {iid}</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
  card: {
    height: "30%",
    backgroundColor: "#FF312E",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
