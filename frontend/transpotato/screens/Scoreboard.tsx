import React from "react";
import { View, Text } from "../components/Themed";
import { StyleSheet } from "react-native";

export default function Scoreboard() {
  // fetch from gettop10() in backend

  const [top10, setTop10] = React.useState<any>([
    { username: "Loading...", score: 0, totalDistance: 0 },
  ]);

  React.useEffect(() => {
    fetch("http://192.168.12.1:8000/getTopTen/")
      .then((response) => response.json())
      .then((json) => setTop10(json))
      .catch((error) => console.error(error))
      .finally(() => console.log("done"));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.listTop}>
        <Text style={styles.itemTop}>{"User:"}</Text>
        <Text style={styles.itemTop}>{"Score:"}</Text>
        <Text style={styles.itemTop}>{"Distance:"}</Text>
      </View>
      {top10.map((item: any) => (
        <View style={styles.list}>
          <Text style={styles.item}>{item.username}</Text>
          <Text style={styles.item}>{item.score}</Text>
          <Text style={styles.item}>{item.totalDistance}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  listTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    padding: 10,
    backgroundColor: "#FFFFFA",
  },

  list: {
    padding: 10,
    margin: 10,
    width: "90%",
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: "#2E4057",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTop: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#59A96A",
  },
  item: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFA",
  },
});
