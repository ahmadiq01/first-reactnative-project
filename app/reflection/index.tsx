// app/reflection/index.tsx — from again (nested northstar_complete)
// Shown every Sunday. Accessed from Home screen or notification.
import {
  View, Text, ScrollView, SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { sendBotMessage } from '@/services/api';
import { PERSONAS } from '@/constants/personas';
import { SectionLabel } from '@/components/layout/SectionLabel';

interface ReflectionData {
  weekSummary: string;
  goalsHit: string[];
  goalsMissed: string[];
  patternNote: string;
  nextWeekFocus: string;
}

const MOCK_REFLECTION: ReflectionData = {
  weekSummary: 'You opened the app 5 out of 7 days. You evaluated 2 ideas and had 8 conversations with The Coach. Your focus this week was mostly around the cloud kitchen idea and freelance pricing.',
  goalsHit: [
    'Completed 4-day streak',
    'Evaluated the cloud kitchen idea',
    'Researched freelance pricing on Upwork',
  ],
  goalsMissed: [
    'Missed 2 morning orbits',
    'Didn\'t act on the Upwork profile update',
  ],
  patternNote: 'You tend to engage most on weekday mornings between 7–9am. Your questions often circle back to "is this viable?" — which usually means you need one concrete data point, not more analysis.',
  nextWeekFocus: 'Pick one action from your cloud kitchen evaluation and take it. Not research. Action.',
};

export default function ReflectionScreen() {
  const { selectedPersonaId, focusAreas, userName, addStarDust } = useAppStore();
  const persona = PERSONAS.find((p) => p.id === selectedPersonaId) ?? PERSONAS[0];
  const [reflection, setReflection] = useState<ReflectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateReflection();
  }, []);

  async function generateReflection() {
    try {
      const prompt = `Generate a weekly reflection for ${userName} based on their North Star app usage.
Focus areas: ${focusAreas.join(', ')}
Bot personality: ${persona.name}

Respond in this exact JSON format:
{
  "weekSummary": "2-3 sentence summary of their week",
  "goalsHit": ["goal 1", "goal 2", "goal 3"],
  "goalsMissed": ["missed goal 1", "missed goal 2"],
  "patternNote": "One sharp observation about their behavior pattern this week",
  "nextWeekFocus": "One specific, actionable focus for next week. Be direct."
}`;

      const reply = await sendBotMessage(
        [{ role: 'user', content: prompt }],
        persona.systemPrompt,
        focusAreas,
      );
      const cleaned = reply.replace(/```json|```/g, '').trim();
      setReflection(JSON.parse(cleaned));
      addStarDust(30);
    } catch {
      setReflection(MOCK_REFLECTION);
    } finally {
      setLoading(false);
    }
  }

  const data = reflection ?? MOCK_REFLECTION;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View className="pt-4 pb-2">
          <View className="flex-row items-center gap-2 mb-1">
            <Text style={{ fontSize: 18 }}>{persona.emoji}</Text>
            <Text className="text-xs text-gray-500">{persona.name} · Weekly Reflection</Text>
          </View>
          <Text className="text-xl font-semibold text-gray-900">
            {new Date().toLocaleDateString('en-PK', { weekday: 'long', month: 'long', day: 'numeric' })}
          </Text>
        </View>

        {loading ? (
          <View className="items-center py-16">
            <Text className="text-sm text-gray-500">Preparing your reflection...</Text>
          </View>
        ) : (
          <>
            {/* Week summary */}
            <View className="bg-gray-50 rounded-xl p-4 mb-4 mt-3">
              <Text className="text-sm text-gray-700 leading-6">{data.weekSummary}</Text>
            </View>

            {/* Goals hit */}
            <SectionLabel label="What you got done" />
            <View className="mb-4">
              {data.goalsHit.map((g, i) => (
                <View key={i} className="flex-row gap-3 mb-2 items-start">
                  <View className="w-5 h-5 rounded-full bg-green-100 items-center justify-center mt-0.5 flex-shrink-0">
                    <Text className="text-xs text-green-700 font-bold">✓</Text>
                  </View>
                  <Text className="text-sm text-gray-700 flex-1 leading-5">{g}</Text>
                </View>
              ))}
            </View>

            {/* Goals missed */}
            <SectionLabel label="What slipped" />
            <View className="mb-4">
              {data.goalsMissed.map((g, i) => (
                <View key={i} className="flex-row gap-3 mb-2 items-start">
                  <View className="w-5 h-5 rounded-full bg-red-100 items-center justify-center mt-0.5 flex-shrink-0">
                    <Text className="text-xs text-red-600">–</Text>
                  </View>
                  <Text className="text-sm text-gray-700 flex-1 leading-5">{g}</Text>
                </View>
              ))}
            </View>

            {/* Pattern note */}
            <SectionLabel label={`${persona.name}'s observation`} />
            <View className="border-l-4 border-blue-300 pl-4 py-2 mb-4">
              <Text className="text-sm text-gray-700 italic leading-6">{data.patternNote}</Text>
            </View>

            {/* Next week */}
            <SectionLabel label="Your one focus for next week" />
            <View className="bg-blue-600 rounded-xl p-4 mb-6">
              <Text className="text-sm font-semibold text-white leading-5">
                {data.nextWeekFocus}
              </Text>
            </View>

            {/* Star dust earned */}
            <View className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 flex-row items-center justify-between">
              <Text className="text-sm text-amber-700">Weekly reflection bonus</Text>
              <Text className="text-sm font-bold text-amber-800">+30 Star Dust ✦</Text>
            </View>

            {/* Actions */}
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/bot')}
              className="bg-gray-900 rounded-xl py-4 mb-3 items-center"
            >
              <Text className="text-sm font-semibold text-white">
                Discuss this with {persona.name} →
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.back()}
              className="py-3 mb-8 items-center"
            >
              <Text className="text-sm text-gray-400">Back to home</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
