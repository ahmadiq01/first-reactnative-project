import { View, Text } from 'react-native';

export function ChatBubble({
  role,
  content,
}: {
  role: 'user' | 'assistant';
  content: string;
}) {
  const isUser = role === 'user';
  return (
    <View className={`mb-2 max-w-[88%] ${isUser ? 'self-end' : 'self-start'}`}>
      <View
        className={`rounded-2xl px-3 py-2 ${
          isUser ? 'bg-blue-100 rounded-br-sm' : 'bg-gray-100 rounded-bl-sm'
        }`}
      >
        <Text
          className={`text-sm leading-5 ${
            isUser ? 'text-blue-900' : 'text-gray-900'
          }`}
        >
          {content}
        </Text>
      </View>
    </View>
  );
}

