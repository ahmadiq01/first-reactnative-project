import { View, Text, TouchableOpacity } from 'react-native';

export function OrbitCard({
  categories,
  headline,
  readTime = '5 min read',
  onReadPress,
  onBotPress,
}: {
  categories: string;
  headline: string;
  readTime?: string;
  onReadPress?: () => void;
  onBotPress?: () => void;
}) {
  return (
    <View className="border border-gray-200 rounded-xl p-3 mb-3 bg-white">
      <View className="bg-blue-100 self-start rounded-full px-2 py-0.5 mb-2">
        <Text className="text-xs font-medium text-blue-800">{categories}</Text>
      </View>
      <Text className="text-sm font-medium text-gray-900 leading-5 mb-1">
        {headline}
      </Text>
      <Text className="text-xs text-gray-400 mb-3">
        {readTime} · Action of the day inside
      </Text>
      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={onReadPress}
          className="border border-gray-200 rounded-lg px-3 py-1.5"
        >
          <Text className="text-xs text-gray-700">Read now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onBotPress}
          className="border border-gray-200 rounded-lg px-3 py-1.5"
        >
          <Text className="text-xs text-gray-700">Ask my bot</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

