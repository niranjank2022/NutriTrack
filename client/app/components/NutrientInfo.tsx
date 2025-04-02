import axios from "axios";
import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import ApiService from "../apis";
import { getData } from "../utils/storage.utils";

interface INutrient {
  label: string;
  value: number;
  icon: string;
}

const NutrientInfo: React.FC<{ selectedDate: Date }> = ({ selectedDate }) => {
  const [calories, setCalories] = useState<number>(0);
  const [nutrients, setNutrients] = useState<INutrient[]>([
    { label: "Proteins", value: 0, icon: "food-drumstick" },
    { label: "Carbs", value: 0, icon: "bread-slice" },
    { label: "Fats", value: 0, icon: "cheese" },
  ]);

  useEffect(() => {
    (async function () {
      try {
        const userId = getData("userId");
        const res = await ApiService.getNutrientsLog(
          userId!,
          selectedDate.toDateString()
        );
        const { calories, protein, carbs, fats } = res.data.nutrients;
        setCalories(calories);
        setNutrients([
          { label: "Proteins", value: protein, icon: "food-drumstick" },
          { label: "Carbs", value: carbs, icon: "bread-slice" },
          { label: "Fats", value: fats, icon: "cheese" },
        ]);
        console.log(nutrients);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setCalories(0);
          setNutrients([
            { label: "Proteins", value: 0, icon: "food-drumstick" },
            { label: "Carbs", value: 0, icon: "bread-slice" },
            { label: "Fats", value: 0, icon: "cheese" },
          ]);
        }
      }
    })();
  }, [selectedDate]);

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
        <Text style={{ fontSize: 26, fontWeight: "bold" }}>{calories}</Text>
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
