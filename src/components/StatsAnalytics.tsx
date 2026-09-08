import React from 'react';
import type { Habit, UserStats } from '../types';
import { BarChart3, Trophy, Flame, CheckCircle, Award } from 'lucide-react';

interface StatsAnalyticsProps {
  user: UserStats;
  habits: Habit[];
}

export const StatsAnalytics: React.FC<StatsAnalyticsProps> = ({ user, habits }) => {
  const totalHabits = habits.length;
  const completedHabits = habits.filter((h) => h.completedToday).length;
  const completionRate = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

  // Category counts
  const categoryCounts = habits.reduce((acc, h) => {
    acc[h.category] = (acc[h.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const achievements = [
    { id: 'a1', title: 'Birinchi Qadam', desc: 'Kamida 1 ta vazifani bajardiz', unlocked: user.totalHabitsCompleted >= 1, icon: '🌟' },
    { id: 'a2', title: 'Intizom Ustasi', desc: '5 kunlik streak zanjiriga erishdingiz', unlocked: user.currentStreak >= 5, icon: '🔥' },
    { id: 'a3', title: 'Aql Va Manbalar', desc: '10 ta intellekt vazifasini tamomladiz', unlocked: user.stats.intelligence >= 25, icon: '🧠' },
    { id: 'a4', title: 'Level 5 Qahramon', desc: '5-darajaga muvaffaqiyatli yetdingiz', unlocked: user.level >= 5, icon: '👑' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Completion Rate */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl flex items-center gap-4">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400">Bugungi Bajarilish Foizi</div>
            <div className="text-2xl font-black text-cyan-400 font-mono mt-0.5">{completionRate}%</div>
            <div className="text-[11px] text-slate-500 mt-1">
              {completedHabits} / {totalHabits} ta vazifa bajarildi
            </div>
          </div>
        </div>

        {/* Total Progress */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl flex items-center gap-4">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400">Jami Bajarilgan Vazifalar</div>
            <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">{user.totalHabitsCompleted}</div>
            <div className="text-[11px] text-slate-500 mt-1">Jami jamg'arilgan XP: {user.level * 500 + user.currentXp}</div>
          </div>
        </div>

        {/* Longest Streak */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl flex items-center gap-4">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Flame className="w-8 h-8 text-amber-500" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400">Streak Zanjiri</div>
            <div className="text-2xl font-black text-purple-400 font-mono mt-0.5">{user.currentStreak} Kun</div>
            <div className="text-[11px] text-slate-500 mt-1">Uzluksiz kunlik intizom</div>
          </div>
        </div>

      </div>

      {/* Category Breakdown & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Breakdown */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-base font-extrabold text-slate-100 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            Kategoriyalar bo'yicha Taqsimot
          </h3>

          <div className="space-y-4">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / totalHabits) * 100);
              return (
                <div key={cat} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold capitalize">
                    <span className="text-slate-300">{cat}</span>
                    <span className="text-cyan-400 font-mono">{count} ta ({pct}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges & Achievements */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-base font-extrabold text-slate-100 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Yutuqlar & Nishoplar (Badges)
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-3 rounded-2xl border transition flex items-center gap-3 ${
                  ach.unlocked
                    ? 'bg-slate-950 border-amber-500/40 shadow-lg shadow-amber-500/5'
                    : 'bg-slate-950/40 border-slate-800 opacity-50 grayscale'
                }`}
              >
                <div className="text-2xl">{ach.icon}</div>
                <div>
                  <div className="text-xs font-extrabold text-slate-200">{ach.title}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">{ach.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
