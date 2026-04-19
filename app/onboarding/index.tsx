// app/onboarding/index.tsx — from again (nested northstar_complete)
// First-time user experience — shown once on fresh install
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { FOCUS_AREAS } from '@/constants/personas';

const SLIDES = [
  {
    emoji: '✦',
    title: 'Your daily\nNorth Star',
    body: '5-minute morning ritual. Personalized AI companion. Better decisions every day.',
    bg: 'bg-white',
  },
  {
    emoji: '🤖',
    title: 'Build your\nAI companion',
    body: 'Choose a personality. The Coach, The Mentor, The Challenger — your bot learns you over time.',
    bg: 'bg-white',
  },
  {
    emoji: '💡',
    title: 'Evaluate any\nidea or decision',
    body: 'Business ideas, freelance paths, investments, career moves — scored and analysed in seconds.',
    bg: 'bg-white',
  },
];

export default function OnboardingScreen() {
  const [slide, setSlide] = useState(0);
  const [step, setStep] = useState<'slides' | 'categories' | 'name'>('slides');
  const [selectedAreas, setSelectedAreas] = useState<string[]>(['business', 'freelance', 'finance']);
  const [nameInput, setNameInput] = useState('');
  const { setFocusAreas, setUserName } = useAppStore();

  function nextSlide() {
    if (slide < SLIDES.length - 1) {
      setSlide(slide + 1);
    } else {
      setStep('categories');
    }
  }

  function toggleArea(id: string) {
    setSelectedAreas((prev) =>
      prev.includes(id)
        ? prev.filter((a) => a !== id)
        : prev.length < 5
        ? [...prev, id]
        : prev
    );
  }

  function finishOnboarding() {
    setFocusAreas(selectedAreas);
    if (nameInput.trim()) setUserName(nameInput.trim());
    router.replace('/bot-builder/step1');
  }

  // ── Category picker step ──
  if (step === 'categories') {
    return (
      <SafeAreaView className="flex-1 bg-white px-6">
        <View className="flex-1 pt-8">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            What do you want to wake up smarter about?
          </Text>
          <Text className="text-sm text-gray-500 mb-2">
            Pick 3–5 areas. Your morning brief will be built around these.
          </Text>
          <Text className="text-xs text-blue-600 font-medium mb-5">
            {selectedAreas.length}/5 selected
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-row flex-wrap gap-2 mb-8">
              {FOCUS_AREAS.map((area) => {
                const sel = selectedAreas.includes(area.id);
                return (
                  <TouchableOpacity
                    key={area.id}
                    onPress={() => toggleArea(area.id)}
                    className={`flex-row items-center gap-2 border rounded-full px-3 py-2.5 ${
                      sel ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-200'
                    }`}
                  >
                    <Text style={{ fontSize: 16 }}>{area.emoji}</Text>
                    <Text className={`text-sm ${sel ? 'text-blue-800 font-semibold' : 'text-gray-700'}`}>
                      {area.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity
          onPress={() => setStep('name')}
          disabled={selectedAreas.length < 3}
          className={`rounded-2xl py-4 mb-6 items-center ${
            selectedAreas.length >= 3 ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <Text className={`text-sm font-semibold ${
            selectedAreas.length >= 3 ? 'text-white' : 'text-gray-400'
          }`}>
            Continue →
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // ── Name step ──
  if (step === 'name') {
    return (
      <SafeAreaView className="flex-1 bg-white px-6 justify-between pb-8">
        <View className="pt-12">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            What should we call you?
          </Text>
          <Text className="text-sm text-gray-500 mb-8">
            Your bot will use this in conversations.
          </Text>

          <TextInput
            className="border border-gray-200 rounded-2xl px-5 py-4 text-base text-gray-900 text-center"
            placeholder="Your name"
            placeholderTextColor="#9CA3AF"
            value={nameInput}
            onChangeText={setNameInput}
            autoFocus
            maxLength={24}
          />
          <Text className="text-xs text-gray-400 text-center mt-2">
            You can change this later in Profile
          </Text>
        </View>

        <TouchableOpacity
          onPress={finishOnboarding}
          className="bg-gray-900 rounded-2xl py-4 items-center"
        >
          <Text className="text-sm font-semibold text-white">
            {nameInput.trim()
              ? `Let's go, ${nameInput.trim()} →`
              : 'Skip and continue →'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // ── Slide step ──
  const current = SLIDES[slide];
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between px-8 pt-16 pb-10">

        {/* Slide content */}
        <View className="items-center flex-1 justify-center">
          <View className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center mb-8">
            <Text style={{ fontSize: 44 }}>{current.emoji}</Text>
          </View>
          <Text className="text-3xl font-bold text-gray-900 text-center mb-4 leading-tight">
            {current.title}
          </Text>
          <Text className="text-base text-gray-500 text-center leading-6 max-w-xs">
            {current.body}
          </Text>
        </View>

        {/* Progress dots */}
        <View className="items-center mb-8">
          <View className="flex-row gap-2">
            {SLIDES.map((_, i) => (
              <View
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === slide ? 'bg-blue-600 w-8' : 'bg-gray-200 w-2'
                }`}
              />
            ))}
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity
          onPress={nextSlide}
          className="bg-gray-900 rounded-2xl py-4 items-center mb-3"
        >
          <Text className="text-sm font-semibold text-white">
            {slide < SLIDES.length - 1 ? 'Next →' : 'Get started — it\'s free →'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setStep('categories')}
          className="py-2 items-center"
        >
          <Text className="text-xs text-gray-400">Skip intro</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
