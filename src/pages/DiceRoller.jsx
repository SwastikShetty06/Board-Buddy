import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Plus, Trash2, Play, Grid3X3, Layers } from 'lucide-react';

const Dice = ({ value, sides, rolling, colorClass }) => {
    // Determine dots for d6
    const renderDots = () => {
        if (sides !== 6) return <span className="text-3xl font-black">{value}</span>;

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
                        className={`w-2 h-2 rounded-full ${dots[value]?.includes(i) ? 'bg-current opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>
        );
    };

    const getShapeClass = () => {
        switch (sides) {
            case 4: return 'triangle-clip';
            case 8: return 'kite-clip';
            case 10: return 'kite-clip';
            case 12: return 'dodeca-clip';
            case 20: return 'hex-clip';
            default: return 'rounded-[1.5rem]';
        }
    };

    return (
        <div
            className={`
                w-24 h-24 md:w-32 md:h-32 flex items-center justify-center relative transition-all duration-300
                ${rolling ? 'animate-roll' : 'animate-bounce-in'}
                ${getShapeClass()} ${colorClass} shadow-xl border-4 border-white/50
            `}
        >
            <div className="relative z-10 flex items-center justify-center inset-0 w-full h-full">
                {renderDots()}
            </div>

            {/* 3D Effect Overlays */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 rounded-t-[1rem] pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-black/5 rounded-b-[1rem] pointer-events-none" />
        </div>
    );
};

const DiceRoller = () => {
    const [dice, setDice] = useState([{ id: 1, value: 6, sides: 6, color: 'bg-yellow-100 text-yellow-600' }]);
    const [rolling, setRolling] = useState(false);
    const [history, setHistory] = useState([]);

    const colors = [
        'bg-yellow-100 text-yellow-600',
        'bg-blue-100 text-blue-600',
        'bg-purple-100 text-purple-600',
        'bg-pink-100 text-pink-600',
        'bg-green-100 text-green-600',
        'bg-orange-100 text-orange-600',
    ];

    const rollDice = () => {
        if (rolling) return;
        setRolling(true);

        // Rolling animation
        setTimeout(() => {
            const nextDice = dice.map(d => ({
                ...d,
                value: Math.floor(Math.random() * d.sides) + 1
            }));

            setDice(nextDice);
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
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-5xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-6xl font-[900] text-slate-800 tracking-tight mb-4 leading-tight">Dice Roller</h1>
                <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-xs">Tap a die to remove, or roll them all!</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Roll Area */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-[4rem] p-12 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border-8 border-slate-50 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
                        {/* Decorative Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid grid-cols-6 gap-8 p-12">
                            {[...Array(24)].map((_, i) => (
                                <Grid3X3 key={i} className="w-12 h-12" />
                            ))}
                        </div>

                        <div className="flex flex-wrap justify-center gap-8 mb-16 relative z-10">
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
                                        className="absolute -top-3 -right-3 w-8 h-8 bg-white text-rose-500 rounded-full shadow-lg border border-rose-100 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:scale-110 active:scale-95 z-20"
                                        title="Delete die"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {dice.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-20 opacity-20">
                                    <Layers className="w-20 h-20 mb-4" />
                                    <p className="text-xl font-black uppercase tracking-widest">No dice added</p>
                                </div>
                            )}
                        </div>

                        {dice.length > 0 && (
                            <div className="text-center mb-10">
                                <div className="inline-flex items-baseline gap-2 bg-slate-50 px-8 py-3 rounded-full">
                                    <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Total</span>
                                    <span className="text-5xl font-black text-slate-800">{total}</span>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-4 relative z-10">
                            <button
                                onClick={rollDice}
                                disabled={rolling || dice.length === 0}
                                className="btn-sunset px-12 py-6 text-lg uppercase tracking-widest flex items-center gap-4 disabled:opacity-50 disabled:scale-100"
                            >
                                {rolling ? "Rolling..." : "Roll Dice"} <Play className="w-5 h-5 fill-current" />
                            </button>

                            {dice.length > 0 && (
                                <button
                                    onClick={() => setDice([])}
                                    className="w-20 h-20 flex items-center justify-center bg-slate-50 text-slate-300 hover:bg-rose-50 hover:text-rose-500 rounded-[1.5rem] transition-all"
                                    title="Clear all dice"
                                >
                                    <Trash2 className="w-6 h-6" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Controls Area */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    <div className="bg-white p-10 rounded-[3.5rem] border-8 border-slate-50 shadow-[0_20px_60px_rgba(0,0,0,0.03)]">
                        <h3 className="text-slate-400 font-black mb-8 text-[0.7rem] uppercase tracking-[0.2em]">Add New Die</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[4, 6, 8, 10, 12, 20].map(s => (
                                <button
                                    key={s}
                                    onClick={() => addDice(s)}
                                    className="p-5 bg-slate-50 text-slate-600 rounded-[2rem] font-black text-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-white"
                                >
                                    d{s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-[3.5rem] border-8 border-slate-50 shadow-[0_20px_60px_rgba(0,0,0,0.03)] flex-1">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-slate-400 font-black text-[0.7rem] uppercase tracking-[0.2em]">History</h3>
                            <button onClick={() => setHistory([])} className="text-slate-200 hover:text-rose-400 transition-colors">
                                <RotateCcw className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {history.length === 0 ? (
                                <p className="text-slate-200 text-xs font-black uppercase tracking-widest text-center py-10">No rolls yet</p>
                            ) : (
                                history.map(item => (
                                    <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-white">
                                        <div className="flex gap-2">
                                            {item.values.map((v, i) => (
                                                <span key={i} className="w-6 h-6 flex items-center justify-center bg-white rounded-lg text-slate-400 font-black text-[10px] shadow-sm">{v}</span>
                                            ))}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-slate-800 font-black text-xl">{item.total}</p>
                                            <p className="text-[10px] text-slate-300 font-medium">{item.timestamp}</p>
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
