import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Image } from 'react-native';

const mockData = [
  {
    date: '2025-04-01',
    totalCalories: 2200,
    totalProteins: 90,
    totalCarbs: 250,
    totalFats: 80,
    items: [
      { name: 'Chicken Breast', calories: 300, proteins: 50, carbs: 0, fats: 10 },
      { name: 'Brown Rice', calories: 200, proteins: 5, carbs: 45, fats: 2 },
      { name: 'Avocado', calories: 150, proteins: 2, carbs: 8, fats: 15 },
    ],
  },
  {
    date: '2025-03-31',
    totalCalories: 1800,
    totalProteins: 70,
    totalCarbs: 200,
    totalFats: 60,
    items: [
      { name: 'Oatmeal', calories: 150, proteins: 5, carbs: 30, fats: 3 },
      { name: 'Eggs', calories: 140, proteins: 12, carbs: 1, fats: 10 },
      { name: 'Banana', calories: 100, proteins: 1, carbs: 27, fats: 0 },
    ],
  },
];

const FoodHistory = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food History</Text>
      <FlatList
        data={mockData}
        keyExtractor={(item) => item.date}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <TouchableOpacity style={styles.header} onPress={() => toggleExpand(index)}>
              <View>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.summary}>
                  Calories: {item.totalCalories} kcal | Proteins: {item.totalProteins}g | 
                  Carbs: {item.totalCarbs}g | Fats: {item.totalFats}g
                </Text>
              </View>
              {/* Arrow Icon Changes Based on Expansion */}
              <Text style={styles.arrow}>{expandedIndex === index ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {expandedIndex === index && (
              <View style={styles.details}>
                {item.items.map((food, i) => (
                 <View key={i} style={styles.foodCard}>
                 <Image source={require("./logo.webp" )/*food.image*/} style={styles.foodImage} />
                 <View>
                   <Text style={styles.foodName}>{food.name}</Text>
                   <Text>🔥 {food.calories} Calories</Text>
                   <Text>🍗 {food.proteins}g 🥖 {food.carbs}g 🥑 {food.fats}g</Text>
                 </View>
               </View>
                ))}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003973',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#E5E5BE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003973',
    marginBottom: 6,
  },
  summary: {
    fontSize: 14,
    color: '#333',
  },
  arrow: {
    fontSize: 20,
    color: '#003973',
    fontWeight: 'bold',
  },
  details: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  foodCard: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 8,
  },
  foodImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FoodHistory;
