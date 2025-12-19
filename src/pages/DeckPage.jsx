import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CardDealer from '../components/Deck/CardDealer';
import { RotateCcw, Clock, Layers } from 'lucide-react';

const DeckPage = () => {
    const [deck, setDeck] = useState([]);
    const [drawnCards, setDrawnCards] = useState([]);

    const createDeck = () => {
        const suits = ['♠', '♥', '♦', '♣'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const newDeck = [];
        for (const suit of suits) {
            for (const value of values) {
                newDeck.push({ value, suit, color: (suit === '♥' || suit === '♦' ? 'text-rose-500' : 'text-slate-800') });
            }
        }
        return newDeck.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        setDeck(createDeck());
    }, []);

    const drawCard = () => {
        if (deck.length > 0) {
            const newDeck = [...deck];
            const card = newDeck.pop();
            setDeck(newDeck);
            setDrawnCards(prev => [card, ...prev].slice(0, 15));
        }
    };

    const resetDeck = () => {
        if (window.confirm('Reshuffle all cards back into the deck?')) {
            setDeck(createDeck());
            setDrawnCards([]);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-0">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
                <div>
                    <h1 className="text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter uppercase italic leading-none mb-4">Card Dealer</h1>
                    <p className="text-black/50 dark:text-white/40 font-bold uppercase tracking-[0.2em] text-xs underline underline-offset-4 decoration-[3px]">Virtual Deck Slinger</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                {/* Dealer Area */}
                <div className="lg:col-span-4">
                    <CardDealer deck={deck} onDraw={drawCard} onReset={resetDeck} />
                </div>

                <div className="lg:col-span-8">
                    <div className="bg-[#E5E7EB] dark:bg-[#1A1625] border-[6px] border-black dark:border-white p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_2px_rgba(255,255,255,1)] min-h-[500px] flex flex-col h-full relative overflow-hidden">

                        {/* Tray Texture */}
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
                        </div>

                        <div className="flex justify-between items-center mb-10 relative z-10">
                            <h3 className="text-black dark:text-white font-black text-xs uppercase tracking-[0.2em] italic underline underline-offset-4">Drawn History</h3>
                            <button onClick={() => setDrawnCards([])} className="text-black dark:text-white hover:rotate-[-10deg] transition-transform">
                                <RotateCcw className="w-5 h-5" />
                            </button>
                        </div>

                        {drawnCards.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center opacity-20 dark:invert relative z-10">
                                <Layers className="w-24 h-24 mb-6 text-black" />
                                <p className="text-xl font-black uppercase tracking-widest text-black">NO CARDS DRAWN</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 relative z-10">
                                <AnimatePresence mode="popLayout">
                                    {drawnCards.map((card, idx) => (
                                        <motion.div
                                            key={`${card.value}-${card.suit}-${idx}`}
                                            initial={{ scale: 0.8, y: 20, opacity: 0 }}
                                            animate={{ scale: 1, y: 0, opacity: 1 }}
                                            exit={{ scale: 0.5, opacity: 0 }}
                                            className={`
                                                aspect-[2/3] bg-white border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                                                flex flex-col items-center justify-between p-6 relative overflow-hidden group
                                                ${idx === 0 ? 'ring-[6px] ring-[#00E1FF] ring-offset-[6px] scale-105 z-20' : 'scale-95 grayscale-[0.2]'}
                                            `}
                                        >
                                            <div className={`text-xl font-scoreboard font-black self-start leading-none ${card.suit === '♥' || card.suit === '♦' ? 'text-red-500' : 'text-black'}`}>{card.value}</div>
                                            <div className={`text-6xl font-black ${card.suit === '♥' || card.suit === '♦' ? 'text-red-500' : 'text-black'}`}>{card.suit}</div>
                                            <div className={`text-xl font-scoreboard font-black self-end leading-none ${card.suit === '♥' || card.suit === '♦' ? 'text-red-500' : 'text-black'}`}>{card.value}</div>

                                            {/* card glow for current */}
                                            {idx === 0 && (
                                                <div className="absolute inset-0 bg-sky-400/5 pointer-events-none"></div>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeckPage;
