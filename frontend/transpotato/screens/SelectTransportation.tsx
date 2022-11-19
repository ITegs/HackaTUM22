import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";

import { View, Text, Card } from "../components/Themed";

export default function SelectTransportation(props: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.destination}>{props.destination}</Text>
      <Text style={styles.title}>Select Transportation</Text>

      <View style={styles.transportationRow}>
        <Card size={1} style={styles.card}>
          <Ionicons name="bicycle" size={60} color="black" />
        </Card>
        <Card size={1} style={styles.card}>
          <Ionicons name="walk" size={60} color="black" />
        </Card>
      </View>
      <View style={styles.transportationRow}>
        <Card size={1} style={styles.card}>
          <Ionicons name="bus" size={60} color="black" />
        </Card>
        <Card size={1} style={styles.card}>
          <MaterialIcons name="bike-scooter" size={60} color="black" />
        </Card>
      </View>
      <Card size={2} style={styles.card}>
        <Text style={styles.cardText}>Nothing above</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
  },
  destination: {
    fontSize: 20,
  },

  title: {
    fontSize: 20,
  },
  transportationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  cardText: {
    fontSize: 20,
  },
});
