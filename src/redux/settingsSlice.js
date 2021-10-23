import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
const SETTINGS = {
  ipAdress: "",
  newsUrl: "",
  rnAdress: "",
  soundMode: "Dolby",
  pin: "1234",
};

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("SETTINGS", jsonValue);
    console.log(jsonValue)
  } catch (e) {
    console.log(e.message);
  }
};

const setPIN = async (value) => {
  try {
    await AsyncStorage.setItem("_pin", value);
    console.log("PIN SET");
  } catch (e) {
    console.log(e.message);
  }
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: SETTINGS,
  reducers: {
    setIPAdressR: (state, action) => {
      state.ipAdress = action.payload;
      storeData({
        ipAdress: action.payload,
        newsUrl: state.newsUrl,
        soundMode: state.soundMode,
        rnAdress: state.rnAdress
      });
    },
    setNewsUrlR: (state, action) => {
      state.newsUrl = action.payload;
      storeData({
        newsUrl: action.payload,
        ipAdress: state.ipAdress,
        soundMode: state.soundMode,
        rnAdress: state.rnAdress,
      });
    },
    setRNUrlR: (state, action) => {
      state.rnAdress = action.payload;
      storeData({
        newsUrl: action.payload,
        ipAdress: state.ipAdress,
        soundMode: state.soundMode,
        rnAdress: state.rnAdress,

      });
    },
    setPinR: (state, action) => {
      state.pin = action.payload;
      setPIN(action.payload);
    },
    setSoundModeR: (state, action) => {
      state.soundMode = action.payload;
      storeData({
        newsUrl: action.payload,
        ipAdress: state.ipAdress,
        soundMode: state.soundMode,
        rnAdress: state.rnAdress,
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIPAdressR, setRNUrlR, setPinR, setNewsUrlR, setSoundModeR } =
  settingsSlice.actions;

export default settingsSlice.reducer;
