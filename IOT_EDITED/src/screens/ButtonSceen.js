import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import AllBtn from "../components/AllBtn";
import InputField from "../components/InputField";
import { BUTTONS, DEVICES } from "../constants/devices";

import { useSelector, useDispatch } from "react-redux";
import { addButtonToDeviceR } from "../redux/deviceSlice";

const ButtonSceen = () => {
  const deviceList = useSelector((state) => state.device);
  console.log(deviceList);
  const dispatch = useDispatch();
  const btnList = [];
  for (let index = 0; index < deviceList.length; index++) {
    btnList.push(...deviceList[index].buttons);
  }
  console.log(btnList);

  const [btnName, setBtnName] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [cmd, setCmd] = useState("");

  const addBtnHandler = useCallback(() => {
    const button = {
      buttonName: btnName,
      buttonCommand: cmd,
      deviceName: deviceName,
    };

    try {
      const alreadyExists = btnList.findIndex(
        (btn) =>
          btn.buttonName === button.buttonName &&
          btn.deviceName === button.deviceName
      );
      const deviceDoesExist = deviceList.findIndex(
        (dev) => dev.deviceName === button.deviceName
      );
      console.log(deviceDoesExist);
      if (alreadyExists < 0 && deviceDoesExist >= 0) {
        dispatch(addButtonToDeviceR({ deviceIndex: deviceDoesExist, button }));
        Alert.alert("Button has been Added");
      } else if (alreadyExists >= 0) {
        throw new Error("Button with this Name and Device already exists");
      } else {
        throw new Error("Device does not exist");
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  });

  return (
    <View style={styles.container}>
      <InputField
        value={btnName}
        placeholder="Button Name"
        setValue={setBtnName}
      />
      <InputField
        value={deviceName}
        placeholder="Device Name"
        setValue={setDeviceName}
      />
      <InputField value={cmd} placeholder="Command" setValue={setCmd} />
      <Button
        style={styles.btn}
        icon=""
        disabled={!btnName || !cmd || !deviceName}
        mode="contained"
        onPress={() => {
          addBtnHandler();
          console.log("Button3 at BedRoomScreen");
        }}
      >
        Add Button
      </Button>
      <AllBtn />
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
  },
});

export default ButtonSceen;
