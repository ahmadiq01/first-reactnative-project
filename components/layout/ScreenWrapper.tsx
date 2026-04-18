import { SafeAreaView, ScrollView, View } from 'react-native';

export function ScreenWrapper({
  children,
  scroll = true,
  className = '',
}: {
  children: React.ReactNode;
  scroll?: boolean;
  className?: string;
}) {
  if (scroll) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView
          className={`flex-1 px-4 ${className}`}
          showsVerticalScrollIndicator={false}
        >
          {children}
          <View className="h-6" />
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className={`flex-1 bg-white px-4 ${className}`}>
      {children}
    </SafeAreaView>
  );
}

