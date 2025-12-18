import React, { useState } from 'react';
import { Users, Shuffle, Trash2, Plus } from 'lucide-react';

const TeamGenerator = () => {
    const [names, setNames] = useState([]);
    const [inputName, setInputName] = useState('');
    const [numTeams, setNumTeams] = useState(2);
    const [teams, setTeams] = useState([]);

    const addName = (e) => {
        e.preventDefault();
        if (inputName.trim()) {
            setNames([...names, inputName.trim()]);
            setInputName('');
        }
    };

    const removeName = (index) => {
        setNames(names.filter((_, i) => i !== index));
    };

    const generateTeams = () => {
        if (names.length < numTeams) return;

        // Fisher-Yates Shuffle
        const shuffled = [...names];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Distribute
        const newTeams = Array.from({ length: numTeams }, () => []);
        shuffled.forEach((name, index) => {
            newTeams[index % numTeams].push(name);
        });

        setTeams(newTeams);
    };

    return (
        <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Column */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Users className="text-indigo-400" />
                            Add Players
                        </h2>
                        <form onSubmit={addName} className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={inputName}
                                onChange={(e) => setInputName(e.target.value)}
                                placeholder="Enter name..."
                                className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-2 text-white outline-none focus:border-indigo-500"
                            />
                            <button
                                type="submit"
                                disabled={!inputName.trim()}
                                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white p-2 rounded-xl transition-colors"
                            >
                                <Plus />
                            </button>
                        </form>

                        <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {names.map((name, idx) => (
                                <div key={idx} className="bg-slate-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm text-slate-200 animate-in fade-in zoom-in duration-200">
                                    <span>{name}</span>
                                    <button onClick={() => removeName(idx)} className="text-slate-400 hover:text-red-400">
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            {names.length === 0 && <p className="text-slate-500 text-sm italic">No players added yet.</p>}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-700">
                        <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Number of Teams</label>
                        <div className="flex gap-2 mb-6">
                            {[2, 3, 4, 5].map(n => (
                                <button
                                    key={n}
                                    onClick={() => setNumTeams(n)}
                                    className={`flex-1 py-2 rounded-xl font-bold transition-all ${numTeams === n ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={generateTeams}
                            disabled={names.length < numTeams}
                            className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold text-xl rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Shuffle className="w-6 h-6" />
                            Generate Teams
                        </button>
                    </div>
                </div>

                {/* Results Column */}
                <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50 min-h-[400px]">
                    {teams.length > 0 ? (
                        <div className="grid gap-4">
                            {teams.map((team, idx) => (
                                <div key={idx} className="bg-slate-800 p-4 rounded-xl border border-slate-700 animate-in slide-in-from-right fade-in duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
                                    <h3 className="font-bold text-indigo-400 mb-2 uppercase text-sm tracking-wider">Team {idx + 1}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {team.map((member, i) => (
                                            <span key={i} className="text-white bg-slate-700/50 px-2 py-1 rounded text-lg font-medium">
                                                {member}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                            <Users className="w-16 h-16 mb-4" />
                            <p className="text-center">Add players and click Generate<br />to create random teams.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamGenerator;
