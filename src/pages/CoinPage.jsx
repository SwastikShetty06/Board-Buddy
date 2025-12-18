import React, { useState } from 'react';
import { RotateCcw, Play, Coins } from 'lucide-react';

const CoinPage = () => {
    const [isFlipping, setIsFlipping] = useState(false);
    const [result, setResult] = useState('heads');
    const [history, setHistory] = useState([]);

    const flipCoin = () => {
        if (isFlipping) return;
        setIsFlipping(true);
        setResult(null);

        setTimeout(() => {
            const newResult = Math.random() > 0.5 ? 'heads' : 'tails';
            setResult(newResult);
            setHistory(prev => [{ id: Date.now(), result: newResult, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 10));
            setIsFlipping(false);
        }, 800);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-6xl font-[900] text-slate-800 tracking-tight mb-4 leading-tight">Coin Flipper</h1>
                <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-xs">A casual toss to settle the greatest of debates!</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                {/* Coin Area */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-[4rem] p-16 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border-8 border-slate-50 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-50 blur-[60px] rounded-full" />

                        <div className={`relative w-64 h-64 perspective-1000 ${isFlipping ? 'animate-roll' : 'animate-bounce-in'}`}>
                            <div className={`w-full h-full rounded-full border-8 border-white shadow-2xl flex items-center justify-center transition-all duration-300 ${result === 'heads' ? 'bg-emerald-400 text-white' : result === 'tails' ? 'bg-amber-400 text-white' : 'bg-slate-50 text-slate-200'}`}>
                                {result === 'heads' ? (
                                    <div className="flex flex-col items-center">
                                        <span className="text-6xl font-black uppercase tracking-tighter">Heads</span>
                                        <div className="w-12 h-2 bg-white/30 rounded-full mt-2" />
                                    </div>
                                ) : result === 'tails' ? (
                                    <div className="flex flex-col items-center">
                                        <span className="text-6xl font-black uppercase tracking-tighter">Tails</span>
                                        <div className="w-12 h-2 bg-white/30 rounded-full mt-2" />
                                    </div>
                                ) : (
                                    <Coins className="w-24 h-24" />
                                )}
                            </div>

                            {/* Inner Shine */}
                            <div className="absolute inset-4 border-4 border-white/20 rounded-full pointer-events-none" />
                        </div>

                        <div className="mt-16 flex flex-col items-center gap-6">
                            <button
                                onClick={flipCoin}
                                disabled={isFlipping}
                                className="btn-sunset px-12 py-6 text-lg uppercase tracking-widest flex items-center gap-4 disabled:opacity-50"
                            >
                                {isFlipping ? 'Flipping...' : 'Toss Coin'} <Play className="w-5 h-5 fill-current" />
                            </button>

                            {result && !isFlipping && (
                                <p className="text-2xl font-black text-slate-800 animate-in zoom-in duration-300">
                                    It's <span className={result === 'heads' ? 'text-emerald-500' : 'text-amber-500'}>{result.toUpperCase()}!</span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* History Sidebar */}
                <div className="lg:col-span-4">
                    <div className="bg-white p-10 rounded-[3.5rem] border-8 border-slate-50 shadow-[0_20px_60px_rgba(0,0,0,0.03)] h-full flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-slate-400 font-black text-[0.7rem] uppercase tracking-[0.2em]">Log Feed</h3>
                            <button onClick={() => setHistory([])} className="text-slate-200 hover:text-rose-400 transition-colors">
                                <RotateCcw className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 space-y-4 overflow-y-auto pr-2 no-scrollbar">
                            {history.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full opacity-10">
                                    <Coins className="w-16 h-16 mb-4" />
                                    <p className="text-xs font-black uppercase tracking-widest">No history</p>
                                </div>
                            ) : (
                                history.map(item => (
                                    <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-white">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-[10px] font-black ${item.result === 'heads' ? 'bg-emerald-400' : 'bg-amber-400'}`}>
                                                {item.result[0].toUpperCase()}
                                            </div>
                                            <span className="font-bold text-slate-700 capitalize">{item.result}</span>
                                        </div>
                                        <span className="text-[10px] text-slate-300 font-medium">{item.time}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoinPage;
