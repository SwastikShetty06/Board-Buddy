import React, { useState, useEffect } from 'react';
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
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-7xl mx-auto">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10 mb-16">
                <div className="flex-1">
                    <h1 className="text-6xl font-[900] text-slate-800 tracking-tight mb-4 leading-tight">Scorekeeper</h1>
                    <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-xs">Track points, find champions, and celebrate victory!</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={resetScores}
                        className="w-14 h-14 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-yellow-50 hover:text-yellow-600 rounded-[1.5rem] transition-all duration-300"
                        title="Reset all scores"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </button>
                    <button
                        onClick={clearAll}
                        className="w-14 h-14 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600 rounded-[1.5rem] transition-all duration-300"
                        title="Remove all players"
                    >
                        <Plus className="w-6 h-6 rotate-45" />
                    </button>

                    <form onSubmit={addPlayer} className="flex-1 md:flex-none flex items-center gap-3 bg-white p-2 rounded-full border-4 border-slate-50 shadow-sm md:ml-4">
                        <input
                            type="text"
                            value={newPlayerName}
                            onChange={(e) => setNewPlayerName(e.target.value)}
                            placeholder="Player Name"
                            className="bg-transparent border-none outline-none px-6 py-2 text-sm font-black text-slate-800 placeholder:text-slate-300 w-full md:w-48"
                        />
                        <button
                            type="submit"
                            className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform"
                        >
                            <UserPlus className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Players Grid */}
            {players.length === 0 ? (
                <div className="bg-white rounded-[4rem] p-24 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border-8 border-slate-50 flex flex-col items-center justify-center text-center">
                    <div className="w-32 h-32 bg-indigo-50 text-indigo-400 rounded-[3rem] flex items-center justify-center mb-8">
                        <Users className="w-16 h-16" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-4">No Players Yet</h2>
                    <p className="text-slate-400 font-medium max-w-sm mx-auto">Add some friends to start tracking the competition!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {players.map(player => (
                        <PlayerCard
                            key={player.id}
                            player={player}
                            onUpdateScore={updateScore}
                            onDelete={() => deletePlayer(player.id)}
                            isWinner={player.score === maxScore && maxScore !== 0}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ScoreKeeper;
