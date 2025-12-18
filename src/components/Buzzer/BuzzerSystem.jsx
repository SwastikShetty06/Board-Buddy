import React, { useState, useEffect } from 'react';
import { RefreshCw, Zap } from 'lucide-react';

const Buzzer = () => {
    const [winner, setWinner] = useState(null);
    const [locked, setLocked] = useState(false);

    const colors = [
        { id: 0, bg: 'bg-red-500', name: 'Red', active: 'bg-red-600 shadow-red-500' },
        { id: 1, bg: 'bg-blue-500', name: 'Blue', active: 'bg-blue-600 shadow-blue-500' },
        { id: 2, bg: 'bg-green-500', name: 'Green', active: 'bg-green-600 shadow-green-500' },
        { id: 3, bg: 'bg-yellow-500', name: 'Yellow', active: 'bg-yellow-600 shadow-yellow-500' }
    ];

    const buzz = (id) => {
        if (winner !== null || locked) return;

        setWinner(id);
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-game-show-buzzer-996.mp3');
        audio.play().catch(e => console.log('Audio error:', e));

        // Lockout timer (optional, just to prevent instant resets)
        setLocked(true);
        setTimeout(() => setLocked(false), 3000);
    };

    const reset = () => {
        setWinner(null);
        setLocked(false);
    };

    return (
        <div className="fixed inset-0 top-20 bg-slate-900 select-none">
            {winner !== null ? (
                // Winner Screen
                <div className={`w-full h-full flex flex-col items-center justify-center ${colors[winner].bg} animate-in fade-in zoom-in duration-300`}>
                    <h1 className="text-8xl font-black text-white uppercase tracking-tighter drop-shadow-xl mb-8">
                        {colors[winner].name} Wins!
                    </h1>
                    <button
                        onClick={reset}
                        className="px-12 py-4 bg-white text-slate-900 font-bold text-2xl rounded-full shadow-2xl transition-transform active:scale-95 flex items-center gap-3"
                    >
                        <RefreshCw className="w-8 h-8" />
                        Reset Buzzer
                    </button>
                </div>
            ) : (
                // Buzzer Zones
                <div className="w-full h-full grid grid-cols-2 grid-rows-2">
                    {colors.map((color) => (
                        <div
                            key={color.id}
                            className={`${color.bg} flex items-center justify-center active:scale-95 transition-transform duration-100 cursor-pointer touch-manipulation`}
                            onPointerDown={() => buzz(color.id)}
                        >
                            <Zap className="w-24 h-24 text-white/50" />
                        </div>
                    ))}

                    {/* Instructions Overlay */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/80 backdrop-blur text-white px-6 py-3 rounded-full pointer-events-none">
                        Tap your zone to buzz in!
                    </div>
                </div>
            )}
        </div>
    );
};

export default Buzzer;
