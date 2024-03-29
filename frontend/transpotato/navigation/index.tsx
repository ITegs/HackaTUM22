/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Theme";
import useColorScheme from "../hooks/useColorScheme";
import Home from "../screens/Home";
import SelectTransportation from "../screens/SelectTransportation";
import NotFoundScreen from "../screens/NotFoundScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Travelling from "../screens/Travelling";
import Scoreboard from "../screens/Scoreboard";
import Result from "../screens/Result";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!", headerShown: false }}
      />
      <Stack.Screen
        name="SelectTransportation"
        component={SelectTransportation}
        options={{ title: "Select Transportation", headerShown: false }}
      />
      <Stack.Screen
        name="Travelling"
        component={Travelling}
        options={{ title: "Traveling", headerShown: false }}
      />
      <Stack.Screen
        name="Scoreboard"
        component={Scoreboard}
        options={{ title: "Scoreboard", headerShown: false }}
      />
      <Stack.Screen
        name="Result"
        component={Result}
        options={{ title: "Result", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].acc3,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarShowLabel: false,
        })}
      />
      <BottomTab.Screen
        name="Scoreboard"
        component={Scoreboard}
        options={({ navigation }: RootTabScreenProps<"Scoreboard">) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name="trophy" color={color} />,
          tabBarShowLabel: false,
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
