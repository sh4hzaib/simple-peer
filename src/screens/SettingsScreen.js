import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { Button, Title } from "react-native-paper";
import AppHeader from "../components/AppHeader";
import InputField from "../components/InputField";
import RadioButtons from "../components/RadioButtons";
import { colors } from "../constants/theme";
import DeviceList from "../components/DeviceList";
import { useDispatch, useSelector } from "react-redux";
import {
  setIPAdressR,
  setNewsUrlR,
  setSoundModeR,
} from "../redux/settingsSlice";
import { IpPattern, UrlPattern } from "../constants/RegEx";
import soundModes from "../constants/soundModes";
import axios from "axios";
// import settingsData from "../constants/settings.json";

const SettingsScreen = ({ navigation }) => {
  // console.log(settingsData);
  useEffect(() => {
    isServerOnline();
  }, []);
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  // console.log(settings);
  const [IpAdress, setIpAdress] = useState(settings.ipAdress);
  const [URL, setURL] = useState(settings.newsUrl);
  const [soundMode, setSoundMode] = useState(settings.soundMode);
  const [serverStatus, setServerStatus] = useState("Offline");

  const settingsHandler = useCallback(() => {
    const validIP = IpPattern.test(IpAdress);
    const validURL = UrlPattern.test(URL);
    console.log(validIP, validURL);
    if (validIP && validURL) {
      dispatch(setIPAdressR(IpAdress));
      dispatch(setSoundModeR(soundMode));
      dispatch(setNewsUrlR(URL));
      Alert.alert("Settings have been updated");
    } else {
      Alert.alert("Invalid Inputs");
    }
  });

  const isServerOnline = () => {
    console.log("Sending Request to ip" + IpAdress);
    axios
      .get(`http://${IpAdress}`, { timeout: 5000 })
      .then((response) => {
        console.log("inREsponse");
        // console.log(response);
        if (response.status === 200) {
          console.log("success");
          setServerStatus("Online");
        } else {
          setServerStatus("Offline");
          console.log("error");
        }
      })
      .catch((error) => {
        setServerStatus("Offline");
        console.log("in Error");
        console.log("network error: " + error);
      });
  };

  return (
    <>
      <AppHeader title="Settings" />

      <ScrollView style={styles.container}>
        {/* <Text>In Living Room</Text> */}
        <View style={styles.btnContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title style={styles.title}>Server IP Address</Title>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor:
                    serverStatus === "Online"
                      ? colors.buttonUnmute
                      : colors.buttonMute,
                  width: 15,
                  marginRight: 10,
                  height: 15,
                  borderRadius: 150 / 2,
                }}
              ></View>
              <Text style={{ fontSize: 13 }}>{serverStatus}</Text>
            </View>
          </View>
          <View>
            <InputField
              value={IpAdress}
              placeholder="Set IP Adress"
              setValue={setIpAdress}
              max={15}
              type="decimal-pad"
              onBlur={isServerOnline}
            />
          </View>
          <Title>Set IMB IP</Title>
          <InputField
            value={URL}
            placeholder="Set News URL"
            setValue={setURL}
          />
          <RadioButtons
            title="Choose Mode"
            listItems={soundModes}
            value={soundMode}
            setValue={setSoundMode}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button
              style={styles.btn}
              icon=""
              mode="contained"
              onPress={() => {
                navigation.navigate("ButtonSceen");
                console.log("Button2 at LivingRoomScreen");
              }}
            >
              Edit Buttons
            </Button>
            <Button
              style={styles.btn}
              icon=""
              mode="contained"
              onPress={() => {
                navigation.navigate("DeviceScreen");
                console.log("Button3 at LivingRoomScreen");
              }}
            >
              Edit Devices
            </Button>
          </View>
          <Button
            style={[styles.btn, { width: "100%" }]}
            icon="content-save"
            mode="contained"
            onPress={settingsHandler}
            disabled={!IpAdress || !URL}
          >
            Save Settings
          </Button>
        </View>
        <DeviceList />
        {/* <SettingsSection /> */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgSettingsColor,
    height: "100%",
  },
  btnContainer: {
    padding: 20,
    paddingTop: 50,
  },
  btn: {
    marginBottom: 10,
    padding: 10,
    width: "48%",
    color: colors.buttonPrimary,
    // height: 60,
  },
});
export default SettingsScreen;
