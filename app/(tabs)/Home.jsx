import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const [imageUri, setImageUri] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      return Alert.alert("Permission needed to access media library.");
    }

    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!data.canceled) {
      setImageUri(data.assets[0].uri);
      fadeIn();
    }
  };

  const clickImage = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      return Alert.alert("Permission needed to access camera.");
    }

    let data = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!data.canceled) {
      setImageUri(data.assets[0].uri);
      fadeIn();
    }
  };

//   const removeImage = () => {
//     setImageUri(null);
//   };

  const fadeIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <LinearGradient colors={["#003973", "#002855"]} style={styles.container}>
      <Text style={styles.heading}>NutriTrack</Text>
      <Text style={styles.description}>
        Upload a food image and get its nutritional breakdown instantly!
      </Text>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <LinearGradient colors={["#E5E5BE", "#D4D4A5"]} style={styles.buttonGradient}>
          <Ionicons name="image" size={24} color="#003973" />
          <Text style={styles.buttonText}>Pick Image</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={clickImage}>
        <LinearGradient colors={["#E5E5BE", "#D4D4A5"]} style={styles.buttonGradient}>
          <Ionicons name="camera" size={24} color="#003973" />
          <Text style={styles.buttonText}>Capture Image</Text>
        </LinearGradient>
      </TouchableOpacity>

      {imageUri && (
        <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
          <Text style={styles.imageText}>Selected Image:</Text>
          <Image source={{ uri: imageUri }} style={styles.image} />
          {/* <TouchableOpacity style={styles.deleteButton} onPress={removeImage}>
            <Ionicons name="trash" size={24} color="white" />
          </TouchableOpacity> */}
        </Animated.View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E5E5BE",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  description: {
    fontSize: 16,
    color: "#E5E5BE",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    width: "80%",
    borderRadius: 30,
    marginVertical: 10,
    overflow: "hidden",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003973",
    marginLeft: 10,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  imageText: {
    fontSize: 18,
    color: "#E5E5BE",
    marginBottom: 10,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#E5E5BE",
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF9800",
    padding: 10,
    borderRadius: 20,
  },
});
