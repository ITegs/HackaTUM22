import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import SearchCard from "../components/SearchCard";

import {
  Text,
  SafeAreaView,
  Card,
  TextInput,
  Button,
} from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function Home({ navigation }: RootTabScreenProps<"Home">) {
  const toSelectTransportation = () => {
    navigation.navigate("SelectTransportation");
  };

  const [id, setId] = React.useState("");

  useEffect(() => {
    AsyncStorage.getItem("id").then((value) => {
      console.log("ID: " + value);

      if (value !== null) {
        setId(value);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Card size={2}>
        <Text style={styles.title}>Welcome to Transpotato!</Text>
        <Text style={styles.subtitle}>Your ID: {id}</Text>
      </Card>

      <SearchCard toSelectTransportation={toSelectTransportation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 15,
  },
});
