import { Stack, Tabs } from "expo-router";
import { View, Text } from "react-native";

export default function Authlayout() {
  return (
    <Stack>
      <Stack.Screen name="Landing" options={{headerShown:false}}/>
      {/* <Stack.Screen name="././(tabs)" options={{headerShown:false}}/> */}

    </Stack>
  );
}
