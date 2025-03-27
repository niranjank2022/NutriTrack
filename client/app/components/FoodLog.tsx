import React from "react";
import { View, Text, Image } from "react-native";
import { IFoodItem } from "../(tabs)/home";

interface FoodLogProps {
  foodLog: Record<string, IFoodItem[]>; // Object with date strings as keys and food items as arrays
  selectedDate: Date;
}

const FoodLog: React.FC<FoodLogProps> = ({ foodLog, selectedDate }) => {
  const getFormattedDate = (date: Date): string =>
    date.toISOString().split("T")[0];

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 15 }}>
        Logged Food
      </Text>
      {foodLog[getFormattedDate(selectedDate)]?.map((food, index) => (
        <View
          key={index}
          style={{
            backgroundColor: "#F5F5F5",
            padding: 15,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={{ width: 50, height: 50, borderRadius: 10, marginRight: 10 }}
          />
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {food.name}
            </Text>
            <Text>🔥 {food.calories} Calories</Text>
            <Text>
              🍗 {food.protein}g 🥖 {food.carbs}g 🥑 {food.fats}g
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default FoodLog;
