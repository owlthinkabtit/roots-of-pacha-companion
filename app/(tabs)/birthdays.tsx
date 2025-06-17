import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import data from "@/assets/pacha-gifts.json";

const SEASONS = ["Spring", "Summer", "Fall", "Winter"];
const DAYS_IN_SEASON = 28;

const birthdayMap: Record<string, Record<string, string[]>> = {
  Spring: {},
  Summer: {},
  Fall: {},
  Winter: {},
};

Object.entries(data).forEach(([name, character]) => {
  const [season, day] = character.birthday.split(" ");
  if (!birthdayMap[season]) birthdayMap[season] = {};
  if (!birthdayMap[season][day]) birthdayMap[season][day] = [];
  birthdayMap[season][day].push(name);
});

const BirthdayCalendar = () => {
  const [selectedSeason, setSelectedSeason] = useState("Spring");

  const renderDay = (day: number) => {
    const dayStr = String(day);
    const hasBirthday = birthdayMap[selectedSeason]?.[dayStr];
    return (
      <TouchableOpacity
        key={day}
        style={[styles.dayBox, hasBirthday && styles.birthdayBox]}
        onPress={() => {
          if (hasBirthday) {
            Alert.alert("🎉 Birthday(s)", hasBirthday.join("\n"));
          }
        }}
      >
        <Text style={styles.dayText}>{day}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={styles.seasonTabs}>
          {SEASONS.map((season) => (
            <TouchableOpacity
              key={season}
              onPress={() => setSelectedSeason(season)}
              style={[
                styles.tab,
                selectedSeason === season && styles.activeTab,
              ]}
            >
              <Text
                style={
                  selectedSeason === season
                    ? styles.activeTabText
                    : styles.tabText
                }
              >
                {season}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.calendarGrid}>
          {[...Array(DAYS_IN_SEASON)].map((_, i) => renderDay(i + 1))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  seasonTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  tab: {
    padding: 8,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#84cc16",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dayBox: {
    width: "13%",
    aspectRatio: 1,
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  birthdayBox: {
    backgroundColor: "#ecfccb",
    borderColor: "#84cc16",
  },
  dayText: {
    fontSize: 14,
  },
});

export default BirthdayCalendar;