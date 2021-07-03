import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
const InputField = (props) => {
  const { value, placeholder, setValue, max, type } = props;
  //   const [text, setText] = useState("");
  return (
    <TextInput
      label={placeholder}
      mode="outlined"
      value={value}
      maxLength={max || 1000}
      style={styles.input}
      onChangeText={(text) => setValue(text)}
      keyboardType={type || "default"}
    />
  );
};
const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: colors.bgColor,
  //   height: "100%",
  // },
  // btnContainer: {
  //   padding: 20,
  //   paddingTop: 50,
  // },
  input: {
    marginBottom: 10,
    //   padding: 10,
    // height: 60,
  },
});

export default InputField;
