// app/(tabs)/orbit.tsx
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { getDailyOrbit } from '@/services/api';
import { SectionLabel } from '@/components/layout/SectionLabel';

interface OrbitData {
  headline: string;
  body: string;
  action: string;
  insight: string;
}

const MOCK_ORBIT: OrbitData = {
  headline: 'The side hustle window is open right now — here\'s what the data says',
  body: 'Three things worth your attention today: freelance platform Contra quietly added Urdu support — that\'s a real opportunity for Pakistani freelancers. The SBP just raised savings rates again, which means your idle cash is quietly losing value. And a reframe from Marcus Aurelius on how to stop overthinking decisions that takes 30 seconds to apply.',
  action: 'Open your Upwork profile today and update your headline to mention AI tools. Profiles with "AI" in the headline get 40% more invitations right now.',
  insight: '"You have power over your mind — not outside events. Realize this, and you will find strength." — Marcus Aurelius',
};

export default function OrbitScreen() {
  const { focusAreas, userName, setOrbitRead, addStarDust } = useAppStore();
  const [orbit, setOrbit] = useState<OrbitData | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState<boolean | null>(null);

  useEffect(() => {
    loadOrbit();
  }, []);

  async function loadOrbit() {
    try {
      const data = await getDailyOrbit(focusAreas, userName);
      setOrbit(data);
    } catch {
      setOrbit(MOCK_ORBIT);
    } finally {
      setLoading(false);
      setOrbitRead(true);
      addStarDust(5);
    }
  }

  const data = orbit ?? MOCK_ORBIT;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View className="px-4 pt-4 pb-2">
          <View className="flex-row items-center gap-2 mb-1">
            <View className="bg-blue-100 rounded-full px-2 py-0.5">
              <Text className="text-xs font-medium text-blue-800">
                {new Date().toLocaleDateString('en-PK', { weekday: 'long', month: 'long', day: 'numeric' })}
              </Text>
            </View>
          </View>
          {loading ? (
            <View className="h-6 bg-gray-100 rounded-lg animate-pulse mb-1" />
          ) : (
            <Text className="text-xl font-semibold text-gray-900 leading-7">
              {data.headline}
            </Text>
          )}
        </View>

        <View className="px-4">

          {/* ── Body ── */}
          <SectionLabel label="Today's signal" />
          {loading ? (
            <View className="gap-2">
              {[1, 2, 3].map((i) => (
                <View key={i} className="h-4 bg-gray-100 rounded" />
              ))}
            </View>
          ) : (
            <Text className="text-sm text-gray-700 leading-6">{data.body}</Text>
          )}

          {/* ── Action of the day ── */}
          <SectionLabel label="Action of the day" />
          <View className="bg-green-50 border border-green-200 rounded-xl p-4">
            <Text className="text-xs font-semibold text-green-700 mb-1 uppercase tracking-wide">
              Do this today
            </Text>
            <Text className="text-sm text-green-900 leading-5">{data.action}</Text>
            <TouchableOpacity
              className="mt-3 bg-green-600 rounded-lg py-2 px-4 self-start"
              onPress={() => router.push('/(tabs)/bot')}
            >
              <Text className="text-xs font-medium text-white">Discuss with my bot →</Text>
            </TouchableOpacity>
          </View>

          {/* ── Insight ── */}
          <SectionLabel label="Today's insight" />
          <View className="border-l-4 border-blue-300 pl-4 py-2 mb-4">
            <Text className="text-sm text-gray-700 italic leading-5">{data.insight}</Text>
          </View>

          {/* ── Feedback ── */}
          <View className="border border-gray-200 rounded-xl p-3 mb-4">
            <Text className="text-xs text-gray-500 mb-2 text-center">
              Was this orbit useful?
            </Text>
            <View className="flex-row justify-center gap-4">
              <TouchableOpacity
                onPress={() => { setLiked(true); addStarDust(5); }}
                className={`flex-row items-center gap-1 px-4 py-2 rounded-lg border ${
                  liked === true ? 'bg-green-100 border-green-300' : 'border-gray-200'
                }`}
              >
                <Text style={{ fontSize: 14 }}>👍</Text>
                <Text className="text-xs text-gray-700">More like this</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLiked(false)}
                className={`flex-row items-center gap-1 px-4 py-2 rounded-lg border ${
                  liked === false ? 'bg-red-100 border-red-300' : 'border-gray-200'
                }`}
              >
                <Text style={{ fontSize: 14 }}>👎</Text>
                <Text className="text-xs text-gray-700">Less like this</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── CTA to Decizia ── */}
          <TouchableOpacity
            onPress={() => router.push('/evaluate/index')}
            className="bg-blue-600 rounded-xl p-4 mb-8 flex-row items-center justify-between"
          >
            <View>
              <Text className="text-sm font-semibold text-white">Ready to evaluate an idea?</Text>
              <Text className="text-xs text-blue-200 mt-0.5">
                Today's signals might spark something
              </Text>
            </View>
            <Text className="text-white text-lg">→</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}