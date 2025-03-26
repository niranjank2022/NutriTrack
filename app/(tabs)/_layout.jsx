import {Tabs} from "expo-router"
import { Ionicons } from "@expo/vector-icons"
export default function homelayout(){
    return(
        <Tabs >
            <Tabs.Screen name="Home" options={{ tabBarIcon: () => { return <Ionicons name="home"  size={24}/>; },}} />
            <Tabs.Screen name="Features" options={{ tabBarIcon: () => { return <Ionicons name="fitness-outline"  size={24}/>; },title : "Features"}} />
            <Tabs.Screen name="profile"  options={{ tabBarIcon: () => { return <Ionicons name="person"  size={24}/>; },headerTitle:"Profile"}} />
           
        </Tabs>
    )
}