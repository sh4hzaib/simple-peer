import React from "react";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";
import AppHeader from "../components/AppHeaderBrowser";

const WebViewScreen = () => {
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
