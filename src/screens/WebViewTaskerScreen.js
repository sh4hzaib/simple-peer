import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";
import AppHeader from "../components/AppHeader";

const WebViewTaskerScreen = () => {
  // console.log("hello");
  const URL = useSelector((state) => state.settings.newsUrl);
  console.log(URL);
  return (
    <>
      <AppHeader title="Tasker" />
      <WebView 
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: "http://" + URL + "/tasker"}} />
    </>
  );
};

export default WebViewTaskerScreen;
