import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface Evaluation {
  id: string;
  domain: string;
  idea: string;
  score: number;
  strengths: string[];
  risks: string[];
  steps: string[];
  summary: string;
  createdAt: number;
  marketSize?: string;
  timeToRevenue?: string;
}

interface AppState {
  userName: string;
  setUserName: (name: string) => void;

  selectedPersonaId: string;
  setPersona: (id: string) => void;
  focusAreas: string[];
  setFocusAreas: (areas: string[]) => void;
  botName: string;
  setBotName: (name: string) => void;
  messages: Message[];
  addMessage: (msg: Message) => void;
  clearMessages: () => void;

  streak: number;
  lastOpenedDate: string;
  starDust: number;
  incrementStreak: () => void;
  addStarDust: (amount: number) => void;

  evaluations: Evaluation[];
  addEvaluation: (ev: Evaluation) => void;

  orbitRead: boolean;
  setOrbitRead: (val: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      userName: 'Ahmad',
      setUserName: (name) => set({ userName: name }),

      selectedPersonaId: 'coach',
      setPersona: (id) => set({ selectedPersonaId: id }),
      focusAreas: ['business', 'freelance', 'finance'],
      setFocusAreas: (areas) => set({ focusAreas: areas }),
      botName: 'My Coach',
      setBotName: (name) => set({ botName: name }),
      messages: [],
      addMessage: (msg) =>
        set((state) => ({ messages: [...state.messages.slice(-50), msg] })),
      clearMessages: () => set({ messages: [] }),

      streak: 4,
      lastOpenedDate: '',
      starDust: 280,
      incrementStreak: () =>
        set((state) => ({
          streak: state.streak + 1,
          starDust: state.starDust + 10,
          lastOpenedDate: new Date().toDateString(),
        })),
      addStarDust: (amount) =>
        set((state) => ({ starDust: state.starDust + amount })),

      evaluations: [],
      addEvaluation: (ev) =>
        set((state) => ({ evaluations: [ev, ...state.evaluations] })),

      orbitRead: false,
      setOrbitRead: (val) => set({ orbitRead: val }),
    }),
    {
      name: 'northstar-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

