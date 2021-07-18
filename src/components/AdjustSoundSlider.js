import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/theme";

import CircularSlider from "rn-circular-slider";
import { useSelector } from "react-redux";

const AdjustSoundSlider = ({ value, setValue }) => {
  const settings = useSelector((state) => state.settings);

  const SoundMode = settings.soundMode;
  const serverIp = settings.ipAdress;

  const calculateSoundValue = (value) => {
    let tempValue;
    if (SoundMode === "Dolby") {
      tempValue = ((value / 100) * 7).toFixed(1);
      return tempValue;
    } else {
      tempValue = ((value / 100) * 10).toFixed(1);
      return tempValue;
    }
  };

  function wsSound(ip, value) {
    var W3CWebSocket = require("websocket").w3cwebsocket;

    var client = new W3CWebSocket("ws:/" + ip + "/", "echo-protocol");
    console.log("Inserted IP to WS was: " + ip);
    console.log("Inserted Value to WS was: " + value);

    client.onerror = function () {
      console.log("Connection Error");
    };

    const soundSystem = settings.soundMode;

    client.onopen = function () {
      var selectedCP = "";
      console.log("WebSocket Client Connected");
      if (soundSystem === "Dolby") {
        selectedCP = "DolbyVolumeXX";
      } else {
        selectedCP = "DCP300VolumeXX";
      }
      var registryWriteJson = {
        Message: "Post Message",
        Number: 2010,
        Content:
          '{"Message":"task.execute","TaskName":"' +
          selectedCP +
          '","Variables":{"volume":' +
          value +
          "}}",
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

    client.onclose = function () {
      console.log("echo-protocol Client Closed");
    };

    client.onmessage = function (e) {
      if (typeof e.data === "string") {
        // console.log("Received: '" + e.data + "'");
      }
    };
  }

  const emptyFunction = (value) => {
    console.log("EMPTY:" + value);
    wsSound(serverIp, value);
  };

  return (
    <View style={styles.container}>
      <CircularSlider
        step={2}
        min={0}
        max={100}
        value={value}
        onChange={(value) => {
          const soundValue = calculateSoundValue(value);
          setValue(soundValue);
          // emptyFunction(soundValue);
        }}
        onComplete={(value) => {
          const soundValue = calculateSoundValue(value);
          setValue(soundValue);
          emptyFunction(soundValue);
        }}
        contentContainerStyle={styles.contentContainerStyle}
        strokeWidth={30}
        buttonBorderColor={colors.buttonDanger}
        buttonFillColor={colors.buttonDanger}
        buttonStrokeWidth={10}
        openingRadian={Math.PI / 4}
        buttonRadius={20}
        // linearGradient={[{ stop: "100%", color: colors.buttonUnmute }]}
        linearGradient={[
          { stop: "0%", color: "#2ca81e" },
          { stop: "100%", color: "#a81e1e" },
        ]}
      >
        <Text style={styles.value}>{value}</Text>
      </CircularSlider>
      <Text
        style={{
          color: "white",
          paddingTop: 5,
          fontSize: 15,
          fontWeight: "bold",
        }}
      >
        {settings.soundMode}
      </Text>
    </View>
  );
};

export default AdjustSoundSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  value: {
    fontWeight: "500",
    fontSize: 32,
    color: "#fff",
  },
});
