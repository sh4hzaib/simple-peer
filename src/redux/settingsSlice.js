import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
const SETTINGS = {
  ipAdress: "",
  newsUrl: "",
  soundMode: "Dolby",
  pin: "1234",
};

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("SETTINGS", jsonValue);
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
      });
    },
    setNewsUrlR: (state, action) => {
      state.newsUrl = action.payload;
      storeData({
        newsUrl: action.payload,
        ipAdress: state.ipAdress,
        soundMode: state.soundMode,
      });
    },
    setPinR: (state, action) => {
      state.pin = action.payload;
      setPIN(action.payload);
    },
    setSoundModeR: (state, action) => {
      state.soundMode = action.payload;
      storeData({
        soundMode: action.payload,
        newsUrl: state.newsUrl,
        ipAdress: state.ipAdress,
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIPAdressR, setPinR, setNewsUrlR, setSoundModeR } =
  settingsSlice.actions;

export default settingsSlice.reducer;
