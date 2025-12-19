import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter uppercase italic leading-none mb-4">Coin Flipper</h1>
                    <p className="text-black/50 dark:text-white/40 font-bold uppercase tracking-[0.2em] text-xs">Settle the debate with a classic toss!</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                {/* Coin Area */}
                <div className="lg:col-span-8">
                    <div className="bg-[#E5E7EB] dark:bg-[#1A1625] border-[6px] border-black dark:border-white p-12 md:p-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_2px_rgba(255,255,255,1)] flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
                        {/* Tray Texture */}
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
                        </div>

                        <div className="relative group perspective-1000">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isFlipping ? 'flipping' : result}
                                    initial={isFlipping ? { rotateY: 0, y: 0 } : { scale: 0.8, opacity: 0 }}
                                    animate={isFlipping ? {
                                        rotateY: [0, 1800],
                                        y: [0, -200, 0],
                                        scale: [1, 1.2, 1]
                                    } : { scale: 1, opacity: 1 }}
                                    transition={isFlipping ? { duration: 0.8, ease: "easeInOut" } : { type: "spring", stiffness: 300 }}
                                    className={`
                                        w-64 h-64 rounded-full border-[8px] border-black flex items-center justify-center relative
                                        shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]
                                        ${result === 'heads' ? 'bg-[#FFD21E]' : result === 'tails' ? 'bg-[#00E1FF]' : 'bg-white'}
                                    `}
                                >
                                    {isFlipping ? (
                                        <Coins className="w-32 h-32 text-black/20" />
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <span className="text-7xl font-scoreboard font-black text-black uppercase tracking-tighter drop-shadow-[4px_4px_0px_rgba(255,255,255,0.5)]">
                                                {result === 'heads' ? 'H' : 'T'}
                                            </span>
                                            <span className="text-xs font-black uppercase tracking-widest text-black/40 -mt-2">
                                                {result}
                                            </span>
                                        </div>
                                    )}

                                    {/* Inner Shine */}
                                    <div className="absolute inset-2 border-[2px] border-black/10 rounded-full pointer-events-none" />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="mt-16 flex flex-col items-center gap-8 relative z-10">
                            <button
                                onClick={flipCoin}
                                disabled={isFlipping}
                                className="brutal-button bg-[#33FF77] px-16 py-6 text-2xl disabled:opacity-50 disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none"
                            >
                                {isFlipping ? 'FLIPPING...' : 'FLIP IT'}
                            </button>

                            {!isFlipping && result && (
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-4xl font-black text-black dark:text-white uppercase italic tracking-tighter"
                                >
                                    It's <span className="bg-white dark:bg-black border-[3px] border-black dark:border-white px-4 py-1 rotate-[-2deg] inline-block ml-2">{result}!</span>
                                </motion.p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4">
                    <div className="bg-white dark:bg-black border-[4px] border-black dark:border-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] h-full flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-black dark:text-white font-black text-xs uppercase tracking-[0.2em] italic underline underline-offset-4">Log Feed</h3>
                            <button onClick={() => setHistory([])} className="text-black dark:text-white hover:rotate-[-180deg] transition-transform duration-500">
                                <RotateCcw className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 space-y-4 overflow-y-auto pr-2 no-scrollbar">
                            {history.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full opacity-20 dark:invert">
                                    <Coins className="w-16 h-16 mb-4" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">No history</p>
                                </div>
                            ) : (
                                history.map(item => (
                                    <div key={item.id} className="flex items-center justify-between p-4 border-[2px] border-black dark:border-white bg-[#FFFBF0] dark:bg-zinc-900 group">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 border-[2px] border-black flex items-center justify-center text-black text-sm font-scoreboard font-black ${item.result === 'heads' ? 'bg-[#FFD21E]' : 'bg-[#00E1FF]'}`}>
                                                {item.result[0].toUpperCase()}
                                            </div>
                                            <span className="font-black uppercase tracking-tighter text-black dark:text-white text-xs">{item.result}</span>
                                        </div>
                                        <span className="text-[9px] text-black/30 dark:text-white/30 font-black uppercase">{item.time}</span>
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
