import React from "react";
import { Appbar } from "react-native-paper";
import { colors } from "../constants/theme";

import { useNavigation } from "@react-navigation/native";

const AppHeader = (props) => {
  const { title } = props;
  const { headerColor } = colors;
  const navigation = useNavigation();
  return (
    <Appbar.Header
      style={{
        height: 50,
        backgroundColor: headerColor,
      }}
    >
      {/* <SettingsButton /> */}
      <Appbar.Content
        title={title}
        style={{ alignSelf: "center" }}
        titleStyle={{
          fontSize: 28,
          alignSelf: "center",
          fontWeight: "bold",
        }}
      />

      <Appbar.Action
        style={{ position: "absolute", right: 0 }}
        size={32}
        icon={"cog"}
        onPress={() => {
          navigation.navigate("ScreenRoomScreen");
          // navigation.navigate("LoginScreen");
        }}
        onLongPress={() => {
          navigation.navigate("SettingsScreen");
          // navigation.navigate("LoginScreen");
        }}
      />
    </Appbar.Header>
  );
};

export default AppHeader;
