import { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { router, Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import ApiService from "../apis";
import { storeData } from "../utils/storage.utils";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [scale] = useState(new Animated.Value(1));

  const handleLogin = async () => {
    let errors = { email: "", password: "" };
    let valid = true;

    if (!email) {
      errors.email = "Email is required!";
      valid = false;
    }
    if (!password) {
      errors.password = "Password is required!";
      valid = false;
    }

    setError(errors);

    if (!valid) return;

    try {
      const res = await ApiService.signin(email, password);
      const { userId } = res.data;
      storeData("userId", userId);
      router.push("/Home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
        setError({ email: "", password: error.response?.data.message });
      } else {
        setError({ email: "", password: "Something went wrong!" });
        console.log("Some error occurred", error);
      }
    }
  };

  return (
    <LinearGradient colors={["#003973", "#E5E5BE"]} style={styles.container}>
      <Animated.View style={[styles.loginBox, { transform: [{ scale }] }]}>
        <Text style={styles.head}>Welcome </Text>

        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError((prev) => ({ ...prev, email: "" }));
          }}
          style={[styles.input, error.email && styles.inputError]}
          keyboardType="email-address"
        />
        {error.email ? (
          <Text style={styles.errorText}>{error.email}</Text>
        ) : null}

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError((prev) => ({ ...prev, password: "" }));
          }}
          secureTextEntry
          style={[styles.input, error.password && styles.inputError]}
        />
        {error.password ? (
          <Text style={styles.errorText}>{error.password}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          activeOpacity={0.8}
          onPressIn={() =>
            Animated.spring(scale, {
              toValue: 0.95,
              useNativeDriver: true,
            }).start()
          }
          onPressOut={() =>
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: true,
            }).start()
          }
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View>
          <Text>Don't have an account?</Text>
          <Link href="/sign-up">Sign Up</Link>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  loginBox: {
    width: "90%",
    maxWidth: 350,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  head: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#003973",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  button: {
    backgroundColor: "#003973",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
