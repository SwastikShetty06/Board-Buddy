import React, { useState } from 'react';
import { Layers, RotateCcw, ChevronRight, Play } from 'lucide-react';

const CardDealer = ({ deck, onDraw, onReset }) => {
    return (
        <div className="bg-white dark:bg-black p-8 md:p-12 border-[4px] border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] h-full flex flex-col items-center justify-center relative overflow-hidden">
            {/* Deck Representation */}
            <div className="relative w-48 h-72 mb-12 group perspective-1000 rotate-[-5deg]">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 bg-[#33FF77] border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform duration-500"
                        style={{
                            transform: `translateZ(${-i * 4}px) translateY(${-i * 4}px) translateX(${i * 2}px)`,
                            zIndex: 10 - i
                        }}
                    >
                        {/* Card Back Design */}
                        <div className="absolute inset-4 border-[2px] border-black/20 flex flex-col items-center justify-center">
                            <Layers className="w-10 h-10 text-black/20 mb-2" />
                            <div className="w-8 h-1 bg-black/10 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mb-10">
                <p className="text-black/40 dark:text-white/40 font-black uppercase tracking-widest text-[10px] mb-2 italic underline underline-offset-4 decoration-[2px]">Cards Remaining</p>
                <div className="text-7xl font-scoreboard font-black text-black dark:text-white tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">{deck.length}</div>
            </div>

            <div className="flex flex-col gap-6 w-full relative z-10">
                <button
                    onClick={onDraw}
                    disabled={deck.length === 0}
                    className="brutal-button bg-[#FFD21E] w-full py-6 text-xl disabled:opacity-50 disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none"
                >
                    DRAW CARD
                </button>

                <button
                    onClick={onReset}
                    className="w-full py-4 text-black dark:text-white font-black uppercase tracking-widest text-[10px] hover:underline flex items-center justify-center gap-2 transition-all"
                >
                    <RotateCcw className="w-4 h-4" /> RESHUFFLE DECK
                </button>
            </div>

            {/* Floating Decorative Suit Icons */}
            <div className="absolute top-4 right-4 text-black/5 dark:text-white/5 text-9xl font-black select-none pointer-events-none rotate-[15deg]">♠</div>
            <div className="absolute bottom-4 left-4 text-black/5 dark:text-white/5 text-9xl font-black select-none pointer-events-none rotate-[-15deg]">♥</div>
        </div>
    );
};

export default CardDealer;
