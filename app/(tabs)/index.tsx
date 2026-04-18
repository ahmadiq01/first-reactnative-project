import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome Back,</Text>
        <Text style={styles.title}>Developer</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Project Status</Text>
        <Text style={styles.cardStatus}>● System Active</Text>
      </View>

      <Link href="/modal" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Open Quick Menu</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  header: { marginTop: 60, marginBottom: 40 },
  greeting: { fontSize: 18, color: '#666' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1a1a1a' },
  card: { padding: 20, backgroundColor: '#f1f3f5', borderRadius: 16, marginBottom: 20 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardStatus: { color: '#40c057', marginTop: 5, fontWeight: 'bold' },
  button: { backgroundColor: '#007AFF', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
