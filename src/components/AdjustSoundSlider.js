import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
// import CircleSlider from "react-native-circle-slider";
// import CircularSlider from "react-native-circular-slider";
import { colors } from "../constants/theme";

import CircularSlider from "rn-circular-slider";
import { useSelector } from "react-redux";

const AdjustSoundSlider = ({ value, setValue }) => {
  const settings = useSelector((state) => state.settings);
  // console.log(settings);
  // const [value, setValue] = useState(50);
  // useEffect(() => {
  //   setValue(0);
  // }, [settings.soundMode]);
  const calculateSoundValue = (value) => {
    const SoundMode = settings.soundMode;
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
        // step={1}
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
        linearGradient={[
          // { stop: "0%", color: colors.buttonMute },
          { stop: "100%", color: colors.buttonUnmute },
          // { stop: "100%", color: "#7E84ED" },
        ]}
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

// export default class AdjustSoundSlider extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <CircularSlider
//           startAngle={0}
//           angleLength={Math.PI}
//           onUpdate={({ startAngle, angleLength }) => {
//             // this.setState({ startAngle, angleLength })
//           }}
//           segments={5}
//           strokeWidth={40}
//           radius={145}
//           gradientColorFrom="#ff9800"
//           gradientColorTo="#ffcf00"
//           showClockFace
//           clockFaceColor="#9d9d9d"
//           bgCircleColor="#171717"
//           // stopIcon={<G><Path .../></G>}
//           // startIcon={<G><Path .../></G>}
//         />
//       </View>
//     );
//   }
// }
