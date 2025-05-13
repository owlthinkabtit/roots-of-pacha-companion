import { View, Text, Image, Pressable, FlatList, StyleSheet, Linking } from 'react-native';
import data from '@/assets/pacha-gifts.json';

type CharacterData = {
  loves: string[];
  birthday: string;
  image: string;
};

const characters = Object.entries(data) as [string, CharacterData][];

const CharactersIndexPage = () => {
  return (
    <FlatList
      data={characters}
      keyExtractor={([name]) => name}
      contentContainerStyle={styles.container}
      renderItem={({ item: [name, character] }) => (
        <Pressable
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
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    marginVertical: 10,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    alignItems: 'center',
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
    fontWeight: 'bold',
  },
});

export default CharactersIndexPage;
