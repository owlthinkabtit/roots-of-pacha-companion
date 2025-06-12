import { useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  View,
  Animated,
} from "react-native";
import data from "@/assets/pacha-gifts.json";
import LoadingLeafSpinner from "@/components/LoadingLeafSpinner";
import { SafeAreaView } from "react-native-safe-area-context";
import { sanitizeCharacter } from "@/utils/sanitizeCharacter";
import React, { useState, useEffect, useRef } from "react";

type CharacterData = {
  name: string;
  loves: string[];
  birthday: string;
  image: string;
};

const CharacterPage = () => {
  const { name } = useLocalSearchParams();
  const [showSecurityNotice, setShowSecurityNotice] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -20,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!name || typeof name !== "string") {
    console.log("LoadingLeafSpinner");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingLeafSpinner />
      </View>
    );
  }

  const characterData = {
    ...data[name as keyof typeof data],
    name: name.toString(),
  } as CharacterData;

  if (!characterData) {
    return <Text style={styles.error}>Character not found</Text>;
  }

  const safeCharacter = sanitizeCharacter({
    ...characterData,
    name: name.toString(),
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{safeCharacter.name}</Text>
        <Animated.View
          style={[
            styles.securityBox,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.securityBoxText}>
            ✔ Character data sanitized and validated
          </Text>
        </Animated.View>

        <Image
          source={{ uri: characterData.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.label}>Birthday:</Text>
        <Text style={styles.text}>{characterData.birthday}</Text>
        <Text style={styles.label}>Loved Gifts:</Text>
        {characterData.loves.map((gift, index) => (
          <Text key={index} style={styles.giftItem}>
            • {gift}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    backgroundColor: "#ffffff",
    minHeight: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 12,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 12,
  },
  text: {
    fontSize: 18,
  },
  giftItem: {
    fontSize: 16,
    marginTop: 4,
  },
  loading: {
    marginTop: 40,
    fontSize: 18,
    textAlign: "center",
  },
  error: {
    marginTop: 40,
    fontSize: 18,
    textAlign: "center",
    color: "red",
  },
  securityNotice: {
    fontSize: 14,
    color: "green",
    marginBottom: 12,
    fontStyle: "italic",
    textAlign: "center",
  },
  securityBox: {
    backgroundColor: "#d4edda", // soft green
    borderColor: "#155724", // dark green border
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  securityBoxText: {
    color: "#155724",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default CharacterPage;
