import "@expo/match-media";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import store from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/stacks/RootStack";
import { useEffect } from "react";
import SETTINGS from "./src/constants/settings.json";
export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <RootStack />
      </PaperProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
