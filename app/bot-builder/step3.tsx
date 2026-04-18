import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

const TONES = [
  {
    id: 'concise',
    label: 'Concise & direct',
    desc: 'Short answers, bullet points, no fluff',
  },
  {
    id: 'detailed',
    label: 'Detailed & thorough',
    desc: 'Full explanations, context, examples',
  },
  {
    id: 'conversational',
    label: 'Casual & conversational',
    desc: 'Friendly tone, like chatting with a friend',
  },
  {
    id: 'formal',
    label: 'Formal & professional',
    desc: 'Business language, structured responses',
  },
];

const LANG = [
  { id: 'english', label: 'English' },
  { id: 'urdu', label: 'Urdu (اردو)' },
  { id: 'both', label: 'Both (Urdu + English)' },
];

export default function BotStep3() {
  const [tone, setTone] = useState('concise');
  const [lang, setLang] = useState('english');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between pt-2 pb-4">
          <Text className="text-xs text-gray-400">Step 3 of 4</Text>
          <View className="flex-row gap-1">
            {[1, 2, 3, 4].map((s) => (
              <View
                key={s}
                className={`h-1 w-8 rounded-full ${s <= 3 ? 'bg-blue-500' : 'bg-gray-200'}`}
              />
            ))}
          </View>
        </View>

        <Text className="text-xl font-semibold text-gray-900 mb-1">
          How should your bot communicate?
        </Text>
        <Text className="text-sm text-gray-500 mb-6">
          This affects tone and style for every message.
        </Text>

        <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Response style
        </Text>
        <View className="gap-2 mb-6">
          {TONES.map((t) => (
            <TouchableOpacity
              key={t.id}
              onPress={() => setTone(t.id)}
              className={`border rounded-xl p-3 ${
                tone === t.id
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  tone === t.id ? 'text-blue-800' : 'text-gray-900'
                }`}
              >
                {t.label}
              </Text>
              <Text
                className={`text-xs mt-0.5 ${
                  tone === t.id ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {t.desc}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Language
        </Text>
        <View className="flex-row flex-wrap gap-2 mb-6">
          {LANG.map((l) => (
            <TouchableOpacity
              key={l.id}
              onPress={() => setLang(l.id)}
              className={`border rounded-full px-4 py-2 ${
                lang === l.id ? 'border-blue-400 bg-blue-100' : 'border-gray-200'
              }`}
            >
              <Text
                className={`text-sm ${
                  lang === l.id ? 'text-blue-800 font-medium' : 'text-gray-700'
                }`}
              >
                {l.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => router.push('/bot-builder/step4')}
          className="bg-blue-600 rounded-xl py-4 mb-8 items-center"
        >
          <Text className="text-sm font-semibold text-white">Almost done →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

