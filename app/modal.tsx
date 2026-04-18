import { Link, useRouter } from 'expo-router';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.modalTitle}>Quick Actions</Text>

      <Pressable style={styles.option} onPress={() => router.back()}>
        <Text style={styles.optionText}>Option 1: Refresh Data</Text>
      </Pressable>

      <Link href="/" style={styles.closeLink}>
        <Text style={{ color: '#ff4d4f', fontWeight: '600' }}>Close Modal</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 30 },
  option: { width: '100%', padding: 18, backgroundColor: '#f8f9fa', borderRadius: 12, marginBottom: 12 },
  optionText: { fontSize: 16, color: '#333' },
  closeLink: { marginTop: 20 }
});
