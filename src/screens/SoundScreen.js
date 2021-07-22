import React, { useState } from "react";
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
import wsMute from "../components/CpMute";

const LivingRoomScreen = () => {
  const [soundValue, setSoundValue] = useState(0);
  const settings = useSelector((state) => state.settings);
  console.log(settings.ipAdress);

  const serverIp = settings.ipAdress;
  const SoundMode = settings.soundMode;

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
        return room === "Sound";
      })
    );
  }

  return (
    <>
      <AppHeader title="Sound" />
      <View style={{ height: 300, backgroundColor: colors.bgColor }}>
        <AdjustSoundSlider value={soundValue} setValue={setSoundValue} style={{ transform: [{ scaleX: 10 }, { scaleY: 10 }] }} />
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Presets:</Text>
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

      <ScrollView style={styles.container}>
        <View style={styles.btnContainer}>
          <Button
            style={styles.btnMute}
            icon=""
            contentStyle={{width: '100%'}}
            mode="contained"
            color={colors.buttonMute}
            onPress={() => {
              // console.log(`Mute`);
              wsMute(serverIp, SoundMode, 1);
            }}
            labelStyle={{ fontSize: 20, fontWeight: "bold" }}
          >
            Mute
          </Button>
          <Button
            style={styles.btnMute}
            icon=""
            contentStyle={{width: '100%'}}
            mode="contained"
            color={colors.buttonUnmute}
            onPress={() => {
              // console.log(`UnMute`);
              wsMute(serverIp, SoundMode, 0);
            }}
            labelStyle={{ fontSize: 20}}
          >
            Unmute
          </Button>
        </View>
      </ScrollView>
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
    // minWidth: 120,
    width: "32%",
    fontWeight: "bold",
    justifyContent: "center",fontWeight: "bold",  padding: 20,
    borderRadius: 5, 
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
    padding: 10,
  },
});
export default LivingRoomScreen;
