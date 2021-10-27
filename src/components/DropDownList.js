import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View } from "react-native";

const DropDownList = ({ listItems, value, setValue }) => {
  const [selectedVal, setSelectedVal] = useState("");
  return (
    <View style={{ borderWidth: 1, borderColor: "#808080", borderRadius: 4 }}>
      <Picker
        style={{ height: 60, width: "100%" }}
        selectedValue={value}
        onValueChange={(itemValue, itemIndex) => {
          setValue(itemValue);
        }}
      >
        {listItems.map((item, index) => (
          <Picker.Item
            label={item.deviceName}
            key={item.deviceIP + index}
            value={item.deviceName}
          />
        ))}
      </Picker>
    </View>
  );
};

export default DropDownList;
