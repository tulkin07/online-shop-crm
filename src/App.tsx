import { useState, useEffect } from 'react';
import type { Habit, Reward, UserStats, QuestLog, HeroClass } from './types';
import { INITIAL_USER, INITIAL_HABITS, INITIAL_REWARDS } from './data/initialData';
import { Header } from './components/Header';
import { CharacterCard } from './components/CharacterCard';
import { HabitList } from './components/HabitList';
import { FocusTimer } from './components/FocusTimer';
import { RewardShop } from './components/RewardShop';
import { StatsAnalytics } from './components/StatsAnalytics';
import { sound } from './utils/audio';
import { 
  Target, Shield, Timer, ShoppingBag, BarChart3, Sparkles 
} from 'lucide-react';

const STORAGE_KEYS = {
  USER: 'habitquest_user_v1',
  HABITS: 'habitquest_habits_v1',
  REWARDS: 'habitquest_rewards_v1',
  LOGS: 'habitquest_logs_v1',
};

export function App() {
  // Local storage state initialization
  const [user, setUser] = useState<UserStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HABITS);
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
  });

  const [rewards, setRewards] = useState<Reward[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REWARDS);
    return saved ? JSON.parse(saved) : INITIAL_REWARDS;
  });

  const [questLogs, setQuestLogs] = useState<QuestLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
    return saved ? JSON.parse(saved) : [
      {
        id: 'l1',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: 'HabitQuest RPG ga xush kelibsiz!',
        type: 'habit',
      }
    ];
  });

  const [isMuted, setIsMuted] = useState<boolean>(sound.isMuted());
  const [activeTab, setActiveTab] = useState<'habits' | 'character' | 'timer' | 'shop' | 'analytics'>('habits');

  // Persistence side-effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(questLogs));
  }, [questLogs]);

  // Helper to add log entry
  const addQuestLog = (title: string, type: QuestLog['type'], xpGained?: number, coinsGained?: number) => {
    const newLog: QuestLog = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title,
      type,
      xpGained,
      coinsGained,
    };
    setQuestLogs((prev) => [newLog, ...prev]);
  };

  // Level Up Check Logic
  const awardExperienceAndCoins = (xp: number, coins: number, logText: string) => {
    setUser((prevUser) => {
      let newXp = prevUser.currentXp + xp;
      let newLevel = prevUser.level;
      let newMaxXp = prevUser.maxXp;
      let newTitle = prevUser.title;

      if (newXp >= newMaxXp) {
        newLevel += 1;
        newXp = newXp - newMaxXp;
        newMaxXp = Math.round(newMaxXp * 1.25);

        // Titles progression
        if (newLevel >= 10) newTitle = 'Legendary Archmage';
        else if (newLevel >= 8) newTitle = 'Master Architect';
        else if (newLevel >= 6) newTitle = 'Cyber Commander';
        else if (newLevel >= 4) newTitle = 'Shadow Coder';

        sound.playLevelUp();
        addQuestLog(`🎉 TABRIKLAYMIZ! LEVEL ${newLevel} DARAJASIGA YETDINGIZ!`, 'level_up');
      }

      return {
        ...prevUser,
        level: newLevel,
        currentXp: newXp,
        maxXp: newMaxXp,
        coins: prevUser.coins + coins,
        title: newTitle,
      };
    });

    addQuestLog(logText, 'habit', xp, coins);
  };

  // Handle Habit Completion
  const handleCompleteHabit = (habitId: string) => {
    const habit = habits.find((h) => h.id === habitId);
    if (!habit || habit.completedToday) return;

    // Update habit state
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          return {
            ...h,
            completedToday: true,
            streak: h.streak + 1,
            lastCompletedDate: new Date().toISOString().split('T')[0],
          };
        }
        return h;
      })
    );

    // Increase specific hero stat depending on category
    setUser((prev) => {
      const statsCopy = { ...prev.stats };
      if (habit.category === 'fitness') statsCopy.strength += 1;
      else if (habit.category === 'mind') statsCopy.intelligence += 1;
      else if (habit.category === 'code') statsCopy.focus += 1;
      else if (habit.category === 'health') statsCopy.vitality += 1;

      return {
        ...prev,
        totalHabitsCompleted: prev.totalHabitsCompleted + 1,
        stats: statsCopy,
      };
    });

    awardExperienceAndCoins(
      habit.xpReward,
      habit.coinReward,
      `Vazifa bajarildi: "${habit.title}"`
    );
  };

  // Add Habit
  const handleAddHabit = (habitData: Omit<Habit, 'id' | 'completedToday' | 'streak'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: 'h_' + Date.now(),
      completedToday: false,
      streak: 0,
    };
    setHabits((prev) => [newHabit, ...prev]);
    addQuestLog(`Yangi Quest qo'shildi: "${newHabit.title}"`, 'habit');
  };

  // Delete Habit
  const handleDeleteHabit = (habitId: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
  };

  // Claim Reward
  const handleClaimReward = (rewardId: string, cost: number) => {
    if (user.coins < cost) return;

    setUser((prev) => ({ ...prev, coins: prev.coins - cost }));

    setRewards((prev) =>
      prev.map((r) => {
        if (r.id === rewardId) {
          return { ...r, timesClaimed: r.timesClaimed + 1 };
        }
        return r;
      })
    );

    const reward = rewards.find((r) => r.id === rewardId);
    addQuestLog(`Mukofot xarid qilindi: "${reward?.title || 'Mukofot'}"`, 'reward');
  };

  // Add Reward
  const handleAddReward = (rewardData: Omit<Reward, 'id' | 'timesClaimed'>) => {
    const newReward: Reward = {
      ...rewardData,
      id: 'r_' + Date.now(),
      timesClaimed: 0,
    };
    setRewards((prev) => [newReward, ...prev]);
  };

  // Upgrade Hero Stat (+5 points for 50 coins)
  const handleUpgradeStat = (statKey: keyof UserStats['stats']) => {
    if (user.coins < 50) return;

    setUser((prev) => ({
      ...prev,
      coins: prev.coins - 50,
      stats: {
        ...prev.stats,
        [statKey]: prev.stats[statKey] + 5,
      },
    }));

    addQuestLog(`Hero Stat oshirildi: ${statKey.toUpperCase()} +5`, 'habit');
  };

  // Change Class
  const handleChangeClass = (newClass: HeroClass) => {
    setUser((prev) => ({ ...prev, heroClass: newClass }));
  };

  // Focus Timer Completion
  const handleCompleteFocus = (xpGained: number, coinsGained: number) => {
    awardExperienceAndCoins(xpGained, coinsGained, "Distraction Boss defeated in Focus Battle!");
  };

  // Reset Demo Data
  const handleResetData = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.HABITS);
    localStorage.removeItem(STORAGE_KEYS.REWARDS);
    localStorage.removeItem(STORAGE_KEYS.LOGS);
    setUser(INITIAL_USER);
    setHabits(INITIAL_HABITS);
    setRewards(INITIAL_REWARDS);
    setQuestLogs([
      {
        id: 'l1',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: 'Ma\'lumotlar muvaffaqiyatli qayta tiklandi!',
        type: 'habit',
      }
    ]);
  };

  const activeHabitsCount = habits.filter((h) => !h.completedToday).length;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Header Bar */}
      <Header
        user={user}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(sound.toggleMute())}
        onResetData={handleResetData}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800/80">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('habits');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold transition shrink-0 ${
              activeTab === 'habits'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 scale-105'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Daily Quests & Habits</span>
            {activeHabitsCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] border border-cyan-400/40">
                {activeHabitsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('character');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold transition shrink-0 ${
              activeTab === 'character'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 scale-105'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Hero Profile & Stats</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('timer');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold transition shrink-0 ${
              activeTab === 'timer'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 scale-105'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <Timer className="w-4 h-4 text-rose-400" />
            <span>Pomodoro Boss Battle</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('shop');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold transition shrink-0 ${
              activeTab === 'shop'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-yellow-400" />
            <span>Reward Shop</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('analytics');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold transition shrink-0 ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20 scale-105'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics & Badges</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="pt-2 animate-fadeIn">
          {activeTab === 'habits' && (
            <HabitList
              habits={habits}
              onCompleteHabit={handleCompleteHabit}
              onAddHabit={handleAddHabit}
              onDeleteHabit={handleDeleteHabit}
            />
          )}

          {activeTab === 'character' && (
            <CharacterCard
              user={user}
              questLogs={questLogs}
              onChangeClass={handleChangeClass}
              onUpgradeStat={handleUpgradeStat}
            />
          )}

          {activeTab === 'timer' && (
            <FocusTimer onCompleteFocus={handleCompleteFocus} />
          )}

          {activeTab === 'shop' && (
            <RewardShop
              rewards={rewards}
              userCoins={user.coins}
              onClaimReward={handleClaimReward}
              onAddReward={handleAddReward}
            />
          )}

          {activeTab === 'analytics' && (
            <StatsAnalytics user={user} habits={habits} />
          )}
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 py-4 text-center text-xs text-slate-500 bg-slate-950/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>HabitQuest RPG — TSX React + TypeScript App</span>
          </div>
          <div>Dilmurod uchun maxsus tayyorlandi</div>
        </div>
      </footer>

    </div>
  );
}

export default App;
