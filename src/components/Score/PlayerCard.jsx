import React, { useState } from 'react';
import { Plus, Minus, User, Trash2, Trophy, Award } from 'lucide-react';

const PlayerCard = ({ player, onUpdateScore, onDelete, isWinner }) => {
    const [incrementValue, setIncrementValue] = useState(1);

    return (
        <div className={`relative playful-card p-10 flex flex-col items-center justify-between group h-full border-8 ${isWinner ? 'border-yellow-200 bg-yellow-50' : 'border-slate-50'}`}>
            {isWinner && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-white p-3 rounded-2xl shadow-lg z-20 animate-bounce">
                    <Trophy className="w-6 h-6" />
                </div>
            )}

            <button
                onClick={onDelete}
                className="absolute top-6 right-6 p-2 text-slate-200 hover:text-rose-400 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300"
                title="Remove player"
            >
                <Trash2 className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center gap-6 mt-4">
                <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center shadow-inner relative ${isWinner ? 'bg-white text-yellow-500' : 'bg-slate-50 text-slate-300'}`}>
                    <User className="w-12 h-12" />
                    {isWinner && (
                        <div className="absolute -bottom-2 -right-2 p-2 bg-yellow-100 rounded-xl">
                            <Award className="w-6 h-6 text-yellow-600" />
                        </div>
                    )}
                </div>

                <h3 className="text-3xl font-[900] text-slate-800 tracking-tight text-center truncate w-full px-4">
                    {player.name}
                </h3>
            </div>

            <div className="my-10 text-center">
                <span className={`text-8xl font-[900] tracking-tighter block leading-none ${isWinner ? 'text-yellow-600' : 'text-slate-800'}`}>
                    {player.score}
                </span>
                <p className="text-slate-400 text-[0.7rem] font-bold uppercase tracking-[0.2em] mt-2">Points Total</p>
            </div>

            <div className="w-full flex flex-col gap-6">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onUpdateScore(player.id, -incrementValue)}
                        className="w-14 h-14 flex items-center justify-center bg-slate-50 hover:bg-rose-50 hover:text-rose-500 text-slate-400 rounded-2xl transition-all font-black text-xl"
                    >
                        <Minus className="w-6 h-6" />
                    </button>

                    <div className="flex-1 h-14 flex items-center justify-center bg-slate-50 rounded-2xl font-black text-slate-400 text-sm">
                        {incrementValue}
                    </div>

                    <button
                        onClick={() => onUpdateScore(player.id, incrementValue)}
                        className="w-14 h-14 flex items-center justify-center bg-slate-50 hover:bg-green-50 hover:text-green-500 text-slate-400 rounded-2xl transition-all font-black"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {[1, 5, 10, 50].map(val => (
                        <button
                            key={val}
                            onClick={() => setIncrementValue(val)}
                            className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${incrementValue === val
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                                : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                        >
                            Step {val}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;
