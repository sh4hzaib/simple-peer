import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch, Button } from "react-native-paper";
import { colors } from "../constants/theme";
const ButtonListItem = ({ name, device, onBtnClick }) => {
  return (
    <View
      style={{
        margin: 10,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Text>{name}</Text>
      <Text>{device}</Text>
      {/* <Switch
        value={status}
        onValueChange={changeStatus}
        color={colors.primary}
      /> */}
      <Button
        style={styles.btn}
        icon=""
        mode="contained"
        onPress={onBtnClick}
        color={colors.delete}
      >
        Remove
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    // marginBottom: 10,
    // padding: 10,
    // height: 60,
  },
});

export default ButtonListItem;
