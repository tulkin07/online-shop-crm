import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ShieldAlert, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface FocusTimerProps {
  onCompleteFocus: (xpGained: number, coinsGained: number) => void;
}

const BOSSES = [
  { name: 'Sloth Demon (Zalolat Iblisi)', icon: '🦥', maxHp: 100, desc: 'Dangasalik va kechiktirish vajlarini yengish' },
  { name: 'Social Media Hydra (Ijtimoiy Tarmoq Ajdari)', icon: '🐍', maxHp: 100, desc: 'Chalg\'ituvchi bildirishnomalarni tor-mor etish' },
  { name: 'Procrastination Dragon (Kechiktirish Ajoyiboti)', icon: '🐉', maxHp: 100, desc: 'Fokus va chuqur diqqat bilan jang qilish' },
];

export const FocusTimer: React.FC<FocusTimerProps> = ({ onCompleteFocus }) => {
  const [selectedBoss, setSelectedBoss] = useState(BOSSES[0]);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [durationMinutes, setDurationMinutes] = useState<number>(25);
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [ambientSound, setAmbientSound] = useState<boolean>(false);

  const audioSynthRef = useRef<{ osc: OscillatorNode; gain: GainNode; ctx: AudioContext } | null>(null);

  // Calculate Boss HP based on progress
  const totalSeconds = durationMinutes * 60;
  const progressPercent = Math.max(0, Math.min(100, ((totalSeconds - timeLeft) / totalSeconds) * 100));
  const bossHpPercent = Math.max(0, 100 - Math.round(progressPercent));

  // Timer loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      handleTimerFinish();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  // Ambient sound synthesizer generator
  useEffect(() => {
    if (ambientSound && isRunning) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, ctx.currentTime); // Low relaxing A2 tone
        gain.gain.setValueAtTime(0.04, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        audioSynthRef.current = { osc, gain, ctx };
      } catch (err) {
        console.error('Ambient audio error:', err);
      }
    } else {
      if (audioSynthRef.current) {
        try {
          audioSynthRef.current.osc.stop();
          audioSynthRef.current.ctx.close();
        } catch {
          // ignore
        }
        audioSynthRef.current = null;
      }
    }

    return () => {
      if (audioSynthRef.current) {
        try {
          audioSynthRef.current.osc.stop();
          audioSynthRef.current.ctx.close();
        } catch {
          // ignore
        }
        audioSynthRef.current = null;
      }
    };
  }, [ambientSound, isRunning]);

  const handleTimerFinish = () => {
    sound.playTimerDone();
    sound.playLevelUp();

    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
    });

    if (mode === 'work') {
      onCompleteFocus(50, 35);
      alert(`🎉 G'alaba! ${selectedBoss.name} tor-mor qilindi!\nSiz +50 XP va +35 Gold Coin qo'lga kiritdingiz!`);
    } else {
      alert('☕ Tanaffus vaqti tugadi! Yangi fokus jangiga tayyormisiz?');
    }
  };

  const handleSetDuration = (mins: number, isWork: boolean) => {
    sound.playClick();
    setIsRunning(false);
    setMode(isWork ? 'work' : 'break');
    setDurationMinutes(mins);
    setTimeLeft(mins * 60);
  };

  const toggleStartPause = () => {
    sound.playClick();
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    sound.playClick();
    setIsRunning(false);
    setTimeLeft(durationMinutes * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Boss Battle Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldAlert className="w-36 h-36 text-rose-500" />
        </div>

        {/* Boss Selection */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          {BOSSES.map((b) => (
            <button
              key={b.name}
              onClick={() => {
                sound.playClick();
                setSelectedBoss(b);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 border ${
                selectedBoss.name === b.name
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-lg shadow-rose-500/10'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="text-xl">{b.icon}</span>
              <span>{b.name}</span>
            </button>
          ))}
        </div>

        {/* Boss Display & Health Bar */}
        <div className="max-w-md mx-auto space-y-3">
          <div className="text-6xl animate-bounce mb-2">{selectedBoss.icon}</div>
          <h3 className="text-xl font-black text-rose-400">{selectedBoss.name}</h3>
          <p className="text-xs text-slate-400">{selectedBoss.desc}</p>

          {/* Health Bar */}
          <div className="space-y-1 pt-2">
            <div className="flex justify-between text-xs font-bold font-mono">
              <span className="text-rose-400">Boss HP: {bossHpPercent} / 100</span>
              <span className="text-cyan-400">G'alaba Mukofoti: +50 XP & +35 Gold</span>
            </div>
            <div className="w-full h-4 bg-slate-950 rounded-full border border-slate-800 overflow-hidden p-0.5 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${bossHpPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pomodoro Timer Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center space-y-6">
        
        {/* Presets */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleSetDuration(25, true)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              durationMinutes === 25 && mode === 'work'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🎯 25 min Focus Battle
          </button>
          <button
            onClick={() => handleSetDuration(5, false)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              durationMinutes === 5 && mode === 'break'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ☕ 5 min Short Break
          </button>
          <button
            onClick={() => handleSetDuration(15, false)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              durationMinutes === 15 && mode === 'break'
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🌴 15 min Long Break
          </button>
        </div>

        {/* Digital Clock Display */}
        <div className="relative flex items-center justify-center w-72 h-72 rounded-full bg-slate-950 border-4 border-slate-800 shadow-2xl shadow-cyan-500/5 group">
          <div className="text-center">
            <div className="text-6xl font-black font-mono tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-indigo-200 to-slate-400">
              {formatTime(timeLeft)}
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">
              {isRunning ? '🔥 JANG KETMOQDA...' : 'PAUSA'}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleStartPause}
            className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-extrabold shadow-xl transition hover:scale-105 active:scale-95 ${
              isRunning
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/20'
                : 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:from-cyan-400 hover:to-indigo-500 shadow-cyan-500/20'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                Pausaga Qo'yish
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                Jangni Boshlash
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-3.5 rounded-2xl bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition"
            title="Qayta o'rnatish"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setAmbientSound(!ambientSound);
            }}
            className={`p-3.5 rounded-2xl border transition ${
              ambientSound
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-800 text-slate-500 border-slate-700 hover:text-slate-300'
            }`}
            title="Ambient Relaxing Synth Sound"
          >
            {ambientSound ? <Volume2 className="w-5 h-5 text-cyan-400" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

      </div>

    </div>
  );
};
