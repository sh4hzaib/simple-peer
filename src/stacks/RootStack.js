import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenRoomScreen from "../screens/ScreenRoomScreen";
import { NavigationContainer } from "@react-navigation/native";
import BottomNavigationBar from "../components/BottomNavigationBar";
import ButtonSceen from "../screens/ButtonSceen";
import DeviceScreen from "../screens/DeviceScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DeviceEditScreen from "../screens/DeviceEditScreen";

const Root = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Root.Navigator>
        <Root.Screen
          name="BottomNavigationBar"
          component={BottomNavigationBar}
          options={{
            headerShown: false,
          }}
        />
        <Root.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Root.Screen
          name="ButtonSceen"
          component={ButtonSceen}
          options={{
            headerShown: false,
          }}
        />
        <Root.Screen
          name="DeviceScreen"
          component={DeviceScreen}
          options={{
            headerShown: false,
          }}
        />
        <Root.Screen
          name="DeviceEditScreen"
          component={DeviceEditScreen}
          options={{
            headerShown: false,
          }}
        />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
