import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10,margin:30 }}>
      {/* Chatbot Button */}
      <Pressable
       style={({ pressed }) => ({
        flex: 1,
        backgroundColor: "#444", // Grayish background
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        opacity: pressed ? 0.7 : 1, // Reduce opacity when pressed
      })}
       
         onPress={() => router.push("Features/Chatbot")}
      >
        <Ionicons name="chatbubbles-outline" size={50} color="white" />
        <Text style={{ color: "white", fontSize: 20, marginTop: 10 }}>
          Chatbot
        </Text>
      </Pressable>

      {/* Hydration Check Button */}
      <Pressable
        style={({pressed})=>({ flex: 1, borderRadius: 20, overflow: "hidden" ,opacity: pressed ? 0.7 : 1,})}
         onPress={() => router.push("Features/HydrationCheck")}
      >
        <LinearGradient
          colors={["#0099FF", "#0055AA"]} // Water effect gradient
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="water-outline" size={50} color="white" />
          <Text style={{ color: "white", fontSize: 20, marginTop: 10 }}>
            Hydration Check
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
