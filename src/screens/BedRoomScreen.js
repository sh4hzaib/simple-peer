import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppHeader from "../components/AppHeader";
import { useSelector } from "react-redux";
import { colors } from "../constants/theme";
import ButtonComponent from "../components/ButtonComponent";

const BedRoomScreen = () => {
  const deviceList = useSelector((state) => state.device);
  const enabledDevices = deviceList.filter((device) => device.status);
  let btnList = [];
  for (let index = 0; index < enabledDevices.length; index++) {
    btnList.push(...enabledDevices[index].buttons);
  }
  for (let index = 0; index < btnList.length; index++) {
    btnList = btnList.filter((btn) =>
      btn.rooms.find((room) => {
        return room === "Projector";
      })
    );
  }

  return (
    <>
      <AppHeader title="Projector" />
      <ScrollView style={styles.container}>
        <View style={styles.btnContainer}>
          {btnList.map((button, index) => (
            <ButtonComponent
              key={index + button.buttonName}
              style={styles.btn}
              button={button}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    height: "100%",
  },
  btnContainer: {
    padding: "2%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingTop: 50,
  },
  btn: {
    marginBottom: 15,
    padding: 5,
    width: "32%",
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
});
export default BedRoomScreen;
