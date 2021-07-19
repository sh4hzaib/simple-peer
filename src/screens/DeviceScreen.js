import React, { useCallback, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import InputField from "../components/InputField";

import { useSelector, useDispatch } from "react-redux";
import { addDeviceR, removeDeviceR } from "../redux/deviceSlice";
import { IpPattern } from "../constants/RegEx";
import { Text, FlatList } from "react-native";
import { colors } from "../constants/theme";
import DeviceListItem from "../components/DeviceListItem";

const DeviceScreen = ({ navigation }) => {
  const deviceList = useSelector((state) => state.device);
  const dispatch = useDispatch();

  const [deviceName, setDeviceName] = useState("");
  const [deviceIP, setDeviceIP] = useState("");

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
      if (alreadyExists < 0 && notUniqueIP < 0 && validateIP) {
        dispatch(addDeviceR(device));
        Alert.alert("Device has been added");
      } else throw new Error("Invalid Inputs");
    } catch (error) {
      Alert.alert(error.message);
    }
  });

  const removeDeviceHandler = useCallback((device) => {
    const indexOfDevice = deviceList.findIndex(
      (dev) => dev.deviceName === device
    );
    dispatch(removeDeviceR(indexOfDevice));
  });

  const renderItem = useCallback(({ item, index }) => {
    return (
      <DeviceListItem
        name={item.deviceName}
        IP={item.deviceIP}
        index={index}
        onRmvBtnClick={() => {
          removeDeviceHandler(item.deviceName);
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
                  }}
                >
                  Add Device
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
                <Text style={styles.title}>Devices:</Text>
              </>
            }
            data={deviceList}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
              item.deviceName + index + item.deviceIP
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

export default DeviceScreen;
