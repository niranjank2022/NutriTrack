import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Dimensions,
    Image,
  } from "react-native";
  import { router } from "expo-router";
  
  const { width } = Dimensions.get("window");
  
  export default function Profile() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require("../../../images/logo.webp")} style={styles.logo} />
          <Text style={styles.userName}>Username</Text>
        </View>
  
        <Pressable style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.6 : 1 },]} 
             onPress={() => router.push("profile/userInfo")}>
          <Text style={styles.buttonText}>User Info</Text>
        </Pressable>
  
        <Pressable style={({ pressed})=>[styles.button,{opacity :pressed ?0.6:1},]} onPress={() => router.push("profile/History")}>
          <Text style={styles.buttonText}>History</Text>
        </Pressable>
  
        <Pressable style={({ pressed})=>[styles.button,{opacity :pressed ?0.6:1},]} onPress={() => router.push("profile/settings")}>
          <Text style={styles.buttonText}>Settings</Text>
        </Pressable>
  
        <Pressable style={({ pressed})=>[styles.button,{opacity :pressed ?0.6:1},]} onPress={() => router.push("profile/Help")}>
          <Text style={styles.buttonText}>Help & FAQs</Text>
        </Pressable>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#003973",
      alignItems: "center",
      paddingTop: 50,
    },
    imageContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      padding: 15,
      borderRadius: 15,
      marginBottom: 30,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 15,
    },
    userName: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#E5E5BE",
    },
    button: {
      width: width * 0.85,
      paddingVertical: 15,
      marginVertical: 10,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: 25,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#FFFFFF",
    },
  });
  