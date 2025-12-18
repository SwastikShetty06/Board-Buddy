import React from 'react';
import { Lock } from 'lucide-react';

const Die = ({ type, value, locked, rolling, onClick }) => {
    // Shape configurations
    const instructions = {
        d4: "triangle-clip bg-amber-500",
        d6: "rounded-xl bg-red-500",
        d8: "rotate-45 bg-emerald-500",
        d10: "kite-clip bg-blue-500",
        d12: "dodeca-clip bg-purple-500",
        d20: "hex-clip bg-indigo-500",
    };

    const shapeClass = instructions[type] || instructions.d6;

    // Animation classes
    const rollingClass = rolling && !locked ? "animate-roll" : "";

    return (
        <div className="relative group cursor-pointer" onClick={onClick}>
            <div
                className={`
          relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center 
          text-4xl md:text-5xl font-black text-white shadow-xl transition-all duration-200
          ${shapeClass}
          ${locked ? 'ring-4 ring-yellow-400 scale-95 opacity-90' : 'hover:scale-105 hover:shadow-2xl'}
          ${rollingClass}
        `}
            >
                <span className={type === 'd8' ? '-rotate-45' : ''}>
                    {value}
                </span>

                {locked && (
                    <div className="absolute top-1 right-1 text-yellow-300">
                        <Lock className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" />
                    </div>
                )}
            </div>

            {/* Label */}
            <div className="text-center mt-2 text-slate-400 font-mono text-xs uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                {type.toUpperCase()}
            </div>
        </div>
    );
};

export default Die;
