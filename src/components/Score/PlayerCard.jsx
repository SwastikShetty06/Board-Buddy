import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, User, Trash2, Trophy, Award } from 'lucide-react';

const PlayerCard = ({ player, onUpdateScore, onDelete, isWinner }) => {
    const [incrementValue, setIncrementValue] = useState(1);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            whileHover={{ y: -8, scale: 1.02, boxShadow: "12px 12px 0px 0px rgba(0,0,0,1)" }}
            className={`relative brutal-card p-8 flex flex-col items-center justify-between h-full border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-colors ${isWinner ? 'bg-[#FFD21E]' : 'bg-white dark:bg-black'}`}
        >
            {isWinner && (
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#33FF77] border-[3px] border-black text-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 animate-bounce font-black text-xs italic tracking-widest flex items-center gap-2"
                >
                    <Trophy className="w-4 h-4" /> WINNER
                </motion.div>
            )}

            <motion.button
                whileHover={{ scale: 1.2, rotate: 15 }}
                whileTap={{ scale: 0.8 }}
                onClick={onDelete}
                className="absolute top-4 right-4 p-2 text-black/20 dark:text-white/20 hover:text-[#FF66AA] transition-colors"
                title="Remove player"
            >
                <Trash2 className="w-5 h-5" />
            </motion.button>

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
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "#FF66AA", rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onUpdateScore(player.id, -incrementValue)}
                        className="w-12 h-12 flex items-center justify-center bg-white border-[2px] border-black text-black transition-colors"
                    >
                        <Minus className="w-5 h-5" />
                    </motion.button>

                    <motion.div
                        key={incrementValue}
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex-1 h-12 flex items-center justify-center font-scoreboard font-black text-black dark:text-white text-lg"
                    >
                        {incrementValue}
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "#33FF77", rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onUpdateScore(player.id, incrementValue)}
                        className="w-12 h-12 flex items-center justify-center bg-white border-[2px] border-black text-black transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                    </motion.button>
                </div>

                <div className="grid grid-cols-4 gap-1">
                    {[1, 5, 10, 50].map(val => (
                        <motion.button
                            key={val}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIncrementValue(val)}
                            className={`py-2 border-[2px] border-black font-black text-[10px] transition-all ${incrementValue === val
                                ? 'bg-[#00E1FF] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                                : 'bg-white text-black hover:bg-zinc-100'}`}
                        >
                            {val}
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default PlayerCard;
