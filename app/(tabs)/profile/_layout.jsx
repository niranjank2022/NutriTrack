import {Tabs,Stack} from "expo-router"
export default function profilelayout(){
    return(
        <Stack>
            <Stack.Screen name="index"  options={{headerShown:false}}/>
            <Stack.Screen name="userInfo"  options={{headerShown:false}}/>
            <Stack.Screen name="settings"  options={{headerShown:false}}/>
            <Stack.Screen name="History"  options={{headerShown:false}}/>
            <Stack.Screen name="Help"  options={{headerShown:false}}/>
        </Stack>
    )
}