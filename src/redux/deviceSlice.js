import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
const DEVICES = [];

const storeData = async (value) => {
  try {
    const stringifyDevices = JSON.stringify(value);
    await AsyncStorage.setItem("DEVICES", stringifyDevices);
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
    addDevicesR: (state, action) => {
      // state = [...action.payload];
      console.log("Removing All els frm arr");
      state.splice(0, state.length);
      console.log("Adding Device");
      action.payload.forEach((device) => {
        state.push(device);
      });
      storeData(state);
    },
    removeDeviceR: (state, action) => {
      state.splice(action.payload, 1);
      storeData(state);
    },
    editDeviceR: (state, action) => {
      console.log(action.payload);
      const btns = state[action.payload.index].buttons;
      for (let i = 0; i < btns.length; i++) {
        btns[i].deviceName = action.payload.device.deviceName;
      }
      state[action.payload.index] = action.payload.device;
      state[action.payload.index].buttons = btns;
      console.log(state[action.payload.index]);
      storeData(state);
    },
    changeDeviceStatusR: (state, action) => {
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
  editDeviceR,
  addDevicesR,
} = deviceSlice.actions;

export default deviceSlice.reducer;
