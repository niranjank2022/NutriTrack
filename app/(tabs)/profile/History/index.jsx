import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const HistoryPage = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select History Type</Text>

      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={() => router.push('profile/History/foodHistory')}
        style={styles.buttonWrapper}
      >
        <LinearGradient 
          colors={["#00A86B", "#007B55"]} 
          style={styles.button}
        >
          <Text style={styles.buttonText}>🍽️ Food History</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={() => router.push('profile/History/waterHistory')}
        style={styles.buttonWrapper}
      >
        <LinearGradient 
          colors={["#0099FF", "#0055AA"]} 
          style={styles.button}
        >
          <Text style={styles.buttonText}>💧 Water Intake History</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    color: '#003973',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  buttonWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    width: 260,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 8,
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default HistoryPage;
