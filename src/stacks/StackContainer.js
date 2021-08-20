import "@expo/match-media";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import store from "../redux/store";
import RootStack from "./RootStack";

const StackContainer = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <RootStack />
      </PaperProvider>
    </ReduxProvider>
  );
};

export default StackContainer;
