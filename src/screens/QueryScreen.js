import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native";

const QueryScreen = () => {
  const focused = useIsFocused();
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      console.log("Focused:", focused);
      const queryEverySec = () => {
        if (focused == true) {
          axios.get("http://meldre.tplinkdns.com:8080/getdevice").then((r) => {
            //   console.log(r.data);
            const tempD = [];
            for (const key in r.data) {
              // console.log(key, data[key]);
              tempD.push({ name: key, status: r.data[key] });
            }
            //   console.log(tempD);
            setData([...tempD]);
            console.log("Refreshing");
          });
        }
      };
      var interval = setTimeout(() => {
        queryEverySec();
        if (focused == false) clearTimeout(interval);
      }, 1000);
      //cleanup func
      return () => {
        clearTimeout(interval);
      };
    }, [data, setData])
  );

  //   useFocusEffect(
  //     React.useCallback(() => {
  //       console.log("Focused:", focused);
  //       const queryEverySec = () => {
  //         if (focused == true) {
  //           axios.get("http://meldre.tplinkdns.com:8080/getdevice").then((r) => {
  //             //   console.log(r.data);
  //             const tempD = [];
  //             for (const key in r.data) {
  //               // console.log(key, data[key]);
  //               tempD.push({ name: key, status: r.data[key] });
  //             }
  //             //   console.log(tempD);
  //             setData([...tempD]);
  //             console.log("Refreshing");
  //           });
  //         } else {
  //           clearInterval(interval);
  //         }
  //       };
  //       var interval = setInterval(() => {
  //         queryEverySec();
  //         if (focused == false) clearInterval(interval);
  //       }, 1000);
  //     }, [])
  //   );

  //   useEffect();
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
                paddingBottom: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 36, fontWeight: "bold" }}>
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
