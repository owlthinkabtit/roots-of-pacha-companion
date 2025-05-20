import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Linking } from 'react-native';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌿 Roots of Pacha Companion</Text>
      <Text style={styles.subtitle}>Track birthdays, gifts, and more!</Text>

      <Pressable
        onPress={() => Linking.openURL('/character')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>View Characters</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    color: '#555',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
