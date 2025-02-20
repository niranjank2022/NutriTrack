import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";

export default function Home() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient colors={["#003973", "#E5E5BE"]} style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}> 
        <Image source={require("../../images/logo.webp")} style={styles.logo} />
      </Animated.View>
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}> 
        <Text style={styles.head}>Welcome to NutriTrack</Text>
        <Text style={styles.subText}>Your smart nutrition assistant</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/signIn")}> 
          {/* <LinearGradient colors={["#00A86B", "#007BFF"]} style={styles.buttonGradient}> */}
            <Text style={styles.buttonText}>Get Started</Text>
         
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 220,
    height: 160,
    resizeMode: "contain",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    backdropFilter: "blur(10px)",
  },
  head: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    color: "#E5E5BE",
    textAlign: "center",
    marginTop: 5,
  },
  button: {
    backgroundColor:"#003973",
    borderRadius: 25,
    paddingVertical: 12,
    marginTop: 20,
    width: "80%",
    borderRadius: 25,
    overflow: "hidden",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
