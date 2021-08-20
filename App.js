import "@expo/match-media";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import StackContainer from "./src/stacks/StackContainer";
import UserInactivity from "react-native-user-inactivity";
import LockScreen from "./src/screens/LockScreen";

export default function App() {
  const [active, setActive] = useState(true);
  //Set timer for inactivity here...
  const [timer, setTimer] = useState(20000);
  return (
    <>
      {active ? (
        <UserInactivity
          style={{ height: "100%", padding: 0, margin: 0 }}
          isActive={active}
          timeForInactivity={timer}
          skipKeyboard={true}
          onAction={(isActive) => {
            setActive(isActive);
            console.log(isActive);
          }}
          style={{ flex: 1, paddingTop: "10%" }}
        >
          {active ? <StackContainer /> : null}
        </UserInactivity>
      ) : (
        <LockScreen active={active} setActive={setActive} />
      )}
    </>
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
