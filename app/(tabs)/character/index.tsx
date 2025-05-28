import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
  Linking,
  TextInput,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import data from "@/assets/pacha-gifts.json";
import { SafeAreaView } from "react-native-safe-area-context";

type CharacterData = {
  loves: string[];
  birthday: string;
  image: string;
  tribe: string;
  romanceable: boolean;
};

const characters = Object.entries(data) as [string, CharacterData][];

const CharactersIndexPage = () => {
  const [searchText, setSearchText] = useState("");
  const [showRomanceableOnly, setShowRomanceableOnly] = useState(false);
  const [selectedTribe, setSelectedTribe] = useState("All");
  const router = useRouter();
  const [expandedTribes, setExpandedTribes] = useState<Record<string, boolean>>(
    {}
  );

  const filteredCharacters = Object.entries(data).filter(
    ([name, character]) => {
      const matchesSearch = name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesTribe =
        selectedTribe === "All" || character.tribe === selectedTribe;
      const matchesRomanceable = !showRomanceableOnly || character.romanceable;
      return matchesSearch && matchesTribe && matchesRomanceable;
    }
  );

  const groupedByTribe = filteredCharacters.reduce(
    (groups, [name, character]) => {
      const tribe = character.tribe || "Unknown Tribe";
      if (!groups[tribe]) {
        groups[tribe] = [];
      }
      groups[tribe].push([name, character]);
      return groups;
    },
    {} as Record<string, [string, CharacterData][]>
  );

  const toggleTribe = (tribe: string) => {
    setExpandedTribes((prev) => ({
      ...prev,
      [tribe]: !prev[tribe],
    }));
  };

  const tribeColors: Record<string, string> = {
    "Pacha Clan": "#b5e48c",
    "Yakuan Clan": "#a9def9",
    "Mograni Clan": "#ffe5a0",
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.list}>
        <View style={styles.buttonRow}>
          {["All", "Yakuan Clan", "Pacha Clan", "Mograni Clan"].map((tribe) => (
            <Pressable
              key={tribe}
              onPress={() => setSelectedTribe(tribe)}
              style={[
                styles.tribeButton,
                selectedTribe === tribe && styles.tribeButtonActive,
              ]}
            >
              <Text style={styles.tribeButtonText}>{tribe}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={() => setShowRomanceableOnly((prev) => !prev)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleButtonText}>
            {showRomanceableOnly
              ? "💔 Show All Characters"
              : "💘 Show Only Romanceable"}
          </Text>
        </Pressable>

        <TextInput
          style={styles.searchInput}
          placeholder="Search characters..."
          value={searchText}
          onChangeText={setSearchText}
        />

        {Object.entries(groupedByTribe).map(([tribeName, characters]) => (
          <View key={tribeName} style={styles.tribeGroup}>
            <Pressable
              onPress={() => toggleTribe(tribeName)}
              style={{
                backgroundColor: tribeColors[tribeName] || tribeColors["Unknown Tribe"],
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
                marginBottom: 8,
              }}
            >
              <Text style={styles.tribeHeader}>{tribeName}</Text>
            </Pressable>

            {expandedTribes[tribeName] && (
              <FlatList
                data={characters}
                numColumns={2}
                columnWrapperStyle={styles.row}
                keyExtractor={([name]) => name}
                renderItem={({ item: [name, character] }) => (
                  <Pressable
                    key={name}
                    onPress={() => Linking.openURL(`/character/${name}`)}
                    style={styles.card}
                  >
                    <Image
                      source={{ uri: character.image }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                    <Text style={styles.name}>
                      {name} {character.romanceable ? "💖" : ""}
                    </Text>
                  </Pressable>
                )}
              />
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  list: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingBottom: 40,
  },
  card: {
    width: "47%",
    marginVertical: 10,
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchInput: {
    width: "90%",
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
  },
  tribeGroup: {
    width: "100%",
    paddingBottom: 24,
    alignItems: "center",
  },
  tribeHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  toggleButton: {
    marginBottom: 12,
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginBottom: 16,
  },
  tribeButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  tribeButtonActive: {
    backgroundColor: "#84cc16",
  },
  tribeButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
});

export default CharactersIndexPage;
