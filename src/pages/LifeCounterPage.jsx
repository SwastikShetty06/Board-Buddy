import React, { useState } from 'react';
import { Heart, Plus, Minus, RotateCcw, User, Settings } from 'lucide-react';

const PlayerLife = ({ id, name, life, onUpdate, color }) => {
    return (
        <div className={`playful-card p-10 flex flex-col items-center justify-between h-full border-8 border-slate-50 ${color}`}>
            <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center shadow-sm text-slate-300">
                    <User className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">{name}</h3>
            </div>

            <div className="my-12 text-center relative">
                <span className="text-[10rem] font-[900] tracking-tighter leading-none text-slate-800">
                    {life}
                </span>
                <Heart className={`absolute -top-6 -right-6 w-16 h-16 opacity-10 ${life <= 5 ? 'animate-pulse opacity-40 text-rose-500' : ''}`} />
            </div>

            <div className="w-full flex items-center justify-between gap-4">
                <button
                    onClick={() => onUpdate(id, -1)}
                    className="w-20 h-20 flex items-center justify-center bg-white/50 hover:bg-white text-slate-400 hover:text-rose-500 rounded-[2rem] transition-all shadow-sm active:scale-95"
                >
                    <Minus className="w-8 h-8" />
                </button>

                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => onUpdate(id, -5)}
                        className="px-10 py-3 bg-white/30 text-[12px] font-black uppercase tracking-widest text-slate-400 rounded-full hover:bg-white/50 transition-colors active:scale-95"
                    >
                        -5
                    </button>
                    <button
                        onClick={() => onUpdate(id, 5)}
                        className="px-10 py-3 bg-white/30 text-[12px] font-black uppercase tracking-widest text-slate-400 rounded-full hover:bg-white/50 transition-colors active:scale-95"
                    >
                        +5
                    </button>
                </div>

                <button
                    onClick={() => onUpdate(id, 1)}
                    className="w-20 h-20 flex items-center justify-center bg-white/50 hover:bg-white text-slate-400 hover:text-green-500 rounded-[2rem] transition-all shadow-sm active:scale-95"
                >
                    <Plus className="w-8 h-8" />
                </button>
            </div>
        </div>
    );
};

const LifeCounterPage = () => {
    const [players, setPlayers] = useState([
        { id: 1, name: 'Player 1', life: 20, color: 'bg-rose-50' },
        { id: 2, name: 'Player 2', life: 20, color: 'bg-indigo-50' }
    ]);
    const [startingLife, setStartingLife] = useState(20);

    const updateLife = (id, amount) => {
        setPlayers(players.map(p =>
            p.id === id ? { ...p, life: Math.max(0, p.life + amount) } : p
        ));
    };

    const resetGame = () => {
        if (window.confirm('Reset all life totals to starting value?')) {
            setPlayers(players.map(p => ({ ...p, life: startingLife })));
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
                <div>
                    <h1 className="text-6xl font-[900] text-slate-800 tracking-tight mb-4 leading-tight">Life Counter</h1>
                    <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-xs">A resource tracker for your epic strategy games.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-full border-4 border-slate-50 flex items-center gap-2 pr-4">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-400 rounded-full flex items-center justify-center">
                            <Settings className="w-5 h-5" />
                        </div>
                        <select
                            className="bg-transparent text-xs font-black text-slate-500 outline-none uppercase tracking-widest"
                            value={startingLife}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                setStartingLife(val);
                                setPlayers(players.map(p => ({ ...p, life: val })));
                            }}
                        >
                            <option value={20}>20 HP (MTG)</option>
                            <option value={40}>40 HP (Commander)</option>
                            <option value={10}>10 HP (Quick)</option>
                            <option value={100}>100 HP (Resource)</option>
                        </select>
                    </div>

                    <button
                        onClick={resetGame}
                        className="w-14 h-14 flex items-center justify-center bg-slate-50 text-slate-300 hover:bg-rose-50 hover:text-rose-500 rounded-[1.5rem] transition-all"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {players.map(player => (
                    <PlayerLife
                        key={player.id}
                        {...player}
                        onUpdate={updateLife}
                    />
                ))}
            </div>

            {/* Decorative Floating Hearts */}
            <div className="fixed top-40 right-[-5%] -z-10 opacity-5 animate-float pointer-events-none">
                <Heart className="w-64 h-64 text-rose-200 -rotate-12" />
            </div>
        </div>
    );
};

export default LifeCounterPage;
