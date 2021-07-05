import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../components/AppHeader";
import AdjustSoundSlider from "../components/AdjustSoundSlider";
import ButtonComponent from "../components/ButtonComponent";
import { colors } from "../constants/theme";
import { addDeviceR } from "../redux/deviceSlice";
import {
  setIPAdressR,
  setNewsUrlR,
  setSoundModeR,
} from "../redux/settingsSlice";
// import { CircularSlider } from "react-native-elements-universe";

const LivingRoomScreen = () => {
  const [soundValue, setSoundValue] = useState(0);

  const deviceList = useSelector((state) => state.device);
  const settings = useSelector((state) => state.settings);
  const enabledDevices = deviceList.filter((device) => device.status);
  // console.log(enabledDevices);
  const dispatch = useDispatch();
  let btnList = [];
  for (let index = 0; index < enabledDevices.length; index++) {
    btnList.push(...enabledDevices[index].buttons);
  }
  for (let index = 0; index < btnList.length; index++) {
    // if(btnList[index].rooms.includes(rooms[0]))
    btnList = btnList.filter((btn) =>
      btn.rooms.find((room) => {
        return room === "Sound";
      })
    );
  }
  // console.log(btnList);

  const initSettings = async () => {
    try {
      let temp;
      const keys = await AsyncStorage.getAllKeys();
      const findSettings = keys.find((key) => key === "SETTINGS");
      if (findSettings) {
        const getSettings = await AsyncStorage.getItem("SETTINGS");
        temp = await JSON.parse(getSettings);
        dispatch(setIPAdressR(temp.ipAdress));
        dispatch(setNewsUrlR(temp.newsUrl));
        dispatch(setSoundModeR(temp.soundMode));
      } else {
        const jsonValue = JSON.stringify({
          ipAdress: "000.000.000.000",
          newsUrl: "www.google.com",
          soundMode: "Dolby",
        });
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
      } else {
        // const device = {
        //   deviceName,
        //   deviceIP,
        //   status: false,
        //   buttons: [],
        // };
        const jsonValue = JSON.stringify([]);
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
      <AppHeader title="Sound" />
      <Text style={styles.text}>Presets:</Text>
      {/* <View> */}
      {/* <CircularSlider value={value} onChange={setValue} /> */}
      {/* </View> */}
      <ScrollView style={styles.container}>
        <View>
          <AdjustSoundSlider value={soundValue} setValue={setSoundValue} />
        </View>
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
      <View style={styles.muteContainer}>
        <Button
          style={styles.btnMute}
          icon=""
          mode="contained"
          color={colors.buttonMute}
          onPress={() => {
            console.log(`Mute`);
          }}
          labelStyle={{ fontSize: 12 }}
        >
          Mute
        </Button>
        <Button
          style={styles.btnMute}
          icon=""
          mode="contained"
          color={colors.buttonUnmute}
          onPress={() => {
            console.log(`UnMute`);
          }}
          labelStyle={{ fontSize: 12 }}
        >
          Unmute
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    height: "90%",
  },
  muteContainer: {
    backgroundColor: colors.bgColor,
    height: "10%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-evenly",
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
  btnMute: {
    marginBottom: 15,
    padding: 5,
    // minWidth: 120,
    width: "32%",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    // height: 60,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    backgroundColor: colors.bgColor,
    color: "#fff",
  },
});
export default LivingRoomScreen;
