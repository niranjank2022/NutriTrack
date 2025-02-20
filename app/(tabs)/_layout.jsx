import {Tabs} from "expo-router"
export default function homelayout(){
    return(
        <Tabs >
            <Tabs.Screen name="Home" />
            <Tabs.Screen name="dietPlan"  />
            <Tabs.Screen name="profile"  />
           
        </Tabs>
    )
}