import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, View, ScrollView, Text } from "react-native";
import { Button, Checkbox } from "react-native-paper";
import AllBtn from "../components/AllBtn";
import InputField from "../components/InputField";
import DropDownList from "../components/DropDownList";
import RadioButtons from "../components/RadioButtons";
// import { BUTTONS, DEVICES } from "../constants/devices";
import Slider from "@react-native-community/slider";

import { useSelector, useDispatch } from "react-redux";
import { addButtonToDeviceR } from "../redux/deviceSlice";
import rooms from "../constants/rooms";
import protocols from "../constants/protocols";
import { colors } from "../constants/theme";

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

  const addBtnHandler = useCallback(() => {
    const button = {
      buttonName: btnName,
      buttonCommand: protocol + "://" + cmd,
      deviceName: deviceName,
      rooms: room,
    };
    console.log(button);
    try {
      const alreadyExists = btnList.findIndex(
        (btn) =>
          btn.buttonName === button.buttonName &&
          btn.deviceName === button.deviceName
      );
      const deviceDoesExist = deviceList.findIndex(
        (dev) => dev.deviceName === button.deviceName
      );
      // console.log(deviceDoesExist);
      if (alreadyExists < 0 && deviceDoesExist >= 0) {
        dispatch(addButtonToDeviceR({ deviceIndex: deviceDoesExist, button }));
        Alert.alert("Button has been Added");
        //   buttonName: btnName,
        // buttonCommand: protocol + "://" + cmd,
        // deviceName: deviceName,
        // rooms: room,
        setBtnName("");
        setCmd("");
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
    <ScrollView style={styles.container}>
      <InputField
        value={btnName}
        placeholder="Button Name"
        setValue={setBtnName}
      />
      {/* <InputField
        value={deviceName}
        placeholder="Device Name"
        setValue={setDeviceName}
      /> */}
      {/* asdadadsadsadasdasd */}
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
              onPress={() => {
                // console.log("ROOM:", r);
                // setRoom([...room, r]);
                const tempRooms = [...room];
                if (!tempRooms.includes(r)) tempRooms.push(r);
                else {
                  const roomIndex = tempRooms.indexOf(r);
                  tempRooms.splice(roomIndex, 1);
                }
                setRoom([...tempRooms]);
                // console.log("ROOMS:", room);
                // console.log("TEMP_ROOMS:", tempRooms);
              }}
            />
            <Text>{r}</Text>
          </View>
        ))}
      </View>

      {/* <RadioButtons
        title="Choose a Room"
        listItems={rooms}
        value={room}
        setValue={setRoom}
      /> */}
      <RadioButtons
        title="Choose Mode"
        listItems={protocols}
        value={protocol}
        setValue={setProtocol}
      />
      {/* <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 18, textAlignVertical: "center" }}>
          Choose Mode (https & ws)
        </Text>
        <Slider
          style={{ width: 100, height: 40 }}
          minimumValue={0}
          maximumTrackTintColor="#000000"
          maximumValue={1}
          // value={protocol}
          onValueChange={(value) => {
            const absoluteValue = Math.round(value);
            // console.log(absoluteValue);
            setProtocol(protocols[absoluteValue]);
          }}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View> */}
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{ width: "20%", fontSize: 18, textAlignVertical: "center" }}
        >
          {protocol}://
        </Text>
        <View style={{ width: "80%" }}>
          <InputField value={cmd} placeholder="Command" setValue={setCmd} />
        </View>
      </View>
      <Button
        style={styles.btn}
        icon=""
        disabled={!btnName || !cmd || !deviceName}
        mode="contained"
        onPress={() => {
          addBtnHandler();
          // console.log("Button3 at BedRoomScreen");
        }}
      >
        Add Button
      </Button>
      <AllBtn />
    </ScrollView>
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
