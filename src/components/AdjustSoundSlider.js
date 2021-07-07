import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/theme";

import CircularSlider from "rn-circular-slider";
import { useSelector } from "react-redux";

const AdjustSoundSlider = ({ value, setValue }) => {
  const settings = useSelector((state) => state.settings);

  const SoundMode = settings.soundMode;

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

  const emptyFunction = (value) => {
    console.log("EMPTY:" + value);
  };

  return (
    <View style={styles.container}>
      <CircularSlider
        min={0}
        max={100}
        value={value}
        onChange={(value) => {
          const soundValue = calculateSoundValue(value);
          setValue(soundValue);
          emptyFunction(soundValue);
        }}
        contentContainerStyle={styles.contentContainerStyle}
        strokeWidth={10}
        buttonBorderColor={colors.buttonPrimary}
        buttonFillColor={colors.buttonPrimary}
        buttonStrokeWidth={0}
        openingRadian={Math.PI / 4}
        buttonRadius={15}
        linearGradient={[{ stop: "100%", color: colors.buttonUnmute }]}
      >
        <Text style={styles.value}>{value}</Text>
      </CircularSlider>
      <Text style={{ color: "white" }}>{settings.soundMode}</Text>
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
