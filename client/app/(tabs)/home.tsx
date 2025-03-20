import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

// Define interfaces for food items and logs
interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface FoodInfo extends FoodItem {
  healthScore: number;
  leftImage: string | null;
  topImage: string | null;
  estimatedVolume: number;
}

type FoodLog = Record<string, FoodItem[]>;

const HomeScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [foodLog, setFoodLog] = useState<FoodLog>({
    "2025-03-12": [
      {
        name: "Yogurt with Grapes",
        calories: 250,
        protein: 8,
        carbs: 30,
        fats: 10,
      },
    ],
  });
  const [leftImageUri, setLeftImageUri] = useState<string | null>(null);
  const [topImageUri, setTopImageUri] = useState<string | null>(null);
  const [capturingTopView, setCapturingTopView] = useState<boolean>(false);
  const [foodInfo, setFoodInfo] = useState<FoodInfo | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);

  const getFormattedDate = (date: Date): string =>
    date.toISOString().split("T")[0];

  const mockFoodRecognition = async (
    leftUri: string,
    topUri: string
  ): Promise<FoodInfo> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Yogurt with Grapes and Walnuts",
          calories: 250,
          protein: 8,
          carbs: 30,
          fats: 10,
          healthScore: 7,
          leftImage: leftUri,
          topImage: topUri,
          estimatedVolume: 150,
        });
      }, 2000);
    });
  };

  const clickImage = async () => {
    // Check camera permission status
    if (cameraPermission === null) {
      Alert.alert("Checking permissions...");
      return;
    }
    if (!cameraPermission) {
      Alert.alert(
        "Permission Denied",
        "Please enable camera access in settings."
      );
      return;
    }

    // Launch the camera for image capture
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    // If image was captured successfully
    if (!result.canceled) {
      // If capturing left image (first view)
      if (!capturingTopView) {
        setLeftImageUri(result.assets[0].uri); // Set the left image URI
        setCapturingTopView(true); // Change flag to capture the next image as the top view
        Alert.alert("Now capture the top view of the food.");
      }
      // If capturing top image (second view)
      else {
        setTopImageUri(result.assets[0].uri); // Set the top image URI
        setCapturingTopView(false); // Reset flag after both images are captured

        // After both images are captured, call the mock function
        try {
          const res1 = await axios.post(
            "http://192.168.250.31:3000/apis/foods/detect/",
            {
              images: [leftImageUri?.substring(22), topImageUri?.substring(22)],
            }
          );
          const { foodName, confidence } = res1.data;

          console.log(foodName);
          const res2 = await axios.get(
            "http://192.168.250.31:3000/apis/nutrients/" + foodName
          );
          const { name, calories, protein, carbohydrate, fat, fiber } =
            res2.data;

          // Set the detected food info to state and open the modal
          setFoodInfo({
            name: foodName,
            healthScore: Math.floor(Math.random() * 100),
            calories: calories,
            carbs: carbohydrate,
            protein: protein,
            fats: fat,
            leftImage: leftImageUri,
            topImage: topImageUri,
            estimatedVolume: 100,
          });
          setModalVisible(true);
        } catch (err) {
          alert("Some error occurred in image processing... Try again later.");
        }
      }
    }
  };

  interface FoodItem {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  }

  interface FoodInfo extends FoodItem {
    healthScore: number;
    leftImage: string | null;
    topImage: string | null;
    estimatedVolume: number;
  }
  const renderDatePicker = () => {
    let days = [];
    let today = new Date();
    today.setDate(today.getDate() - today.getDay() + 1);

    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    for (let i = 0; i < 7; i++) {
      let day = new Date(today);
      day.setDate(today.getDate() + i);
      let formattedDate = getFormattedDate(day);

      days.push(
        <TouchableOpacity
          key={i}
          style={{
            padding: 10,
            borderRadius: 10,
            backgroundColor:
              selectedDate.toDateString() === day.toDateString()
                ? "#FFA500"
                : "#E5E5E5",
            alignItems: "center",
          }}
          onPress={() => setSelectedDate(day)}
        >
          <Text style={{ fontWeight: "bold" }}>{dayNames[i]}</Text>
          <Text style={{ fontSize: 16 }}>{day.getDate()}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 15,
        }}
      >
        {days}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>NutriTrack</Text>
        {renderDatePicker()}

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
          <Text style={{ fontSize: 18 }}>Calories left</Text>
          <Ionicons
            name="flame"
            size={30}
            color="#FF9800"
            style={{ position: "absolute", right: 20, top: 20 }}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[
            { label: "Proteins", value: "142g", icon: "food-drumstick" },
            { label: "Carbs", value: "190g", icon: "bread-slice" },
            { label: "Fats", value: "40g", icon: "cheese" },
          ].map((item, index) => (
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
              <Text style={{ fontSize: 14 }}>{item.label} left</Text>
            </View>
          ))}
        </View>

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
            }}
          >
            <Image
              source={{ uri: "https://via.placeholder.com/50" }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                marginRight: 10,
              }}
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
      </ScrollView>

      {/* Camera Button */}
      <TouchableOpacity
        onPress={clickImage}
        style={{
          marginVertical: 20,
          backgroundColor: "#FFA500",
          padding: 15,
          borderRadius: 50,
          alignItems: "center",
        }}
      >
        <Ionicons name="camera" size={30} color="#fff" />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        {leftImageUri && (
          <Image
            source={{ uri: leftImageUri }}
            style={{ width: 150, height: 150, borderRadius: 10 }}
          />
        )}
        {topImageUri && (
          <Image
            source={{ uri: topImageUri }}
            style={{ width: 150, height: 150, borderRadius: 10 }}
          />
        )}
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: 350,
              backgroundColor: "#fff",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            {foodInfo && (
              <>
                <Image
                  source={{ uri: foodInfo.leftImage }}
                  style={{ width: "100%", height: 200 }}
                />
                <View style={{ padding: 15 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {foodInfo.name}
                    </Text>
                    <View
                      style={{
                        backgroundColor: "#003973",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 15,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 12,
                        }}
                      >
                        {/* 07:24 */}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: 10,
                      borderRadius: 15,
                      alignItems: "center",
                      marginVertical: 10,
                      elevation: 5,
                    }}
                  >
                    <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                      🔥 {foodInfo.calories}
                    </Text>
                    <Text>Calories</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginVertical: 10,
                    }}
                  >
                    {[
                      {
                        label: "Proteins",
                        value: `${foodInfo.protein}g`,
                        icon: "food-drumstick",
                      },
                      {
                        label: "Carbs",
                        value: `${foodInfo.carbs}g`,
                        icon: "bread-slice",
                      },
                      {
                        label: "Fats",
                        value: `${foodInfo.fats}g`,
                        icon: "cheese",
                      },
                    ].map((item, index) => (
                      <View
                        key={index}
                        style={{
                          backgroundColor: "#F5F5F5",
                          padding: 15,
                          borderRadius: 10,
                          alignItems: "center",
                          width: "30%",
                          elevation: 5,
                        }}
                      >
                        <MaterialCommunityIcons
                          name={item.icon}
                          size={24}
                          color="#000"
                        />
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            marginTop: 5,
                          }}
                        >
                          {item.value}
                        </Text>
                        <Text style={{ fontSize: 12 }}>{item.label}</Text>
                      </View>
                    ))}
                  </View>
                  <View
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: 10,
                      borderRadius: 15,
                      alignItems: "center",
                      marginVertical: 10,
                      elevation: 5,
                    }}
                  >
                    <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                      {foodInfo.estimatedVolume} cm³
                    </Text>
                    <Text>Estimated Volume</Text>
                  </View>

                  {/* <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#F5F5F5",
                      padding: 10,
                      borderRadius: 10,
                      justifyContent: "space-between",
                      marginVertical: 10,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="heart-pulse"
                      size={24}
                      color="#FF3D00"
                    />
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      Health Score
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        height: 8,
                        backgroundColor: "#ddd",
                        borderRadius: 5,
                        marginHorizontal: 10,
                      }}
                    >
                      <View
                        style={{
                          width: `${foodInfo.healthScore * 10}%`,
                          height: "100%",
                          backgroundColor: "#4CAF50",
                          borderRadius: 5,
                        }}
                      ></View>
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {foodInfo.healthScore}/10
                    </Text>
                  </View> */}
                </View>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={{
                    backgroundColor: "#FF9800",
                    padding: 15,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
