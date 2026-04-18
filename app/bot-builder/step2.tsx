import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';
import { FOCUS_AREAS } from '@/constants/personas';

export default function BotStep2() {
  const { focusAreas, setFocusAreas } = useAppStore();

  function toggle(id: string) {
    if (focusAreas.includes(id)) {
      setFocusAreas(focusAreas.filter((a) => a !== id));
    } else if (focusAreas.length < 5) {
      setFocusAreas([...focusAreas, id]);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between pt-2 pb-4">
          <Text className="text-xs text-gray-400">Step 2 of 4</Text>
          <View className="flex-row gap-1">
            {[1, 2, 3, 4].map((s) => (
              <View
                key={s}
                className={`h-1 w-8 rounded-full ${s <= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}
              />
            ))}
          </View>
        </View>

        <Text className="text-xl font-semibold text-gray-900 mb-1">
          What do you want to wake up smarter about?
        </Text>
        <Text className="text-sm text-gray-500 mb-2">
          Pick 3–5 areas. Your Daily Orbit will be built around these.
        </Text>
        <Text className="text-xs text-blue-600 mb-6">
          {focusAreas.length}/5 selected
        </Text>

        <View className="flex-row flex-wrap gap-2 mb-6">
          {FOCUS_AREAS.map((area) => {
            const selected = focusAreas.includes(area.id);
            return (
              <TouchableOpacity
                key={area.id}
                onPress={() => toggle(area.id)}
                className={`flex-row items-center gap-1.5 border rounded-full px-3 py-2 ${
                  selected ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-200'
                }`}
              >
                <Text style={{ fontSize: 14 }}>{area.emoji}</Text>
                <Text
                  className={`text-sm ${
                    selected ? 'text-blue-800 font-medium' : 'text-gray-700'
                  }`}
                >
                  {area.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={() => router.push('/bot-builder/step3')}
          disabled={focusAreas.length < 3}
          className={`rounded-xl py-4 mb-8 items-center ${
            focusAreas.length >= 3 ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <Text
            className={`text-sm font-semibold ${
              focusAreas.length >= 3 ? 'text-white' : 'text-gray-400'
            }`}
          >
            Continue →
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

