import React from "react";
import { useState } from "react";
import { Alert } from "react-native";
import { Text } from "react-native";
import { View, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../constants/theme";

const LockScreen = ({ setActive }) => {
  const [PIN, setPIN] = useState("");
  //Set PIN here...
  const _PIN = 1234;
  return (
    <>
      {/* <AppHeader title="Lock Screen" /> */}
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#fff",
            alignSelf: "center",
          }}
        >
          Lock Screen
        </Text>
        <View style={{ top: "20%" }}>
          <TextInput
            label={"Enterr PIN"}
            autoFocus={true}
            mode="outlined"
            value={PIN}
            secureTextEntry={true}
            maxLength={4}
            style={styles.input}
            onChangeText={(text) => setPIN(text)}
            keyboardType={"numeric"}
          />
          <Button
            style={[styles.btn, { width: "100%" }]}
            contentStyle={{ width: "100%" }}
            icon="check-outline"
            mode="contained"
            onPress={() => {
              if (PIN.length == 4 && PIN == _PIN) setActive(true);
              else {
                Alert.alert("Invalid PIN");
              }
              // console.log("Button3 at LivingRoomScreen");
            }}
          >
            Submit
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    height: "100%",
    padding: 20,
    paddingTop: 40,
  },
  btnContainer: {
    padding: "2%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingTop: 50,
  },
  btn: {
    marginTop: 10,
    padding: 10,
    width: "48%",
    color: colors.buttonPrimary,
    // height: 60,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  input: {
    color: "#fff",
    padding: 18,
    borderRadius: 8,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "#222",
    //   padding: 10,
    // height: 60,
  },
});
export default LockScreen;
