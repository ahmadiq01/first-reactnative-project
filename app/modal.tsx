// app/modal.tsx — from again (unused window dimensions omitted)
// Usage: router.push({ pathname: '/modal', params: { type: 'streak', value: '7' } })

import {
  View, Text, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';

type ModalType = 'streak' | 'upgrade' | 'share' | 'levelup';

const STREAK_MILESTONES: Record<number, { emoji: string; title: string; message: string; unlock?: string }> = {
  3:  { emoji: '🔥', title: '3-day streak!', message: 'You\'re building a real habit. Keep going.', },
  7:  { emoji: '⭐', title: '7 days straight!', message: 'You just unlocked The Strategist persona.', unlock: 'The Strategist' },
  14: { emoji: '🌟', title: '2-week streak!', message: 'You\'re in the top 5% of North Star users.', },
  30: { emoji: '✦', title: '30-day North Star!', message: 'You\'ve unlocked The Philosopher persona.', unlock: 'The Philosopher' },
};

export default function ModalScreen() {
  const { type, value, title, message } = useLocalSearchParams<{
    type: ModalType;
    value?: string;
    title?: string;
    message?: string;
  }>();
  const { addStarDust } = useAppStore();

  function close() {
    router.back();
  }

  if (type === 'streak') {
    const days = parseInt(value ?? '0');
    const milestone = STREAK_MILESTONES[days];

    return (
      <SafeAreaView className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl px-6 pt-8 pb-10">
          <View className="items-center mb-6">
            <Text style={{ fontSize: 56 }} className="mb-3">{milestone?.emoji ?? '🔥'}</Text>
            <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
              {milestone?.title ?? `${days}-day streak!`}
            </Text>
            <Text className="text-sm text-gray-500 text-center leading-5">
              {milestone?.message ?? 'Keep the momentum going every morning.'}
            </Text>
          </View>

          {milestone?.unlock && (
            <View className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 items-center">
              <Text className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">
                New persona unlocked
              </Text>
              <Text className="text-base font-bold text-amber-900">{milestone.unlock}</Text>
              <Text className="text-xs text-amber-600 mt-1">Available in Bot Builder</Text>
            </View>
          )}

          <View className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-6 flex-row items-center justify-between">
            <Text className="text-sm text-blue-700">Streak bonus earned</Text>
            <Text className="text-sm font-bold text-blue-800">+30 Star Dust ✦</Text>
          </View>

          <TouchableOpacity
            onPress={() => { addStarDust(30); close(); }}
            className="bg-gray-900 rounded-2xl py-4 items-center"
          >
            <Text className="text-sm font-semibold text-white">Claim reward ✦</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (type === 'upgrade') {
    const PRO_FEATURES = [
      { icon: '∞', label: 'Unlimited evaluations', sub: 'Free plan: 5/month' },
      { icon: '📄', label: 'PDF export of reports', sub: 'Share with investors' },
      { icon: '💬', label: 'Follow-up AI chat', sub: 'Refine any evaluation' },
      { icon: '📅', label: 'Weekly bot reflection', sub: 'Sunday goal review' },
      { icon: '📈', label: 'KSE-100 screener', sub: 'Live Pakistan market data' },
      { icon: '🪙', label: 'Crypto analyzer', sub: 'Portfolio signals' },
    ];

    return (
      <SafeAreaView className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl px-6 pt-8 pb-10">
          <Text className="text-2xl font-bold text-gray-900 text-center mb-1">
            Upgrade to Pro
          </Text>
          <Text className="text-sm text-gray-500 text-center mb-6">
            Everything you need to make better decisions, faster.
          </Text>

          <View className="gap-3 mb-6">
            {PRO_FEATURES.map((f) => (
              <View key={f.label} className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-lg bg-blue-50 items-center justify-center">
                  <Text className="text-sm">{f.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-medium text-gray-900">{f.label}</Text>
                  <Text className="text-xs text-gray-400">{f.sub}</Text>
                </View>
                <Text className="text-green-600 text-xs font-semibold">✓ Pro</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity className="bg-blue-600 rounded-2xl py-4 items-center mb-3">
            <Text className="text-sm font-bold text-white">Start Pro — PKR 499/month</Text>
            <Text className="text-xs text-blue-200 mt-0.5">Cancel anytime via JazzCash or card</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={close} className="py-3 items-center">
            <Text className="text-sm text-gray-400">Maybe later</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (type === 'levelup') {
    return (
      <SafeAreaView className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl px-6 pt-8 pb-10 items-center">
          <Text style={{ fontSize: 60 }} className="mb-4">🌟</Text>
          <Text className="text-2xl font-bold text-gray-900 mb-2">{title ?? 'Level up!'}</Text>
          <Text className="text-sm text-gray-500 text-center mb-8">
            {message ?? 'You\'ve reached a new level on North Star.'}
          </Text>
          <TouchableOpacity
            onPress={close}
            className="bg-amber-500 rounded-2xl py-4 px-10 items-center"
          >
            <Text className="text-sm font-bold text-white">Awesome ✦</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black/50 justify-end">
      <View className="bg-white rounded-t-3xl px-6 pt-8 pb-10 items-center">
        <Text className="text-xl font-bold text-gray-900 mb-4">{title ?? 'North Star'}</Text>
        <Text className="text-sm text-gray-500 text-center mb-8">{message ?? ''}</Text>
        <TouchableOpacity onPress={close} className="bg-gray-900 rounded-2xl py-4 px-10">
          <Text className="text-sm font-semibold text-white">Close</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
