import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { Button } from "react-native-paper";
import AppHeader from "../components/AppHeader";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../constants/theme";
import ButtonComponent from "../components/ButtonComponent";
import rooms from "../constants/rooms";

const BedRoomScreen = () => {
  const deviceList = useSelector((state) => state.device);
  const enabledDevices = deviceList.filter((device) => device.status);
  // console.log(enabledDevices);
  let btnList = [];
  for (let index = 0; index < enabledDevices.length; index++) {
    btnList.push(...enabledDevices[index].buttons);
  }
  for (let index = 0; index < btnList.length; index++) {
    // if(btnList[index].rooms.includes(rooms[0]))
    btnList = btnList.filter((btn) =>
      btn.rooms.find((room) => {
        return room === "Projector";
      })
    );
  }
  // console.log(btnList);

  return (
    <>
      <AppHeader title="Projector" />
      <ScrollView style={styles.container}>
        <View style={styles.btnContainer}>
          {btnList.map((button, index) => (
            // <Button
            //   icon=""
            //   mode="contained"
            //   key={index + button.buttonName}
            //   style={styles.btn}
            //   labelStyle={{ fontSize: 12 }}
            // >
            //   {button.buttonName}
            // </Button>
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
    // minWidth: 120,
    width: "32%",
    // height: 60,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
});
export default BedRoomScreen;
