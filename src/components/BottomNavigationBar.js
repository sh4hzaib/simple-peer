import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ScreenRoomScreen from "../screens/ScreenRoomScreen";
import SettingsScreen from "../screens/SettingsScreen";
import BedRoomScreen from "../screens/BedRoomScreen";
import SoundScreen from "../screens/SoundScreen";
import { colors } from "../constants/theme";
import WebViewScreen from "../screens/WebViewScreen";

const Tab = createMaterialBottomTabNavigator();

export default function BottomNavigationBar() {
  const { primary, headerColor } = colors;
  return (
    <Tab.Navigator
      initialRouteName="ScreenRoomScreen"
      activeColor="#fff"
      barStyle={{ backgroundColor: headerColor }}
    >
      <Tab.Screen
        name="ScreenRoomScreen"
        component={ScreenRoomScreen}
        options={{
          tabBarLabel: "Screen",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="theater" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="BedRoomScreen"
        component={BedRoomScreen}
        options={{
          tabBarLabel: "Projector",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="projector" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SoundScreen"
        component={SoundScreen}
        options={{
          tabBarLabel: "Sound",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="music" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{
          tabBarLabel: "IMB",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="movie-open" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
