// app/settings/notifications.tsx — from again/notifications.tsx
import {
  View, Text, ScrollView, SafeAreaView,
  TouchableOpacity, Switch,
} from 'react-native';
import { useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { useAppStore } from '@/store/useAppStore';
import { SectionLabel } from '@/components/layout/SectionLabel';

const HOURS = Array.from({ length: 12 }, (_, i) => i + 5); // 5am–4pm

export default function NotificationSettingsScreen() {
  const { scheduleMorningOrbit, scheduleStreakReminder, permissionGranted } = useNotifications();
  const { streak } = useAppStore();

  const [orbitEnabled, setOrbitEnabled] = useState(true);
  const [streakEnabled, setStreakEnabled] = useState(true);
  const [weeklyEnabled, setWeeklyEnabled] = useState(true);
  const [selectedHour, setSelectedHour] = useState(6);
  const [saved, setSaved] = useState(false);

  async function saveSettings() {
    if (orbitEnabled) await scheduleMorningOrbit(selectedHour, 0);
    if (streakEnabled) await scheduleStreakReminder(streak);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const formatHour = (h: number) => {
    const suffix = h >= 12 ? 'PM' : 'AM';
    const display = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${display}:00 ${suffix}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <Text className="text-xl font-semibold text-gray-900 pt-4 mb-1">Notifications</Text>
        <Text className="text-sm text-gray-500 mb-6">
          Every notification delivers real value — never empty pings.
        </Text>

        {!permissionGranted && (
          <View className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
            <Text className="text-xs font-semibold text-amber-800 mb-1">
              Notifications are disabled
            </Text>
            <Text className="text-xs text-amber-700">
              Go to Settings → North Star → Allow Notifications to enable them.
            </Text>
          </View>
        )}

        {/* Morning time picker */}
        <SectionLabel label="Morning orbit time" />
        <View className="border border-gray-200 rounded-xl p-3 mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <View>
              <Text className="text-sm font-medium text-gray-900">Daily orbit notification</Text>
              <Text className="text-xs text-gray-400">Curiosity-gap headline to start your day</Text>
            </View>
            <Switch
              value={orbitEnabled}
              onValueChange={setOrbitEnabled}
            />
          </View>

          {orbitEnabled && (
            <>
              <Text className="text-xs text-gray-500 mb-2">Wake-up time:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  {HOURS.map((h) => (
                    <TouchableOpacity
                      key={h}
                      onPress={() => setSelectedHour(h)}
                      className={`px-3 py-2 rounded-lg border ${
                        selectedHour === h
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <Text className={`text-xs font-medium ${
                        selectedHour === h ? 'text-white' : 'text-gray-700'
                      }`}>
                        {formatHour(h)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </>
          )}
        </View>

        {/* Notification types */}
        <SectionLabel label="Notification types" />
        <View className="border border-gray-200 rounded-xl overflow-hidden mb-4">
          <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
            <View className="flex-1 pr-4">
              <Text className="text-sm font-medium text-gray-900">Streak at risk</Text>
              <Text className="text-xs text-gray-400">
                Sent at 9pm if you haven't opened the app yet
              </Text>
            </View>
            <Switch value={streakEnabled} onValueChange={setStreakEnabled} />
          </View>

          <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
            <View className="flex-1 pr-4">
              <Text className="text-sm font-medium text-gray-900">Weekly reflection ready</Text>
              <Text className="text-xs text-gray-400">
                Sunday morning — your bot reviews your week
              </Text>
            </View>
            <Switch value={weeklyEnabled} onValueChange={setWeeklyEnabled} />
          </View>

          <View className="flex-row items-center justify-between px-4 py-3">
            <View className="flex-1 pr-4">
              <Text className="text-sm font-medium text-gray-900">Re-evaluate nudge</Text>
              <Text className="text-xs text-gray-400">
                When market data updates on a past evaluation
              </Text>
            </View>
            <Switch value={true} disabled />
          </View>
        </View>

        {/* Preview */}
        <SectionLabel label="What your notification looks like" />
        <View className="bg-gray-50 rounded-xl p-4 mb-6">
          <View className="flex-row items-start gap-3">
            <View className="w-8 h-8 rounded-lg bg-blue-600 items-center justify-center flex-shrink-0">
              <Text className="text-white text-xs font-bold">✦</Text>
            </View>
            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-0.5">
                <Text className="text-xs font-semibold text-gray-900">North Star</Text>
                <Text className="text-xs text-gray-400">{formatHour(selectedHour)}</Text>
              </View>
              <Text className="text-xs font-medium text-gray-900 mb-0.5">
                Your freelance window is open this week
              </Text>
              <Text className="text-xs text-gray-500">
                Your Coach has spotted 3 opportunities. Orbit ready.
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={saveSettings}
          className={`rounded-xl py-4 items-center mb-8 ${
            saved ? 'bg-green-600' : 'bg-blue-600'
          }`}
        >
          <Text className="text-sm font-semibold text-white">
            {saved ? '✓ Saved' : 'Save notification settings'}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
