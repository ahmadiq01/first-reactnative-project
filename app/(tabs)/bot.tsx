// app/(tabs)/bot.tsx
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, SafeAreaView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useState, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { sendBotMessage } from '@/services/api';
import { ChatBubble } from '@/components/ui/ChatBubble';
import { PERSONAS } from '@/constants/personas';

export default function BotScreen() {
  const {
    messages, addMessage, selectedPersonaId,
    focusAreas, botName, addStarDust,
  } = useAppStore();
  const persona = PERSONAS.find((p) => p.id === selectedPersonaId) ?? PERSONAS[0];
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const flatRef = useRef<FlatList>(null);

  // Quick reply suggestions
  const SUGGESTIONS = [
    'What should I focus on today?',
    'Evaluate my business idea',
    'Give me a productivity tip',
    'Help me make a decision',
  ];

  async function send(text?: string) {
    const content = text ?? input.trim();
    if (!content || loading) return;
    setInput('');

    const userMsg = { id: Date.now().toString(), role: 'user' as const, content, timestamp: Date.now() };
    addMessage(userMsg);
    addStarDust(10);
    setLoading(true);

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const reply = await sendBotMessage(history, persona.systemPrompt, focusAreas);
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: Date.now(),
      });
    } catch {
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Try again in a moment.",
        timestamp: Date.now(),
      });
    } finally {
      setLoading(false);
      setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >

        {/* ── Top bar ── */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
          <View className="flex-row items-center gap-3">
            <View className="w-9 h-9 rounded-full bg-blue-100 items-center justify-center">
              <Text style={{ fontSize: 18 }}>{persona.emoji}</Text>
            </View>
            <View>
              <Text className="text-sm font-semibold text-gray-900">{botName}</Text>
              <Text className="text-xs text-green-600">Active</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/evaluate')}
            className="bg-blue-100 rounded-lg px-3 py-1.5"
          >
            <Text className="text-xs font-medium text-blue-800">Evaluate idea ↗</Text>
          </TouchableOpacity>
        </View>

        {/* ── Messages ── */}
        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={{ padding: 16, flexGrow: 1 }}
          renderItem={({ item }) => (
            <ChatBubble role={item.role} content={item.content} />
          )}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-12">
              <Text style={{ fontSize: 40 }} className="mb-4">{persona.emoji}</Text>
              <Text className="text-base font-medium text-gray-900 mb-1 text-center">
                {persona.name}
              </Text>
              <Text className="text-sm text-gray-500 text-center px-8 mb-8">
                {persona.desc}
              </Text>
              <View className="gap-2 w-full px-4">
                {SUGGESTIONS.map((s) => (
                  <TouchableOpacity
                    key={s}
                    onPress={() => send(s)}
                    className="border border-gray-200 rounded-xl px-4 py-3"
                  >
                    <Text className="text-sm text-gray-700">{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          }
          ListFooterComponent={
            loading ? (
              <View className="self-start bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2 mb-2">
                <Text className="text-gray-400 text-sm">Thinking...</Text>
              </View>
            ) : null
          }
          onContentSizeChange={() =>
            messages.length > 0 && flatRef.current?.scrollToEnd({ animated: false })
          }
        />

        {/* ── Input bar ── */}
        <View className="border-t border-gray-100 px-4 py-2 flex-row items-end gap-2">
          <TextInput
            className="flex-1 bg-gray-100 rounded-2xl px-4 py-2.5 text-sm text-gray-900 max-h-28"
            placeholder={`Ask ${persona.name.toLowerCase()}...`}
            placeholderTextColor="#9CA3AF"
            value={input}
            onChangeText={setInput}
            multiline
            returnKeyType="send"
            onSubmitEditing={() => send()}
          />
          <TouchableOpacity
            onPress={() => send()}
            disabled={!input.trim() || loading}
            className={`w-10 h-10 rounded-full items-center justify-center ${
              input.trim() && !loading ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <Text className="text-white text-base">→</Text>
          </TouchableOpacity>
        </View>

        {/* ── Change bot link ── */}
        <TouchableOpacity
          onPress={() => router.push('/bot-builder/step1')}
          className="py-2 items-center"
        >
          <Text className="text-xs text-gray-400">
            Chatting with {persona.name} · Change bot
          </Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
