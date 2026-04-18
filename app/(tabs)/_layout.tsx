import { Tabs } from 'expo-router';
import '../global.css';
export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="bot" options={{ title: 'Bot' }} />
      <Tabs.Screen name="orbit" options={{ title: 'Orbit' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
