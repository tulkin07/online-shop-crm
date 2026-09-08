import React from 'react';
import type { UserStats, HeroClass, QuestLog } from '../types';
import { Shield, Zap, Brain, Dumbbell, Sparkles, Activity, Plus, Award } from 'lucide-react';
import { sound } from '../utils/audio';

interface CharacterCardProps {
  user: UserStats;
  questLogs: QuestLog[];
  onChangeClass: (newClass: HeroClass) => void;
  onUpgradeStat: (statKey: keyof UserStats['stats']) => void;
}

const CLASS_AVATARS: Record<HeroClass, { avatar: string; color: string; desc: string; icon: string }> = {
  Warrior: {
    avatar: '⚔️',
    color: 'from-amber-500 to-rose-600',
    desc: 'Intizom va Jismoniy kuch ustasi',
    icon: 'Sword',
  },
  'Cyber Mage': {
    avatar: '🔮',
    color: 'from-cyan-500 to-purple-600',
    desc: 'Aql-zakovat va Texnologiya jodugari',
    icon: 'Zap',
  },
  'Shadow Ninja': {
    avatar: '🥷',
    color: 'from-emerald-500 to-teal-700',
    desc: 'Tezkorlik va Benuqson diqqat egasi',
    icon: 'Activity',
  },
  'Code Craftsman': {
    avatar: '🧑‍💻',
    color: 'from-blue-500 to-indigo-600',
    desc: 'Loyiha arxitekturasi va Tizimlar muhandisi',
    icon: 'Brain',
  },
};

export const CharacterCard: React.FC<CharacterCardProps> = ({
  user,
  questLogs,
  onChangeClass,
  onUpgradeStat,
}) => {
  const currentClassInfo = CLASS_AVATARS[user.heroClass];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Hero Avatar & Main Card */}
      <div className="lg:col-span-1 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
        <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${currentClassInfo.color} opacity-20 blur-3xl rounded-full pointer-events-none group-hover:opacity-30 transition-opacity`} />

        <div>
          {/* Avatar Icon */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className={`w-28 h-28 rounded-2xl bg-gradient-to-tr ${currentClassInfo.color} p-1 shadow-xl shadow-cyan-500/10`}>
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-5xl">
                  {currentClassInfo.avatar}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full border border-slate-900 shadow-md">
                LVL {user.level}
              </div>
            </div>

            <h2 className="text-2xl font-black text-slate-100 tracking-tight">{user.name}</h2>
            <div className="flex items-center gap-1.5 mt-1 text-sm font-semibold text-cyan-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{user.title}</span>
            </div>

            {/* Class Selector Dropdown */}
            <div className="mt-4 w-full">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5 text-left">
                Hero Class:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(CLASS_AVATARS) as HeroClass[]).map((cls) => {
                  const isActive = user.heroClass === cls;
                  return (
                    <button
                      key={cls}
                      onClick={() => {
                        sound.playClick();
                        onChangeClass(cls);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                        isActive
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span>{CLASS_AVATARS[cls].avatar}</span>
                      <span>{cls}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-medium bg-slate-950/50 p-2 rounded-xl border border-slate-800/50">
                {currentClassInfo.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Hero Summary Badges */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-center">
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60">
            <div className="text-xs text-slate-400 font-medium">Habits Done</div>
            <div className="text-xl font-extrabold text-cyan-400 font-mono mt-0.5">
              {user.totalHabitsCompleted}
            </div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60">
            <div className="text-xs text-slate-400 font-medium">Current Streak</div>
            <div className="text-xl font-extrabold text-amber-400 font-mono mt-0.5">
              🔥 {user.currentStreak}d
            </div>
          </div>
        </div>
      </div>

      {/* Hero Stats & Attributes */}
      <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-extrabold text-slate-100 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-400" />
                Hero Attributes & Skills
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Vazifalarni bajarib xususiyatlaringizni oshiring yoki Gold Coin evaziga upgrade qiling (+5 points = 50 Coins).
              </p>
            </div>
            <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-xs font-bold text-indigo-300">
              {user.coins >= 50 ? '⚡ Upgrade Max' : '💰 Need 50 Coins'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Strength */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between group hover:border-rose-500/40 transition">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-200">Strength (Kuch)</div>
                  <div className="text-xs text-slate-400">Fitness & Sport</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-black text-rose-400 font-mono">{user.stats.strength}</span>
                <button
                  onClick={() => {
                    sound.playClick();
                    onUpgradeStat('strength');
                  }}
                  disabled={user.coins < 50}
                  className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white disabled:opacity-30 transition"
                  title="50 Coins evaziga 5 ochko qo'shish"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Intelligence */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between group hover:border-cyan-500/40 transition">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-200">Intelligence (Aql)</div>
                  <div className="text-xs text-slate-400">Kitoblar & Mutolaa</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-black text-cyan-400 font-mono">{user.stats.intelligence}</span>
                <button
                  onClick={() => {
                    sound.playClick();
                    onUpgradeStat('intelligence');
                  }}
                  disabled={user.coins < 50}
                  className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-white disabled:opacity-30 transition"
                  title="50 Coins evaziga 5 ochko qo'shish"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Focus */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between group hover:border-indigo-500/40 transition">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-200">Focus (Diqqat)</div>
                  <div className="text-xs text-slate-400">Dasturlash & Loyihalar</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-black text-indigo-400 font-mono">{user.stats.focus}</span>
                <button
                  onClick={() => {
                    sound.playClick();
                    onUpgradeStat('focus');
                  }}
                  disabled={user.coins < 50}
                  className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500 hover:text-white disabled:opacity-30 transition"
                  title="50 Coins evaziga 5 ochko qo'shish"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Vitality */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between group hover:border-emerald-500/40 transition">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-200">Vitality (Hayotiy Kuch)</div>
                  <div className="text-xs text-slate-400">Salomatlik & Uyqu</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-black text-emerald-400 font-mono">{user.stats.vitality}</span>
                <button
                  onClick={() => {
                    sound.playClick();
                    onUpgradeStat('vitality');
                  }}
                  disabled={user.coins < 50}
                  className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-white disabled:opacity-30 transition"
                  title="50 Coins evaziga 5 ochko qo'shish"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Quest History Logs */}
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            Oxirgi qahramonlik voqealari (Quest Logs)
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
            {questLogs.length === 0 ? (
              <div className="text-xs text-slate-500 italic">Hali voqealar yo'q. Vazifalarni bajarishni boshlang!</div>
            ) : (
              questLogs.slice(0, 5).map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between text-xs bg-slate-950/50 px-3 py-2 rounded-xl border border-slate-800/40"
                >
                  <span className="text-slate-300 font-medium">{log.title}</span>
                  <div className="flex items-center gap-2 font-mono font-bold text-[11px]">
                    {log.xpGained && <span className="text-cyan-400">+{log.xpGained} XP</span>}
                    {log.coinsGained && <span className="text-yellow-400">+{log.coinsGained} Gold</span>}
                    <span className="text-slate-500">{log.timestamp}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
