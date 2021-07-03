import React from "react";
import { Appbar } from "react-native-paper";
import { colors } from "../constants/theme";

const AppHeader = (props) => {
  const { title } = props;
  const { headerColor } = colors;
  return (
    <Appbar.Header
      style={{
        height: 60,
        // width: "100%",
        backgroundColor: headerColor,        
        // paddingTop: 20,
      }}
    >
      <Appbar.Content
        title={title}
        style={{ alignSelf: "center" }}
        titleStyle={{
          fontSize: 28,
          alignSelf: "center",
          fontWeight: "bold",
        }}
      />
    </Appbar.Header>
  );
};

export default AppHeader;
