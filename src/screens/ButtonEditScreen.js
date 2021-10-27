import React, { useCallback, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Checkbox } from "react-native-paper";
// import AllDevices from "../components/AllDevices";
import InputField from "../components/InputField";

import { useSelector, useDispatch } from "react-redux";
import {
  addButtonToDeviceR,
  editDeviceR,
  removeButtonFromDeviceR,
} from "../redux/deviceSlice";
import { colors } from "../constants/theme";
import RadioButtons from "../components/RadioButtons";
import protocols from "../constants/protocols";
import DropDownList from "../components/DropDownList";
import { Text } from "react-native";
import rooms from "../constants/rooms";

const ButtonEditScreen = ({ route, navigation }) => {
  const button = route.params;
  console.log(button);
  const deviceList = useSelector((state) => state.device);
  const dispatch = useDispatch();
  const btnList = [];
  for (let index = 0; index < deviceList.length; index++) {
    btnList.push(...deviceList[index].buttons);
  }

  const [btnName, setBtnName] = useState(button.buttonName);

  const [deviceName, setDeviceName] = useState(button.deviceName);
  const [cmd, setCmd] = useState(button.buttonCommand.Command);
  const [room, setRoom] = useState(button.rooms);
  const [protocol, setProtocol] = useState(button.buttonProtocol);
  const [message, setMessage] = useState(button.buttonCommand.Message);
  const [channel, setChannel] = useState(
    button.buttonCommand.Channel
      ? button.buttonCommand.Channel.toString()
      : null
  );
  const [duration, setDuration] = useState(
    button.buttonCommand.Duration
      ? button.buttonCommand.Duration.toString()
      : null
  );
  const [taskName, setTaskName] = useState(button.buttonCommand.TaskName);
  const [variableName, setVariableName] = useState(
    button.buttonCommand.VariableName
  );
  const [value, setValue] = useState(button.buttonCommand.Value);

  //   const editDeviceHandler = useCallback(() => {
  //     const deviceBtns = [...deviceList[device.index].buttons];
  //     console.log(deviceBtns);
  //     for (const btn of deviceBtns) {
  //       btn.deviceName = deviceName;
  //     }
  //     const updtDevice = {
  //       deviceName,
  //       deviceIP,
  //       status: deviceList[device.index].status,
  //       buttons: deviceBtns,
  //     };
  //     try {
  //       dispatch(editDeviceR({ index: device.index, device: updtDevice }));
  //       //   dispatch(editDeviceR({ index: device.index, device: updtDevice }));
  //       Alert.alert("Device has been added");
  //     } catch (error) {
  //       Alert.alert(error.message);
  //     }
  //   });

  const removeButtonHandler = useCallback((deviceIndex, btnIndex) => {
    // const indexOfBtn = btnList.findIndex(
    //   (btn) => btn.buttonName === button.buttonName
    // );
    console.log("in REmove bTN");
    // const indexOfDevice = deviceList.findIndex(
    //   (dev) => dev.deviceName === button.deviceName
    // );
    console.log(deviceIndex, btnIndex);
    dispatch(
      removeButtonFromDeviceR({
        deviceIndex: deviceIndex,
        buttonIndex: btnIndex,
      })
    );
    console.log("removed");
    addBtnHandler();
  });

  const addBtnHandler = useCallback(() => {
    const button = {
      buttonName: btnName,
      buttonProtocol: protocol,

      // buttonCommand: protocol + "://" + cmd,

      buttonCommand:
        protocol == "ws"
          ? {
              Message: message,
              Command: cmd,
              Channel: parseInt(channel),
              Duration: parseInt(duration),
            }
          : protocol == "tasker"
          ? {
              Message: message,
              TaskName: taskName,
              VariableName: variableName,
              Value: value,
            }
          : {
              Command: cmd,
            },
      deviceName: deviceName,
      rooms: room,
    };
    console.log("-------------------", button);
    try {
      const deviceDoesExist = deviceList.findIndex(
        (dev) => dev.deviceName === button.deviceName
      );
      if (deviceDoesExist >= 0) {
        if (protocol == "ws" && (!message || !channel || !duration))
          throw new Error("Please fill all Input Fields");
        else if (
          protocol == "tasker" &&
          (!message || !taskName || !variableName || !value)
        )
          throw new Error("Please fill all Input Fields");
        else {
          dispatch(
            addButtonToDeviceR({ deviceIndex: deviceDoesExist, button })
          );
          Alert.alert("Button has been Updated");
          //   setBtnName("");
          //   setCmd("");
          //   setChannel("");
          //   setMessage("");
          //   setDuration("");
          //   setTaskName("");
          //   setVariableName("");
          //   setValue("");
        }
      } else if (alreadyExists >= 0) {
        throw new Error("Button with this Name and Device already exists");
      } else {
        throw new Error("Device does not exist");
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  });

  const editBtnHandler = () => {
    console.log("editing btn");
    //Find device index...
    const lastDeviceIndex = deviceList.findIndex(
      (device) => device.deviceName == button.deviceName
    );
    const newDeviceIndex = deviceList.findIndex(
      (device) => device.deviceName == deviceName
    );
    const buttonIndex = deviceList[lastDeviceIndex].buttons.findIndex(
      (btn) => btn.buttonName == button.buttonName
    );
    console.log(
      "Device & Button Index of this device is:",
      lastDeviceIndex,
      buttonIndex,
      newDeviceIndex
    );

    console.log(deviceList[lastDeviceIndex].buttons[buttonIndex]);
    console.log("IN ADD DEVICE");
    removeButtonHandler(lastDeviceIndex, buttonIndex);
    // addBtnHandler(lastDeviceIndex, buttonIndex, newDeviceIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <>
          <InputField
            value={btnName}
            placeholder="Button Name"
            setValue={setBtnName}
          />

          <DropDownList
            listItems={deviceList}
            value={deviceName}
            setValue={setDeviceName}
          />
          <Text style={{ fontSize: 17, marginTop: 10 }}>Choose Rooms</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {rooms.map((r, index) => (
              <View
                style={{ flexDirection: "row", alignItems: "center" }}
                key={r + index}
              >
                <Checkbox
                  status={room.includes(r) ? "checked" : "unchecked"}
                  color="#bd0023"
                  onPress={() => {
                    const tempRooms = [...room];
                    if (!tempRooms.includes(r)) tempRooms.push(r);
                    else {
                      const roomIndex = tempRooms.indexOf(r);
                      tempRooms.splice(roomIndex, 1);
                    }
                    setRoom([...tempRooms]);
                  }}
                />
                <Text>{r}</Text>
              </View>
            ))}
          </View>

          <RadioButtons
            title="Choose Mode -->"
            listItems={protocols}
            value={protocol}
            setValue={setProtocol}
          />

          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
              {protocol == "http" ? (
                <InputField
                  value={cmd}
                  placeholder="Command / CinemaApp Macro"
                  setValue={setCmd}
                />
              ) : null}
              {protocol == "ws" ? (
                <InputField
                  value={message}
                  placeholder="Message: Toggle, Open, Close, task.execute"
                  setValue={setMessage}
                />
              ) : null}
              {protocol == "ws" ? (
                <InputField
                  value={channel}
                  placeholder="Set Channel: 1 - 12"
                  type={"numeric"}
                  setValue={setChannel}
                />
              ) : null}
              {protocol == "ws" ? (
                <InputField
                  value={duration}
                  type={"numeric"}
                  placeholder="Set Duration: 1000 for 1sec 0 for null."
                  setValue={setDuration}
                />
              ) : null}
              {protocol == "tasker" ? (
                <InputField
                  value={message}
                  placeholder="Set message: task.execute"
                  defaultValue="task.execute"
                  setValue={setMessage}
                />
              ) : null}
              {protocol == "tasker" ? (
                <InputField
                  value={taskName}
                  placeholder="Set Task Name."
                  setValue={setTaskName}
                />
              ) : null}
              {protocol == "tasker" ? (
                <InputField
                  value={variableName}
                  placeholder="Set Variable Name."
                  setValue={setVariableName}
                />
              ) : null}
              {protocol == "tasker" ? (
                <InputField
                  value={value}
                  placeholder="Set Value."
                  setValue={setValue}
                />
              ) : null}
            </View>
          </View>
          <Button
            style={styles.btn}
            icon=""
            color="#098f45"
            disabled={!btnName || !deviceName}
            mode="contained"
            onPress={() => {
              editBtnHandler();
            }}
          >
            Edit Button
          </Button>
          <Button
            style={styles.btn}
            icon="arrow-left"
            mode="contained"
            color="#bd0023"
            onPress={() => {
              navigation.navigate("SettingsScreen");
              // console.log("Button3 at LivingRoomScreen");
            }}
          >
            Settings
          </Button>
        </>
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

export default ButtonEditScreen;
