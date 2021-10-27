import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from "./deviceSlice";
import settingsReducer from "./settingsSlice";

export default configureStore({
  reducer: {
    device: deviceReducer,
    settings: settingsReducer,
  },
});
