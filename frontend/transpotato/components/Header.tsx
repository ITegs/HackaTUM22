import React from "react";
import { HeaderView, Text, View } from "./Themed";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {
  // get score from local storage
  const [score, setScore] = React.useState(0);
  const [lvl, setLvl] = React.useState(0);
  const [nxtLvl, setNxtLvl] = React.useState(0);

  React.useEffect(() => {
    AsyncStorage.getItem("score").then((value) => {
      if (value !== null) {
        setScore(parseInt(value));
      }
    });
    AsyncStorage.getItem("lvl").then((value) => {
      if (value !== null) {
        setLvl(parseInt(value));
      }
    });
    AsyncStorage.getItem("nxtLvl").then((value: any) => {
      if (value !== null) {
        setNxtLvl(parseInt(value));
      }
    });
  }, []);
  return (
    <HeaderView style={styles.container}>
      <View style={styles.lvlContainer}>
        <Text style={styles.lvlText}>Level {lvl}</Text>
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 30,
            width: nxtLvl * 2 + 10,
            height: 10,
            backgroundColor: "#FFFFFA",
            borderRadius: 10,
          }}
        />
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.scoreText}>Score</Text>
      </View>
    </HeaderView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
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
  lvlContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
  },
  lvlText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
