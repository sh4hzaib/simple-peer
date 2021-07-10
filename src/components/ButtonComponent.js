import React from "react";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { colors } from "../constants/theme";
import Comm from "../../wsdemo/comm"
import W3CWebSocket from "websocket"

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

  function ws(ip, channel, message, duration) {
    var W3CWebSocket = require('websocket').w3cwebsocket;

    var client = new W3CWebSocket('ws:/' + ip + '/', 'echo-protocol');
    console.log('Inserted IP to WS was: ' + ip);
    console.log('Inserted Message to WS was: ' + message);
    console.log('Inserted Chanel to WS was: ' + channel);
    console.log('Inserted Duration to WS was: ' + duration);

    client.onerror = function() {
        console.log('Connection Error');
    };

    client.onopen = function() {
        console.log('WebSocket Client Connected');
        var registryWriteJson = {
          "Message":'Control',
          "Command":message,
          "Channel":channel,
          "Duration":duration
      };

        function sendNumber() {
            if (client.readyState === client.OPEN) {

                client.send(JSON.stringify(registryWriteJson));
                console.log(registryWriteJson);
                // setTimeout(sendNumber, 5000);
                
            }
        }
        sendNumber();
        client.close();
    };

    client.onclose = function() {
        console.log('echo-protocol Client Closed');
    };

    client.onmessage = function(e) {
        if (typeof e.data === 'string') {
            // console.log("Received: '" + e.data + "'");
        }
    };
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
        if (button.buttonProtocol === 'ws') {
          ws(device.deviceIP, button.buttonCommand.Channel, button.buttonCommand.Message, button.buttonCommand.Duration);
        } else {
          runMacro(device.deviceIP, 5500, button.buttonCommand.Command);
        }
      }}
      style={style}
      labelStyle={{ fontSize: 12 }}
    >
      {button.buttonName}
    </Button>
  );
};

export default ButtonComponent;
