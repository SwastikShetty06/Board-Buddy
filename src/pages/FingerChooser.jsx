import React, { useState, useEffect, useCallback, useRef } from 'react';
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
            className={`fixed inset-0 top-20 z-0 select-none cursor-none touch-none overflow-hidden transition-colors duration-700 ${phase === 'winner' ? 'bg-emerald-50/10' : 'bg-transparent'}`}
            onTouchStart={handleTouch}
            onTouchMove={handleTouch}
            onTouchEnd={handleTouch}
            onMouseDown={handleMouse}
            onMouseMove={(e) => points.length > 0 && handleMouse(e)}
            onMouseUp={() => phase !== 'winner' && setPoints([])}
            onMouseLeave={() => phase !== 'winner' && setPoints([])}
        >
            {/* Header Area - Floating & Non-Blocking */}
            <div className="absolute inset-x-0 top-10 text-center px-4 pointer-events-none z-10 transition-all duration-700">
                <h1 className="text-4xl md:text-7xl font-[900] text-slate-800 tracking-tight mb-2 leading-tight uppercase italic opacity-10">Finger Picker</h1>
                <p className="text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">
                    {phase === 'winner' ? "LUCKY WINNER FOUND!" :
                        phase === 'picking' ? "PICKING ONE AT RANDOM..." :
                            phase === 'countdown' ? "PREPARING FOR SELECTION..." :
                                "TOUCH BOARD TO START"}
                </p>
            </div>

            {/* Main Countdown Overlay */}
            {phase === 'countdown' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50">
                    <div className="bg-white/60 backdrop-blur-lg rounded-[4rem] p-10 flex flex-col items-center gap-4 animate-in zoom-in-50 duration-300 border border-white/50 shadow-2xl">
                        <Clock className="w-12 h-12 text-indigo-500 animate-pulse" />
                        <span key={countdown} className="text-[10rem] md:text-[15rem] font-[900] text-slate-800 leading-none tracking-tighter transition-all duration-300 scale-110 flex items-center justify-center min-w-[300px]">
                            {countdown}
                        </span>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.8em]">Wait for players</p>
                    </div>
                </div>
            )}

            {/* Instruction Placeholder */}
            {points.length === 0 && phase === 'idle' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.02] pointer-events-none p-10 text-center">
                    <Hand className="w-56 h-56 md:w-96 md:h-96 mb-8" />
                    <p className="text-4xl md:text-7xl font-black uppercase tracking-[0.5em]">TOUCH BOARD</p>
                </div>
            )}

            {/* Finger Indicators */}
            {points.map(p => {
                const isWinner = winnerId === p.id;
                const isLoser = winnerId !== null && !isWinner;

                return (
                    <div
                        key={p.id}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none
                            ${isWinner ? 'scale-150 z-40' : isLoser ? 'scale-50 opacity-0' : 'scale-100'}`}
                        style={{
                            left: p.x,
                            top: p.y,
                            width: circleSize,
                            height: circleSize
                        }}
                    >
                        {/* Outer Progress Ring (Picking phase only) */}
                        {phase === 'picking' && (
                            <svg className="absolute inset-0 -rotate-90 w-full h-full">
                                <circle
                                    cx={circleSize / 2}
                                    cy={circleSize / 2}
                                    r={radius}
                                    fill="none"
                                    stroke="rgba(0,0,0,0.02)"
                                    strokeWidth="10"
                                />
                                <circle
                                    cx={circleSize / 2}
                                    cy={circleSize / 2}
                                    r={radius}
                                    fill="none"
                                    stroke={p.color}
                                    strokeWidth="10"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={circumference - (progress / 100) * circumference}
                                    strokeLinecap="round"
                                    className="transition-all duration-100 ease-out"
                                />
                            </svg>
                        )}

                        {/* Finger Circle */}
                        <div
                            className={`absolute inset-2 rounded-full border-[6px] border-white shadow-2xl flex flex-col items-center justify-center transition-all duration-500
                                ${isWinner ? 'bg-emerald-400 border-white ring-8 ring-emerald-100 animate-bounce' : ''}`}
                            style={{ backgroundColor: isWinner ? undefined : p.color }}
                        >
                            {isWinner ? (
                                <>
                                    <Trophy className="w-1/2 h-1/2 text-white mb-1" />
                                    <span className="text-[10px] font-black text-white uppercase tracking-tighter">WINNER!</span>
                                </>
                            ) : phase === 'picking' || phase === 'countdown' ? (
                                <Zap className="w-1/3 h-1/3 text-white/50 animate-pulse" />
                            ) : null}
                        </div>

                        {/* Flash Effect for Winner */}
                        {isWinner && (
                            <div className="absolute inset-[-40px] animate-ping opacity-20 bg-emerald-400 rounded-full" />
                        )}
                    </div>
                );
            })}

            {/* Post-Win Status Message */}
            {phase === 'winner' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none animate-in fade-in duration-1000 bg-white/5 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4 py-10 px-16 rounded-[4rem] bg-white shadow-2xl border-4 border-emerald-50 scale-110">
                        <Trophy className="w-16 h-16 text-emerald-500 animate-bounce" />
                        <h2 className="text-5xl font-black text-slate-800 tracking-tighter uppercase italic text-center">HOORAY!</h2>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Next round in 3s...</p>
                    </div>
                </div>
            )}

            <p className="fixed bottom-10 left-0 right-0 text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.4em] px-4 pointer-events-none opacity-20">
                RANDOM SELECTION • AUTO-RESETS AFTER 3S
            </p>
        </div>
    );
};

export default FingerChooser;
