import React, { useState, useEffect } from 'react';
import CardDealer from '../components/Deck/CardDealer';
import { RotateCcw, Clock } from 'lucide-react';

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
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-6xl font-[900] text-slate-800 tracking-tight mb-4 leading-tight">Card Dealer</h1>
                <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-xs">Draw cards from a complete virtual deck!</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                {/* Dealer Area */}
                <div className="lg:col-span-4">
                    <CardDealer deck={deck} onDraw={drawCard} onReset={resetDeck} />
                </div>

                {/* Drawn History Area */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-[4rem] p-12 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border-8 border-slate-50 min-h-[500px] flex flex-col h-full">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-slate-400 font-black text-[0.7rem] uppercase tracking-[0.2em]">Drawn History</h3>
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full font-black text-[10px] text-slate-400 uppercase tracking-widest">
                                <Clock className="w-4 h-4" /> Recent First
                            </div>
                        </div>

                        {drawnCards.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center opacity-10">
                                <div className="w-24 h-24 border-8 border-dashed border-slate-300 rounded-[2rem] mb-6" />
                                <p className="text-xl font-black uppercase tracking-widest">Draw cards to see them here</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                                {drawnCards.map((card, idx) => (
                                    <div
                                        key={idx}
                                        className={`aspect-[2/3] bg-white rounded-3xl border-4 border-slate-50 shadow-sm flex flex-col items-center justify-between p-6 animate-bounce-in relative overflow-hidden group hover:scale-105 transition-transform duration-300 ${idx === 0 ? 'ring-4 ring-indigo-100 ring-offset-4' : ''}`}
                                    >
                                        <div className={`text-xl font-black self-start ${card.color}`}>{card.value}{card.suit}</div>
                                        <div className={`text-5xl font-black ${card.color}`}>{card.suit}</div>
                                        <div className={`text-xl font-black self-end ${card.color}`}>{card.value}{card.suit}</div>

                                        {idx === 0 && (
                                            <div className="absolute top-0 right-0 p-2">
                                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeckPage;
