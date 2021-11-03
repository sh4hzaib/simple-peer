import React, { useCallback, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Checkbox } from "react-native-paper";
// import AllDevices from "../components/AllDevices";
import InputField from "../components/InputField";
import { Picker } from "@react-native-picker/picker";
import Setting from "../constants/settings.json";
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
  const [Task, setTask2] = useState(Setting.Setmessage);
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
          : protocol == "Toggle"
          ? {
              Message: message,
              // TaskName: taskName,
              // VariableName: variableName,
              // Value: value,
              Channel: parseInt(channel),
              Duration: parseInt(duration),
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
          <View style={{ height: "15%", width: "85%" }}>
            <RadioButtons
              title="Choose Mode -->"
              listItems={protocols}
              value={protocol}
              setValue={setProtocol}
            />
          </View>

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
                // <InputField
                //   value={message}
                //   placeholder="Message: Toggle, Open, Close, task.execute"
                //   setValue={setMessage}
                // />
                <View style={{ borderWidth: 1 }}>
                  <Picker
                    style={{
                      height: 50,
                      width: "100%",
                    }}
                    selectedValue={message}
                    onValueChange={(itemValue, itemIndex) =>
                      setMessage(itemValue)
                    }
                  >
                    <Picker.Item label="Toggel" value="Toggel" />
                    <Picker.Item label="Open" value="Open" />
                    <Picker.Item label="Close" value="Close" />
                    <Picker.item label="Pluse" value="Pluse" />
                  </Picker>
                </View>
              ) : null}
              {protocol == "ws" ? (
                // <InputField
                //   value={channel}
                //   placeholder="Set Channel: 1 - 12"
                //   type={"numeric"}
                //   setValue={setChannel}
                // />
                <View
                  style={{
                    borderWidth: 1,
                    alignItems: "center",
                    top: 2,
                  }}
                >
                  <Picker
                    style={{
                      height: 50,
                      // top: 10,
                      width: "100%",
                      textAlign: "center",
                    }}
                    selectedValue={channel}
                    onValueChange={(itemValue, itemIndex) =>
                      // setMessage(itemValue)
                      setChannel(itemValue)
                    }
                  >
                    <Picker.Item label="1-24" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.item label="4" value="4" />
                    <Picker.item label="5" value="5" />
                    <Picker.item label="6" value="6" />
                    <Picker.item label="7" value="7" />
                    <Picker.item label="8" value="8" />
                    <Picker.item label="9" value="9" />
                    <Picker.item label="10" value="10" />
                    <Picker.item label="11" value="11" />
                    <Picker.item label="12" value="12" />
                    <Picker.item label="13" value="13" />
                    <Picker.item label="14" value="14" />
                    <Picker.item label="15" value="15" />
                    <Picker.item label="16" value="16" />
                    <Picker.item label="17" value="17" />
                    <Picker.item label="18" value="18" />
                    <Picker.item label="19" value="19" />
                    <Picker.item label="20" value="20" />
                    <Picker.item label="21" value="21" />
                    <Picker.item label="22" value="22" />
                    <Picker.item label="23" value="23" />
                    <Picker.item label="24" value="24" />
                  </Picker>
                </View>
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
                // <InputField
                //   value={message}
                //   placeholder="Set message: task.execute"
                //   defaultValue="task.execute"
                //   setValue={setMessage}
                // />
                <View style={{ borderWidth: 1 }}>
                  <Picker
                    style={{
                      height: 50,
                      width: "100%",
                    }}
                    selectedValue={message}
                    onValueChange={(itemValue, itemIndex) =>
                      setMessage(itemValue)
                    }
                  >
                    {Object.keys(Task).map((key) => {
                      return (
                        <Picker.Item label={Task[key]} value={Task[key]} />
                      );
                    })}
                  </Picker>
                </View>
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
              {protocol == "Toggle" ? (
                // <InputField
                //   value={message}
                //   placeholder="Message: Toggle, Open, Close, task.execute"
                //   setValue={setMessage}
                // />
                <View style={{ borderWidth: 1 }}>
                  <Picker
                    style={{
                      height: 50,
                      width: "100%",
                    }}
                    selectedValue={message}
                    onValueChange={(itemValue, itemIndex) =>
                      setMessage(itemValue)
                    }
                  >
                    <Picker.Item label="Toggel" value="Toggel" />
                    <Picker.Item label="Open" value="Open" />
                    <Picker.Item label="Close" value="Close" />
                    <Picker.item label="Pluse" value="Pluse" />
                  </Picker>
                </View>
              ) : null}
              {protocol == "Toggle" ? (
                // <InputField
                //   value={channel}
                //   placeholder="Set Channel: 1 - 12"
                //   type={"numeric"}
                //   setValue={setChannel}
                // />
                <View
                  style={{
                    borderWidth: 1,
                    alignItems: "center",
                    top: 2,
                  }}
                >
                  <Picker
                    style={{
                      height: 50,
                      // top: 10,
                      width: "100%",
                      textAlign: "center",
                    }}
                    selectedValue={channel}
                    onValueChange={(itemValue, itemIndex) =>
                      // setMessage(itemValue)
                      setChannel(itemValue)
                    }
                  >
                    <Picker.Item label="1-24" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.item label="4" value="4" />
                    <Picker.item label="5" value="5" />
                    <Picker.item label="6" value="6" />
                    <Picker.item label="7" value="7" />
                    <Picker.item label="8" value="8" />
                    <Picker.item label="9" value="9" />
                    <Picker.item label="10" value="10" />
                    <Picker.item label="11" value="11" />
                    <Picker.item label="12" value="12" />
                    <Picker.item label="13" value="13" />
                    <Picker.item label="14" value="14" />
                    <Picker.item label="15" value="15" />
                    <Picker.item label="16" value="16" />
                    <Picker.item label="17" value="17" />
                    <Picker.item label="18" value="18" />
                    <Picker.item label="19" value="19" />
                    <Picker.item label="20" value="20" />
                    <Picker.item label="21" value="21" />
                    <Picker.item label="22" value="22" />
                    <Picker.item label="23" value="23" />
                    <Picker.item label="24" value="24" />
                  </Picker>
                </View>
              ) : null}
              {protocol == "Toggle" ? (
                <InputField
                  value={duration}
                  type={"numeric"}
                  placeholder="Set Duration: 1000 for 1sec 0 for null."
                  setValue={setDuration}
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
