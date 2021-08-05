import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";
import AppHeader from "../components/AppHeader";

const WebViewTaskerScreen = () => {
  console.log("hello");
  const settings = useSelector((state) => state.settings);
  const [IpAdress, setIpAdress] = useState(settings.ipAdress);
  // const ip = useSelector((state) => state.settings.IpAdress);
  console.log(IpAdress);
  // If it works it works
  return (
    <>
      <AppHeader title="Tasker" />
      <WebView 
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: "http://jnior:jnior@" + IpAdress + "/tasker"}} />
    </>
  );
};

export default WebViewTaskerScreen;
