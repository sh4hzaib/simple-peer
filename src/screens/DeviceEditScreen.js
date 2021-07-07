import React, { useCallback, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
// import AllDevices from "../components/AllDevices";
import InputField from "../components/InputField";

import { useSelector, useDispatch } from "react-redux";
import { editDeviceR } from "../redux/deviceSlice";
import { colors } from "../constants/theme";

const DeviceEditScreen = ({ route }) => {
  const device = route.params;
  console.log(device);
  const deviceList = useSelector((state) => state.device);
  console.log(deviceList[device.index]);
  const dispatch = useDispatch();

  const [deviceName, setDeviceName] = useState(device.name);
  const [deviceIP, setDeviceIP] = useState(device.IP);

  const editDeviceHandler = useCallback(() => {
    const deviceBtns = [...deviceList[device.index].buttons];
    console.log(deviceBtns);
    for (const btn of deviceBtns) {
      btn.deviceName = deviceName;
    }
    const updtDevice = {
      deviceName,
      deviceIP,
      status: deviceList[device.index].status,
      buttons: deviceBtns,
    };
    try {
      dispatch(editDeviceR({ index: device.index, device: updtDevice }));
      //   dispatch(editDeviceR({ index: device.index, device: updtDevice }));
      Alert.alert("Device has been added");
    } catch (error) {
      Alert.alert(error.message);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
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
            editDeviceHandler();
          }}
        >
          Edit Device
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 10,
  },
  btn: {
    marginBottom: 10,
    padding: 10,
    // height: 60,
  },
});

export default DeviceEditScreen;
