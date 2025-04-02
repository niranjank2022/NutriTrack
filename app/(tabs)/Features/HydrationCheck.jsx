import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';

const DAILY_GOAL = 2500; // Hardcoded water goal in ml

const HydrationCheck = () => {
    const [waterLog, setWaterLog] = useState([]);
    const [waterAmount, setWaterAmount] = useState('');
    const [totalIntake, setTotalIntake] = useState(0);

    useEffect(() => {
        loadWaterLog();
    }, []);

    const loadWaterLog = async () => {
        try {
            const savedLog = await AsyncStorage.getItem('waterLog');
            if (savedLog) {
                const parsedLog = JSON.parse(savedLog);
                const today = new Date().toDateString();

                // Filter only today's logs
                const todayLog = parsedLog.filter(entry => entry.date === today);
                setWaterLog(todayLog);
                setTotalIntake(todayLog.reduce((sum, entry) => sum + parseInt(entry.amount), 0));
            }
        } catch (error) {
            console.error("Error loading water log:", error);
        }
    };

    const logWaterIntake = async () => {
        if (!waterAmount || isNaN(waterAmount) || waterAmount <= 0) {
            Alert.alert('Invalid Input', 'Please enter a valid water amount.');
            return;
        }

        const today = new Date().toDateString();
        const newEntry = {
            id: Date.now().toString(),
            amount: parseInt(waterAmount),
            time: new Date().toLocaleTimeString(),
            date: today
        };

        const updatedLog = [...waterLog, newEntry];
        setWaterLog(updatedLog);
        setTotalIntake(prev => prev + parseInt(waterAmount));

        try {
            await AsyncStorage.setItem('waterLog', JSON.stringify(updatedLog));
        } catch (error) {
            console.error("Error saving water log:", error);
        }

        setWaterAmount('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hydration Check</Text>

            <View style={styles.inputContainer}>
                <Ionicons name="water-outline" size={24} color="#007BFF" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter water (ml)"
                    placeholderTextColor="#007BFF"
                    keyboardType="numeric"
                    value={waterAmount}
                    onChangeText={setWaterAmount}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={logWaterIntake}>
                <Text style={styles.buttonText}>Log Water Intake</Text>
            </TouchableOpacity>

            <Text style={styles.subtitle}>Today's Progress:</Text>
            <ProgressBar 
                progress={totalIntake / DAILY_GOAL} 
                color="#007BFF" 
                style={styles.progressBar} 
            />
            <Text style={styles.progressText}>{totalIntake} / {DAILY_GOAL} ml</Text>

            {totalIntake >= DAILY_GOAL && (
                <Text style={styles.goalMessage}>🎉 You've reached your daily water goal! Keep it up! 💧</Text>
            )}

            <Text style={styles.subtitle}>Today's Log:</Text>
            {waterLog.length === 0 ? (
                <Text style={styles.noDataText}>No water intake logged yet.</Text>
            ) : (
                <FlatList
                    data={waterLog}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.logItem}>
                            <Text style={styles.logText}>{item.amount} ml</Text>
                            <Text style={styles.timeText}>{item.time}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#003973',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        borderRadius: 15,
        padding: 12,
        width: '100%',
        marginBottom: 15,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: '#003973',
    },
    button: {
        width: '100%',
        backgroundColor: '#007BFF',
        padding: 15,
        alignItems: 'center',
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#003973',
        marginTop: 20,
    },
    progressBar: {
        width: '100%',
        height: 10,
        marginTop: 10,
    },
    progressText: {
        fontSize: 16,
        color: '#003973',
        marginTop: 5,
    },
    goalMessage: {
        fontSize: 18,
        color: '#4CAF50',
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    logItem: {
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        padding: 12,
        borderRadius: 10,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    logText: {
        color: '#003973',
        fontSize: 16,
        fontWeight: 'bold',
    },
    timeText: {
        color: '#007BFF',
        fontSize: 14,
    },
    noDataText: {
        color: '#007BFF',
        fontSize: 16,
        marginTop: 10,
    },
});

export default HydrationCheck;
