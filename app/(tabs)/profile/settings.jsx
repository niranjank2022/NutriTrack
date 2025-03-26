import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

export default function Settings() {
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      
      {/* <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={() => setNotifications(!notifications)}
        />
      </View> */}

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Light Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={() => setDarkMode(!darkMode)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003973",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E5E5BE",
    textAlign: "center",
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E5E5BE",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  settingText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
