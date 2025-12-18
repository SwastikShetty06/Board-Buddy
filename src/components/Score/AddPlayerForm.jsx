import React, { useState } from 'react';
import { UserPlus, Palette } from 'lucide-react';

const colors = [
    'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500',
    'bg-lime-500', 'bg-green-500', 'bg-emerald-500', 'bg-teal-500',
    'bg-cyan-500', 'bg-sky-500', 'bg-blue-500', 'bg-indigo-500',
    'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500', 'bg-pink-500',
    'bg-rose-500'
];

const AddPlayerForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState(colors[Math.floor(Math.random() * colors.length)]);
    const [startScore, setStartScore] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onAdd({ name, color, startScore: parseInt(startScore) || 0 });
            setName('');
            // Pick a random new color for convenience
            setColor(colors[Math.floor(Math.random() * colors.length)]);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-4">
            <h3 className="text-white font-bold flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-400" />
                Add Player
            </h3>

            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Player Name"
                    className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 transition-colors"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Start Score"
                        className="w-24 bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 transition-colors"
                        value={startScore}
                        onChange={(e) => setStartScore(e.target.value)}
                    />

                    <div className="relative group">
                        <div className={`w-12 h-full rounded-xl cursor-pointer ${color} border-2 border-slate-600 group-hover:border-white transition-colors`} />

                        {/* Color Picker Dropdown (Simplified) */}
                        <div className="absolute top-full right-0 mt-2 p-2 bg-slate-800 border border-slate-600 rounded-xl shadow-xl grid grid-cols-4 gap-1 w-48 z-20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
                            {colors.map(c => (
                                <div
                                    key={c}
                                    className={`w-8 h-8 rounded-full ${c} cursor-pointer hover:scale-110 active:scale-95 transition-transform`}
                                    onClick={() => setColor(c)}
                                />
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!name.trim()}
                    >
                        Add
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddPlayerForm;
