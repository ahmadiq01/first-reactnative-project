// app/library/index.tsx — from again (nested northstar_complete)
import {
  View, Text, ScrollView, SafeAreaView,
  TouchableOpacity, TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

// Extend the store type for library items (add to useAppStore if not present)
interface LibraryItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  savedAt: number;
  source?: string;
}

const MOCK_LIBRARY: LibraryItem[] = [
  {
    id: '1',
    title: 'The side hustle window is open right now',
    summary: 'Freelance AI content writing demand up 40% on Upwork. Key opportunity for Pakistani developers.',
    category: 'Freelance',
    savedAt: Date.now() - 86400000 * 2,
    source: 'Daily Orbit',
  },
  {
    id: '2',
    title: 'SBP raises savings rate — what it means for you',
    summary: 'New 21% savings rate means idle cash in current accounts is actively losing real value.',
    category: 'Finance',
    savedAt: Date.now() - 86400000 * 4,
    source: 'Daily Orbit',
  },
  {
    id: '3',
    title: 'Cloud kitchen viability — Lahore market',
    summary: 'Food delivery market in Lahore growing 35% YoY. Low barrier to entry vs traditional restaurants.',
    category: 'Business',
    savedAt: Date.now() - 86400000 * 6,
    source: 'Evaluation',
  },
  {
    id: '4',
    title: 'Why you should name your price before they ask',
    summary: 'Anchoring in negotiations: state your rate first. Clients who ask budget first control the frame.',
    category: 'Productivity',
    savedAt: Date.now() - 86400000 * 8,
    source: 'Bot chat',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Freelance: 'bg-blue-100 text-blue-800',
  Finance: 'bg-green-100 text-green-800',
  Business: 'bg-amber-100 text-amber-800',
  Productivity: 'bg-purple-100 text-purple-800',
  Agriculture: 'bg-emerald-100 text-emerald-800',
  Crypto: 'bg-orange-100 text-orange-800',
  default: 'bg-gray-100 text-gray-700',
};

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

export default function LibraryScreen() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const items = MOCK_LIBRARY;
  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category)))];

  const filtered = items.filter((item) => {
    const matchesSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'All' || item.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>

        <View className="flex-row items-center justify-between pt-4 pb-2">
          <Text className="text-xl font-semibold text-gray-900">My Library</Text>
          <Text className="text-xs text-gray-400">{items.length} saved</Text>
        </View>

        {/* Search */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2.5 mb-3 gap-2">
          <Text className="text-gray-400 text-sm">🔍</Text>
          <TextInput
            className="flex-1 text-sm text-gray-900"
            placeholder="Search saved articles..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text className="text-gray-400 text-sm">✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Category filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          <View className="flex-row gap-2 pr-4">
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-full border ${
                  activeFilter === cat
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <Text className={`text-xs font-medium ${
                  activeFilter === cat ? 'text-white' : 'text-gray-600'
                }`}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Items */}
        {filtered.length === 0 ? (
          <View className="items-center py-16">
            <Text style={{ fontSize: 32 }} className="mb-3">📚</Text>
            <Text className="text-sm font-medium text-gray-700 mb-1">Nothing saved yet</Text>
            <Text className="text-xs text-gray-400 text-center px-8">
              Save articles from your Daily Orbit and bot conversations here
            </Text>
          </View>
        ) : (
          <View className="gap-2 mb-8">
            {filtered.map((item) => {
              const colorClass = CATEGORY_COLORS[item.category] ?? CATEGORY_COLORS.default;
              return (
                <TouchableOpacity
                  key={item.id}
                  className="border border-gray-200 rounded-xl p-3 bg-white active:bg-gray-50"
                  onPress={() => {}}
                >
                  <View className="flex-row items-start justify-between gap-2 mb-2">
                    <View className={`px-2 py-0.5 rounded-full ${colorClass.split(' ')[0]}`}>
                      <Text className={`text-[10px] font-semibold ${colorClass.split(' ')[1]}`}>
                        {item.category}
                      </Text>
                    </View>
                    <Text className="text-[10px] text-gray-400">{timeAgo(item.savedAt)}</Text>
                  </View>

                  <Text className="text-sm font-semibold text-gray-900 mb-1 leading-4">
                    {item.title}
                  </Text>
                  <Text className="text-xs text-gray-500 leading-4 mb-2">{item.summary}</Text>

                  <View className="flex-row items-center justify-between">
                    <Text className="text-[10px] text-gray-400">From: {item.source}</Text>
                    <TouchableOpacity
                      onPress={() => router.push('/(tabs)/bot')}
                      className="bg-blue-50 rounded-lg px-2 py-1"
                    >
                      <Text className="text-[10px] text-blue-700 font-medium">Discuss with bot →</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}
