import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
// import DEVICES from "../constants/devices";
const DEVICES = [];

const storeData = async (value) => {
  try {
    // const getDevices = await AsyncStorage.getItem("DEVICES")
    // const parsedDevices = JSON.parsed("DEVICES");
    const stringifyDevices = JSON.stringify(value);
    await AsyncStorage.setItem("DEVICES", stringifyDevices);
    // console.log("object");
  } catch (e) {
    console.log(e.message);
  }
};

export const deviceSlice = createSlice({
  name: "device",
  initialState: DEVICES,
  reducers: {
    addDeviceR: (state, action) => {
      state.push(action.payload);
      storeData(state);
    },
    removeDeviceR: (state, action) => {
      state.splice(action.payload, 1);
      storeData(state);
    },
    changeDeviceStatusR: (state, action) => {
      // console.log(action.payload);
      state[action.payload].status = !state[action.payload].status;
      storeData(state);
    },
    addButtonToDeviceR: (state, action) => {
      state[action.payload.deviceIndex].buttons.push(action.payload.button);
      storeData(state);
    },
    removeButtonFromDeviceR: (state, action) => {
      state[action.payload.deviceIndex].buttons.splice(
        action.payload.buttonIndex,
        1
      );
      storeData(state);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addDeviceR,
  removeDeviceR,
  changeDeviceStatusR,
  addButtonToDeviceR,
  removeButtonFromDeviceR,
} = deviceSlice.actions;

export default deviceSlice.reducer;
