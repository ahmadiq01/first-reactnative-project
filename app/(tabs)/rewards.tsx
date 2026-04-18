import { View, Text, StyleSheet } from 'react-native';

export default function RewardsScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.circleDecoration, { backgroundColor: '#fff3e0' }]} />
      <Text style={styles.title}>Rewards</Text>
      <Text style={styles.description}>You have 0 points.</Text>
    </View>
  );
}

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