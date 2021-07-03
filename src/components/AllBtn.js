import React, { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { colors } from "../constants/theme";
import ButtonListItem from "./ButtonListItem";
import { useSelector, useDispatch } from "react-redux";
import {
  addButtonToDeviceR,
  removeButtonFromDeviceR,
} from "../redux/deviceSlice";

const AllBtn = () => {
  const deviceList = useSelector((state) => state.device);
  console.log(deviceList);
  const dispatch = useDispatch();
  const btnList = [];
  for (let index = 0; index < deviceList.length; index++) {
    btnList.push(...deviceList[index].buttons);
  }

  const removeButtonHandler = useCallback((button) => {
    // const tempList = [...buttonList];
    const indexOfBtn = btnList.findIndex(
      (btn) => btn.buttonName === button.buttonName
    );
    const indexOfDevice = deviceList.findIndex(
      (dev) => dev.deviceName === button.deviceName
    );
    console.log(indexOfBtn, indexOfDevice);
    dispatch(
      removeButtonFromDeviceR({
        deviceIndex: indexOfDevice,
        buttonIndex: indexOfBtn,
      })
    );
    // console.log("INDEX:" + indexOfBtn);
    // console.log("BTN:" + button);
    // tempList.splice(indexOfBtn, 1);
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
    <View style={{ height: "55%" }}>
      <Text style={styles.title}>Buttons:</Text>
      <View>
        <FlatList
          data={btnList}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item.deviceName + index + item.buttonName
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

export default AllBtn;
