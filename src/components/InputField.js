import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
const InputField = (props) => {
<<<<<<< HEAD
  const { value, placeholder, setValue, max, type, onBlur } = props;
=======
  const { value, placeholder, setValue, max, type, onBlur, disable } = props;
>>>>>>> c7898b4dc5b0493d83acb38aca8b9e4df246303b

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
<<<<<<< HEAD
=======
      disabled={disable}
>>>>>>> c7898b4dc5b0493d83acb38aca8b9e4df246303b
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
