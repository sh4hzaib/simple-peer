import React, { useCallback, useEffect, useState } from "react";
import { Restart } from "fiction-expo-restart";
import { View, Text, SafeAreaView, StyleSheet, Alert } from "react-native";
import { Button, Title } from "react-native-paper";
import AppHeader from "../components/AppHeader";
import InputField from "../components/InputField";
import RadioButtons from "../components/RadioButtons";
import { colors } from "../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import {
  setIPAdressR,
  setNewsUrlR,
  setSoundModeR,
} from "../redux/settingsSlice";
import { IpPattern, UrlPattern } from "../constants/RegEx";
import soundModes from "../constants/soundModes";
import axios from "axios";
import { FlatList } from "react-native";
import rebootJniorWs from "../components/RebootAutomation";
import ChangeDeviceStatus from "../components/ChangeDeviceStatus";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";

///////////////////////////////////
//
//
//
//
///////////////////////////////////

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
  const deviceList = useSelector((state) => state.device);

  const [soundMode, setSoundMode] = useState(settings.soundMode);
  const [serverStatus, setServerStatus] = useState("Offline");

  const settingsHandler = useCallback(() => {
    const validIP = IpPattern.test(IpAdress);
    const validURL = IpPattern.test(URL);
    // console.log(validIP, validURL);
    if (validIP) {
      dispatch(setIPAdressR(IpAdress));
      dispatch(setSoundModeR(soundMode));
      dispatch(setNewsUrlR(URL));
      Alert.alert("Settings have been updated");
    } else {
      Alert.alert("Invalid Inputs");
    }
  });

  const renderItem = useCallback(({ item }) => {
    return (
      <ChangeDeviceStatus
        device={item.deviceName}
        IP={item.deviceIP}
        status={item.status}
      />
    );
  });

  const isServerOnline = () => {
    console.log("Sending Request to ip " + IpAdress);
    axios
      .get(`http://${IpAdress}:8080/getstatus`, { timeout: 5000 })
      .then((response) => {
        console.log("inREsponse");
        console.log(response.status);
        if (response.status === 200) {
          console.log("success");
          setServerStatus("Online");
        } else {
          setServerStatus("Offline");
          console.log("error");
        }
      })
      .catch((error) => {
        console.log("network error: " + error);
        setServerStatus("Offline");
        console.log("in Error");
      });
  };

  return (
    <SafeAreaView>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <AppHeader title="Settings" />

              <View style={styles.btnContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Title>Server IP Address</Title>
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
                  placeholder="Set Mediablock Ip"
                  setValue={setURL}
                />
                <RadioButtons
                  title="Choose Sound Processor Mode -->"
                  listItems={soundModes}
                  value={soundMode}
                  setValue={setSoundMode}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    style={styles.btn}
                    contentStyle={{ width: "100%" }}
                    icon=""
                    mode="contained"
                    onPress={() => {
                      navigation.navigate("ButtonSceen");
                      // console.log("Button2 at LivingRoomScreen");
                    }}
                  >
                    Edit Buttons
                  </Button>
                  <Button
                    style={styles.btn}
                    contentStyle={{ width: "100%" }}
                    icon=""
                    mode="contained"
                    onPress={() => {
                      navigation.navigate("DeviceScreen");
                      // console.log("Button3 at LivingRoomScreen");
                    }}
                  >
                    Edit Devices
                  </Button>
                </View>
                <Button
                  style={[styles.btn, { width: "100%" }]}
                  contentStyle={{ width: "100%" }}
                  icon="content-save"
                  mode="contained"
                  onPress={settingsHandler}
                  disabled={!IpAdress || !URL}
                >
                  Save Settings
                </Button>
              </View>
              <View style={styles.btnContainerDangerZone}>
                <Text style={styles.titleDanger}>Danger Zone:</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    style={styles.btnDanger}
                    icon="power"
                    contentStyle={{ width: "100%" }}
                    mode="contained"
                    color="#bd0023"
                    onPress={() => {
                      Alert.alert(
                        "Restart Application",
                        `This will restart the Application running on this screen.\n\nThis may take 1 minute`,
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          { text: "OK", onPress: () => Restart() },
                        ],
                        { cancelable: false }
                      );
                      console.log("Rebooting App");
                    }}
                  >
                    Restart App
                  </Button>
                  <Button
                    style={styles.btn}
                    icon="power"
                    contentStyle={{ width: "100%" }}
                    mode="contained"
                    color="#bd0023"
                    onPress={() => {
                      console.log("Rebooting Server");
                      Alert.alert(
                        "Rebooting Server",
                        `A message will been sent to the Automation at: ${IpAdress} for Reboot.\n\nThis may take up to 3 minutes.`,
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: () => rebootJniorWs(IpAdress),
                          },
                        ],
                        { cancelable: false }
                      );
                    }}
                  >
                    Restart Server
                  </Button>
                </View>
                {/* <Button style={styles.button} onPress={() => {}}>
                  TCP
                </Button> */}
                <Button
                  style={[styles.btn, { width: "100%" }]}
                  contentStyle={{ width: "100%" }}
                  icon="content-save"
                  mode="contained"
                  color="#bd0023"
                  onPress={() => {
                    navigation.navigate("WebViewTaskerScreen");
                    // console.log("Button3 at LivingRoomScreen");
                  }}
                  disabled={!IpAdress || !URL}
                >
                  Start Tasker
                </Button>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 20,
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.title}>Devices:</Text>
                <TouchableOpacity
                  onPress={() => {
                    console.log("Fetching Devices");
                    axios
                      .get(`http://meldre.tplinkdns.com:8090/getTaskDevices`)
                      .then((response) => {
                        console.log(response.data);
                      });
                  }}
                >
                  <Text>Fetch Devices</Text>
                </TouchableOpacity>
              </View>
            </>
          }
          data={deviceList}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item.deviceName + index + item.deviceIP
          }
        />
      </View>
    </SafeAreaView>
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
  btnContainerDangerZone: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  titleDanger: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 10,
    marginBottom: 10,
    alignContent: "flex-start",
  },
  btn: {
    marginBottom: 10,
    padding: 10,
    width: "48%",
    color: colors.buttonPrimary,
    // height: 60,
  },
  btnDanger: {
    marginBottom: 10,
    padding: 10,
    width: "48%",
    color: colors.buttonDanger,
    // height: 60,
  },
});
export default SettingsScreen;
