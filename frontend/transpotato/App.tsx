import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [uuid, setUuid] = useState("");

  const checkID = async () => {
    var id = await AsyncStorage.getItem("id");
    if (id === null) {
      generateID();
    } else {
      setUuid(id);
    }
  };

  const generateID = async () => {
    fetch("http://localhost:8000/genUser", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setUuid(json.id);
        AsyncStorage.setItem("id", json.id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    checkID();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
