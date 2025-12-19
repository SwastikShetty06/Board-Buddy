import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RotateCcw, Plus, Trash2, Play, Grid3X3, Layers, ChevronDown } from 'lucide-react';

const Dice = ({ value, sides, rolling, colorClass }) => {
    // Determine dots for d6
    const renderDots = () => {
        if (sides !== 6) return <span className="text-3xl font-black text-black">{value}</span>;

        const dots = {
            1: [4],
            2: [0, 8],
            3: [0, 4, 8],
            4: [0, 2, 6, 8],
            5: [0, 2, 4, 6, 8],
            6: [0, 2, 3, 5, 6, 8]
        };

        return (
            <div className="grid grid-cols-3 gap-2 w-full h-full p-2">
                {[...Array(9)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full ${dots[value]?.includes(i) ? 'bg-black opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className={`
                w-24 h-24 md:w-28 md:h-28 flex items-center justify-center relative transition-all duration-300
                border-[4px] border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]
                ${rolling ? 'animate-roll' : ''}
                ${colorClass}
            `}
        >
            <div className="relative z-10 flex items-center justify-center inset-0 w-full h-full">
                {renderDots()}
            </div>

            {/* Visual indicator for sides */}
            <div className="absolute top-1 right-2 text-[8px] font-black opacity-30 uppercase tracking-tighter">
                D{sides}
            </div>
        </motion.div>
    );
};

const DiceRoller = () => {
    const [dice, setDice] = useState([{ id: 1, value: 6, sides: 6, color: 'bg-yellow-100 text-yellow-600' }]);
    const [rolling, setRolling] = useState(false);
    const [history, setHistory] = useState([]);

    const colors = [
        'bg-[#FFD21E]',
        'bg-[#00E1FF]',
        'bg-[#9D7AFF]',
        'bg-[#FF66AA]',
        'bg-[#33FF77]',
        'bg-[#FF8800]',
    ];

    const rollDice = () => {
        if (rolling || dice.length === 0) return;
        setRolling(true);

        // Rolling animation
        setTimeout(() => {
            const nextDice = dice.map(d => ({
                ...d,
                value: Math.floor(Math.random() * d.sides) + 1
            }));

            setDice(nextDice);

            // Check for critical rolls (max value on any die)
            const hasCrit = nextDice.some(d => d.value === d.sides);
            if (hasCrit) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#FFD21E', '#FF66AA', '#00E1FF']
                });
            }

            setHistory(prev => [
                { id: Date.now(), timestamp: new Date().toLocaleTimeString(), total: nextDice.reduce((acc, d) => acc + d.value, 0), values: nextDice.map(d => d.value) },
                ...prev
            ].slice(0, 5));
            setRolling(false);
        }, 600);
    };

    const addDice = (sides = 6) => {
        if (dice.length >= 8) return;
        const newDice = {
            id: Date.now(),
            value: sides,
            sides: sides,
            color: colors[Math.floor(Math.random() * colors.length)]
        };
        setDice(prev => [...prev, newDice]);
    };

    const removeDice = (id) => {
        if (dice.length <= 1) return;
        setDice(prev => prev.filter(d => d.id !== id));
    };

    const total = dice.reduce((acc, d) => acc + d.value, 0);

    return (
        <div className="max-w-6xl mx-auto px-4">
            <div className="mb-12 flex flex-col items-center">
                <motion.h1
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter uppercase italic leading-none mb-4"
                >
                    Dice Roller
                </motion.h1>
                <p className="text-black/60 dark:text-white/40 font-bold uppercase tracking-[0.2em] text-xs">Tap a die to remove, or roll them all!</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Roll Area */}
                <div className="lg:col-span-8">
                    <motion.div
                        animate={rolling ? { x: [0, -5, 5, -5, 5, 0] } : {}}
                        transition={{ duration: 0.1, repeat: 6 }}
                        className="bg-[#E5E7EB] dark:bg-[#1A1625] border-[6px] border-black dark:border-white p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_2px_rgba(255,255,255,1)] min-h-[450px] flex flex-col items-center justify-center relative overflow-hidden"
                    >
                        {/* Tray Texture */}
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '24px 24px' }}>
                        </div>

                        <div className="flex flex-wrap justify-center gap-10 mb-16 relative z-10 w-full">
                            <AnimatePresence>
                                {dice.map((d) => (
                                    <div key={d.id} className="relative group">
                                        <Dice
                                            value={d.value}
                                            sides={d.sides}
                                            rolling={rolling}
                                            colorClass={d.color}
                                        />
                                        <button
                                            onClick={() => removeDice(d.id)}
                                            className="absolute -top-4 -right-4 w-9 h-9 bg-[#FF66AA] border-[3px] border-black text-black flex items-center justify-center translate-x-1 translate-y-1 shadow-none md:opacity-0 md:group-hover:opacity-100 transition-all hover:scale-110 active:scale-90 z-20"
                                            title="Delete die"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </AnimatePresence>
                            {dice.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-20 opacity-20 dark:invert">
                                    <Layers className="w-24 h-24 mb-4" />
                                    <p className="text-2xl font-black uppercase tracking-widest text-black">Empty Tray</p>
                                </div>
                            )}
                        </div>

                        {dice.length > 0 && (
                            <div className="text-center mb-10 w-full animate-bounce-in">
                                <div className="inline-flex flex-col items-center bg-white dark:bg-black border-[4px] border-black dark:border-white px-10 py-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
                                    <span className="text-black/40 dark:text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Total Score</span>
                                    <span className="text-7xl font-scoreboard font-black text-black dark:text-white leading-none">{total}</span>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap items-center justify-center gap-6 relative z-10">
                            <button
                                onClick={rollDice}
                                disabled={rolling || dice.length === 0}
                                className="brutal-button bg-[#FFD21E] px-12 py-6 text-2xl disabled:opacity-50 disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none min-w-[220px]"
                            >
                                {rolling ? "ROLLING..." : "ROLL THEM"}
                            </button>

                            {dice.length > 0 && (
                                <button
                                    onClick={() => setDice([])}
                                    className="brutal-button bg-[#FF8800] w-[76px] h-[76px] flex items-center justify-center"
                                    title="Empty Tray"
                                >
                                    <Trash2 className="w-8 h-8" />
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Controls Area */}
                <div className="lg:col-span-4 flex flex-col gap-10">
                    <div className="bg-white dark:bg-black border-[4px] border-black dark:border-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                        <h3 className="text-black dark:text-white font-black mb-6 text-xs uppercase tracking-[0.2em] italic underline underline-offset-4">Add To Tray</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
                            {[4, 6, 8, 10, 12, 20].map(s => (
                                <button
                                    key={s}
                                    onClick={() => addDice(s)}
                                    className="brutal-button bg-[#00E1FF] py-4 text-xl font-scoreboard"
                                >
                                    D{s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-black border-[4px] border-black dark:border-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-black dark:text-white font-black text-xs uppercase tracking-[0.2em] italic underline underline-offset-4">Roll Logs</h3>
                            <button onClick={() => setHistory([])} className="text-black dark:text-white hover:scale-110 active:scale-90 transition-transform">
                                <RotateCcw className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {history.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 grayscale opacity-20">
                                    <RotateCcw className="w-10 h-10 mb-2" />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-center">No logs yet</p>
                                </div>
                            ) : (
                                history.map(item => (
                                    <div key={item.id} className="flex justify-between items-center p-4 border-[2px] border-black dark:border-white bg-[#FFF] dark:bg-zinc-900 group">
                                        <div className="flex flex-wrap gap-1.5 max-w-[60%]">
                                            {item.values.map((v, i) => (
                                                <span key={i} className="w-7 h-7 flex items-center justify-center border-[2px] border-black dark:border-white font-scoreboard font-black text-xs bg-black text-white dark:bg-white dark:text-black">{v}</span>
                                            ))}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-black dark:text-white font-scoreboard font-black text-3xl leading-none">{item.total}</p>
                                            <p className="text-[9px] text-black/40 dark:text-white/40 font-black uppercase mt-1">{item.timestamp}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiceRoller;
