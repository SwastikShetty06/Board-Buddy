import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Zap, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

const Buzzer = () => {
    const [winner, setWinner] = useState(null);
    const [locked, setLocked] = useState(false);
    const buzzerLock = useRef(false);

    const colors = [
        { id: 0, bg: 'bg-[#FF66AA]', name: 'PINK', active: 'bg-[#FF4488]' },
        { id: 1, bg: 'bg-[#00E1FF]', name: 'BLUE', active: 'bg-[#00CCEE]' },
        { id: 2, bg: 'bg-[#33FF77]', name: 'GREEN', active: 'bg-[#22EE66]' },
        { id: 3, bg: 'bg-[#FFD21E]', name: 'YELLOW', active: 'bg-[#EEBB11]' }
    ];

    const buzz = (id) => {
        if (buzzerLock.current || winner !== null) return;
        buzzerLock.current = true;
        setWinner(id);

        // Dynamic confetti based on winner color
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: [colors[id].bg.replace('bg-[', '').replace(']', '')]
        });

        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-game-show-buzzer-996.mp3');
        audio.play().catch(e => console.log('Audio error:', e));

        setLocked(true);
    };

    const reset = () => {
        buzzerLock.current = false;
        setWinner(null);
        setLocked(false);
    };

    return (
        <div className="fixed inset-0 top-16 md:top-20 bg-white dark:bg-black select-none z-40">
            <AnimatePresence mode="wait">
                {winner !== null ? (
                    <motion.div
                        key="winner"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        className={`w-full h-full flex flex-col items-center justify-center ${colors[winner].bg} p-8`}
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center"
                        >
                            <div className="bg-white border-[6px] border-black p-10 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] mb-12">
                                <Trophy className="w-32 h-32 md:w-48 md:h-48 text-black" />
                            </div>

                            <h1 className="text-6xl md:text-9xl font-black text-black uppercase tracking-tighter italic leading-none mb-12 text-center drop-shadow-[4px_4px_0px_rgba(255,255,255,0.5)]">
                                {colors[winner].name} WON!
                            </h1>

                            <button
                                onClick={reset}
                                className="brutal-button bg-white text-black px-12 py-6 text-2xl hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                            >
                                RESET BUZZER
                            </button>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full grid grid-cols-2 grid-rows-2 p-4 gap-4 bg-white dark:bg-black"
                    >
                        {colors.map((color) => (
                            <motion.button
                                key={color.id}
                                whileTap={{ scale: 0.95 }}
                                className={`
                                    ${color.bg} border-[6px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                                    flex items-center justify-center relative overflow-hidden group
                                `}
                                onPointerDown={() => buzz(color.id)}
                            >
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <Zap className="w-16 h-16 md:w-32 md:h-32 text-black opacity-30 group-hover:scale-125 transition-transform" />
                                <span className="absolute bottom-4 left-6 text-2xl font-black italic text-black opacity-50">{color.name}</span>
                            </motion.button>
                        ))}

                        {/* Instructions Overlay */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black border-[4px] border-black dark:border-white text-black dark:text-white px-8 py-4 font-black uppercase tracking-widest text-xs rotate-[-2deg] pointer-events-none z-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
                            Tap your zone to buzz in!
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Buzzer;
