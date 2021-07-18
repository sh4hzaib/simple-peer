import React, { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Alert, SafeAreaView } from "react-native";
import { Button, Checkbox } from "react-native-paper";
import InputField from "../components/InputField";
import DropDownList from "../components/DropDownList";
import RadioButtons from "../components/RadioButtons";

import rooms from "../constants/rooms";
import protocols from "../constants/protocols";
import { colors } from "../constants/theme";

import ButtonListItem from "../components/ButtonListItem";
import { useSelector, useDispatch } from "react-redux";

import {
  addButtonToDeviceR,
  removeButtonFromDeviceR,
} from "../redux/deviceSlice";

const ButtonSceen = () => {
  const deviceList = useSelector((state) => state.device);
  const dispatch = useDispatch();
  const btnList = [];
  for (let index = 0; index < deviceList.length; index++) {
    btnList.push(...deviceList[index].buttons);
  }

  const [btnName, setBtnName] = useState("");
  const [deviceName, setDeviceName] = useState(
    deviceList.length ? deviceList[0].deviceName : "No Devices available"
  );
  const [cmd, setCmd] = useState("");
  const [room, setRoom] = useState([]);
  const [protocol, setProtocol] = useState(protocols[0]);
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState("");
  const [duration, setDuration] = useState("");

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
          : {
              Command: cmd,
            },
      deviceName: deviceName,
      rooms: room,
    };
    // console.log(button);
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
                  title="Choose Mode"
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
                        placeholder="Set Message: Toggle, Open, Close"
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
                  </View>
                </View>
                <Button
                  style={styles.btn}
                  icon=""
                  disabled={!btnName || !deviceName}
                  mode="contained"
                  onPress={() => {
                    addBtnHandler();
                  }}
                >
                  Add Button
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
