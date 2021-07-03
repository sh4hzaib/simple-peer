import React, { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { colors } from "../constants/theme";
import DeviceListItem from "./DeviceListItem";
import { removeDeviceR } from "../redux/deviceSlice";
import { useSelector, useDispatch } from "react-redux";

const AllDevices = () => {
  const deviceList = useSelector((state) => state.device);
  const dispatch = useDispatch();
  const removeDeviceHandler = useCallback((device) => {
    const indexOfDevice = deviceList.findIndex(
      (dev) => dev.deviceName === device
    );
    console.log("INDEX:" + indexOfDevice);
    console.log("DEVICE:" + device);
    dispatch(removeDeviceR(indexOfDevice));
  });

  const renderItem = useCallback(({ item }) => {
    return (
      <DeviceListItem
        name={item.deviceName}
        IP={item.deviceIP}
        onBtnClick={() => {
          removeDeviceHandler(item.deviceName);
        }}
      />
    );
  });

  return (
    <View style={{ height: "55%" }}>
      <Text style={styles.title}>Devices:</Text>
      <View>
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

export default AllDevices;
