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
import data from "@/assets/pacha-gifts.json";

type CharacterData = {
  loves: string[];
  birthday: string;
  image: string;
  tribe: string;
};

const characters = Object.entries(data) as [string, CharacterData][];

const CharactersIndexPage = () => {
  const [searchText, setSearchText] = useState("");

  const filteredCharacters = characters.filter(([name]) =>
  name.toLowerCase().includes(searchText.toLowerCase())
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

  return (
    <ScrollView contentContainerStyle={styles.list}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search characters..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {Object.entries(groupedByTribe).map(([tribeName, characters]) => (
        <View key={tribeName} style={styles.tribeGroup}>
          <Text style={styles.tribeHeader}>{tribeName}</Text>
          {characters.map(([name, character]) => (
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
              <Text style={styles.name}>{name}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  list: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingBottom: 40,
  },
  card: {
    width: "90%",
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
  width: '100%',
  paddingBottom: 24,
  alignItems: 'center',
},

tribeHeader: {
  fontSize: 22,
  fontWeight: 'bold',
  marginVertical: 16,
  color: '#333',
  textAlign: 'center',
},

});

export default CharactersIndexPage;
