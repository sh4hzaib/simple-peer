import React, { useState } from "react";
import UserInactivity from "react-native-user-inactivity";
import LockScreen from "../screens/LockScreen";
import StackContainer from "./StackContainer";
import defaultSetttings from "../constants/settings.json";

import { setPinR } from "../redux/settingsSlice";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

const AppContainer = () => {
  const [queryData, setQueryData] = useState([]);
  const [active, setActive] = useState(true);
  //Set timer for inactivity here...
<<<<<<< HEAD
  const [timer, setTimer] = useState(80000);
=======
  const [timer, setTimer] = useState(800000);
>>>>>>> c7898b4dc5b0493d83acb38aca8b9e4df246303b
  const dispatch = useDispatch();
  const initPIN = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const findSettings = keys.find((key) => key === "_pin");
      if (findSettings) {
        const getPIN = await AsyncStorage.getItem("_pin");
        dispatch(setPinR(getPIN));
      } else {
        const _pin = defaultSetttings.PIN;
        await AsyncStorage.setItem("_pin", _pin);
        const pin = await AsyncStorage.getItem("_pin");
        dispatch(setPinR(pin));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    initPIN();
  }, []);

  return (
    <>
      {active ? (
        <UserInactivity
          isActive={active}
          timeForInactivity={timer}
          skipKeyboard={true}
          onAction={(isActive) => {
            setActive(isActive);
            console.log(isActive);
          }}
        >
          <StackContainer queryData={queryData} setQueryData={setQueryData} />
        </UserInactivity>
      ) : (
<<<<<<< HEAD
        // console.log(active)
=======
>>>>>>> c7898b4dc5b0493d83acb38aca8b9e4df246303b
        <LockScreen active={active} setActive={setActive} />
      )}
    </>
  );
};

export default AppContainer;
