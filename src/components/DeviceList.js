import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import ChangeDeviceStatus from "./ChangeDeviceStatus";
import { colors } from "../constants/theme";
import { changeDeviceStatusR } from "../redux/deviceSlice";
import { useSelector, useDispatch } from "react-redux";

const DeviceList = () => {
  const Devices = [
    { deviceName: "DeviceOne", status: true },
    { deviceName: "Device2", status: true },
    { deviceName: "Device3", status: true },
    { deviceName: "Device4", status: true },
    { deviceName: "Device5", status: true },
  ];

  // const [devList, setDevList] = useState(Devices);
  // const [enabledDevices, setEnabledDevices] = useState([]);
  const deviceList = useSelector((state) => state.device);

  const renderItem = useCallback(({ item }) => {
    return (
      <ChangeDeviceStatus
        device={item.deviceName}
        IP={item.deviceIP}
        status={item.status}
        // changeStatus={() => {
        //   // changeStatus(item);
        // }}
      />
    );
  });

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Text style={styles.title}>Devices:</Text>
      <View style={{}}>
        <FlatList
          data={deviceList}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item.deviceName + index + item.deviceIP
          }
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 10,
  },
});
export default DeviceList;
