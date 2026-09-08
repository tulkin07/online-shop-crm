import React, { useState } from 'react';
import type { Reward } from '../types';
import { Coins, Plus, Sparkles, Gamepad2, Coffee, Tv, Gift, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface RewardShopProps {
  rewards: Reward[];
  userCoins: number;
  onClaimReward: (rewardId: string, cost: number) => void;
  onAddReward: (reward: Omit<Reward, 'id' | 'timesClaimed'>) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Gaming: <Gamepad2 className="w-5 h-5 text-purple-400" />,
  Food: <Coffee className="w-5 h-5 text-amber-400" />,
  Entertainment: <Tv className="w-5 h-5 text-cyan-400" />,
  Shopping: <Gift className="w-5 h-5 text-rose-400" />,
};

export const RewardShop: React.FC<RewardShopProps> = ({
  rewards,
  userCoins,
  onClaimReward,
  onAddReward,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCost, setNewCost] = useState<number>(100);
  const [newCategory, setNewCategory] = useState<string>('Gaming');

  const handleClaim = (reward: Reward, e: React.MouseEvent) => {
    if (userCoins < reward.cost) return;

    sound.playCoin();

    // Trigger confetti
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x, y },
      colors: ['#f59e0b', '#eab308', '#ec4899'],
    });

    onClaimReward(reward.id, reward.cost);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    sound.playClick();
    onAddReward({
      title: newTitle,
      description: newDesc || 'Shaxsiy mukofot',
      cost: newCost,
      category: newCategory,
      icon: newCategory === 'Gaming' ? 'Gamepad2' : 'Gift',
    });

    setNewTitle('');
    setNewDesc('');
    setNewCost(100);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-black text-slate-100">Reward Shop & Treasury</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Vazifalarni bajarib toplangan Oltin tangalaringizni real hayotiy mukofotlarga almashtiring!
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-2xl border border-yellow-500/30">
            <Coins className="w-5 h-5 text-yellow-400 fill-yellow-400/20" />
            <div>
              <div className="text-[10px] text-yellow-500 uppercase font-bold">Mavjud Tangalar</div>
              <div className="text-lg font-black text-yellow-300 font-mono">{userCoins} Gold</div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 transition hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            Mukofot Yaratish
          </button>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((reward) => {
          const canAfford = userCoins >= reward.cost;
          return (
            <div
              key={reward.id}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col justify-between group hover:border-yellow-500/30 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
                    {CATEGORY_ICONS[reward.category] || <Gift className="w-5 h-5 text-cyan-400" />}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                    Sotib olindi: {reward.timesClaimed} marta
                  </span>
                </div>

                <h4 className="font-extrabold text-slate-100 text-base mb-1">{reward.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4">{reward.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-yellow-400 font-mono font-black text-sm">
                  <Coins className="w-4 h-4" />
                  {reward.cost} Gold
                </div>

                <button
                  onClick={(e) => handleClaim(reward, e)}
                  disabled={!canAfford}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition active:scale-95 ${
                    canAfford
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 hover:from-yellow-400 hover:to-amber-500 shadow-md shadow-yellow-500/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {canAfford ? 'Redeem (Xarid qil)' : 'Yetarli Gold yo\'q'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Reward Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-400" />
                Yangi Mukofot Qo'shish
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
                <label className="block text-xs font-bold text-slate-400 mb-1">Mukofot Nomi:</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Sevimli restoran taomi..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Tavsif:</label>
                <textarea
                  rows={2}
                  placeholder="Mukofot shartlari..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Narxi (Gold Coins):</label>
                  <input
                    type="number"
                    min={10}
                    step={10}
                    value={newCost}
                    onChange={(e) => setNewCost(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Kategoriya:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Gaming">🎮 Gaming</option>
                    <option value="Food">☕ Food & Drink</option>
                    <option value="Entertainment">🎬 Entertainment</option>
                    <option value="Shopping">🎁 Shopping</option>
                  </select>
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
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 text-xs font-extrabold shadow-lg shadow-amber-500/20 hover:scale-105 transition"
                >
                  Do'konga Qo'shish
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
