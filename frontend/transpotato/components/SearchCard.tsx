import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card, TextInput } from "./Themed";

export default function SearchCard(props: any) {
  return (
    <Card size={2} style={styles.container}>
      <TextInput placeholder="Destination" />
      <Ionicons
        name="search"
        size={30}
        color="black"
        onPress={props.toSelectTransportation}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingRight: 30,
    height: 70,
  },
});
