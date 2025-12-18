import React, { useState } from 'react';
import { Layers, RotateCcw, ChevronRight, Play } from 'lucide-react';

const CardDealer = ({ deck, onDraw, onReset }) => {
    return (
        <div className="bg-white p-12 rounded-[4rem] border-8 border-slate-50 shadow-[0_30px_100px_rgba(0,0,0,0.04)] h-full flex flex-col items-center justify-center relative overflow-hidden">
            {/* Deck Representation */}
            <div className="relative w-48 h-72 mb-12 group perspective-1000">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 bg-indigo-600 rounded-[2.5rem] border-4 border-white shadow-lg transition-transform duration-500"
                        style={{
                            transform: `translateZ(${-i * 4}px) translateY(${-i * 2}px) rotate(${i * 1.5}deg)`,
                            zIndex: 10 - i
                        }}
                    >
                        {/* Card Back Design */}
                        <div className="absolute inset-4 border-2 border-white/20 rounded-[1.5rem] flex items-center justify-center opacity-40">
                            <Layers className="w-10 h-10 text-white" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mb-10">
                <p className="text-slate-400 font-black uppercase tracking-widest text-[0.7rem] mb-2">Cards Remaining</p>
                <div className="text-6xl font-[900] text-slate-800 tracking-tighter">{deck.length}</div>
            </div>

            <div className="flex flex-col gap-4 w-full">
                <button
                    onClick={onDraw}
                    disabled={deck.length === 0}
                    className="btn-sunset w-full py-6 text-sm uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
                >
                    Draw A Card <ChevronRight className="w-5 h-5" />
                </button>

                <button
                    onClick={onReset}
                    className="w-full py-5 bg-slate-50 text-slate-400 font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                >
                    <RotateCcw className="w-4 h-4" /> Reshuffle Deck
                </button>
            </div>

            {/* Floating Decorative Suit Icons */}
            <div className="absolute top-10 right-10 text-slate-50 text-8xl font-black select-none pointer-events-none">♠</div>
            <div className="absolute bottom-10 left-10 text-slate-50 text-8xl font-black select-none pointer-events-none">♥</div>
        </div>
    );
};

export default CardDealer;
