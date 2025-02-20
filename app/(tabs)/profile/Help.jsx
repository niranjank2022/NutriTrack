import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function Help() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Help & FAQs</Text>

      <View style={styles.faqItem}>
        <Text style={styles.question}>Q: How do I track food?</Text>
        <Text style={styles.answer}>A: You can capture or upload an image of food, and the app will analyze its nutrition.</Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>Q: Is the calorie count accurate?</Text>
        <Text style={styles.answer}>A: We use AI models to estimate nutrition, but values may vary slightly.</Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>Q: Can I edit my tracked meals?</Text>
        <Text style={styles.answer}>A: Yes, you can view and modify meals from the history section.</Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>Q: How do I contact support?</Text>
        <Text style={styles.answer}>A: You can email us at support@nutritrack.com.</Text>
      </View>
    </ScrollView>
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
  faqItem: {
    backgroundColor: "#E5E5BE",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
  },
  answer: {
    fontSize: 16,
    color: "gray",
  },
});
