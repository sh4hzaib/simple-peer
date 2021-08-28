import "@expo/match-media";
import React from "react";
import RootStack from "./RootStack";

const StackContainer = ({ queryData, setQueryData }) => {
  return <RootStack queryData={queryData} setQueryData={setQueryData} />;
};

export default StackContainer;
