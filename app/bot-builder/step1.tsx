import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';
import { BotCard } from '@/components/ui/BotCard';
import { PERSONAS } from '@/constants/personas';

export default function BotStep1() {
  const { selectedPersonaId, setPersona, streak } = useAppStore();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between pt-2 pb-4">
          <Text className="text-xs text-gray-400">Step 1 of 4</Text>
          <View className="flex-row gap-1">
            {[1, 2, 3, 4].map((s) => (
              <View
                key={s}
                className={`h-1 w-8 rounded-full ${s === 1 ? 'bg-blue-500' : 'bg-gray-200'}`}
              />
            ))}
          </View>
        </View>

        <Text className="text-xl font-semibold text-gray-900 mb-1">
          Choose your bot personality
        </Text>
        <Text className="text-sm text-gray-500 mb-6">
          This shapes how your bot speaks, challenges, and guides you every day.
        </Text>

        {PERSONAS.map((p) => (
          <BotCard
            key={p.id}
            emoji={p.emoji}
            name={p.name}
            desc={
              p.unlocked
                ? p.desc
                : `Unlock at ${p.streakRequired}-day streak (you're at ${streak})`
            }
            selected={selectedPersonaId === p.id}
            locked={!p.unlocked && streak < (p.streakRequired ?? 999)}
            onPress={() => setPersona(p.id)}
          />
        ))}

        <TouchableOpacity
          onPress={() => router.push('/bot-builder/step2')}
          className="bg-blue-600 rounded-xl py-4 mt-4 mb-8 items-center"
        >
          <Text className="text-sm font-semibold text-white">
            Continue to focus areas →
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

