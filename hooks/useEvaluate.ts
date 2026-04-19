// hooks/useEvaluate.ts
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { evaluateIdea, EvaluationResult } from '@/services/api';

export function useEvaluate() {
  const { userName, addEvaluation, addStarDust } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EvaluationResult | null>(null);

  async function evaluate(domain: string, idea: string): Promise<string | null> {
    if (idea.trim().length < 20) {
      setError('Please describe your idea in more detail (at least 20 characters).');
      return null;
    }

    setError(null);
    setLoading(true);

    try {
      const data = await evaluateIdea(
        domain,
        idea,
        `User from Pakistan, name: ${userName}`
      );

      setResult(data);

      const ev = {
        id: Date.now().toString(),
        domain,
        idea: idea.slice(0, 80),
        ...data,
        createdAt: Date.now(),
      };

      addEvaluation(ev);
      addStarDust(15);
      return ev.id;
    } catch (err) {
      setError('Evaluation failed. Check your connection and try again.');
      return null;
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult(null);
    setError(null);
  }

  return { evaluate, loading, error, result, reset };
}
