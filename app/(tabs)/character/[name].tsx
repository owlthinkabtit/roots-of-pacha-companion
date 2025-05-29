import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, Image, StyleSheet, View } from "react-native";
import data from "@/assets/pacha-gifts.json";
import LoadingLeafSpinner from "@/components/LoadingLeafSpinner";
import { SafeAreaView } from "react-native-safe-area-context";

type CharacterData = {
  loves: string[];
  birthday: string;
  image: string;
};

const CharacterPage = () => {
  const { name } = useLocalSearchParams();

  if (!name || typeof name !== "string") {
    console.log("LoadingLeafSpinner");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingLeafSpinner />
      </View>
    );
  }

  const characterData = data[name as keyof typeof data] as CharacterData;

  if (!characterData) {
    return <Text style={styles.error}>Character not found</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{name}</Text>
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
});

export default CharacterPage;
