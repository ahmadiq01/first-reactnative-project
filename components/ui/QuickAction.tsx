// components/ui/QuickAction.tsx — grid action tile (file map Part C)
import { Text, TouchableOpacity, View } from 'react-native';

type QuickActionProps = {
  emoji: string;
  label: string;
  subtitle?: string;
  onPress?: () => void;
  className?: string;
};

export function QuickAction({
  emoji,
  label,
  subtitle,
  onPress,
  className = '',
}: QuickActionProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className={`flex-1 min-w-[46%] border border-gray-200 rounded-xl p-3 bg-white ${className}`}
    >
      <View className="mb-2">
        <Text style={{ fontSize: 26 }}>{emoji}</Text>
      </View>
      <Text className="text-sm font-semibold text-gray-900 leading-5">{label}</Text>
      {subtitle ? (
        <Text className="text-xs text-gray-400 mt-1 leading-4">{subtitle}</Text>
      ) : null}
    </TouchableOpacity>
  );
}
