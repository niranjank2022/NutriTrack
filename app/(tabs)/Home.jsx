import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, Modal } from 'react-native';
// import { ScrollView } from "react-native";
import DatePicker from "../components/DateComp";
import NutrientInfo from "../components/nutrientInfo";
import CameraCapture from "../components/cameraComp";
import FoodInfoModal from "../components/foodInfoComp";
import FoodLog from "../components/foodLog";

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [foodInfo, setFoodInfo] = useState(null);
  // const [capturedImages, setCapturedImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageShow,setImageShow] = useState(false);
  const [foodLog, setFoodLog] = useState({
      '2025-03-26': [{ name: 'Yogurt with Grapes', calories: 250, protein: 8, carbs: 30, fats: 10 }],
    });



  return (
    <View style={{ flex: 1, backgroundColor: "white"}}>
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>NutriTrack</Text>
      <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      <NutrientInfo  />
      <FoodLog foodLog={foodLog} selectedDate={selectedDate} />
    </ScrollView>
    <CameraCapture setFoodInfo={setFoodInfo} setModalVisible={setModalVisible} setImageShow={setImageShow} imageShow={imageShow}/>
    {console.log(foodInfo,modalVisible)}
    <FoodInfoModal modalVisible={modalVisible} setModalVisible={setModalVisible}  foodInfo={foodInfo} setImageShow={setImageShow}  />
    </View>
  );
};

export default HomeScreen;
