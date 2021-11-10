import React, { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Alert, SafeAreaView } from "react-native";
import { Button, Checkbox } from "react-native-paper";
import InputField from "../components/InputField";
import DropDownList from "../components/DropDownList";
import RadioButtons from "../components/RadioButtons";
import { Picker } from "@react-native-picker/picker";

import rooms from "../constants/rooms";
import protocols from "../constants/protocols";
import { colors } from "../constants/theme";
import DropDownPicker from "react-native-dropdown-picker";
import ButtonListItem from "../components/ButtonListItem";
import { useSelector, useDispatch } from "react-redux";
import { Appbar } from "react-native-paper";

import {
  addButtonToDeviceR,
  removeButtonFromDeviceR,
} from "../redux/deviceSlice";

const ButtonSceen = ({ navigation }) => {
  const deviceList = useSelector((state) => state.device);
  const dispatch = useDispatch();
  const btnList = [];
  for (let index = 0; index < deviceList.length; index++) {
    btnList.push(...deviceList[index].buttons);
  }

  const [btnName, setBtnName] = useState("");
  const [sc_location, setSc_location] = useState(["one","two"])
  const [deviceName, setDeviceName] = useState(
    deviceList.length ? deviceList[0].deviceName : "No Devices available"
  );
  const [cmd, setCmd] = useState("");
  const [room, setRoom] = useState([]);
  const [protocol, setProtocol] = useState(protocols[0]);
  const [message, setMessage] = useState("task.execute");
  const [channel, setChannel] = useState("");
  const [duration, setDuration] = useState("");
  const [taskName, setTaskName] = useState("");
  const [variableName, setVariableName] = useState("0");
  const [value, setValue] = useState("0");
  const [selectedValue, setSelectedValue] = useState("java");

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
      screen:0
    };
    console.log("-------------------", button);
    try {
      const alreadyExists = btnList.findIndex(
        (btn) =>
          btn.buttonName === button.buttonName &&
          btn.deviceName === button.deviceName
      );
      const deviceDoesExist = deviceList.findIndex(
        (dev) => dev.deviceName === button.deviceName
      );
      if (alreadyExists < 0 && deviceDoesExist >= 0) {
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
          Alert.alert("Button has been Added");
          setBtnName("");
          setCmd("");
          setChannel("");
          setMessage("");
          setDuration("");
          setTaskName("");
          setVariableName("");
          setValue("");
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

  const removeButtonHandler = useCallback((button) => {
    const indexOfBtn = btnList.findIndex(
      (btn) => btn.buttonName === button.buttonName
    );
    const indexOfDevice = deviceList.findIndex(
      (dev) => dev.deviceName === button.deviceName
    );
    dispatch(
      removeButtonFromDeviceR({
        deviceIndex: indexOfDevice,
        buttonIndex: indexOfBtn,
      })
    );
  });

  const renderItem = useCallback(({ item }) => {
    return (
      <ButtonListItem
        name={item.buttonName}
        command={item.buttonCommand}
        device={item.deviceName}
        button={item}
        onBtnClick={() => {
          removeButtonHandler(item);
        }}
      />
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
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
                <Text style={{ fontSize: 17, marginTop: 10 }}>
                  Choose Rooms
                </Text>
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
                {
                  room.includes("Screen")?<View>
                 <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                </Picker>

                  </View>:
                  <View>

                  </View>
                }
              
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
                    addBtnHandler();
                  }}
                >
                  Add Button
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
                <Text style={styles.title}>Buttons:</Text>
              </>
            }
            data={btnList}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
              item.deviceName + index + item.buttonName
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    minHeight: "100%",
  },
  btn: {
    marginBottom: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 10,
  },
});

export default ButtonSceen;
