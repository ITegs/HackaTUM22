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

  const getMethod = async () => {
    AsyncStorage.getItem("method").then((value) => {
      if (value) {
        setMethod(parseInt(value));
      }
    });
  };

  const resetTrack = () => {
    track.length = 0;
    track[0] = {
      method: method,
      trackSpots: [],
    };
  };

  const logLocation = async () => {
    await Location.getCurrentPositionAsync({}).then((location) => {
      setLocation(location);
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;

      track[0].trackSpots.push({
        timestamp: location.timestamp,
        latitude: latitude,
        longitude: longitude,
      });
    });
  };

  const [interval, setInterval] = useState<any>();

  const loop = () => {
    if (running) {
      console.log("loop");
      logLocation();
      setInterval(setTimeout(loop, 60000));
    }
  };

  const safeResults = async () => {
    fetch("http://localhost:8000/sendTrip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(track),
    })
      .then((response) => response.json())
      .then((json) => {
        AsyncStorage.setItem("newCredits", json.credits);
        AsyncStorage.setItem("newDuration", json.duration);
        AsyncStorage.setItem("newDistance", json.distance);
      })
      .catch((error) => {
        console.error(error);
      });

    resetTrack();
  };

  const breakLoop = () => {
    setRunning(false);
    clearInterval(interval);
    console.log("break");
    console.log(track);

    navigation.navigate("Result");
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
    })();

    resetTrack();
    getMethod().then(() => {
      setRunning(true);
      loop();
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Keep on {method === 0 ? "cycling" : method === 1 ? "walking" : "moving"}
        !
      </Text>
      <Card style={styles.card} size={2} onTouchStart={breakLoop}>
        <FontAwesome name="close" size={60} color="black" />
        <Text style={styles.title}>Stop tracking</Text>
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
