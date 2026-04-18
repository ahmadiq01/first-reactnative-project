import { View, Text } from 'react-native';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function StreakBar({
  streak,
  target = 7,
  nextUnlock,
}: {
  streak: number;
  target?: number;
  nextUnlock?: string;
}) {
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  return (
    <View className="bg-gray-50 rounded-xl p-3 flex-row items-center gap-3 mb-3">
      <View className="flex-1">
        <Text className="text-sm font-medium text-gray-900">{streak}-day streak</Text>
        {nextUnlock && (
          <Text className="text-xs text-gray-500 mt-0.5">
            {target - streak} more to unlock {nextUnlock}
          </Text>
        )}
      </View>
      <View className="flex-row gap-1">
        {DAYS.map((day, i) => {
          const done = i < streak % 7;
          const isToday = i === todayIndex;
          return (
            <View
              key={i}
              className={`w-6 h-6 rounded items-center justify-center ${
                isToday ? 'bg-blue-100' : done ? 'bg-green-100' : 'bg-gray-200'
              }`}
            >
              <Text
                className={`text-[9px] font-medium ${
                  isToday
                    ? 'text-blue-700'
                    : done
                    ? 'text-green-700'
                    : 'text-gray-400'
                }`}
              >
                {day}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

