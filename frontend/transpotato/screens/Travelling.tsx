import React, { useEffect, useState } from "react";
import { View, Text } from "../components/Themed";
import { StyleSheet } from "react-native";
import { track } from "../variables/track";

import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Travelling() {
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
      method: 1,
      trackSpots: [],
    };
  };

  const logLocation = async () => {
    const unixTime = Math.round(+new Date() / 1000);

    await Location.getCurrentPositionAsync({}).then((location) => {
      setLocation(location);
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;

      track[0].trackSpots.push({
        timestamp: unixTime,
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

  const breakLoop = () => {
    setRunning(false);
    clearInterval(interval);
    console.log("break");
    console.log(track);
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
      <Text style={styles.title} onPress={breakLoop}>
        Button
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
