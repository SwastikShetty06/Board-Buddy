import React, { useState } from 'react';
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
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-6xl font-[900] text-slate-800 tracking-tight mb-4 leading-tight">Team Builder</h1>
                <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-xs">Mix and shuffle players into fair teams!</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Input Area */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                    <div className="bg-white rounded-[4rem] p-12 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border-8 border-slate-50 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-slate-400 font-black text-[0.7rem] uppercase tracking-[0.2em]">Add Players</h3>
                            <button onClick={clearAll} className="text-slate-200 hover:text-rose-400 transition-colors">
                                <RotateCcw className="w-5 h-5" />
                            </button>
                        </div>

                        <textarea
                            value={names}
                            onChange={(e) => setNames(e.target.value)}
                            placeholder="Enter names here&#10;One name per line..."
                            className="w-full h-64 md:h-80 bg-slate-50 rounded-[2.5rem] p-8 text-slate-800 font-bold placeholder:text-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-50 border-none resize-none mb-8"
                        />

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-full border border-white shadow-sm">
                                <span className="ml-4 text-xs font-black uppercase tracking-widest text-slate-400">Number of Teams</span>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setTeamCount(Math.max(2, teamCount - 1))}
                                        className="w-12 h-12 flex items-center justify-center bg-white text-slate-400 hover:text-indigo-600 rounded-full shadow-sm active:scale-90 transition-transform"
                                    >
                                        <Plus className="w-5 h-5 rotate-45" />
                                    </button>
                                    <span className="text-2xl font-black text-slate-800 w-8 text-center">{teamCount}</span>
                                    <button
                                        onClick={() => setTeamCount(Math.min(10, teamCount + 1))}
                                        className="w-12 h-12 flex items-center justify-center bg-white text-slate-400 hover:text-indigo-600 rounded-full shadow-sm active:scale-90 transition-transform"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={generateTeams}
                                className="btn-sunset w-full py-6 text-sm uppercase tracking-widest flex items-center justify-center gap-3"
                            >
                                Generate Teams <Shuffle className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Area */}
                <div className="lg:col-span-7">
                    {teams.length === 0 ? (
                        <div className="bg-white rounded-[4rem] p-24 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border-8 border-slate-50 flex flex-col items-center justify-center text-center h-full">
                            <div className="w-32 h-32 bg-orange-50 text-orange-400 rounded-[3rem] flex items-center justify-center mb-8">
                                <Users className="w-16 h-16" />
                            </div>
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-4">Ready to Shuffle?</h2>
                            <p className="text-slate-400 font-medium max-w-sm mx-auto">Add names and pick the team count to see the magic happen.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {teams.map((team, idx) => (
                                <div key={idx} className="playful-card p-10 bg-white border-8 border-slate-50">
                                    <div className="flex items-center justify-between mb-8">
                                        <h4 className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-orange-500 bg-orange-50 px-4 py-2 rounded-full">
                                            Team {idx + 1}
                                        </h4>
                                        <span className="text-slate-200 text-xs font-black">{team.length} Players</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {team.map((name, nIdx) => (
                                            <li key={nIdx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-white">
                                                <div className="w-8 h-8 flex items-center justify-center bg-white rounded-xl text-slate-400 text-xs font-black shadow-sm">
                                                    {nIdx + 1}
                                                </div>
                                                <span className="font-bold text-slate-700">{name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamGen;
