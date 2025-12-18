import React, { useState } from 'react';
import { Plus, Minus, RotateCcw, Heart } from 'lucide-react';

const PlayerZone = ({ name, color, health, onChange, rotate = false }) => {
    return (
        <div
            className={`flex-1 flex flex-col items-center justify-center relative transition-all duration-300 ${color} ${rotate ? 'rotate-180' : ''}`}
        >
            <div className="absolute top-4 left-4 font-bold text-white/50 uppercase tracking-widest">{name}</div>

            <div className="flex items-center gap-8">
                <button
                    onClick={() => onChange(-1)}
                    className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-transform active:scale-90"
                >
                    <Minus className="w-8 h-8 md:w-12 md:h-12" />
                </button>

                <div className="text-8xl md:text-9xl font-black text-white drop-shadow-lg tabular-nums">
                    {health}
                </div>

                <button
                    onClick={() => onChange(1)}
                    className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-transform active:scale-90"
                >
                    <Plus className="w-8 h-8 md:w-12 md:h-12" />
                </button>
            </div>
        </div>
    );
};

const LifeCounter = () => {
    const [defaultHealth, setDefaultHealth] = useState(20);
    const [p1Health, setP1Health] = useState(20);
    const [p2Health, setP2Health] = useState(20);
    const [showSettings, setShowSettings] = useState(false);

    const reset = () => {
        setP1Health(defaultHealth);
        setP2Health(defaultHealth);
        setShowSettings(false);
    };

    const updateDefault = (val) => {
        setDefaultHealth(val);
        setP1Health(val);
        setP2Health(val);
        setShowSettings(false);
    };

    return (
        <div className="fixed inset-0 top-16 bg-black flex flex-col">
            <PlayerZone
                name="Player 2"
                color="bg-rose-600"
                health={p2Health}
                onChange={(delta) => setP2Health(h => h + delta)}
                rotate={true}
            />

            {/* Center Bar */}
            <div className="h-16 bg-slate-900 flex items-center justify-center gap-4 z-10 border-y border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-sm">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                    Life Counter
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${showSettings ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                    >
                        <span className="font-bold text-xs">{defaultHealth}</span>
                    </button>
                    <button
                        onClick={reset}
                        className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-slate-700 transition-colors"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>

                    {showSettings && (
                        <div className="absolute top-20 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl z-50 flex gap-2 animate-in slide-in-from-top-4 fade-in">
                            {[20, 30, 40].map(val => (
                                <button
                                    key={val}
                                    onClick={() => updateDefault(val)}
                                    className={`px-4 py-2 rounded-lg font-bold ${defaultHealth === val ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                                >
                                    {val}
                                </button>
                            ))}
                            <input
                                type="number"
                                value={defaultHealth}
                                onChange={(e) => updateDefault(parseInt(e.target.value) || 20)}
                                className="w-16 bg-slate-900 border border-slate-600 rounded-lg px-2 text-white text-center font-bold"
                            />
                        </div>
                    )}
                </div>
            </div>

            <PlayerZone
                name="Player 1"
                color="bg-indigo-600"
                health={p1Health}
                onChange={(delta) => setP1Health(h => h + delta)}
            />
        </div>
    );
};

export default LifeCounter;
