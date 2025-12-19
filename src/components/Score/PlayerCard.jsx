import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, User, Trash2, Trophy, Award } from 'lucide-react';

const PlayerCard = ({ player, onUpdateScore, onDelete, isWinner }) => {
    const [incrementValue, setIncrementValue] = useState(1);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative brutal-card p-8 flex flex-col items-center justify-between h-full ${isWinner ? 'bg-[#FFD21E]' : 'bg-white dark:bg-black'}`}
        >
            {isWinner && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#33FF77] border-[3px] border-black text-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 animate-bounce font-black text-xs italic tracking-widest flex items-center gap-2">
                    <Trophy className="w-4 h-4" /> WINNER
                </div>
            )}

            <button
                onClick={onDelete}
                className="absolute top-4 right-4 p-2 text-black/20 dark:text-white/20 hover:text-[#FF66AA] transition-colors"
                title="Remove player"
            >
                <Trash2 className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center gap-4 mt-2">
                <div className={`w-16 h-16 border-[3px] border-black flex items-center justify-center relative ${isWinner ? 'bg-white' : 'bg-[#9D7AFF]'}`}>
                    <User className="w-8 h-8 text-black" />
                    {isWinner && (
                        <div className="absolute -bottom-1 -right-1 p-1 bg-white border-[2px] border-black">
                            <Award className="w-4 h-4 text-black" />
                        </div>
                    )}
                </div>

                <h3 className="text-2xl font-black text-black dark:text-white tracking-widest uppercase italic text-center truncate w-full px-2">
                    {player.name}
                </h3>
            </div>

            <div className="my-8 text-center">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={player.score}
                        initial={{ scale: 0.8, y: 10, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        className={`text-8xl font-scoreboard font-black block leading-none text-black dark:text-white drop-shadow-[4px_4px_0px_rgba(255,255,255,0.5)]`}
                    >
                        {player.score}
                    </motion.span>
                </AnimatePresence>
                <p className="text-black/40 dark:text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mt-2">Points Accumulated</p>
            </div>

            <div className="w-full flex flex-col gap-4">
                <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 p-1 border-[2px] border-black dark:border-white">
                    <button
                        onClick={() => onUpdateScore(player.id, -incrementValue)}
                        className="w-12 h-12 flex items-center justify-center bg-white border-[2px] border-black text-black hover:bg-[#FF66AA] active:translate-y-0.5 transition-all"
                    >
                        <Minus className="w-5 h-5" />
                    </button>

                    <div className="flex-1 h-12 flex items-center justify-center font-scoreboard font-black text-black dark:text-white text-lg">
                        {incrementValue}
                    </div>

                    <button
                        onClick={() => onUpdateScore(player.id, incrementValue)}
                        className="w-12 h-12 flex items-center justify-center bg-white border-[2px] border-black text-black hover:bg-[#33FF77] active:translate-y-0.5 transition-all"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid grid-cols-4 gap-1">
                    {[1, 5, 10, 50].map(val => (
                        <button
                            key={val}
                            onClick={() => setIncrementValue(val)}
                            className={`py-2 border-[2px] border-black font-black text-[10px] transition-all ${incrementValue === val
                                ? 'bg-[#00E1FF] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                                : 'bg-white text-black hover:bg-zinc-100'}`}
                        >
                            {val}
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default PlayerCard;
