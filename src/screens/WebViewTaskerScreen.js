import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";
import AppHeader from "../components/AppHeader";

const WebViewTaskerScreen = () => {
  // console.log("hello");
  const URL = useSelector((state) => state.settings.newsUrl);
  console.log(URL);
  // If it works it works
  return (
    <>
      <AppHeader title="Tasker" />
      <WebView 
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: "http://jnior:jnior@" + URL + "/tasker"}} />
        
    </>
  );
};

export default WebViewTaskerScreen;
