import {Tabs,Stack} from "expo-router"
export default function profilelayout(){
    return(
        <Stack>
            <Stack.Screen name="index"  options={{headerShown:false}}/>
            <Stack.Screen name="Chatbot"  options={{headerShown:false}}/>
            <Stack.Screen name="HydrationCheck"  options={{headerShown:false}}/>
           
        </Stack>
    )
}