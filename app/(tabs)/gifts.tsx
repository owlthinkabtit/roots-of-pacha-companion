import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import giftData from '../../assets/pacha-gifts.json';

export default function GiftsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {Object.entries(giftData).map(([character, gifts]) => (
          <View key={character} style={styles.card}>
            <Text style={styles.name}>{character}</Text>
            {gifts.map((item, index) => (
              <Text key={index} style={styles.item}>• {item}</Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 20,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fce7f3',
    padding: 15,
    borderRadius: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#9d174d',
  },
  item: {
    fontSize: 16,
    color: '#444',
  },
});
