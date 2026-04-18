import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { PERSONAS } from '@/constants/personas';

export default function BotStep4() {
  const { selectedPersonaId, setBotName } = useAppStore();
  const persona = PERSONAS.find((p) => p.id === selectedPersonaId) ?? PERSONAS[0];
  const [name, setName] = useState('');

  function finish() {
    setBotName(name.trim() || persona.name);
    router.replace('/(tabs)/bot');
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 px-4 justify-between pb-8">
          <View>
            <View className="flex-row items-center justify-between pt-2 pb-4">
              <Text className="text-xs text-gray-400">Step 4 of 4</Text>
              <View className="flex-row gap-1">
                {[1, 2, 3, 4].map((s) => (
                  <View key={s} className="h-1 w-8 rounded-full bg-blue-500" />
                ))}
              </View>
            </View>

            <Text className="text-xl font-semibold text-gray-900 mb-1">
              Give your bot a name
            </Text>
            <Text className="text-sm text-gray-500 mb-8">
              Optional — leave blank to use "{persona.name}"
            </Text>

            <View className="items-center mb-8">
              <View className="w-20 h-20 rounded-full bg-blue-100 items-center justify-center mb-3">
                <Text style={{ fontSize: 36 }}>{persona.emoji}</Text>
              </View>
              <Text className="text-base font-medium text-gray-700">
                {name || persona.name}
              </Text>
              <Text className="text-xs text-gray-400 mt-1">{persona.desc}</Text>
            </View>

            <TextInput
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 text-center"
              placeholder={`e.g. "Zain", "My Mentor", "Coach Ali"`}
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
              maxLength={20}
              autoFocus
            />
            <Text className="text-xs text-gray-400 text-right mt-1">
              {name.length}/20
            </Text>
          </View>

          <TouchableOpacity
            onPress={finish}
            className="bg-blue-600 rounded-xl py-4 items-center mt-6"
          >
            <Text className="text-sm font-semibold text-white">
              {name.trim() ? `Meet ${name} →` : `Use "${persona.name}" →`}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

