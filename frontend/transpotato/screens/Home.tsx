import React from "react";
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

  return (
    <SafeAreaView style={styles.container}>
      <Card size={2}>
        <Text style={styles.title}>Welcome to Transpotato!</Text>
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
});
