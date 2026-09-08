import React from 'react';
import type { UserStats } from '../types';
import { Shield, Flame, Coins, Volume2, VolumeX, Trophy, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  user: UserStats;
  isMuted: boolean;
  onToggleMute: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, isMuted, onToggleMute, onResetData }) => {
  const xpPercent = Math.min(100, Math.round((user.currentXp / user.maxXp) * 100));

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800/80 px-4 py-3 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: App Logo & Hero Info */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400">
                <Shield className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
                  HABITQUEST
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-widest">
                  RPG
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                <span>{user.name}</span>
                <span className="text-slate-600">•</span>
                <span className="text-cyan-400">{user.heroClass}</span>
              </p>
            </div>
          </div>

          {/* Quick Mute/Reset buttons for Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                onToggleMute();
              }}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
              title={isMuted ? 'Ovozni yoqish' : 'Ovozni o’chirish'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
          </div>
        </div>

        {/* Center: XP Progress & Level Bar */}
        <div className="w-full md:max-w-md bg-slate-950/70 border border-slate-800/80 rounded-2xl p-2.5 shadow-inner">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-2 font-bold">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] shadow-sm">
                {user.level}
              </span>
              <span className="text-purple-300 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Level {user.level}
              </span>
              <span className="text-slate-500 text-[11px]">({user.title})</span>
            </div>
            <div className="text-slate-400 font-mono text-[11px]">
              <span className="text-cyan-400 font-semibold">{user.currentXp}</span> / {user.maxXp} XP
            </div>
          </div>
          
          {/* XP Progress Bar */}
          <div className="relative w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800/80">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out shadow-glow"
              style={{ width: `${xpPercent}%` }}
            >
              <div className="w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[stripe_2s_linear_infinite]" />
            </div>
          </div>
        </div>

        {/* Right: Currency & Stats Badge */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Streak Badge */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-amber-500/30 text-amber-400 text-xs font-bold shadow-lg shadow-amber-500/5 group hover:border-amber-500/60 transition"
            title="Uzluksiz kunlar zanjiri (Streak)"
          >
            <div className="p-1 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] text-amber-500/80 uppercase tracking-wider font-semibold">Streak</div>
              <div className="text-sm font-extrabold font-mono text-amber-300">{user.currentStreak} kun</div>
            </div>
          </div>

          {/* Coins Badge */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-yellow-500/30 text-yellow-400 text-xs font-bold shadow-lg shadow-yellow-500/5 group hover:border-yellow-500/60 transition"
            title="Oltin tangalar hisobi"
          >
            <div className="p-1 rounded-lg bg-yellow-500/10 text-yellow-400 group-hover:scale-110 transition-transform">
              <Coins className="w-4 h-4 text-yellow-400 fill-yellow-400/30 animate-bounce" />
            </div>
            <div>
              <div className="text-[10px] text-yellow-500/80 uppercase tracking-wider font-semibold">Gold Coins</div>
              <div className="text-sm font-extrabold font-mono text-yellow-300">{user.coins}</div>
            </div>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-1.5 border-l border-slate-800 pl-3">
            <button
              onClick={() => {
                sound.playClick();
                onToggleMute();
              }}
              className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 transition border border-slate-700/50"
              title={isMuted ? 'Ovozni yoqish' : 'Ovozni o’chirish'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>

            <button
              onClick={() => {
                if (window.confirm('Barcha progressni qayta boshlang’ich holatga keltirmoqchimisiz?')) {
                  sound.playClick();
                  onResetData();
                }
              }}
              className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-rose-300 hover:bg-rose-950/40 hover:border-rose-800/60 transition border border-slate-700/50"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
