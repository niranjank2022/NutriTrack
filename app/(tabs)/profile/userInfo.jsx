import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function UserInfo() {
  return (
    <View style={styles.container}>
      <Image source={require("../../../images/logo.webp")} style={styles.profileImage} />
      <Text style={styles.username}>John Doe</Text>
      <Text style={styles.info}>Email: johndoe@gmail.com</Text>
      <Text style={styles.info}>Age: 28</Text>
      <Text style={styles.info}>Weight: 75kg</Text>
      <Text style={styles.info}>Height: 5'9"</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003973",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E5E5BE",
  },
  info: {
    fontSize: 18,
    color: "#E5E5BE",
    marginVertical: 5,
  },
});
