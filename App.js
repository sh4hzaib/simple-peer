import "@expo/match-media";
import React from "react";
import store from "./src/redux/store";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import AppContainer from "./src/stacks/AppContainer";
export default function App() {
  return (
    <>
      <ReduxProvider store={store}>
        <PaperProvider>
          <AppContainer />
        </PaperProvider>
      </ReduxProvider>
    </>
  );
}
