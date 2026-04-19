// app/auth/index.tsx — from again/index.tsx
import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { router, type Href } from 'expo-router';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

type AuthMode = 'login' | 'signup';

export default function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUserName } = useAppStore();

  async function handleSubmit() {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (mode === 'signup' && !name) {
      setError('Please enter your name.');
      return;
    }
    setError('');
    setLoading(true);

    // TODO: replace with your Supabase auth call
    // const { data, error } = await supabase.auth.signUp({ email, password })
    // For now, simulate:
    await new Promise((r) => setTimeout(r, 800));

    if (name) setUserName(name);
    setLoading(false);

    if (mode === 'signup') {
      router.replace('/onboarding' as Href);
    } else {
      router.replace('/(tabs)');
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>

          {/* Header */}
          <View className="items-center pt-12 mb-10">
            <Text style={{ fontSize: 36 }} className="mb-3">✦</Text>
            <Text className="text-2xl font-bold text-gray-900">
              {mode === 'signup' ? 'Create your account' : 'Welcome back'}
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              {mode === 'signup'
                ? 'Free forever. No credit card needed.'
                : 'Good to see you again.'}
            </Text>
          </View>

          {/* Form */}
          <View className="gap-3 mb-4">
            {mode === 'signup' && (
              <View>
                <Text className="text-xs font-medium text-gray-600 mb-1.5">Your name</Text>
                <TextInput
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900"
                  placeholder="e.g. Ahmad"
                  placeholderTextColor="#9CA3AF"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            )}

            <View>
              <Text className="text-xs font-medium text-gray-600 mb-1.5">Email</Text>
              <TextInput
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900"
                placeholder="you@example.com"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View>
              <Text className="text-xs font-medium text-gray-600 mb-1.5">Password</Text>
              <TextInput
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900"
                placeholder={mode === 'signup' ? 'At least 8 characters' : 'Your password'}
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          {error ? (
            <Text className="text-xs text-red-500 mb-4">{error}</Text>
          ) : null}

          {/* Submit */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            className={`rounded-2xl py-4 items-center mb-4 ${
              loading ? 'bg-gray-300' : 'bg-gray-900'
            }`}
          >
            <Text className="text-sm font-semibold text-white">
              {loading
                ? 'Please wait...'
                : mode === 'signup'
                ? 'Create account →'
                : 'Sign in →'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center gap-3 mb-4">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="text-xs text-gray-400">or</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Google OAuth placeholder */}
          <TouchableOpacity
            className="border border-gray-200 rounded-2xl py-3.5 items-center flex-row justify-center gap-2 mb-8"
          >
            <Text style={{ fontSize: 16 }}>G</Text>
            <Text className="text-sm font-medium text-gray-700">
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Mode switch */}
          <TouchableOpacity
            onPress={() => setMode(mode === 'signup' ? 'login' : 'signup')}
            className="items-center mb-8"
          >
            <Text className="text-sm text-gray-500">
              {mode === 'signup'
                ? 'Already have an account? '
                : "Don't have an account? "}
              <Text className="text-blue-600 font-medium">
                {mode === 'signup' ? 'Sign in' : 'Sign up free'}
              </Text>
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
