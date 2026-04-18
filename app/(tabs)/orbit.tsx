import { View, Text, StyleSheet } from 'react-native';

export default function OrbitScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.circleDecoration, { backgroundColor: '#e8f5e9' }]} />
      <Text style={styles.title}>Orbit Space</Text>
      <Text style={styles.description}>Explore the universe here.</Text>
    </View>
  );
}

// YOU NEED THIS SECTION IN EVERY FILE:
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  circleDecoration: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a'
  },
  description: {
    color: '#868e96',
    marginTop: 8
  }
});
