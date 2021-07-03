import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";
import AppHeader from "../components/AppHeader";

const WebViewScreen = () => {
  console.log("hello");
  const URL = useSelector((state) => state.settings.newsUrl);
  console.log(URL);
  return (
    <>
      <AppHeader title="IMB" />
      <WebView source={{ uri: "http://" + URL }} />
    </>
  );
};

export default WebViewScreen;
