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
<<<<<<< HEAD
=======
          marginRight: 100,

>>>>>>> c7898b4dc5b0493d83acb38aca8b9e4df246303b
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
<<<<<<< HEAD
    margin: 5,
=======
    // margin: 5,
    // marginRight: ,
    // marginRight: 70,
>>>>>>> c7898b4dc5b0493d83acb38aca8b9e4df246303b
  },
});

export default RadioButtons;
