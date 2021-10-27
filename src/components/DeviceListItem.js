import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
const DeviceListItem = ({ name, IP, onRmvBtnClick, index }) => {
  const navigation = useNavigation();
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
      <Text>{IP}</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "30%",
        }}
      >
        <TouchableOpacity onPress={onRmvBtnClick}>
          <MaterialCommunityIcons
            name="delete"
            color={colors.delete}
            size={26}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const device = {
              name,
              IP,
              index,
            };
            navigation.navigate("DeviceEditScreen", device);
          }}
        >
          <MaterialCommunityIcons
            name="pencil"
            color={colors.buttonPrimary}
            size={26}
          />
        </TouchableOpacity>
      </View>
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

export default DeviceListItem;
