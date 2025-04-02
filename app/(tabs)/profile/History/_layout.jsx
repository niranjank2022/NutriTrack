import {Tabs,Stack} from "expo-router"
export default function Historylayout(){
    return(
        <Stack>
            <Stack.Screen name="index"  options={{headerShown:false}}/>
            <Stack.Screen name="foodHistory"  options={{headerShown:false}}/>
            <Stack.Screen name="waterHistory"  options={{headerShown:false}}/>
            
        </Stack>
    )
}