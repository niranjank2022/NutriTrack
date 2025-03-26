import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Animated,
} from "react-native";

export default function Chatbot() {
  const [food, setFood] = useState("");
  const [nutrient, setNutrient] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  function GetInfo() {
    const foodval = food.trim();
    setFood(foodval);
    console.log(foodval);

    const nutrientData = {
      ApplePie: "Calories: 237 kcal, Carbs: 34g, Fat: 10g, Protein: 2g",
      Banana: "Calories: 105 kcal, Carbs: 27g, Fat: 0.3g, Protein: 1.3g",
      Orange: "Calories: 62 kcal, Carbs: 15g, Fat: 0.2g, Protein: 1.2g",
    };

    setNutrient(nutrientData[foodval] || "No data found");
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Enter Food Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Eg: ApplePie"
          placeholderTextColor="#777"
          value={food}
          onChangeText={setFood}
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.6 : 1 },
          ]}
          onPress={GetInfo}
        >
          <Text style={styles.buttonText}>Get Info</Text>
        </Pressable>
        {nutrient && (
          <Animated.View style={[styles.infoBox, { opacity: fadeAnim }]}>
            <Text style={styles.infoText}>{nutrient}</Text>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  card: {
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
    borderRadius: 15,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#E5E5BE",
    padding: 12,
    borderRadius: 10,
    width: "100%",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  button: {
    width: "80%",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#FFA500",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#E5E5BE",
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003973",
    textAlign: "center",
  },
});
