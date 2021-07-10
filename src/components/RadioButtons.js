import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { RadioButton, Text } from "react-native-paper";

const RadioButtons = ({ title, listItems, value, setValue }) => {
  return (
    <RadioButton.Group
      onValueChange={(newValue) => {
        console.log(newValue);
        setValue(newValue);
      }}
      value={value}
    >
      <View
        style={{
          //   marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 17 }}>{title}</Text>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {listItems.map((list, index) => (
            <View key={list + index} style={styles.radioBtnItem}>
              <RadioButton value={list} />
              <Text>{list}</Text>
            </View>
          ))}
        </View>
      </View>
    </RadioButton.Group>
  );
};

const styles = StyleSheet.create({
  radioBtnItem: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
});

export default RadioButtons;
