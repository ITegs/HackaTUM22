import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import Header from "./components/Header";
import { Text, View } from "./components/Themed";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [uuid, setUuid] = useState("");
  const [username, setUsername] = useState("");

  const checkID = async () => {
    var id = await AsyncStorage.getItem("id");
    if (id === null) {
      // await AsyncStorage.setItem("id", "123");
      // setUuid("123");
    } else {
      setUuid(id);
    }
  };

  const generateID = async () => {
    AsyncStorage.setItem("username", username);
    fetch("http://192.168.12.1:8000/genUser/?name=" + username, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setUuid(json.id);
        AsyncStorage.setItem("id", json.id);
        updateScore(json.id);
        fetchLvl(json.id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateScore = async (iid: any) => {
    fetch("http://192.168.12.1:8000/getScore/" + iid + "/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        AsyncStorage.setItem("score", json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchLvl = async (iid: any) => {
    fetch("http://192.168.12.1:8000/getLvl/" + iid + "/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        AsyncStorage.setItem("lvl", json.lvl);
        AsyncStorage.setItem("nxtLvl", json.needed);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchFurther = async () => {
    generateID().then(() => {});
  };

  useEffect(() => {
    AsyncStorage.removeItem("id");
    checkID();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Header />
        {uuid === "" ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              placeholder="Username"
              onChangeText={(text) => setUsername(text)}
              style={{
                height: 40,
                width: 200,
                borderColor: "gray",
                borderWidth: 1,
                margin: 10,
                padding: 10,
              }}
            />
            <Ionicons
              name="checkmark-circle"
              size={45}
              color="black"
              onPress={fetchFurther}
              style={{ margin: 10 }}
            />
          </View>
        ) : (
          <Navigation colorScheme={colorScheme} />
        )}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
