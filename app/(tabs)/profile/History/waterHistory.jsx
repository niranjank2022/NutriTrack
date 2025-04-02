import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';

const mockData = [
  {
    date: '2025-04-01',
    totalIntake: 2500, // in ml
    logs: [
      { time: '08:00 AM', amount: 500,  },
      { time: '12:30 PM', amount: 750,  },
      { time: '04:00 PM', amount: 500,  },
      { time: '08:00 PM', amount: 750,  },
    ],
  },
  {
    date: '2025-03-31',
    totalIntake: 2000,
    logs: [
      { time: '07:30 AM', amount: 500, },
      { time: '01:00 PM', amount: 750, },
      { time: '06:30 PM', amount: 750, },
    ],
  },
];
  
  const WaterHistory = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Water Intake History</Text>
      <FlatList
        data={mockData}
        keyExtractor={(item) => item.date}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <TouchableOpacity style={styles.header} onPress={() => toggleExpand(index)}>
              <View>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.summary}>
                  Total Intake: {item.totalIntake} ml
                </Text>
              </View>
              <Text style={styles.arrow}>{expandedIndex === index ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {expandedIndex === index && (
              <View style={styles.details}>
                {item.logs.map((log, i) => (
                  <View key={i} style={styles.logCard}>
                    <View>
                      <Text style={styles.logTime}>🕒 {log.time}</Text>
                      <Text>💧 {log.amount} ml</Text>
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
  logCard: {
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
  logImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  logTime: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WaterHistory;
