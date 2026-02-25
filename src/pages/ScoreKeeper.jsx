import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, RotateCcw, UserPlus, Trophy, Users } from 'lucide-react';
import PlayerCard from '../components/Score/PlayerCard';

const ScoreKeeper = () => {
    const [players, setPlayers] = useState(() => {
        const saved = localStorage.getItem('boardbuddy_scores');
        return saved ? JSON.parse(saved) : [];
    });
    const [newPlayerName, setNewPlayerName] = useState('');

    useEffect(() => {
        localStorage.setItem('boardbuddy_scores', JSON.stringify(players));
    }, [players]);

    const addPlayer = (e) => {
        e.preventDefault();
        if (!newPlayerName.trim()) return;
        const newPlayer = {
            id: Date.now(),
            name: newPlayerName.trim(),
            score: 0
        };
        setPlayers([...players, newPlayer]);
        setNewPlayerName('');
    };

    const updateScore = (id, amount) => {
        setPlayers(players.map(p =>
            p.id === id ? { ...p, score: p.score + amount } : p
        ));
    };

    const deletePlayer = (id) => {
        if (window.confirm('Remove this player?')) {
            setPlayers(players.filter(p => p.id !== id));
        }
    };

    const resetScores = () => {
        if (window.confirm('Reset all scores to zero?')) {
            setPlayers(players.map(p => ({ ...p, score: 0 })));
        }
    };

    const clearAll = () => {
        if (window.confirm('Remove all players and clear history?')) {
            setPlayers([]);
        }
    };

    const maxScore = players.length > 0 ? Math.max(...players.map(p => p.score)) : -Infinity;
    const winnerCount = players.filter(p => p.score === maxScore && maxScore !== 0).length;

    return (
        <div className="max-w-7xl mx-auto px-4 overflow-hidden">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 mb-16">
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="flex-1"
                >
                    <h1 className="text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter uppercase italic leading-none mb-4">Scorekeeper</h1>
                    <p className="text-black/50 dark:text-white/40 font-bold uppercase tracking-[0.2em] text-xs">Track points, find champions, and celebrate victory!</p>
                </motion.div>

                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
                    className="flex flex-wrap items-center gap-3"
                >
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: -10, backgroundColor: "#FFD21E" }}
                        whileTap={{ scale: 0.9, rotate: 10 }}
                        onClick={resetScores}
                        className="w-14 h-14 border-[3px] border-black dark:border-white bg-white dark:bg-black text-black dark:text-white transition-colors flex justify-center items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        title="Reset all scores"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90, backgroundColor: "#FF66AA" }}
                        whileTap={{ scale: 0.9, rotate: -90 }}
                        onClick={clearAll}
                        className="w-14 h-14 border-[3px] border-black dark:border-white bg-white dark:bg-black text-black dark:text-white transition-colors flex justify-center items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        title="Remove all players"
                    >
                        <Plus className="w-6 h-6 rotate-45" />
                    </motion.button>

                    <form onSubmit={addPlayer} className="flex-1 md:flex-none flex items-center gap-2 bg-white dark:bg-black p-1 border-[4px] border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] md:ml-4 group">
                        <input
                            type="text"
                            value={newPlayerName}
                            onChange={(e) => setNewPlayerName(e.target.value)}
                            placeholder="PLAYER NAME"
                            className="bg-transparent border-none outline-none px-6 py-2 text-sm font-black text-black dark:text-white placeholder:text-black/20 dark:placeholder:text-white/20 w-full md:w-48 uppercase"
                        />
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-12 h-12 bg-[#33FF77] border-[2px] border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <UserPlus className="w-6 h-6" />
                        </motion.button>
                    </form>
                </motion.div>
            </div>

            {/* Players Grid */}
            {players.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-black border-[6px] border-black dark:border-white p-24 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] dark:shadow-[15px_15px_0px_0px_rgba(255,255,255,1)] flex flex-col items-center justify-center text-center"
                >
                    <div className="w-32 h-32 bg-[#9D7AFF] border-[4px] border-black flex items-center justify-center mb-8 rotate-[-3deg]">
                        <Users className="w-16 h-16 text-black" />
                    </div>
                    <h2 className="text-4xl font-black text-black dark:text-white tracking-widest uppercase mb-4 italic">No Players Yet</h2>
                    <p className="text-black/40 dark:text-white/40 font-bold max-w-sm mx-auto uppercase text-xs">Add your squad to start the epic battle!</p>
                </motion.div>
            ) : (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <AnimatePresence>
                        {players.map(player => (
                            <PlayerCard
                                key={player.id}
                                player={player}
                                onUpdateScore={updateScore}
                                onDelete={() => deletePlayer(player.id)}
                                isWinner={player.score === maxScore && maxScore !== 0}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
};

export default ScoreKeeper;
