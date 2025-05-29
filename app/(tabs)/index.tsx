import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomePage() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("@/assets/images/ropappHP.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.footer}>
        <Pressable
          onPress={() => router.push("/character")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>View Characters</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    alignItems: "center",
    marginTop: 40,
  },
  footer: {
    position: "absolute",
    alignItems: "center",
    marginBottom: 50,
    bottom: 250,
    width: "100%",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "#CB6845",
    borderRadius: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
