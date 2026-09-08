import React, { useState } from 'react';
import type { Habit, Category, Difficulty } from '../types';
import { 
  CheckCircle2, Circle, Plus, Flame, Sparkles, Filter, Trash2, 
  Activity, Code2, BookOpen, Droplets, Brain, Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface HabitListProps {
  habits: Habit[];
  onCompleteHabit: (habitId: string) => void;
  onAddHabit: (habit: Omit<Habit, 'id' | 'completedToday' | 'streak'>) => void;
  onDeleteHabit: (habitId: string) => void;
}

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  fitness: <Activity className="w-4 h-4 text-rose-400" />,
  code: <Code2 className="w-4 h-4 text-indigo-400" />,
  mind: <BookOpen className="w-4 h-4 text-cyan-400" />,
  health: <Droplets className="w-4 h-4 text-emerald-400" />,
  life: <Brain className="w-4 h-4 text-purple-400" />,
};

const DIFFICULTY_BADGES: Record<Difficulty, { label: string; bg: string; text: string; border: string }> = {
  easy: { label: 'Easy', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  medium: { label: 'Medium', bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  hard: { label: 'Hard', bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  boss: { label: 'BOSS QUEST', bg: 'bg-rose-500/20', text: 'text-rose-400 font-extrabold animate-pulse', border: 'border-rose-500/50' },
};

export const HabitList: React.FC<HabitListProps> = ({
  habits,
  onCompleteHabit,
  onAddHabit,
  onDeleteHabit,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New habit form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<Category>('code');
  const [newDifficulty, setNewDifficulty] = useState<Difficulty>('medium');
  const [newFrequency, setNewFrequency] = useState<'daily' | 'weekly'>('daily');

  const filteredHabits = habits.filter((h) => {
    const matchCat = selectedCategory === 'all' || h.category === selectedCategory;
    const matchStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !h.completedToday) ||
      (statusFilter === 'completed' && h.completedToday);
    return matchCat && matchStatus;
  });

  const handleComplete = (habit: Habit, e: React.MouseEvent) => {
    if (habit.completedToday) return;

    sound.playTaskComplete();
    sound.playCoin();

    // Launch confetti from button position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { x, y },
      colors: ['#06b6d4', '#8b5cf6', '#f59e0b', '#10b981'],
    });

    onCompleteHabit(habit.id);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Calculate XP & Coin rewards based on difficulty
    let xp = 20;
    let coin = 15;
    if (newDifficulty === 'medium') {
      xp = 35;
      coin = 25;
    } else if (newDifficulty === 'hard') {
      xp = 75;
      coin = 50;
    } else if (newDifficulty === 'boss') {
      xp = 150;
      coin = 100;
    }

    sound.playClick();
    onAddHabit({
      title: newTitle,
      description: newDesc || 'Kundalik produktivlik vazifasi',
      category: newCategory,
      difficulty: newDifficulty,
      xpReward: xp,
      coinReward: coin,
      frequency: newFrequency,
      icon: newCategory === 'fitness' ? 'Activity' : newCategory === 'code' ? 'Code2' : 'BookOpen',
    });

    setNewTitle('');
    setNewDesc('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Action Header & Filters */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Search / Filter buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            Kategoriya:
          </span>
          {['all', 'fitness', 'code', 'mind', 'health', 'life'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right: Status filter & Add Quest button */}
        <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
          <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            {(['all', 'active', 'completed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => {
                  sound.playClick();
                  setStatusFilter(st);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition ${
                  statusFilter === st
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Yangi Quest Qo'shish
          </button>
        </div>

      </div>

      {/* Habit Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHabits.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl">
            <Sparkles className="w-10 h-10 text-slate-600 mx-auto mb-3 animate-bounce" />
            <h4 className="text-slate-300 font-bold">Vazifalar topilmadi</h4>
            <p className="text-xs text-slate-500 mt-1">Yangi odat qo'shing yoki filtrlarni o'zgartiring.</p>
          </div>
        ) : (
          filteredHabits.map((habit) => {
            const diffStyle = DIFFICULTY_BADGES[habit.difficulty];
            return (
              <div
                key={habit.id}
                className={`group relative bg-slate-900/90 border rounded-3xl p-5 shadow-xl transition-all duration-300 flex flex-col justify-between ${
                  habit.completedToday
                    ? 'border-emerald-500/30 bg-slate-950/60 opacity-80'
                    : 'border-slate-800 hover:border-slate-700 hover:shadow-cyan-500/5'
                }`}
              >
                <div>
                  {/* Card Header: Category & Difficulty badges */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-bold text-slate-300">
                      {CATEGORY_ICONS[habit.category]}
                      <span className="capitalize">{habit.category}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${diffStyle.bg} ${diffStyle.text} ${diffStyle.border}`}
                      >
                        {diffStyle.label}
                      </span>
                      <button
                        onClick={() => {
                          if (confirm('Ushbu vazifani o\'chirmoqchimisiz?')) {
                            sound.playClick();
                            onDeleteHabit(habit.id);
                          }
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition"
                        title="O'chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h4
                    className={`font-extrabold text-base leading-snug mb-1 ${
                      habit.completedToday ? 'line-through text-slate-400' : 'text-slate-100'
                    }`}
                  >
                    {habit.title}
                  </h4>
                  <p className="text-xs text-slate-400 mb-4 line-clamp-2">{habit.description}</p>
                </div>

                {/* Card Footer: Rewards, Streak & Complete button */}
                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between mt-2">
                  
                  {/* Rewards & Streak */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs font-bold text-cyan-400 font-mono">
                      <Award className="w-3.5 h-3.5 text-cyan-400" />
                      +{habit.xpReward} XP
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-yellow-400 font-mono">
                      💰 +{habit.coinReward}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-extrabold text-amber-400 font-mono" title="Streak count">
                      <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      {habit.streak}d
                    </div>
                  </div>

                  {/* Complete Checkbox Button */}
                  <button
                    onClick={(e) => handleComplete(habit, e)}
                    disabled={habit.completedToday}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition active:scale-95 ${
                      habit.completedToday
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-400 hover:to-teal-500 shadow-md shadow-emerald-500/20'
                    }`}
                  >
                    {habit.completedToday ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Bajarildi
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4" />
                        Bajarish
                      </>
                    )}
                  </button>

                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Add New Habit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Yangi Quest (Odat) Yaratish
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Quest Nomi:</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: 30 daqiqa ingliz tili tinglash..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Tavsif (Tafsilot):</label>
                <textarea
                  rows={2}
                  placeholder="Maqsad va natija haqida..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Kategoriya:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as Category)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="code">💻 Code & Work</option>
                    <option value="fitness">🏃‍♂️ Fitness & Sport</option>
                    <option value="mind">🧠 Mind & Books</option>
                    <option value="health">💧 Health & Water</option>
                    <option value="life">🌟 Life Habits</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Qiyinchilik Level:</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as Difficulty)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="easy">Easy (+20 XP / +15 Coins)</option>
                    <option value="medium">Medium (+35 XP / +25 Coins)</option>
                    <option value="hard">Hard (+75 XP / +50 Coins)</option>
                    <option value="boss">🔥 BOSS QUEST (+150 XP / +100 Coins)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Davriylik:</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs text-slate-300 font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="freq"
                      checked={newFrequency === 'daily'}
                      onChange={() => setNewFrequency('daily')}
                      className="accent-cyan-500"
                    />
                    Har kuni (Daily)
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-300 font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="freq"
                      checked={newFrequency === 'weekly'}
                      onChange={() => setNewFrequency('weekly')}
                      className="accent-cyan-500"
                    />
                    Haftada 1 marta (Weekly)
                  </label>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-extrabold shadow-lg shadow-cyan-500/20 hover:scale-105 transition"
                >
                  Saqlash va Boshlash
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
