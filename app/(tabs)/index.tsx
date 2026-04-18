// app/(tabs)/index.tsx
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';
import { StreakBar } from '@/components/ui/StreakBar';
import { OrbitCard } from '@/components/ui/OrbitCard';
import { SectionLabel } from '@/components/layout/SectionLabel';
import { PERSONAS } from '@/constants/personas';

export default function HomeScreen() {
  const { userName, streak, starDust, evaluations, selectedPersonaId } = useAppStore();
  const persona = PERSONAS.find((p) => p.id === selectedPersonaId);
  const streakTarget = streak < 7 ? 7 : 30;
  const nextUnlock = streak < 7 ? 'The Strategist' : 'The Philosopher';

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
          <View>
            <Text className="text-xs text-gray-400">Good morning,</Text>
            <Text className="text-xl font-semibold text-gray-900">{userName} ✦</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="bg-amber-100 rounded-full px-3 py-1">
              <Text className="text-xs font-semibold text-amber-800">
                {starDust} ✦
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/profile')}
              className="w-9 h-9 rounded-full bg-blue-100 items-center justify-center"
            >
              <Text className="text-xs font-semibold text-blue-800">
                {userName.slice(0, 2).toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-4">
          {/* ── Streak ── */}
          <StreakBar streak={streak} target={streakTarget} nextUnlock={nextUnlock} />

          {/* ── Today's Orbit ── */}
          <SectionLabel label="Today's orbit" />
          <OrbitCard
            categories="Business + Finance"
            headline='"The side hustle window is open right now — here\'s what the data says"'
            onReadPress={() => router.push('/(tabs)/orbit')}
            onBotPress={() => router.push('/(tabs)/bot')}
          />

          {/* ── Quick Actions ── */}
          <SectionLabel label="Quick actions" />
          <View className="flex-row flex-wrap gap-2 mb-2">
            <TouchableOpacity
              onPress={() => router.push('/evaluate/index')}
              className="flex-1 min-w-[44%] border border-gray-200 rounded-xl p-3 bg-white"
            >
              <View className="w-8 h-8 rounded-lg bg-blue-50 items-center justify-center mb-2">
                <Text style={{ fontSize: 16 }}>💡</Text>
              </View>
              <Text className="text-xs font-medium text-gray-900">Evaluate idea</Text>
              <Text className="text-[10px] text-gray-400 mt-0.5">Business · Finance · More</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/(tabs)/bot')}
              className="flex-1 min-w-[44%] border border-gray-200 rounded-xl p-3 bg-white"
            >
              <View className="w-8 h-8 rounded-lg bg-green-50 items-center justify-center mb-2">
                <Text style={{ fontSize: 16 }}>{persona?.emoji ?? '🤖'}</Text>
              </View>
              <Text className="text-xs font-medium text-gray-900">My bot</Text>
              <Text className="text-[10px] text-gray-400 mt-0.5">
                {persona?.name ?? 'The Coach'} · Active
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/(tabs)/rewards')}
              className="flex-1 min-w-[44%] border border-gray-200 rounded-xl p-3 bg-white"
            >
              <View className="w-8 h-8 rounded-lg bg-amber-50 items-center justify-center mb-2">
                <Text style={{ fontSize: 16 }}>⭐</Text>
              </View>
              <Text className="text-xs font-medium text-gray-900">Star Dust</Text>
              <Text className="text-[10px] text-gray-400 mt-0.5">{starDust} · Level 3</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 min-w-[44%] border border-gray-200 rounded-xl p-3 bg-white"
            >
              <View className="w-8 h-8 rounded-lg bg-gray-100 items-center justify-center mb-2">
                <Text style={{ fontSize: 16 }}>📚</Text>
              </View>
              <Text className="text-xs font-medium text-gray-900">My library</Text>
              <Text className="text-[10px] text-gray-400 mt-0.5">12 saved articles</Text>
            </TouchableOpacity>
          </View>

          {/* ── Past Evaluations ── */}
          {evaluations.length > 0 && (
            <>
              <SectionLabel label="Past evaluations" />
              {evaluations.slice(0, 3).map((ev) => (
                <TouchableOpacity
                  key={ev.id}
                  className="border border-gray-200 rounded-xl p-3 mb-2 flex-row items-center gap-3"
                  onPress={() => router.push({ pathname: '/evaluate/result', params: { id: ev.id } })}
                >
                  <View
                    className={`w-10 h-10 rounded-lg items-center justify-center ${
                      ev.score >= 75 ? 'bg-green-100' : ev.score >= 50 ? 'bg-amber-100' : 'bg-red-100'
                    }`}
                  >
                    <Text
                      className={`text-sm font-bold ${
                        ev.score >= 75 ? 'text-green-700' : ev.score >= 50 ? 'text-amber-700' : 'text-red-700'
                      }`}
                    >
                      {ev.score}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-900">{ev.idea}</Text>
                    <Text className="text-xs text-gray-400">
                      {ev.domain} · {new Date(ev.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* ── Empty state if no evaluations ── */}
          {evaluations.length === 0 && (
            <TouchableOpacity
              onPress={() => router.push('/evaluate/index')}
              className="border border-dashed border-gray-300 rounded-xl p-5 items-center mt-2 mb-4"
            >
              <Text style={{ fontSize: 24 }} className="mb-2">💡</Text>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Evaluate your first idea
              </Text>
              <Text className="text-xs text-gray-400 text-center">
                Type any business idea, career move, or financial decision
              </Text>
            </TouchableOpacity>
          )}

          <View className="h-8" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}