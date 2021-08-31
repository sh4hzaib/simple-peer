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
  setPinR,
  setSoundModeR,
} from "../redux/settingsSlice";
import { IpPattern } from "../constants/RegEx";
import soundModes from "../constants/soundModes";
import axios from "axios";
import { FlatList } from "react-native";
import rebootJniorWs from "../components/RebootAutomation";
import ChangeDeviceStatus from "../components/ChangeDeviceStatus";
import { TouchableOpacity } from "react-native";
import { addDevicesR } from "../redux/deviceSlice";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Modal } from "react-native";
import { Touchable } from "react-native";

const SettingsScreen = ({ navigation }) => {
  useEffect(() => {
    isServerOnline();
  }, []);
  const pinR = useSelector((state) => state.settings.pin);
  const [pin, setPin] = useState(pinR);
  const [pinModal, setPinModal] = useState(false);
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={pinModal}
        onRequestClose={() => {
          setPinModal(!pinModal);
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
            opacity: 0.9,
          }}
        >
          <View
            style={{
              width: "60%",
              padding: 40,
              minWidth: 300,
              backgroundColor: "#fff",
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", right: 0 }}
              onPress={() => {
                setPinModal(false);
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "red",
                }}
              >
                <MaterialCommunityIcons name="close" color={"#fff"} size={20} />
              </View>
            </TouchableOpacity>
            <InputField
              value={pin}
              placeholder="Change PIN"
              setValue={setPin}
              max={4}
              type="numeric"
            />
            <Button
              style={[styles.btn, { width: "100%" }]}
              contentStyle={{ width: "100%" }}
              icon=""
              mode="contained"
              disabled={pin.length < 4}
              onPress={() => {
                dispatch(setPinR(pin));
                Alert.alert(
                  "PIN has been changed",
                  `PIN has been changed to ${pin}`,
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        setPinModal(false);
                      },
                    },
                  ]
                );
              }}
            >
              Change PIN
            </Button>
          </View>
        </View>
      </Modal>
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
                  title="Choose SP ->"
                  listItems={soundModes}
                  value={soundMode}
                  setValue={setSoundMode}
                />
                <Button
                  style={[styles.btn, { width: "100%" }]}
                  contentStyle={{ width: "100%" }}
                  icon=""
                  mode="contained"
                  onPress={() => {
                    setPinModal(true);
                  }}
                >
                  Change PIN
                </Button>
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

                <Button
                  style={[styles.btn, { width: "100%" }]}
                  contentStyle={{ width: "100%" }}
                  icon="content-save"
                  mode="contained"
                  color="#bd0023"
                  onPress={() => {
                    navigation.navigate("WebViewTaskerScreen");
                  }}
                  disabled={!IpAdress || !URL}
                >
                  Start Tasker
                </Button>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                <Button
                  style={styles.btn}
                  icon="brightness-5"
                  mode="contained"
                  color="#bd0023"
                  onPress={() => {
                    navigation.navigate("BrightnessScreen");
                  }}
                  disabled={!IpAdress || !URL}
                >
                  Enable Brightness
                </Button>
                <Button
                  style={styles.btn}
                  contentStyle={{ width: "100%" }}
                  icon="reload"
                  mode="contained"
                  onPress={() => {
                    navigation.navigate("QueryScreen");
                  }}
                >
                  Query Page
                </Button>
                </View>
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
                        // console.log();
                        const fetchedButtons =
                          response.data.workspaces[0].tasks;
                        const fetchedDevices =
                          response.data.workspaces[0].devices;

                        const btns = fetchedButtons.map((btn) => {
                          return {
                            buttonName: btn.name,
                            deviceName: btn.devicesReferenced.length
                              ? btn.devicesReferenced[0].name
                              : "",
                            buttonType: btn.devicesReferenced.length
                              ? btn.devicesReferenced[0].type
                              : "",
                            buttonProtocol: btn.devicesReferenced.length
                              ? btn.devicesReferenced[0].type
                              : "",
                            rooms: [],
                            buttonCommand: {
                              Message: btn.devicesReferenced.length
                                ? btn.devicesReferenced[0].message
                                : "",
                              Channel: btn.devicesReferenced.length
                                ? btn.devicesReferenced[0].channel
                                : "",
                              Duration: btn.devicesReferenced.length
                                ? btn.devicesReferenced[0].duration
                                : "",
                              Command: btn.devicesReferenced.length
                                ? btn.devicesReferenced[0].command
                                : "",
                            },
                          };
                        });

                        const devices = fetchedDevices.map((device) => {
                          return {
                            deviceIP: device.ipAddress,
                            deviceName: device.name,
                            port: device.port,
                            status: true,
                            buttons: [],
                          };
                        });

                        const devicesWithButtonsAdded = devices.map((dev) => {
                          return {
                            ...dev,
                            buttons: btns.filter(
                              (b) => b.deviceName == dev.deviceName
                            ),
                          };
                        });

                        console.log(devicesWithButtonsAdded);
                        dispatch(addDevicesR(devicesWithButtonsAdded));
                      })
                      .catch((err) => {
                        Alert.alert(err.message);
                      });
                  }}
                >
                  <MaterialCommunityIcons
                    name="reload"
                    color={colors.buttonPrimary}
                    size={32}
                  />
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
