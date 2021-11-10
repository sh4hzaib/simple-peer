import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView,Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../components/AppHeader";
import ButtonComponent from "../components/ButtonComponent";
import { colors } from "../constants/theme";
import { addDeviceR } from "../redux/deviceSlice";
import defaultSettings from "../constants/settings.json";
import {
  setIPAdressR,
  setNewsUrlR,
  setSoundModeR,
} from "../redux/settingsSlice";
import defaultDevices from "../constants/devices.json";

const ScreenRoomScreen = () => {
  const deviceList = useSelector((state) => state.device);
  const settings = useSelector((state) => state.settings);
  const enabledDevices = deviceList.filter((device) => device.status);
  const dispatch = useDispatch();
  let btnList = [];
  let lights = []
  let controls=[]
  let misc1=[]
  let misc2=[]
  
  for (let index = 0; index < enabledDevices.length; index++) {
    btnList.push(...enabledDevices[index].buttons);
    
    console.log("Index is: " + index)
  }
  for (let index = 0; index < btnList.length; index++) {
    console.log("btnList is");
    
    btnList = btnList.filter((btn) =>
      btn.rooms.find((room) =>  room === "Screen")
    );
  }
  lights = btnList.filter(btn=>btn.place==="lights")
  controls = btnList.filter(btn=>btn.place==="controls")
  misc1 = btnList.filter(btn=>btn.place==="misc1")
  misc2 = btnList.filter(btn=>btn.place==="misc2")
  // console.log(lights);

  const initSettings = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const findSettings = keys.find((key) => key === "SETTINGS");
      if (findSettings) {
        const getSettings = await AsyncStorage.getItem("SETTINGS");
        const temp = await JSON.parse(getSettings);
        dispatch(setIPAdressR(temp.ipAdress));
        dispatch(setNewsUrlR(temp.newsUrl));
        dispatch(setSoundModeR(temp.soundMode));
      } else {
        const jsonValue = JSON.stringify({
          ...defaultSettings,
          soundValue: 0,
        });
        console.log("..........", jsonValue);
        await AsyncStorage.setItem("SETTINGS", jsonValue);
        console.log("Settings Set");
        const getSettings = await AsyncStorage.getItem("SETTINGS");
        const temp = await JSON.parse(getSettings);
        dispatch(setIPAdressR(temp.ipAdress));
        dispatch(setNewsUrlR(temp.newsUrl));
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  const initDevices = async () => {
    try {
      let temp;
      const keys = await AsyncStorage.getAllKeys();
      const findDevices = keys.find((key) => key === "DEVICES");
      if (findDevices) {
        const getDevices = await AsyncStorage.getItem("DEVICES");
        temp = await JSON.parse(getDevices);
        for (let index = 0; index < temp.length; index++)
          dispatch(addDeviceR(temp[index]));
        console.log(temp);
      } else {
        const jsonValue = JSON.stringify(defaultDevices);
        console.log(jsonValue);
        await AsyncStorage.setItem("DEVICES", jsonValue);
        console.log("DEvICES Set");
        const getDEVICES = await AsyncStorage.getItem("DEVICES");
        const temp = await JSON.parse(getDEVICES);
        for (let index = 0; index < temp.length; index++)
          dispatch(addDeviceR(temp[index]));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (!settings.ipAdress || !settings.newsUrl) {
      initSettings();
      console.log("Settings Init");
    } else console.log("Alreeady Settings");
    if (!deviceList.length) {
      initDevices();
      console.log("Devices Init");
    } else console.log("Alreeady Devices");
  }, []);

  return (
    <>
      <AppHeader title="Screen" />
      <View style={{height:"100%",
      backgroundColor:colors.bgColor
      }}>

      {/* <ScrollView style={styles.container}> */}
        <View style={{
          flexDirection:"row", 
          width:"100%",height:"50%", 
          // backgroundColor:"black"
          }}>
          
        <View style={styles.btnContainer}>
          <Text style={styles.btnHeader}>
          Lights
          </Text>
          {lights.map((button, index) => (
            
            <ButtonComponent
              key={index + button.buttonName}
              style={styles.btn}
              button={button}
            />
          ))}
        </View>
        <View style={styles.btnContainer}>
        <Text style={styles.btnHeader}>
          Controls
          </Text>
          {controls.map((button, index) => (
            
            <ButtonComponent
              key={index + button.buttonName}
              style={styles.btn}
              button={button}
            />
          ))}
        </View>

        </View>
            
            

      {/* </ScrollView> */}



      <View style={{
          flexDirection:"row", 
          width:"100%",height:"50%", 
          // backgroundColor:"black"
          }}>
          
        <View style={styles.btnContainer}>
        <Text style={styles.btnHeader}>
          Misc 1
          </Text>
          {misc1.map((button, index) => (
            
            <ButtonComponent
              key={index + button.buttonName}
              style={styles.btn}
              button={button}
            />
          ))}
        </View>
        <View style={styles.btnContainer}>
        <Text style={styles.btnHeader}>
          Misc 2
          </Text>
          {misc2.map((button, index) => (
            
            <ButtonComponent
              key={index + button.buttonName}
              style={styles.btn}
              button={button}
            />
          ))}
        </View>

        </View>
       

      </View>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "black",
    // height: "10%",
    // width:"100%"
  },
  btnHeader:{
    fontSize:24, color:"white",fontWeight:"500",marginBottom:"10%"
  },
  btnContainer: {
    padding: "4%",
    flexDirection: "row",
    flexWrap: "wrap",
    width:"50%",
    justifyContent: "space-evenly",
    borderWidth:1,
    borderColor:"white"
    // paddingTop: 50,
  },
  btn: {
    marginBottom: 15,
    padding: 5,
    width: "80%",
    margin:"1%"
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
});
export default ScreenRoomScreen;
