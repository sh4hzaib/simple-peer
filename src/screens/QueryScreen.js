import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const QueryScreen = ({ navigation, data, setData }) => {
  const focused = useIsFocused();
  const [loadData, setLoadData] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      console.log("Focused:", focused);
      const queryEverySec = () => {
        if (focused == true && loadData == true) {
          axios.get("http://meldre.tplinkdns.com:8080/getdevice").then((r) => {
            const tempD = [];
            for (const key in r.data) {
              tempD.push({ name: key, status: r.data[key] });
            }
            setData([...tempD]);
            console.log("Refreshing");
          });
        }
      };
      var interval = setTimeout(() => {
        queryEverySec();
      }, 1000);
      //cleanup func
      return () => {
        clearTimeout(interval);
      };
    }, [data])
  );
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        ListHeaderComponent={
          <>
            <View
              style={{
                width: "100%",
                paddingVertical: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{ position: "absolute", left: "5%" }}
                onPress={() => {
                  setLoadData(false);
                  setData([]);
                  navigation.navigate("SettingsScreen");
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    padding: 6,
                    paddingVertical: 8,
                    backgroundColor: "#eee",
                    borderWidth: 4,
                    borderColor: "#ccc",
                    borderRadius: 12,
                  }}
                >
                  <MaterialCommunityIcons
                    name="chevron-left"
                    color={"#000"}
                    size={20}
                  />
                  <Text>Back</Text>
                </View>
              </TouchableOpacity>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                Querying Data
              </Text>
            </View>
          </>
        }
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <Text>{item.name}</Text>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 150 / 2,
                  backgroundColor: item.status == true ? "green" : "red",
                }}
              ></View>
            </View>
          );
        }}
        keyExtractor={(item) => item.name + item.status.toString()}
      />
    </SafeAreaView>
  );
};

export default QueryScreen;
