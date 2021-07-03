import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import AllDevices from "../components/AllDevices";
import InputField from "../components/InputField";

import { useSelector, useDispatch } from "react-redux";
import { addDeviceR } from "../redux/deviceSlice";
import { IpPattern } from "../constants/RegEx";

const DeviceScreen = () => {
  const deviceList = useSelector((state) => state.device);
  //   console.log(deviceList);
  const dispatch = useDispatch();

  const [deviceName, setDeviceName] = useState("");
  const [deviceIP, setDeviceIP] = useState("");
  //   const [cmd, setCmd] = useState("");

  const addDeviceHandler = useCallback(() => {
    const device = {
      deviceName,
      deviceIP,
      status: false,
      buttons: [],
    };
    try {
      const alreadyExists = deviceList.findIndex(
        (dev) =>
          dev.deviceName === device.deviceName &&
          dev.deviceIP === device.deviceIP
      );
      const notUniqueIP = deviceList.findIndex(
        (dev) => dev.deviceIP === device.deviceIP
      );
      const validateIP = IpPattern.test(device.deviceIP);
      console.log(notUniqueIP, validateIP, alreadyExists);
      if (alreadyExists < 0 && notUniqueIP < 0 && validateIP) {
        dispatch(addDeviceR(device));
        Alert.alert("Device has been added");
      } else throw new Error("Invalid Inputs");
    } catch (error) {
      Alert.alert(error.message);
    }
  });

  return (
    <View style={styles.container}>
      <InputField
        value={deviceName}
        placeholder="Device Name"
        setValue={setDeviceName}
      />
      <InputField
        value={deviceIP}
        placeholder="Device IP"
        setValue={setDeviceIP}
      />
      <Button
        style={styles.btn}
        icon=""
        disabled={!deviceName || !deviceIP}
        mode="contained"
        onPress={() => {
          addDeviceHandler();
          console.log("Button at DeviceSCreen");
        }}
      >
        Add Device
      </Button>
      <AllDevices />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  btn: {
    marginBottom: 10,
    padding: 10,
    // height: 60,
  },
});

export default DeviceScreen;
