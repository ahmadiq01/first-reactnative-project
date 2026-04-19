// hooks/useBot.ts
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { sendBotMessage } from '@/services/api';
import { PERSONAS } from '@/constants/personas';

export function useBot() {
  const {
    messages, addMessage, selectedPersonaId,
    focusAreas, botName, addStarDust, userName,
  } = useAppStore();

  const persona = PERSONAS.find((p) => p.id === selectedPersonaId) ?? PERSONAS[0];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendMessage(content: string) {
    if (!content.trim() || loading) return false;
    setError(null);

    const userMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: content.trim(),
      timestamp: Date.now(),
    };
    addMessage(userMsg);
    addStarDust(10);
    setLoading(true);

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const fullSystem = `${persona.systemPrompt}

User's name: ${userName}
User's focus areas: ${focusAreas.join(', ')}
Context: Pakistan/South Asia. User may write in Urdu or English — respond in the same language they use.
Bot's name as the user set it: ${botName}
Keep responses concise (under 120 words) unless the user explicitly asks for detail.
Always end with either a question to continue the conversation OR a specific next action.`;

      const reply = await sendBotMessage(history, fullSystem, focusAreas);

      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: Date.now(),
      });
      return true;
    } catch (err) {
      setError('Connection error. Please try again.');
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'میں ابھی کنیکٹ نہیں ہو پا رہا۔ تھوڑی دیر بعد دوبارہ کوشش کریں۔\n\n(I\'m having trouble connecting right now. Please try again in a moment.)',
        timestamp: Date.now(),
      });
      return false;
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    useAppStore.getState().clearMessages();
  }

  return { messages, loading, error, persona, botName, sendMessage, clearChat };
}
