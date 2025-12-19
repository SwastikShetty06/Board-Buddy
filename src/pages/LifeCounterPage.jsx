import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Minus, RotateCcw, User, Settings, Sparkles } from 'lucide-react';

const PlayerLife = ({ id, name, life, onUpdate, color }) => {
    return (
        <div className={`bg-white dark:bg-black border-[6px] border-black dark:border-white p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] flex flex-col items-center justify-between h-full relative group overflow-hidden`}>
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl pointer-events-none ${color.replace('bg-', 'bg-')}`}></div>

            <div className="flex flex-col items-center gap-4 relative z-10 w-full">
                <div className="flex justify-between items-center w-full">
                    <h3 className="text-3xl md:text-5xl font-black text-black dark:text-white tracking-tighter uppercase italic leading-none">{name}</h3>
                </div>
            </div>

            <div className="my-12 text-center relative z-10">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={life}
                        initial={{ y: 20, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -20, opacity: 0, scale: 0.8 }}
                        className="text-[10rem] md:text-[14rem] font-scoreboard font-black tracking-tighter leading-none text-black dark:text-white block drop-shadow-[8px_8px_0px_rgba(0,0,0,0.1)]"
                    >
                        {life}
                    </motion.span>
                </AnimatePresence>
                <Heart className={`absolute top-0 right-[-20px] w-12 h-12 opacity-20 ${life <= 5 ? 'text-red-500 animate-pulse opacity-100' : 'text-black dark:text-white'}`} />
            </div>

            <div className="w-full grid grid-cols-4 gap-4 relative z-10">
                <button
                    onClick={() => onUpdate(id, -1)}
                    className="brutal-button bg-[#FF66AA] h-20 text-4xl flex items-center justify-center p-0"
                >
                    <Minus className="w-8 h-8 stroke-[4px]" />
                </button>

                <button
                    onClick={() => onUpdate(id, -5)}
                    className="brutal-button bg-white dark:bg-zinc-800 h-20 text-xl font-black p-0"
                >
                    -5
                </button>

                <button
                    onClick={() => onUpdate(id, 5)}
                    className="brutal-button bg-white dark:bg-zinc-800 h-20 text-xl font-black p-0"
                >
                    +5
                </button>

                <button
                    onClick={() => onUpdate(id, 1)}
                    className="brutal-button bg-[#33FF77] h-20 text-4xl flex items-center justify-center p-0"
                >
                    <Plus className="w-8 h-8 stroke-[4px]" />
                </button>
            </div>

            {/* Progress Bar (Visual Only for Juice) */}
            <div className="absolute bottom-0 left-0 h-2 bg-black dark:bg-white w-full opacity-5"></div>
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
        <div className="max-w-6xl mx-auto px-4 md:px-0">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
                <div>
                    <h1 className="text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter uppercase italic leading-none mb-4">Life Counter</h1>
                    <p className="text-black/50 dark:text-white/40 font-bold uppercase tracking-[0.2em] text-xs underline underline-offset-4 decoration-[3px]">Epic Strategy Tracker</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-white dark:bg-black p-1 border-[4px] border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex items-center gap-2 pr-4">
                        <div className="w-10 h-10 bg-[#00E1FF] text-black border-r-[3px] border-black flex items-center justify-center">
                            <Settings className="w-5 h-5" />
                        </div>
                        <select
                            className="bg-transparent text-[10px] font-black text-black dark:text-white outline-none uppercase tracking-widest cursor-pointer"
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
                        className="w-14 h-14 border-[4px] border-black dark:border-white bg-white dark:bg-black text-black dark:text-white flex items-center justify-center transition-all hover:bg-[#FFD21E] hover:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
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
