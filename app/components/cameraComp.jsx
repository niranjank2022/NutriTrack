import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, Modal } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useState,useEffect } from "react";

const CameraCapture = ({setFoodInfo,setModalVisible,setImageShow,imageShow}) => {
    const [cameraPermission, setCameraPermission] = useState(null);
     const [leftImageUri, setLeftImageUri] = useState(null);
      const [topImageUri, setTopImageUri] = useState(null);
      const [capturingTopView, setCapturingTopView] = useState(false);
     useEffect(() => {
        (async () => {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          setCameraPermission(status === 'granted');
        })();
      }, []);
      const mockFoodRecognition = async (leftUri, topUri) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              name: 'Yogurt with Grapes and Walnuts',
              calories: 250,
              protein: 8,
              carbs: 30,
              fats: 10,
              healthScore: 7,
              leftImage: leftUri,
              topImage: topUri,
              estimatedVolume: 150, // Mock volume estimation in cm³
            });
          }, 2000);
        });
      };
    const clickImage = async () => {
        console.log("clicked");
        if (cameraPermission === null) {
          Alert.alert("Checking permissions...");
          return;
        }
        if (!cameraPermission) {
          Alert.alert("Permission Denied", "Please enable camera access in settings.");
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
    
            // Call food recognition after both images are captured
          const detectedFood = await mockFoodRecognition(leftImageUri, result.assets[0].uri);
           setFoodInfo(detectedFood);
           setModalVisible(true);
           }
        }
      };
    
  return (
    <View style={{ alignItems: "center", marginVertical: 10 }}>
              <TouchableOpacity 
                onPress={clickImage}
                style={{ marginVertical: 20, backgroundColor: '#FFA500', padding: 15, borderRadius: 50, alignItems: 'center' }}>
                <Ionicons name="camera" size={30} color="#fff" />
                {/* <Text style={{ color: '#fff', fontWeight: 'bold' }}>Capture {capturingTopView ? "Top View" : "Left View"}</Text> */}
              </TouchableOpacity>
              {imageShow &&(
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {leftImageUri && <Image source={{ uri: leftImageUri }} style={{ width: 150, height: 150, borderRadius: 10 }} />}
                {topImageUri && <Image source={{ uri: topImageUri }} style={{ width: 150, height: 150, borderRadius: 10 }} />}
              </View>
              )}
    </View>
  );
};

export default CameraCapture;
