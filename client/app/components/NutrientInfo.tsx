import React from "react";
import { View, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface Nutrient {
  label: string;
  value: string;
  icon: string;
}

const NutrientInfo: React.FC = () => {
  const nutrients: Nutrient[] = [
    { label: "Proteins", value: "142g", icon: "food-drumstick" },
    { label: "Carbs", value: "190g", icon: "bread-slice" },
    { label: "Fats", value: "40g", icon: "cheese" },
  ];

  return (
    <View>
      <View
        style={{
          backgroundColor: "#F5F5F5",
          padding: 25,
          borderRadius: 15,
          marginBottom: 15,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Text style={{ fontSize: 26, fontWeight: "bold" }}>2,178</Text>
        <Text style={{ fontSize: 18 }}>Calories </Text>
        <Ionicons
          name="flame"
          size={30}
          color="#FF9800"
          style={{ position: "absolute", right: 20, top: 20 }}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {nutrients.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#F5F5F5",
              padding: 25,
              borderRadius: 15,
              alignItems: "center",
              width: "30%",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <MaterialCommunityIcons name={item.icon} size={30} color="#000" />
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
              {item.value}
            </Text>
            <Text style={{ fontSize: 14 }}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default NutrientInfo;
