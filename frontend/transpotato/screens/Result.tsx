import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, Card } from "../components/Themed";
import { StyleSheet } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

export default function Result({ navigation }: any) {
  const [newCredits, setNewCredits] = useState(0);
  const [newDuration, setNewDuration] = useState(0);
  const [newDistance, setNewDistance] = useState(0);

  const set = () => {
    AsyncStorage.getItem("newCredits").then((value) => {
      if (value !== null) {
        setNewCredits(parseInt(value));
      }
    });
    AsyncStorage.getItem("newDuration").then((value) => {
      if (value !== null) {
        setNewDuration(parseInt(value));
      }
    });
    AsyncStorage.getItem("newDistance").then((value) => {
      if (value !== null) {
        setNewDistance(parseInt(value));
      }
    });
  };

  const toHome = () => {
    navigation.navigate("Home");
  };

  React.useEffect(() => {
    set();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#FFFFFA", "#59A96A"]} style={{ flex: 1 }}>
        <View style={styles.text}>
          <Text style={styles.title}>Result</Text>
          <Text style={styles.subtitle}>Credits: {newCredits}</Text>
          <Text style={styles.subtitle}>Duration: {newDuration}</Text>
          <Text style={styles.subtitle}>Distance: {newDistance}</Text>
        </View>

        <Card size={1} style={styles.home} onTouchStart={toHome}>
          <AntDesign name="home" size={40} color="black" />
        </Card>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    margin: 30,
    marginTop: 80,
    alignItems: "center",
    padding: 50,
    justifyContent: "center",
    backgroundColor: "#59A96A",
    borderTopLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    paddingBottom: 30,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFA",
  },
  home: {
    position: "absolute",
    bottom: 0,
    marginBottom: 60,
    height: 100,
    width: 150,
  },
});
