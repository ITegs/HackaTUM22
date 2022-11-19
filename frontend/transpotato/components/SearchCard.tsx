import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card, TextInput } from "./Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SearchCard(props: any) {
  const [destination, setDestination] = React.useState("");

  const storeDestination = (text: string) => {
    AsyncStorage.setItem("destination", text);
  };

  const toSelectTransportation = () => {
    storeDestination(destination);
    props.toSelectTransportation();
  };

  return (
    <Card size={2} style={styles.container}>
      <TextInput
        placeholder="Destination"
        onChangeText={(e) => setDestination(e.valueOf().toString())}
      />
      <Ionicons
        name="search"
        size={30}
        color="black"
        onPress={toSelectTransportation}
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
