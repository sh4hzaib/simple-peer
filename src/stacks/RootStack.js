import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomNavigationBar from "../components/BottomNavigationBar";
import ButtonSceen from "../screens/ButtonSceen";
import DeviceScreen from "../screens/DeviceScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DeviceEditScreen from "../screens/DeviceEditScreen";
import WebViewTaskerScreen from "../screens/WebViewTaskerScreen";
import ButtonEditScreen from "../screens/ButtonEditScreen";
import QueryScreen from "../screens/QueryScreen";
import BrightnessScreen  from "../screens/BrightnessScreen";

const Root = createStackNavigator();

const RootStack = ({ queryData, setQueryData }) => {
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
        <Root.Screen
          name="ButtonEditScreen"
          component={ButtonEditScreen}
          options={{
            headerShown: false,
          }}
        />
        <Root.Screen
          name="WebViewTaskerScreen"
          component={WebViewTaskerScreen}
          options={{
            headerShown: false,
          }}
        />
        <Root.Screen
          name="BrightnessScreen"
          component={BrightnessScreen}
          options={{
            headerShown: false,
          }}
        />
        <Root.Screen name="QueryScreen" options={{ headerShown: false }}>
          {(props) => (
            <QueryScreen {...props} data={queryData} setData={setQueryData} />
          )}
        </Root.Screen>
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
