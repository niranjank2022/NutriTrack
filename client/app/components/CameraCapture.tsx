import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, Alert } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { IFoodInfo } from "../(tabs)/home";

interface CameraCaptureProps {
  setFoodInfo: (info: IFoodInfo) => void;
  setModalVisible: (visible: boolean) => void;
  setImageShow: (show: boolean) => void;
  imageShow: boolean;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({
  setFoodInfo,
  setModalVisible,
  setImageShow,
  imageShow,
}) => {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null
  );
  const [leftImageUri, setLeftImageUri] = useState<string | null>(null);
  const [topImageUri, setTopImageUri] = useState<string | null>(null);
  const [capturingTopView, setCapturingTopView] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);

  const mockFoodRecognition = async (
    leftUri: string | null,
    topUri: string | null
  ): Promise<IFoodInfo> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Yogurt with Grapes and Walnuts",
          calories: 250,
          protein: 8,
          carbs: 30,
          fats: 10,
          healthScore: 7,
          leftImage: leftUri || "",
          topImage: topUri || "",
          estimatedVolume: 150,
        });
      }, 2000);
    });
  };

  const clickImage = async () => {
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

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      if (!capturingTopView) {
        setLeftImageUri(result.assets[0].uri);
        setCapturingTopView(true);
        setImageShow(true);
        Alert.alert("Now capture the top view of the food.");
      } else {
        setTopImageUri(result.assets[0].uri);
        setCapturingTopView(false);

        try {
          console.log(leftImageUri, topImageUri);
          const res1 = await axios.post(
            "http://localhost:3000/apis/foods/detect/",
            {
              images: [leftImageUri?.substring(22), topImageUri?.substring(22)],
            }
          );
          const { foodName, confidence } = res1.data;

          console.log(foodName);
          try {
            const res2 = await axios.get(
              "http://localhost:3000/apis/nutrients/" + foodName
            );
            const { name, calories, protein, carbohydrate, fat, fiber } =
              res2.data;
            setFoodInfo({
              name: foodName,
              healthScore: Math.floor(Math.random() * 10),
              calories: calories,
              carbs: carbohydrate,
              protein: protein,
              fats: fat,
              leftImage: leftImageUri!,
              topImage: topImageUri!,
              estimatedVolume: 100,
            });
          } catch (err) {
            const { name, calories, protein, carbohydrate, fat, fiber } = {
              name: "orange",
              calories: 52,
              protein: 0.3,
              carbohydrate: 14,
              fat: 0.2,
              fiber: 2.4,
            };
            setFoodInfo({
              name: foodName,
              healthScore: Math.floor(Math.random() * 10),
              calories: calories,
              carbs: carbohydrate,
              protein: protein,
              fats: fat,
              leftImage: leftImageUri!,
              topImage: topImageUri!,
              estimatedVolume: 100,
            });
          }

          // Set the detected food info to state and open the modal

          setModalVisible(true);
        } catch (err) {
          alert("Some error occurred in image processing... Try again later.");
        }
      }
    }
  };

  return (
    <View style={{ alignItems: "center", marginVertical: 10 }}>
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
      {imageShow && (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
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
      )}
    </View>
  );
};

export default CameraCapture;
