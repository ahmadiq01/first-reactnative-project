// app/_layout.tsx — ROOT LAYOUT (from again)
import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { useAppStore } from '@/store/useAppStore';

export default function RootLayout() {
  const { scheduleMorningOrbit, scheduleStreakReminder } = useNotifications();
  const { streak } = useAppStore();

  useEffect(() => {
    scheduleMorningOrbit(6, 0);
    if (streak > 0) scheduleStreakReminder(streak);
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* ── Auth ── */}
        <Stack.Screen name="auth/index" options={{ headerShown: false }} />
        {/* ── Onboarding ── */}
        <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
        {/* ── Main tabs ── */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* ── Bot builder ── */}
        <Stack.Screen name="bot-builder/step1" options={{ title: 'Build your bot', headerBackTitle: '' }} />
        <Stack.Screen name="bot-builder/step2" options={{ title: 'Focus areas', headerBackTitle: '' }} />
        <Stack.Screen name="bot-builder/step3" options={{ title: 'Communication style', headerBackTitle: '' }} />
        <Stack.Screen name="bot-builder/step4" options={{ title: 'Name your bot', headerBackTitle: '' }} />
        {/* ── Evaluate ── */}
        <Stack.Screen name="evaluate/index" options={{ title: 'Evaluate an idea', headerBackTitle: '' }} />
        <Stack.Screen name="evaluate/result" options={{ title: 'Your evaluation', headerBackTitle: '' }} />
        {/* ── Library ── */}
        <Stack.Screen name="library/index" options={{ title: 'My library', headerBackTitle: '' }} />
        {/* ── Settings ── */}
        <Stack.Screen name="settings/notifications" options={{ title: 'Notifications', headerBackTitle: '' }} />
        {/* ── Reflection ── */}
        <Stack.Screen name="reflection/index" options={{ title: 'Weekly reflection', headerBackTitle: '' }} />
        {/* ── Modal (streak, upgrade, levelup) ── */}
        <Stack.Screen
          name="modal"
          options={{ presentation: 'modal', headerShown: false }}
        />
      </Stack>
    </>
  );
}
