import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../components/AppHeader";
import ButtonComponent from "../components/ButtonComponent";
import { colors } from "../constants/theme";
import { addDeviceR } from "../redux/deviceSlice";
import defaultSettings from "../constants/settings.json";
import {
  setIPAdressR,
  setNewsUrlR,
  setSoundModeR,
} from "../redux/settingsSlice";
import defaultDevices from "../constants/devices.json";

const ScreenRoomScreen = () => {
  const deviceList = useSelector((state) => state.device);
  const settings = useSelector((state) => state.settings);
  const enabledDevices = deviceList.filter((device) => device.status);
  const dispatch = useDispatch();
  let btnList = [];
  for (let index = 0; index < enabledDevices.length; index++) {
    btnList.push(...enabledDevices[index].buttons);
  }
  for (let index = 0; index < btnList.length; index++) {
    console.log(btnList);
    btnList = btnList.filter((btn) =>
      btn.rooms.find((room) => {
        return room === "Screen";
      })
    );
  }
  console.log(btnList);

  const initSettings = async () => {
    try {
      // let temp;
      const keys = await AsyncStorage.getAllKeys();
      const findSettings = keys.find((key) => key === "SETTINGS");
      if (findSettings) {
        const getSettings = await AsyncStorage.getItem("SETTINGS");
        const temp = await JSON.parse(getSettings);
        dispatch(setIPAdressR(temp.ipAdress));
        dispatch(setNewsUrlR(temp.newsUrl));
        dispatch(setSoundModeR(temp.soundMode));
      } else {
        const jsonValue = JSON.stringify({
          ...defaultSettings,
          soundValue: 0,
        });
        console.log("..........", jsonValue);
        await AsyncStorage.setItem("SETTINGS", jsonValue);
        console.log("Settings Set");
        const getSettings = await AsyncStorage.getItem("SETTINGS");
        const temp = await JSON.parse(getSettings);
        dispatch(setIPAdressR(temp.ipAdress));
        dispatch(setNewsUrlR(temp.newsUrl));
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  const initDevices = async () => {
    try {
      let temp;
      const keys = await AsyncStorage.getAllKeys();
      const findDevices = keys.find((key) => key === "DEVICES");
      if (findDevices) {
        const getDevices = await AsyncStorage.getItem("DEVICES");
        temp = await JSON.parse(getDevices);
        for (let index = 0; index < temp.length; index++)
          dispatch(addDeviceR(temp[index]));
        console.log(temp);
      } else {
        const jsonValue = JSON.stringify(defaultDevices);
        console.log(jsonValue);
        await AsyncStorage.setItem("DEVICES", jsonValue);
        console.log("DEvICES Set");
        const getDEVICES = await AsyncStorage.getItem("DEVICES");
        const temp = await JSON.parse(getDEVICES);
        for (let index = 0; index < temp.length; index++)
          dispatch(addDeviceR(temp[index]));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (!settings.ipAdress || !settings.newsUrl) {
      initSettings();
      console.log("Settings Init");
    } else console.log("Alreeady Settings");
    if (!deviceList.length) {
      initDevices();
      console.log("Devices Init");
    } else console.log("Alreeady Devices");
  }, []);

  return (
    <>
      <AppHeader title="Screen" />
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
    // minWidth: 120,
    width: "32%",
    // height: 60,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
});
export default ScreenRoomScreen;
