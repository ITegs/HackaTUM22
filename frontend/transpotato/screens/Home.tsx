import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import SearchCard from "../components/SearchCard";

import { Text, SafeAreaView, Card } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function Home({ navigation }: RootTabScreenProps<"Home">) {
  const toSelectTransportation = () => {
    navigation.navigate("SelectTransportation");
  };

  const [username, setUsername] = React.useState("");

  useEffect(() => {
    AsyncStorage.getItem("username").then((value) => {
      if (value !== null) {
        setUsername(value);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Card size={2} style={styles.card}>
        <Text style={styles.title}>Welcome {username}!</Text>
        <SearchCard toSelectTransportation={toSelectTransportation} />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    height: "40%",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 15,
  },
});
