import { View, Text } from 'react-native';

export function ScoreGauge({ score }: { score: number }) {
  const color =
    score >= 75
      ? 'text-green-700 bg-green-100'
      : score >= 50
      ? 'text-amber-700 bg-amber-100'
      : 'text-red-700 bg-red-100';

  const label =
    score >= 75
      ? 'Strong viability'
      : score >= 50
      ? 'Moderate viability'
      : 'Needs refinement';

  return (
    <View className="items-center py-6">
      <View
        className={`w-28 h-28 rounded-full items-center justify-center border-4 ${
          score >= 75
            ? 'border-green-300 bg-green-50'
            : score >= 50
            ? 'border-amber-300 bg-amber-50'
            : 'border-red-300 bg-red-50'
        }`}
      >
        <Text
          className={`text-4xl font-bold ${
            score >= 75
              ? 'text-green-700'
              : score >= 50
              ? 'text-amber-700'
              : 'text-red-700'
          }`}
        >
          {score}
        </Text>
        <Text
          className={`text-xs ${
            score >= 75
              ? 'text-green-600'
              : score >= 50
              ? 'text-amber-600'
              : 'text-red-600'
          }`}
        >
          / 100
        </Text>
      </View>
      <View className={`mt-3 px-3 py-1 rounded-full ${color}`}>
        <Text className={`text-xs font-medium ${color}`}>{label}</Text>
      </View>
    </View>
  );
}

