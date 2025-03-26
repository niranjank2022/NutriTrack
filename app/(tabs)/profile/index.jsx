import React from "react";
import { View, Text, Pressable, StyleSheet, Dimensions, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function Profile() {
  return (
    <View style={styles.container}>

      {/* Profile Section */}
      <View style={styles.profileCard}>
        <Image source={require("../../../images/logo.webp")} style={styles.profileImage} />
        <Text style={styles.userName}>John Doe</Text>
      </View>

      {/* Menu Options */}
      <Pressable style={({ pressed }) => [styles.card,{ opacity: pressed ? 0.6 : 1 },]} onPress={() => router.push("profile/userInfo")}>
        <Ionicons name="person-outline" size={22} color="#333" />
        <Text style={styles.cardText}>User Info</Text>
      </Pressable>

      <Pressable style={({ pressed }) => [styles.card,{ opacity: pressed ? 0.6 : 1 },]} onPress={() => router.push("profile/History")}>
        <Ionicons name="time-outline" size={22} color="#333" />
        <Text style={styles.cardText}>History</Text>
      </Pressable>

      <Pressable style={({ pressed }) => [styles.card,{ opacity: pressed ? 0.6 : 1 },]} onPress={() => router.push("profile/settings")}>
        <Ionicons name="settings-outline" size={22} color="#333" />
        <Text style={styles.cardText}>Settings</Text>
      </Pressable>

      <Pressable style={({ pressed }) => [styles.card,{ opacity: pressed ? 0.6 : 1 },]} onPress={() => router.push("profile/Help")}>
        <Ionicons name="help-circle-outline" size={22} color="#333" />
        <Text style={styles.cardText}>Help & FAQs</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF", // Light background
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 20,
  },
  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  profileCard: {
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
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "90%",
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 15,
    color: "#333",
  },
});

