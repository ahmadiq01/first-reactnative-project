const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export interface EvaluationResult {
  score: number;
  summary: string;
  strengths: string[];
  risks: string[];
  steps: string[];
  marketSize: string;
  timeToRevenue: string;
}

export async function sendBotMessage(
  messages: { role: 'user' | 'assistant'; content: string }[],
  systemPrompt: string,
  focusAreas: string[]
): Promise<string> {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages,
      systemPrompt,
      focusAreas,
      context: 'Pakistan/South Asia market, users may write in Urdu or English',
    }),
  });
  if (!res.ok) throw new Error('Chat request failed');
  const data = await res.json();
  return data.reply;
}

export async function evaluateIdea(
  domain: string,
  idea: string,
  userContext: string
): Promise<EvaluationResult> {
  const res = await fetch(`${API_URL}/api/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain, idea, userContext }),
  });
  if (!res.ok) throw new Error('Evaluation request failed');
  return res.json();
}

export async function getDailyOrbit(
  focusAreas: string[],
  userName: string
): Promise<{ headline: string; body: string; action: string; insight: string }> {
  const res = await fetch(`${API_URL}/api/orbit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ focusAreas, userName }),
  });
  if (!res.ok) throw new Error('Orbit request failed');
  return res.json();
}

