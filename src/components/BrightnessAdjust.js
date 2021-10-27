import * as Brightness from 'expo-brightness';

function SetBrightness() {
  console.log("Running SetBrightness")
  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        Brightness.setSystemBrightnessAsync(0.5);
      }
    })();
  })};

export default SetBrightness;