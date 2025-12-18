import React from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

const DiceControls = ({ numDice, setNumDice, diceType, setDiceType, onRoll }) => {
    const types = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];

    return (
        <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-6">
            <div className="space-y-4">
                <label className="text-slate-400 text-sm font-bold uppercase tracking-wider">Dice Type</label>
                <div className="flex flex-wrap gap-2">
                    {types.map((t) => (
                        <button
                            key={t}
                            onClick={() => setDiceType(t)}
                            className={`
                px-4 py-2 rounded-xl font-bold font-mono transition-all duration-200
                ${diceType === t
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400'
                                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'}
              `}
                        >
                            {t.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-slate-400 text-sm font-bold uppercase tracking-wider">Number of Dice</label>
                <div className="flex items-center gap-4 bg-slate-700/50 p-2 rounded-2xl w-fit">
                    <button
                        onClick={() => setNumDice(Math.max(1, numDice - 1))}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-600 text-white hover:bg-slate-500 transition-colors"
                    >
                        <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-2xl font-bold w-8 text-center">{numDice}</span>
                    <button
                        onClick={() => setNumDice(Math.min(10, numDice + 1))}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-600 text-white hover:bg-slate-500 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiceControls;
