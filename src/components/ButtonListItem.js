import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
const ButtonListItem = ({
  name,
  device,
  onBtnClick,
  onBtnEditClick,
  button,
}) => {
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
      <Text>{device}</Text>

      <Button
        style={styles.btn}
        icon=""
        mode="contained"
        onPress={onBtnClick}
        color={colors.delete}
      >
        Remove
      </Button>
      <TouchableOpacity onPress={onBtnClick}>
        <MaterialCommunityIcons name="delete" color={colors.delete} size={26} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // const device = {
          //   name,
          //   IP,
          //   index,
          // };
          // onBtnEditClick();
          // console.log(name, device);
          console.log(button);
          navigation.navigate("ButtonEditScreen", button);
        }}
      >
        <MaterialCommunityIcons
          name="pencil"
          color={colors.buttonPrimary}
          size={26}
        />
      </TouchableOpacity>
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
