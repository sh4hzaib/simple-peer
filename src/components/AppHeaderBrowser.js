import React from "react";
import { Appbar } from "react-native-paper";
import { colors } from "../constants/theme";

import { useNavigation } from "@react-navigation/native";
import { useMediaQuery } from "react-responsive";

const AppHeader = (props) => {
  const isTablet = useMediaQuery({ minDeviceWidth: 600 });
  const iconSize = isTablet ? 48 : 32;
  const { title } = props;
  const { headerColor } = colors;
  const navigation = useNavigation();
  return (
    <Appbar.Header
      style={{
        height: isTablet ? 80 : 50,
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
        size={iconSize}
        // icon={"cog"}
        icon={require("../../assets/ico.png")}
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
