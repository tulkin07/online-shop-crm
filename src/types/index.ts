export type Difficulty = 'easy' | 'medium' | 'hard' | 'boss';

export type Category = 'fitness' | 'mind' | 'code' | 'life' | 'health';

export type HeroClass = 'Warrior' | 'Cyber Mage' | 'Shadow Ninja' | 'Code Craftsman';

export interface Habit {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  xpReward: number;
  coinReward: number;
  streak: number;
  completedToday: boolean;
  lastCompletedDate?: string;
  frequency: 'daily' | 'weekly';
  icon: string;
}

export interface HeroStats {
  strength: number;
  intelligence: number;
  focus: number;
  vitality: number;
}

export interface UserStats {
  name: string;
  heroClass: HeroClass;
  level: number;
  currentXp: number;
  maxXp: number;
  coins: number;
  totalHabitsCompleted: number;
  currentStreak: number;
  stats: HeroStats;
  title: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: string;
  icon: string;
  timesClaimed: number;
}

export interface QuestLog {
  id: string;
  timestamp: string;
  title: string;
  type: 'habit' | 'reward' | 'level_up' | 'boss_defeated';
  xpGained?: number;
  coinsGained?: number;
}
