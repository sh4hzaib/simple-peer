import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
const InputField = (props) => {
  const { value, placeholder, setValue, max, type, onBlur } = props;

  return (
    <TextInput
      label={placeholder}
      mode="outlined"
      value={value}
      maxLength={max || 1000}
      style={styles.input}
      onChangeText={(text) => setValue(text)}
      keyboardType={type || "default"}
      onBlur={onBlur}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    //   padding: 10,
    // height: 60,
  },
});

export default InputField;
