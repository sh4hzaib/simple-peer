import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import { colors } from "../constants/theme";
import { changeDeviceStatusR } from "../redux/deviceSlice";
import { useSelector, useDispatch } from "react-redux";

const ChangeDeviceStatus = ({ device, status, IP }) => {
  const deviceList = useSelector((state) => state.device);

  const dispatch = useDispatch();
  const changeStatus = useCallback(() => {
    const indexOfDevice = deviceList.findIndex((dev) => dev.deviceIP === IP);
    // console.log(indexOfDevice);
    dispatch(changeDeviceStatusR(indexOfDevice));
  });

  return (
    <View
      style={{
        margin: 10,
        padding: 5,
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
        justifyContent: "space-between",
        alignContent: "center",
        flexDirection: "row",
      }}
    >
      <Text>{device}</Text>
      <Text>{IP}</Text>
      <Switch
        value={status}
        onValueChange={changeStatus}
        color={colors.primary}
      />
    </View>
  );
};

export default ChangeDeviceStatus;
