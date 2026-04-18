import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';
import { ScoreGauge } from '@/components/ui/ScoreGauge';
import { SectionLabel } from '@/components/layout/SectionLabel';

export default function EvaluateResult() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { evaluations } = useAppStore();
  const ev = evaluations.find((e) => e.id === id);

  if (!ev) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-4">
        <Text className="text-base text-gray-500 text-center">
          Evaluation not found. Go back and try again.
        </Text>
      </SafeAreaView>
    );
  }

  async function shareCard() {
    await Share.share({
      message: `I evaluated my "${ev.idea}" idea on North Star and it scored ${ev.score}/100!\n\nDownload North Star to evaluate your ideas.`,
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <ScoreGauge score={ev.score} />

        <View className="bg-gray-50 rounded-xl p-4 mb-4">
          <Text className="text-sm text-gray-700 leading-6">{ev.summary}</Text>
        </View>

        <SectionLabel label="Strengths" />
        <View className="mb-4">
          {ev.strengths.map((s, i) => (
            <View key={i} className="flex-row gap-2 mb-2">
              <View className="w-5 h-5 rounded-full bg-green-100 items-center justify-center mt-0.5 flex-shrink-0">
                <Text className="text-xs text-green-700">✓</Text>
              </View>
              <Text className="text-sm text-gray-700 flex-1 leading-5">{s}</Text>
            </View>
          ))}
        </View>

        <SectionLabel label="Risks & challenges" />
        <View className="mb-4">
          {ev.risks.map((r, i) => (
            <View key={i} className="flex-row gap-2 mb-2">
              <View className="w-5 h-5 rounded-full bg-red-100 items-center justify-center mt-0.5 flex-shrink-0">
                <Text className="text-xs text-red-600">!</Text>
              </View>
              <Text className="text-sm text-gray-700 flex-1 leading-5">{r}</Text>
            </View>
          ))}
        </View>

        <SectionLabel label="Your next 5 action steps" />
        <View className="border border-gray-200 rounded-xl overflow-hidden mb-4">
          {ev.steps.map((step, i) => (
            <View
              key={i}
              className={`flex-row gap-3 p-3 ${
                i < ev.steps.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <View className="w-6 h-6 rounded-full bg-blue-100 items-center justify-center flex-shrink-0">
                <Text className="text-xs font-semibold text-blue-700">{i + 1}</Text>
              </View>
              <Text className="text-sm text-gray-700 flex-1 leading-5">{step}</Text>
            </View>
          ))}
        </View>

        {(ev.marketSize || ev.timeToRevenue) && (
          <View className="flex-row gap-2 mb-4">
            {ev.marketSize && (
              <View className="flex-1 bg-blue-50 rounded-xl p-3">
                <Text className="text-xs text-blue-600 mb-1">Market size</Text>
                <Text className="text-sm font-semibold text-blue-900">{ev.marketSize}</Text>
              </View>
            )}
            {ev.timeToRevenue && (
              <View className="flex-1 bg-amber-50 rounded-xl p-3">
                <Text className="text-xs text-amber-600 mb-1">Time to revenue</Text>
                <Text className="text-sm font-semibold text-amber-900">{ev.timeToRevenue}</Text>
              </View>
            )}
          </View>
        )}

        <TouchableOpacity
          onPress={shareCard}
          className="bg-blue-600 rounded-xl py-4 mb-3 items-center"
        >
          <Text className="text-sm font-semibold text-white">Share my score card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/(tabs)/bot')}
          className="border border-gray-200 rounded-xl py-4 mb-3 items-center"
        >
          <Text className="text-sm font-medium text-gray-700">Discuss with my bot →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/evaluate/index')}
          className="py-3 mb-8 items-center"
        >
          <Text className="text-sm text-gray-400">Evaluate another idea</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

