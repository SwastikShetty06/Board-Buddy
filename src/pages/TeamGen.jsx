import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, Trash2, Shuffle, Plus, RotateCcw } from 'lucide-react';

const TeamGen = () => {
    const [names, setNames] = useState('');
    const [teamCount, setTeamCount] = useState(2);
    const [teams, setTeams] = useState([]);

    const generateTeams = () => {
        const nameList = names.split('\n').filter(n => n.trim() !== '');
        if (nameList.length === 0) return;

        const shuffled = [...nameList].sort(() => Math.random() - 0.5);
        const newTeams = Array.from({ length: teamCount }, () => []);

        shuffled.forEach((name, idx) => {
            newTeams[idx % teamCount].push(name.trim());
        });

        setTeams(newTeams);
    };

    const clearAll = () => {
        if (window.confirm('Clear all names and teams?')) {
            setNames('');
            setTeams([]);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter uppercase italic leading-none mb-4">Team Builder</h1>
                    <p className="text-black/50 dark:text-white/40 font-bold uppercase tracking-[0.2em] text-xs">Mix and shuffle players into fair teams!</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-5 flex flex-col gap-8">
                    <div className="bg-white dark:bg-black border-[4px] border-black dark:border-white p-8 md:p-12 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-black dark:text-white font-black text-xs uppercase tracking-[0.2em] italic underline underline-offset-4">Add Players</h3>
                            <button onClick={clearAll} className="text-black dark:text-white hover:rotate-180 transition-transform duration-500">
                                <RotateCcw className="w-5 h-5" />
                            </button>
                        </div>

                        <textarea
                            value={names}
                            onChange={(e) => setNames(e.target.value)}
                            placeholder="ENTER NAMES HERE&#10;ONE PER LINE..."
                            className="w-full h-64 md:h-80 bg-white dark:bg-zinc-900 border-[3px] border-black dark:border-white p-6 md:p-8 text-black dark:text-white font-black placeholder:text-black/10 dark:placeholder:text-white/10 focus:outline-none resize-none mb-8 uppercase"
                        />

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 p-4 border-[2px] border-black dark:border-white">
                                <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-black/60 dark:text-white/60">Number of Teams</span>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setTeamCount(Math.max(2, teamCount - 1))}
                                        className="w-10 h-10 border-[2px] border-black bg-white text-black hover:bg-[#FF66AA] active:translate-y-0.5 transition-all flex items-center justify-center"
                                    >
                                        <Plus className="w-5 h-5 rotate-45" />
                                    </button>
                                    <span className="text-2xl font-scoreboard font-black text-black dark:text-white w-8 text-center">{teamCount}</span>
                                    <button
                                        onClick={() => setTeamCount(Math.min(10, teamCount + 1))}
                                        className="w-10 h-10 border-[2px] border-black bg-white text-black hover:bg-[#33FF77] active:translate-y-0.5 transition-all flex items-center justify-center"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={generateTeams}
                                className="brutal-button bg-[#FFD21E] w-full py-6 text-xl"
                            >
                                GENERATE TEAMS
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7">
                    <AnimatePresence mode="wait">
                        {teams.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-white dark:bg-black border-[6px] border-black dark:border-white p-24 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] dark:shadow-[15px_15px_0px_0px_rgba(255,255,255,1)] flex flex-col items-center justify-center text-center h-full"
                            >
                                <div className="w-32 h-32 bg-[#FF8800] border-[4px] border-black flex items-center justify-center mb-8 rotate-3">
                                    <Users className="w-16 h-16 text-black" />
                                </div>
                                <h2 className="text-4xl font-black text-black dark:text-white uppercase mb-4 italic">Ready to Shuffle?</h2>
                                <p className="text-black/40 dark:text-white/40 font-bold max-w-sm mx-auto uppercase text-xs">Add names and pick the team count to see the magic happen.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {teams.map((team, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="brutal-card p-8 bg-white dark:bg-black flex flex-col"
                                    >
                                        <div className="flex items-center justify-between mb-8">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black bg-[#9D7AFF] border-[2px] border-black px-4 py-2 italic">
                                                Team {idx + 1}
                                            </h4>
                                            <span className="text-black/30 dark:text-white/20 font-scoreboard font-black text-xs">{team.length} P</span>
                                        </div>
                                        <ul className="space-y-3">
                                            {team.map((name, nIdx) => (
                                                <li key={nIdx} className="flex items-center gap-4 p-4 border-[2px] border-black bg-white dark:bg-zinc-900 group">
                                                    <div className="w-8 h-8 flex items-center justify-center bg-black text-white font-scoreboard font-black text-xs">
                                                        {nIdx + 1}
                                                    </div>
                                                    <span className="font-black uppercase tracking-tight text-black dark:text-white">{name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default TeamGen;
