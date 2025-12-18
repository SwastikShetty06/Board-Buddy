import React, { useEffect, useState } from 'react';

const CurrentCall = ({ currentNumber }) => {
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        if (currentNumber) {
            setAnimationKey(k => k + 1);
        }
    }, [currentNumber]);

    return (
        <div className="relative flex flex-col items-center justify-center p-12 bg-purple-50 rounded-[3.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.03)] min-h-[350px] w-full group overflow-hidden border-8 border-white">
            <div className="absolute top-10 left-10 w-24 h-24 bg-white/50 blur-[60px] rounded-full" />

            <h2 className="relative z-10 text-purple-400 font-black tracking-[0.2em] text-[0.7rem] uppercase mb-6">
                Now Calling
            </h2>

            {currentNumber ? (
                <div
                    key={animationKey}
                    className="relative z-10 flex flex-col items-center animate-bounce-in"
                >
                    <span className="text-[12rem] md:text-[14rem] font-[900] text-purple-600 tracking-tighter leading-none drop-shadow-sm">
                        {currentNumber}
                    </span>
                    <div className="h-2 w-32 bg-purple-200 rounded-full mt-6" />
                </div>
            ) : (
                <div className="relative z-10 flex flex-col items-center opacity-40">
                    <span className="text-[10rem] font-[900] text-purple-200">??</span>
                    <p className="text-purple-300 font-bold uppercase tracking-widest text-xs">Waiting for draw</p>
                </div>
            )}

            {/* Decorative Dots */}
            <div className="absolute bottom-10 right-10 grid grid-cols-2 gap-2 opacity-10">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-purple-400 rounded-full" />
                ))}
            </div>
        </div>
    );
};

export default CurrentCall;
