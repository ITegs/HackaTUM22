import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { View, Text, Card } from "../components/Themed";
import Theme from "../constants/Theme";
import Header from "../components/Header";

export default function SelectTransportation({ navigation }: any) {
  const [destination, setDestination] = useState("");

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
    getDestination();
  }, []);

  function toTravelling(i: number) {
    AsyncStorage.setItem("method", i.toString());
    navigation.navigate("Travelling");
  }

  return (
    <View style={styles.container}>
      <Header />
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
            <Text style={styles.credits}>+100pts</Text>
            <Text style={styles.time}>~ 30 min</Text>
          </Card>
          <Card
            size={1}
            style={styles.card}
            onTouchStart={() => toTravelling(1)}
          >
            <Ionicons name="walk" size={60} color="black" />
            <Text style={styles.credits}>+100pts</Text>
            <Text style={styles.time}>~ 30 min</Text>
          </Card>
        </View>
        <View style={styles.transportationRow}>
          <Card
            size={1}
            style={styles.card}
            onTouchStart={() => toTravelling(2)}
          >
            <Ionicons name="bus" size={60} color="black" />
            <Text style={styles.credits}>+100pts</Text>
            <Text style={styles.time}>~ 30 min</Text>
          </Card>
          <Card
            size={1}
            style={styles.card}
            onTouchStart={() => toTravelling(3)}
          >
            <MaterialIcons name="bike-scooter" size={60} color="black" />
            <Text style={styles.credits}>+100pts</Text>
            <Text style={styles.time}>~ 30 min</Text>
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
    fontSize: 25,
    fontWeight: "bold",
  },
  time: {
    color: Theme.light.acc1,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardText: {
    fontSize: 20,
  },
});
