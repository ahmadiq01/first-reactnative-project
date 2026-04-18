import { TouchableOpacity, View, Text } from 'react-native';

export function BotCard({
  emoji,
  name,
  desc,
  selected,
  locked,
  onPress,
}: {
  emoji: string;
  name: string;
  desc: string;
  selected?: boolean;
  locked?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={locked ? undefined : onPress}
      disabled={locked}
      className={`flex-row items-center gap-3 border rounded-xl p-3 mb-2 ${
        selected
          ? 'border-blue-400 bg-blue-50'
          : locked
          ? 'border-dashed border-gray-200 opacity-50'
          : 'border-gray-200 bg-white'
      } active:bg-gray-50`}
    >
      <View
        className={`w-10 h-10 rounded-full items-center justify-center ${
          selected ? 'bg-blue-200' : 'bg-gray-100'
        }`}
      >
        <Text style={{ fontSize: 20 }}>{emoji}</Text>
      </View>
      <View className="flex-1">
        <Text
          className={`text-sm font-medium ${
            selected ? 'text-blue-800' : 'text-gray-900'
          }`}
        >
          {name}
        </Text>
        <Text
          className={`text-xs mt-0.5 ${
            selected ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          {desc}
        </Text>
      </View>
      {selected && (
        <View className="w-5 h-5 rounded-full bg-blue-500 items-center justify-center">
          <Text className="text-white text-xs">✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

