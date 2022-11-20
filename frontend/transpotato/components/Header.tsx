import React from "react";
import { HeaderView, Text, View } from "./Themed";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {
  // get score from local storage
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    AsyncStorage.getItem("score").then((value) => {
      if (value !== null) {
        setScore(parseInt(value));
      }
    });
  }, []);
  return (
    <HeaderView style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.scoreText}>Score</Text>
      </View>
    </HeaderView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingTop: 20,
  },
  scoreContainer: {
    alignItems: "center",
    paddingRight: 20,
    backgroundColor: "transparent",
  },
  score: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFA",
  },
  scoreText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
