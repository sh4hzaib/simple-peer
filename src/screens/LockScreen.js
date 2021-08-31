import React, { useEffect } from "react";
import { useState } from "react";
import { Alert } from "react-native";
import { Text, Image } from "react-native";
import { View, StyleSheet, TextInput, BackHandler } from "react-native";
import { Button } from "react-native-paper";
import * as Brightness from 'expo-brightness';
import { useSelector } from "react-redux";
import { colors } from "../constants/theme";
import ico from "../../assets/ico.png";

// icon={require("../../assets/ico.png")}

const LockScreen = ({ setActive }) => {
  useEffect(() => {
    
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    

    return () => backHandler.remove();
  }, []);

  const [PIN, setPIN] = useState("");
  //Set PIN here...
  // const _PIN = 1234;
  const _PIN = useSelector((state) => state.settings.pin);
  console.log("PIN", _PIN);
  Brightness.setSystemBrightnessAsync(0.0);
  return (
    <>
      <View style={styles.container}>
        <Image
          source={ico}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "#fff",
            alignSelf: "center",
            paddingTop: 60,
          }}
        >
          Locked
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
              if (PIN.length == 4 && PIN == _PIN) setActive(true), Brightness.setSystemBrightnessAsync(0.5);
              else {
                Alert.alert("Invalid PIN", "Please Enter Correct PIN", [
                  {
                    text: "OK",
                    onPress: () => {
                      setPIN("");
                    },
                    style: "cancel",
                  },
                ]);
              }
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
