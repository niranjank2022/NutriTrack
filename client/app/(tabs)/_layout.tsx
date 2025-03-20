import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
export default function homelayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Ionicons name="home" size={24} />;
          },
        }}
      />
      <Tabs.Screen
        name="dietPlan"
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Ionicons name="fitness-outline" size={24} />;
          },
          title: "DietPlan",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Ionicons name="person" size={24} />;
          },
          headerTitle: "Profile",
        }}
      />
    </Tabs>
  );
}
