import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ScreenRoomScreen from "../screens/ScreenRoomScreen";
import BedRoomScreen from "../screens/BedRoomScreen";
import SoundScreen from "../screens/SoundScreen";
import { colors } from "../constants/theme";
import WebViewScreen from "../screens/WebViewScreen";
import { useMediaQuery } from "react-responsive";
import { Dimensions } from "react-native";
const Tab = createMaterialBottomTabNavigator();

export default function BottomNavigationBar() {
  const isTablet = useMediaQuery({ minDeviceWidth: 600 });
  console.log(Dimensions.get("window").width);
  console.log(Dimensions.get("window").height);
  console.log("-------------------", isTablet);
  const { headerColor } = colors;
  // const iconSize = isTablet ? 48 : 26;
  const iconSize = 26;
  return (
    <Tab.Navigator
      initialRouteName="ScreenRoomScreen"
      activeColor="#fff"
      barStyle={{
        backgroundColor: headerColor,
        justifyContent: "space-around",
      }}
    >
      <Tab.Screen
        name="ScreenRoomScreen"
        component={ScreenRoomScreen}
        options={{
          tabBarLabel: "Screen",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="theater"
              color={color}
              size={iconSize}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BedRoomScreen"
        component={BedRoomScreen}
        options={{
          tabBarLabel: "Projector",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="projector"
              color={color}
              size={iconSize}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SoundScreen"
        component={SoundScreen}
        options={{
          tabBarLabel: "Sound",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="music"
              color={color}
              size={iconSize}
            />
          ),
        }}
      />
      <Tab.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{
          tabBarLabel: "IMB",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="movie-open"
              color={color}
              size={iconSize}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
