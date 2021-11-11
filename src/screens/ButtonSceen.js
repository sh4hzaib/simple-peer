import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import { Alert, SafeAreaView } from "react-native";
import { Button, Checkbox } from "react-native-paper";
import InputField from "../components/InputField";
import DropDownList from "../components/DropDownList";
import RadioButtons from "../components/RadioButtons";
// import { Settings } from "react-native";
import Setting from "../constants/settings.json";
import rooms from "../constants/rooms";
import protocols from "../constants/protocols";
import ToggleDroplist from "../constants/ToggleDroplist";
import { colors } from "../constants/theme";
import DropDownPicker from "react-native-dropdown-picker";
import ButtonListItem from "../components/ButtonListItem";
import { useSelector, useDispatch } from "react-redux";
import { Appbar } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import {
  addButtonToDeviceR,
  removeButtonFromDeviceR,
} from "../redux/deviceSlice";
import { set } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";

const ButtonSceen = ({ navigation }) => {
  const deviceList = useSelector(state => state.device);
  const dispatch = useDispatch();
  const btnList = [];
  for (let index = 0; index < deviceList.length; index++) {
    btnList.push(...deviceList[index].buttons);
  }

  const [btnName, setBtnName] = useState("");
  const [deviceName, setDeviceName] = useState(
    deviceList.length ? deviceList[0].deviceName : "No Devices available"
  );
  const ScreenData = ["Light", "Controls", "Mic 1", "Mic 2"];
  const [screenitem, setscreenitem] = useState();
  const [cmd, setCmd] = useState("");
  const [room, setRoom] = useState([]);
  const [protocol, setProtocol] = useState(protocols[0]);
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState(0);
  const [duration, setDuration] = useState("");
  const [taskName, setTaskName] = useState("");
  const [variableName, setVariableName] = useState("0");
  const [value, setValue] = useState("0");
  const [Task, setTask] = useState(Setting.Setmessage);
  const [modalVisible, setModalVisible] = useState(false);

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
      const alreadyExists = btnList.findIndex(
        btn =>
          btn.buttonName === button.buttonName &&
          btn.deviceName === button.deviceName
      );
      const deviceDoesExist = deviceList.findIndex(
        dev => dev.deviceName === button.deviceName
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

  const removeButtonHandler = useCallback(button => {
    const indexOfBtn = btnList.findIndex(
      btn => btn.buttonName === button.buttonName
    );
    const indexOfDevice = deviceList.findIndex(
      dev => dev.deviceName === button.deviceName
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

                          if (!tempRooms.includes(r)) {
                            if (r == "Screen") {
                              setModalVisible(!tempRooms.includes(r));
                            }
                            tempRooms.push(r);
                          } else {
                            // setModalVisible(false);
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

                {modalVisible ? (
                  <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                  >
                    <View
                      style={{
                        // top: "40%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          borderWidth: 2,
                          top: 20,
                          width: 300,
                          height: 50,
                          justifyContent: "center",
                          backgroundColor: "#bd0023",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: 20,
                          }}
                        >
                          Screen Pannels
                        </Text>
                      </View>
                      <FlatList
                        data={ScreenData}
                        renderItem={({ item, index }) => (
                          <Pressable onPress={() => setscreenitem(index)}>
                            <View
                              style={{
                                borderWidth: 2,
                                marginBottom: 10,
                                width: 300,
                                height: 50,
                                justifyContent: "center",
                                marginTop: 60,
                                backgroundColor:
                                  index == screenitem ? "#098f45" : null,
                              }}
                            >
                              <Text
                                style={{
                                  textAlign: "center",
                                  justifyContent: "center",
                                  fontSize: 20,
                                  color:
                                    index == screenitem ? "white" : "black",
                                }}
                              >
                                {item}
                              </Text>
                            </View>
                          </Pressable>
                        )}
                      />

                      <Pressable onPress={() => setModalVisible(false)}>
                        <View
                          style={{
                            alignItems: "center",
                            alignSelf: "center",
                            marginTop: 60,
                            borderWidth: 2,
                            width: 300,
                            height: 50,
                            justifyContent: "center",
                            backgroundColor: "#841584",
                          }}
                        >
                          <Text style={{ fontSize: 20, color: "white" }}>
                            okey
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  </Modal>
                ) : null}
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
                      //   placeholder="Set Channel: 1 - 24"
                      //   type={"numeric"}
                      //   setValue={setChannel}
                      // />
                      <View
                        style={{
                          borderWidth: 1,
                          alignItems: "center",
                          top: 3,
                        }}
                      >
                        <Picker
                          style={{
                            height: 50,

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
                      <View style={{ top: 5 }}>
                        <InputField
                          value={duration}
                          type={"numeric"}
                          placeholder="Set Duration: 1000 for 1sec 0 for null."
                          setValue={setDuration}
                        />
                      </View>
                    ) : null}
                    {protocol == "tasker" ? (
                      // <InputField
                      //   value={Setting.Setmessage}
                      //   // placeholder="Set message: task.execute"
                      //   // setValue={setMessage}
                      //   disabled={true}
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
                          {Object.keys(Task).map(key => {
                            return (
                              <Picker.Item
                                label={Task[key]}
                                value={Task[key]}
                              />
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
                      //   placeholder="Set Channel: 1 - 24"
                      //   type={"numeric"}
                      //   setValue={setChannel}
                      // />
                      <View
                        style={{
                          borderWidth: 1,
                          alignItems: "center",
                          top: 3,
                        }}
                      >
                        <Picker
                          style={{
                            height: 50,

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
                      <View style={{ top: 3 }}>
                        <InputField
                          value={duration}
                          type={"numeric"}
                          placeholder="Set Duration: 1000 for 1sec 0 for null."
                          setValue={setDuration}
                        />
                      </View>
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
