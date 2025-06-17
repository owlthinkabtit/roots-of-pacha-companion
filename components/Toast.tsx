import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet, ViewStyle } from "react-native";

type ToastProps = {
  message: string;
  duration?: number;
  type?: "success" | "error" | "info";
};

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, type = "success" }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      // Animate out
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
    }, duration);

    return () => clearTimeout(timer);
  }, [fadeAnim, slideAnim]);

  const getToastStyle = (): ViewStyle => {
    switch (type) {
      case "error":
        return { backgroundColor: "#f8d7da", borderColor: "#721c24" };
      case "info":
        return { backgroundColor: "#d1ecf1", borderColor: "#0c5460" };
      default:
        return { backgroundColor: "#d4edda", borderColor: "#155724" }; // success
    }
  };

  return (
    <Animated.View
      style={[
        styles.toast,
        getToastStyle(),
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  toastText: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default Toast;
