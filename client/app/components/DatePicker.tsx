import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface DatePickerProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const getFormattedDate = (date: Date): string =>
    date.toISOString().split("T")[0];

  const renderDatePicker = (): JSX.Element => {
    let days: JSX.Element[] = [];
    let today = new Date();
    today.setDate(today.getDate() - today.getDay() + 1); // Set to Monday

    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    for (let i = 0; i < 7; i++) {
      let day = new Date(today);
      day.setDate(today.getDate() + i);
      let formattedDate = getFormattedDate(day);

      days.push(
        <TouchableOpacity
          key={i}
          style={{
            padding: 10,
            borderRadius: 10,
            backgroundColor:
              selectedDate.toDateString() === day.toDateString()
                ? "#FFA500"
                : "#E5E5E5",
            alignItems: "center",
          }}
          onPress={() => setSelectedDate(day)}
        >
          <Text style={{ fontWeight: "bold" }}>{dayNames[i]}</Text>
          <Text style={{ fontSize: 16 }}>{day.getDate()}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 15,
        }}
      >
        {days}
      </View>
    );
  };

  return <View>{renderDatePicker()}</View>;
};

export default DatePicker;
