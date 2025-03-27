import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import DatePicker from "../components/DatePicker";
import NutrientInfo from "../components/NutrientInfo";
import CameraCapture from "../components/CameraCapture";
import FoodInfoModal from "../components/FoodInfoModal";
import FoodLog from "../components/FoodLog";

export interface IFoodInfo {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  healthScore: number;
  leftImage: string;
  topImage: string;
  estimatedVolume: number;
}

export interface IFoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface FoodLogData {
  [key: string]: IFoodItem[]; // Key is a date string, and value is an array of FoodItem
}

const HomeScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [foodInfo, setFoodInfo] = useState<IFoodInfo | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [imageShow, setImageShow] = useState<boolean>(false);
  const [foodLog, setFoodLog] = useState<FoodLogData>({
    "2025-03-26": [
      {
        name: "Yogurt with Grapes",
        calories: 250,
        protein: 8,
        carbs: 30,
        fats: 10,
      },
    ],
  });

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>NutriTrack</Text>
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <NutrientInfo />
        <FoodLog foodLog={foodLog} selectedDate={selectedDate} />
      </ScrollView>
      <CameraCapture
        setFoodInfo={setFoodInfo}
        setModalVisible={setModalVisible}
        setImageShow={setImageShow}
        imageShow={imageShow}
      />
      {/* {console.log(foodInfo, modalVisible)} */}
      <FoodInfoModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        foodInfo={foodInfo}
        setImageShow={setImageShow}
      />
    </View>
  );
};

export default HomeScreen;
