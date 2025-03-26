import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const DatePicker = ({selectedDate,setSelectedDate}) => {
    // const [selectedDate, setSelectedDate] = useState(new Date());
    const getFormattedDate = (date) => date.toISOString().split('T')[0];
    const DatePicker = () => {
        let days = [];
        let today = new Date();
        today.setDate(today.getDate() - today.getDay() + 1);
        
        const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        for (let i = 0; i < 7; i++) {
          let day = new Date(today);
          day.setDate(today.getDate() + i);
          let formattedDate = getFormattedDate(day);
          
          days.push(
            <TouchableOpacity
              key={i}
              style={{ padding: 10, borderRadius: 10, backgroundColor: selectedDate.toDateString() === day.toDateString() ? '#FFA500' : '#E5E5E5', alignItems: 'center' }}
              onPress={() => setSelectedDate(day)}>
              <Text style={{ fontWeight: 'bold' }}>{dayNames[i]}</Text>
              <Text style={{ fontSize: 16 }}>{day.getDate()}</Text>
            </TouchableOpacity>
          );
        }
        return <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 }}>{days}</View>;
      };
  return (
    <View style={{ }}>
     {DatePicker()}
    </View>
  );
};

export default DatePicker;
