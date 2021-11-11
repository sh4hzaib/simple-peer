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
  const [timer, setTimer] = useState(800000);
  const dispatch = useDispatch();
  const initPIN = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const findSettings = keys.find(key => key === "_pin");
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
          onAction={isActive => {
            setActive(isActive);
            console.log(isActive);
          }}
        >
          <StackContainer queryData={queryData} setQueryData={setQueryData} />
        </UserInactivity>
      ) : (
        <LockScreen active={active} setActive={setActive} />
      )}
    </>
  );
};

export default AppContainer;
