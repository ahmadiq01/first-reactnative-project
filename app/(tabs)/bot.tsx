import { View, Text, StyleSheet } from 'react-native';

export default function BotScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.circleDecoration, { backgroundColor: '#f3e5f5' }]} />
      <Text style={styles.title}>AI Bot</Text>
      <Text style={styles.description}>Your assistant is ready.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  circleDecoration: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a' },
  description: { color: '#868e96', marginTop: 8 }
});
