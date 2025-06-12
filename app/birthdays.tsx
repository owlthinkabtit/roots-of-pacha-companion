import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import data from "@/assets/pacha-gifts.json";

type CharacterData = {
  loves: string[];
  birthday: string;
  image: string;
  tribe: string;
  romanceable: boolean;
};

const BirthdaysCalendarPage = () => {
  const characterEntries = Object.entries(data) as [string, CharacterData][];

  const markedDates: Record<string, { marked: boolean; dotColor: string }> = {};
  const birthdayMap: Record<string, string[]> = {};

  characterEntries.forEach(([name, character]) => {
    const [month, day] = character.birthday.split(" ");
    const formattedMonth = new Date(`${month} 1, 2000`).getMonth() + 1;
    const dateStr = `2025-${String(formattedMonth).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    markedDates[dateStr] = {
      marked: true,
      dotColor: "#84cc16",
    };

    if (!birthdayMap[dateStr]) birthdayMap[dateStr] = [];
    birthdayMap[dateStr].push(name);
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Calendar
        markedDates={markedDates}
        onDayPress={(day) => {
          const names = birthdayMap[day.dateString];
          if (names) {
            Alert.alert("🎉 Birthday(s)", names.join("\n"));
          }
        }}
        style={styles.calendar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  calendar: {
    marginTop: 16,
  },
});

export default BirthdaysCalendarPage;
