import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, Trophy, Zap, Clock } from 'lucide-react';

const FingerChooser = () => {
    // Phase: idle, countdown, picking, winner
    const [phase, setPhase] = useState('idle');
    const [points, setPoints] = useState([]);
    const [winnerId, setWinnerId] = useState(null);
    const [countdown, setCountdown] = useState(3);
    const [progress, setProgress] = useState(0);

    const containerRef = useRef(null);
    const timerRef = useRef(null);

    // Track points
    const handleTouch = useCallback((e) => {
        if (phase === 'winner') return;
        const rect = containerRef.current.getBoundingClientRect();
        const newPoints = Array.from(e.touches).map(touch => ({
            id: touch.identifier,
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
            color: `hsl(${touch.identifier * 137.5 % 360}, 75%, 65%)`
        }));
        setPoints(newPoints);
    }, [phase]);

    const handleMouse = useCallback((e) => {
        if (phase === 'winner' || ('ontouchstart' in window)) return;
        const rect = containerRef.current.getBoundingClientRect();
        setPoints([{
            id: 0,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            color: 'hsl(210, 75%, 65%)'
        }]);
    }, [phase]);

    // Handle State Transitions
    useEffect(() => {
        if (phase === 'idle' && points.length >= 2) {
            setPhase('countdown');
            setCountdown(3);
        } else if (phase === 'countdown' && points.length < 2) {
            setPhase('idle');
            setCountdown(3);
        }
    }, [points.length, phase]);

    // Countdown Timer Logic
    useEffect(() => {
        if (phase === 'countdown') {
            const interval = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setPhase('picking');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [phase]);

    // Picking Animation Logic
    useEffect(() => {
        if (phase === 'picking') {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        const winIdx = Math.floor(Math.random() * points.length);
                        setWinnerId(points[winIdx].id);
                        setPhase('winner');
                        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 30);
            return () => clearInterval(interval);
        }
    }, [phase, points]);

    // Winner Reset Logic - 3 second auto-reset NO MATTER WHAT
    useEffect(() => {
        if (phase === 'winner') {
            const timeout = setTimeout(() => {
                setPhase('idle');
                setWinnerId(null);
                setPoints([]);
                setProgress(0);
                setCountdown(3);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [phase]);

    // Dynamic sizing based on player count
    const circleSize = points.length <= 3 ? 160 : points.length <= 5 ? 130 : 110;
    const radius = (circleSize / 2) - 8;
    const circumference = 2 * Math.PI * radius;

    return (
        <div
            ref={containerRef}
            className={`fixed inset-0 top-20 z-0 select-none cursor-none touch-none overflow-hidden transition-colors duration-700 ${phase === 'winner' ? 'bg-[#33FF77]/5' : 'bg-transparent'}`}
            onTouchStart={handleTouch}
            onTouchMove={handleTouch}
            onTouchEnd={handleTouch}
            onMouseDown={handleMouse}
            onMouseMove={(e) => points.length > 0 && handleMouse(e)}
            onMouseUp={() => phase !== 'winner' && setPoints([])}
            onMouseLeave={() => phase !== 'winner' && setPoints([])}
        >
            {/* Header Area */}
            <div className="absolute inset-x-0 top-10 text-center px-4 pointer-events-none z-10">
                <h1 className="text-4xl md:text-8xl font-black text-black/5 dark:text-white/5 tracking-tighter uppercase italic leading-none mb-2">Finger Picker</h1>
                <p className="text-black dark:text-white font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">
                    {phase === 'winner' ? "LUCKY WINNER FOUND!" :
                        phase === 'picking' ? "PICKING ONE AT RANDOM..." :
                            phase === 'countdown' ? "PREPARING FOR SELECTION..." :
                                "TOUCH BOARD TO START"}
                </p>
            </div>

            {/* Main Countdown Overlay */}
            <AnimatePresence>
                {phase === 'countdown' && (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.5, opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50 px-6"
                    >
                        <div className="bg-white dark:bg-black border-[6px] border-black dark:border-white p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_2px_rgba(255,255,255,1)] flex flex-col items-center gap-6">
                            <Clock className="w-16 h-16 text-black dark:text-white animate-spin-slow" />
                            <motion.span
                                key={countdown}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-[12rem] md:text-[18rem] font-scoreboard font-black text-black dark:text-white leading-none tracking-tighter"
                            >
                                {countdown}
                            </motion.span>
                            <p className="text-xs font-black text-black/40 dark:text-white/40 uppercase tracking-[0.6em] italic underline underline-offset-4">Wait for players</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Instruction Placeholder */}
            {points.length === 0 && phase === 'idle' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.03] dark:invert pointer-events-none p-10 text-center">
                    <Hand className="w-56 h-56 md:w-96 md:h-96 mb-8" />
                    <p className="text-4xl md:text-8xl font-black uppercase tracking-[0.3em]">PLACE FINGERS</p>
                </div>
            )}

            {/* Finger Indicators */}
            {points.map(p => {
                const isWinner = winnerId === p.id;
                const isLoser = winnerId !== null && !isWinner;

                return (
                    <motion.div
                        key={p.id}
                        initial={{ scale: 0 }}
                        animate={{
                            scale: isWinner ? 1.5 : isLoser ? 0 : 1,
                            rotate: isWinner ? [0, -10, 10, 0] : 0
                        }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40`}
                        style={{
                            left: p.x,
                            top: p.y,
                            width: circleSize,
                            height: circleSize
                        }}
                    >
                        {/* Outer Progress Ring */}
                        {phase === 'picking' && (
                            <svg className="absolute inset-0 -rotate-90 w-full h-full">
                                <circle
                                    cx={circleSize / 2}
                                    cy={circleSize / 2}
                                    r={radius}
                                    fill="none"
                                    stroke="rgba(0,0,0,0.1)"
                                    strokeWidth="12"
                                />
                                <motion.circle
                                    cx={circleSize / 2}
                                    cy={circleSize / 2}
                                    r={radius}
                                    fill="none"
                                    stroke="black"
                                    strokeWidth="12"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={circumference - (progress / 100) * circumference}
                                    strokeLinecap="butt"
                                />
                            </svg>
                        )}

                        {/* Finger Circle */}
                        <div
                            className={`
                                absolute inset-2 border-[4px] border-black flex flex-col items-center justify-center transition-all duration-500
                                shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                                ${isWinner ? 'bg-[#33FF77] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]' : ''}
                            `}
                            style={{ backgroundColor: isWinner ? undefined : p.color }}
                        >
                            {isWinner ? (
                                <div className="flex flex-col items-center">
                                    <Trophy className="w-12 h-12 text-black mb-1" />
                                    <span className="text-[10px] font-black text-black uppercase tracking-tighter italic">WINNER!</span>
                                </div>
                            ) : (phase === 'picking' || phase === 'countdown') ? (
                                <Zap className="w-1/3 h-1/3 text-white mix-blend-overlay animate-pulse" />
                            ) : (
                                <div className="w-2 h-2 bg-white rounded-full opacity-50" />
                            )}
                        </div>

                        {/* Stomp Effect for Winner */}
                        {isWinner && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0.5 }}
                                animate={{ scale: 2, opacity: 0 }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="absolute inset-0 border-[6px] border-[#33FF77]"
                            />
                        )}
                    </motion.div>
                );
            })}

            {/* Post-Win Status Message */}
            <AnimatePresence>
                {phase === 'winner' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-white/40 dark:bg-black/40 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ y: 50, scale: 0.9, rotate: -5 }}
                            animate={{ y: 0, scale: 1.1, rotate: 2 }}
                            className="bg-white dark:bg-black border-[6px] border-black dark:border-white p-12 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] dark:shadow-[20px_20px_0px_0px_rgba(255,255,255,1)] flex flex-col items-center gap-6"
                        >
                            <Trophy className="w-20 h-20 text-[#FFD21E] animate-bounce" />
                            <h2 className="text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter uppercase italic leading-none">HOORAY!</h2>
                            <p className="text-[10px] font-black text-black/30 dark:text-white/30 uppercase tracking-[0.4em] italic underline underline-offset-4">Next round in 3s...</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <p className="fixed bottom-10 left-0 right-0 text-center text-black/20 dark:text-white/10 text-[10px] font-black uppercase tracking-[0.5em] px-4 pointer-events-none">
                RANDOM SELECTION • AUTO-RESETS AFTER 3S • STICKY FINGERS WIN
            </p>
        </div>
    );
};

export default FingerChooser;
