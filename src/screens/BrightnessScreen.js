import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Button } from "react-native-paper";
import * as Brightness from 'expo-brightness';
import { Restart } from "fiction-expo-restart";


export default function BrightnessScreen() {
  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        Brightness.setSystemBrightnessAsync(0.5);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Brightness is Enabled. Please Exit</Text>
      <Button
                    style={styles.btnDanger}
                    icon="power"
                    contentStyle={{ width: "100%" }}
                    mode="contained"
                    color="#bd0023"
                    onPress={() => {
                      Alert.alert(
                        "Restart Application",
                        `This will restart the Application running on this screen.\n\nThis may take 1 minute`,
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          { text: "OK", onPress: () => Restart() },
                        ],
                        { cancelable: false }
                      );
                      console.log("Rebooting App");
                    }}
                  >
                    Restart App
                  </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});