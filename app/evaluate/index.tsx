import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { evaluateIdea } from '@/services/api';
import { SectionLabel } from '@/components/layout/SectionLabel';

const DOMAINS = [
  {
    id: 'business',
    label: 'Business idea',
    emoji: '💡',
    desc: 'Validate any startup or business concept',
  },
  {
    id: 'freelance',
    label: 'Freelance path',
    emoji: '💻',
    desc: 'Which skills & platforms to focus on',
  },
  {
    id: 'finance',
    label: 'Financial decision',
    emoji: '💰',
    desc: 'Job offer, investment, savings plan',
  },
  {
    id: 'career',
    label: 'Career move',
    emoji: '🎓',
    desc: 'Job switch, promotion, new field',
  },
  {
    id: 'crypto',
    label: 'Crypto / investment',
    emoji: '📈',
    desc: 'Portfolio analysis and signals',
  },
  {
    id: 'agriculture',
    label: 'Agriculture',
    emoji: '🌾',
    desc: 'Crop planning, yield, market prices',
  },
  {
    id: 'construction',
    label: 'Construction',
    emoji: '🏗️',
    desc: 'Cost estimates, project planning',
  },
  { id: 'other', label: 'Other decision', emoji: '🧭', desc: 'Any life or business decision' },
];

const PLACEHOLDERS: Record<string, string> = {
  business: 'e.g. I want to open a cloud kitchen in Lahore with PKR 500,000 budget',
  freelance: 'e.g. I know React and Python, 5 years experience, want to earn on Upwork',
  finance:
    'e.g. I have PKR 1M saved. Should I invest in gold, mutual funds, or property?',
  career:
    'e.g. I am a software engineer with 3 years exp. Should I switch to product management?',
  crypto:
    'e.g. I hold 60% BTC, 30% ETH, 10% altcoins. Is my portfolio too risky?',
  agriculture: 'e.g. I have 5 acres in Punjab. What should I grow this season?',
  construction:
    'e.g. I want to build a 5-marla house in Rawalpindi. What will it cost?',
  other: 'Describe your decision or idea in as much detail as possible...',
};

export default function EvaluateIndex() {
  const { userName, addEvaluation, addStarDust } = useAppStore();
  const [domain, setDomain] = useState('business');
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function evaluate() {
    if (!idea.trim() || idea.length < 20) {
      setError('Please describe your idea in more detail (at least 20 characters).');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const result = await evaluateIdea(domain, idea, `User from Pakistan, name: ${userName}`);
      const ev = {
        id: Date.now().toString(),
        domain,
        idea: idea.slice(0, 60),
        ...result,
        createdAt: Date.now(),
      };
      addEvaluation(ev);
      addStarDust(15);
      router.push({ pathname: '/evaluate/result', params: { id: ev.id } });
    } catch {
      setError('Evaluation failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
          <Text className="text-xl font-semibold text-gray-900 pt-2 mb-1">
            Evaluate an idea
          </Text>
          <Text className="text-sm text-gray-500 mb-4">
            Describe your idea. The more detail, the better the analysis.
          </Text>

          <SectionLabel label="Select domain" />
          <View className="flex-row flex-wrap gap-2 mb-4">
            {DOMAINS.map((d) => (
              <TouchableOpacity
                key={d.id}
                onPress={() => setDomain(d.id)}
                className={`flex-row items-center gap-1.5 border rounded-xl px-3 py-2.5 ${
                  domain === d.id ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'
                }`}
              >
                <Text style={{ fontSize: 16 }}>{d.emoji}</Text>
                <Text
                  className={`text-sm ${
                    domain === d.id ? 'text-blue-800 font-medium' : 'text-gray-700'
                  }`}
                >
                  {d.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-gray-50 rounded-lg px-3 py-2 mb-4">
            <Text className="text-xs text-gray-500">
              {DOMAINS.find((d) => d.id === domain)?.desc}
            </Text>
          </View>

          <SectionLabel label="Describe your idea" />
          <TextInput
            className="border border-gray-200 rounded-xl p-4 text-sm text-gray-900 min-h-[140px]"
            placeholder={PLACEHOLDERS[domain]}
            placeholderTextColor="#9CA3AF"
            value={idea}
            onChangeText={setIdea}
            multiline
            textAlignVertical="top"
          />

          {error ? (
            <Text className="text-xs text-red-500 mt-2">{error}</Text>
          ) : (
            <Text className="text-xs text-gray-400 mt-2">{idea.length} characters</Text>
          )}

          <View className="border border-dashed border-gray-200 rounded-xl p-3 mt-3 mb-4">
            <Text className="text-xs font-medium text-gray-600 mb-1">
              Tips for better results:
            </Text>
            <Text className="text-xs text-gray-500 leading-4">• Include your location (city)</Text>
            <Text className="text-xs text-gray-500 leading-4">
              • Mention your budget or investment amount
            </Text>
            <Text className="text-xs text-gray-500 leading-4">
              • Add your experience level in this area
            </Text>
          </View>

          <TouchableOpacity
            onPress={evaluate}
            disabled={loading || idea.length < 20}
            className={`rounded-xl py-4 mb-8 items-center ${
              loading || idea.length < 20 ? 'bg-gray-200' : 'bg-blue-600'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                loading || idea.length < 20 ? 'text-gray-400' : 'text-white'
              }`}
            >
              {loading ? 'Analysing your idea...' : 'Evaluate with AI →'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

