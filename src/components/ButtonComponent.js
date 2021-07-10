import React from "react";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { colors } from "../constants/theme";
const ButtonComponent = ({ style, button }) => {
  const deviceList = useSelector((state) => state.device);
  const { buttonPrimary } = colors;

  function runMacro(ip, port, macro) {
    console.log(ip, port, macro);
    const httpRequest = new XMLHttpRequest();
    const ad = ip; // STRING BASED ON DATA FROM LINKED DEVICE
    const pn = port; // STRING BASED ON DATA FROM LINKED DEVICE
    const ma = macro; // STRING BASED ON DATA FROM BUTTON CONTAINGING COMMAND
    const url = `http://${ad}:${pn}/macro?name=${ma}`; // STRING BASED ON DATA FROM DEVICE + BUTTON
    httpRequest.open("GET", url);
    // console.log(httpRequest);
    httpRequest.send();
  }

  return (
    <Button
      icon=""
      mode="contained"
      color={buttonPrimary}
      onPress={() => {
        console.log(button);
        const device = deviceList.find(
          (dev) => dev.deviceName === button.deviceName
        );
        runMacro(device.deviceIP, 5500, button.buttonCommand.Command);
      }}
      style={style}
      labelStyle={{ fontSize: 12 }}
    >
      {button.buttonName}
    </Button>
  );
};

export default ButtonComponent;
