// hooks/useStreak.ts
import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export function useStreak() {
  const { streak, lastOpenedDate, incrementStreak, starDust } = useAppStore();

  useEffect(() => {
    const today = new Date().toDateString();
    if (lastOpenedDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const wasYesterday = lastOpenedDate === yesterday.toDateString();

    if (wasYesterday || lastOpenedDate === '') {
      incrementStreak();
    } else {
      useAppStore.setState({ streak: 1, lastOpenedDate: today, starDust: starDust + 5 });
    }
  }, []);

  const streakTarget = streak < 7 ? 7 : streak < 30 ? 30 : 100;
  const nextUnlock =
    streak < 7 ? 'The Strategist' :
    streak < 30 ? 'The Philosopher' :
    'The Oracle';

  const daysUntilUnlock = streakTarget - streak;

  const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  const weekDays = DAYS.map((label, i) => ({
    label,
    done: i < (streak % 7 === 0 && streak > 0 ? 7 : streak % 7),
    isToday: i === todayIndex,
  }));

  return { streak, starDust, streakTarget, nextUnlock, daysUntilUnlock, weekDays };
}
