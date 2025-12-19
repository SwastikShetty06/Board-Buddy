import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Timer as TimerIcon, Bell, BellOff, Settings, Hourglass as HourglassIcon, Swords, Shovel, Dices, ChevronRight } from 'lucide-react';

const GameTimer = () => {
    const [mode, setMode] = useState('countdown'); // countdown, hourglass, chess, random
    const [seconds, setSeconds] = useState(600);
    const [initialSeconds, setInitialSeconds] = useState(600);
    const [isActive, setIsActive] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    // Chess State
    const [chessA, setChessA] = useState(300);
    const [chessB, setChessB] = useState(300);
    const [activePlayer, setActivePlayer] = useState(null); // 'A' or 'B'

    // Random State
    const [randomRange, setRandomRange] = useState({ min: 10, max: 60 });
    const [isRandomHidden, setIsRandomHidden] = useState(true);

    // Input States
    const [showSettings, setShowSettings] = useState(false);
    const [customMins, setCustomMins] = useState(10);
    const [customSecs, setCustomSecs] = useState(0);

    const timerRef = useRef(null);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setSeconds(initialSeconds);
        setChessA(initialSeconds);
        setChessB(initialSeconds);
        setActivePlayer(null);
    };

    const handleApplySettings = () => {
        const total = (parseInt(customMins) || 0) * 60 + (parseInt(customSecs) || 0);
        if (total > 0) {
            setInitialSeconds(total);
            setSeconds(total);
            setChessA(total);
            setChessB(total);
            setShowSettings(false);
            setIsActive(false);
            setActivePlayer(null);
        }
    };

    const startRandom = () => {
        const min = parseInt(randomRange.min) || 1;
        const max = parseInt(randomRange.max) || 60;
        const rolled = Math.floor(Math.random() * (max - min + 1)) + min;
        setInitialSeconds(rolled);
        setSeconds(rolled);
        setIsActive(true);
    };

    // Standard Multi-Mode Timer Tick
    useEffect(() => {
        if (isActive && seconds > 0 && mode !== 'chess') {
            timerRef.current = setInterval(() => {
                setSeconds(s => s - 1);
            }, 1000);
        } else if (seconds === 0 && isActive) {
            setIsActive(false);
            playAlarm();
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isActive, seconds, mode]);

    // Chess Timer Tick
    useEffect(() => {
        if (mode === 'chess' && activePlayer) {
            timerRef.current = setInterval(() => {
                if (activePlayer === 'A') {
                    setChessA(s => {
                        if (s <= 1) { playAlarm(); setActivePlayer(null); return 0; }
                        return s - 1;
                    });
                } else {
                    setChessB(s => {
                        if (s <= 1) { playAlarm(); setActivePlayer(null); return 0; }
                        return s - 1;
                    });
                }
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [mode, activePlayer]);

    const playAlarm = () => {
        if (!isMuted) {
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
            audio.play().catch(() => { });
        }
    };

    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = (seconds / initialSeconds) * 100;

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-0">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div>
                    <h1 className="text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter uppercase italic leading-none mb-4">Game Timer</h1>
                    <div className="flex bg-black/5 dark:bg-white/10 p-1 border-[4px] border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
                        {[
                            { id: 'countdown', icon: TimerIcon, label: 'Classic' },
                            { id: 'hourglass', icon: HourglassIcon, label: 'Hourglass' },
                            { id: 'chess', icon: Swords, label: 'Chess' },
                            { id: 'random', icon: Dices, label: 'Party' }
                        ].map(m => (
                            <button
                                key={m.id}
                                onClick={() => { setMode(m.id); resetTimer(); }}
                                className={`flex items-center gap-2 px-6 py-3 font-black text-[10px] uppercase tracking-widest transition-all ${mode === m.id ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white'}`}
                            >
                                <m.icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{m.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={`w-14 h-14 border-[3px] border-black dark:border-white flex items-center justify-center transition-all ${isMuted ? 'bg-[#FF66AA] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-white dark:bg-black text-black dark:text-white'}`}
                    >
                        {isMuted ? <BellOff className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
                    </button>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className={`w-14 h-14 border-[3px] border-black dark:border-white flex items-center justify-center transition-all ${showSettings ? 'bg-[#00E1FF] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-white dark:bg-black text-black dark:text-white'}`}
                    >
                        <Settings className="w-6 h-6" />
                    </button>
                    <button
                        onClick={resetTimer}
                        className="w-14 h-14 border-[3px] border-black dark:border-white bg-white dark:bg-black text-black dark:text-white flex items-center justify-center transition-all hover:bg-[#FFD21E] hover:text-black cursor-pointer"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                {/* Timer Display */}
                <div className="lg:col-span-8">
                    <div className="bg-[#E5E7EB] dark:bg-[#1A1625] border-[6px] border-black dark:border-white p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_2px_rgba(255,255,255,1)] min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden">

                        {/* Tray Texture */}
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
                        </div>

                        {/* Countdown / Random Mode */}
                        {(mode === 'countdown' || mode === 'random') && (
                            <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle cx="50%" cy="50%" r="45%" className="fill-none stroke-black/5 dark:stroke-white/10" strokeWidth="16" />
                                    <circle
                                        cx="50%" cy="50%" r="45%"
                                        className={`fill-none transition-all duration-1000 ease-linear ${mode === 'random' ? 'stroke-[#FFD21E]' : 'stroke-[#FF66AA]'}`}
                                        strokeWidth="16"
                                        strokeDasharray="283%"
                                        strokeDashoffset={`${283 - (283 * progress) / 100}%`}
                                        strokeLinecap="butt"
                                    />
                                </svg>
                                <div className="text-center relative z-10 bg-white dark:bg-black border-[4px] border-black dark:border-white p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                                    {mode === 'random' && isRandomHidden && isActive ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-8xl md:text-9xl font-black text-black dark:text-white">?</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-black/30 dark:text-white/20 italic">Mystery Time</span>
                                        </div>
                                    ) : (
                                        <span className={`text-7xl md:text-9xl font-scoreboard font-black tracking-tighter leading-none ${seconds < 10 ? 'text-[#FF66AA] animate-pulse' : 'text-black dark:text-white'}`}>
                                            {formatTime(seconds)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Hourglass Mode */}
                        {mode === 'hourglass' && (
                            <div className="flex flex-col items-center gap-8">
                                <div className="relative w-48 h-72 md:w-64 md:h-96 bg-white dark:bg-black border-[6px] border-black dark:border-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
                                    <svg viewBox="0 0 100 150" className="w-full h-full">
                                        {/* Frame */}
                                        <path d="M10,10 L90,10 L90,20 Q50,75 90,130 L90,140 L10,140 L10,130 Q50,75 10,20 Z" fill="none" stroke="currentColor" strokeWidth="6" className="text-black dark:text-white" />
                                        {/* Sand Top */}
                                        <path d={`M15,20 L85,20 Q50,75 15,20`} fill="#FFD21E" style={{ transform: `scaleY(${progress / 100})`, transformOrigin: 'bottom' }} />
                                        {/* Sand Bottom */}
                                        <path d={`M15,130 L85,130 Q50,75 15,130`} fill="#FFD21E" style={{ transform: `scaleY(${(100 - progress) / 100})`, transformOrigin: 'top' }} />
                                        {/* Falling Sand */}
                                        {isActive && seconds > 0 && <line x1="50" y1="50" x2="50" y2="100" stroke="#FFD21E" strokeWidth="3" strokeDasharray="6 6" className="animate-pulse" />}
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-4xl font-scoreboard font-black text-black bg-white border-[3px] border-black px-4 py-2 rotate-[-3deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                            {formatTime(seconds)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Chess Mode */}
                        {mode === 'chess' && (
                            <div className="w-full h-full flex flex-col md:flex-row gap-6 items-stretch">
                                <button
                                    onClick={() => setActivePlayer('B')}
                                    disabled={activePlayer === 'B' || chessA === 0}
                                    className={`flex-1 border-[4px] border-black p-8 flex flex-col items-center justify-center transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${activePlayer === 'A' ? 'bg-[#9D7AFF] scale-105 z-10' : 'bg-white dark:bg-zinc-900 opacity-50'}`}
                                >
                                    <span className="text-[10px] font-black uppercase tracking-widest mb-4 italic text-black dark:text-white">Player One</span>
                                    <span className="text-6xl md:text-8xl font-scoreboard font-black text-black dark:text-white">{formatTime(chessA)}</span>
                                </button>
                                <button
                                    onClick={() => setActivePlayer('A')}
                                    disabled={activePlayer === 'A' || chessB === 0}
                                    className={`flex-1 border-[4px] border-black p-8 flex flex-col items-center justify-center transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${activePlayer === 'B' ? 'bg-[#FF66AA] scale-105 z-10' : 'bg-white dark:bg-zinc-900 opacity-50'}`}
                                >
                                    <span className="text-[10px] font-black uppercase tracking-widest mb-4 italic text-black dark:text-white">Player Two</span>
                                    <span className="text-6xl md:text-8xl font-scoreboard font-black text-black dark:text-white">{formatTime(chessB)}</span>
                                </button>
                            </div>
                        )}

                        {/* Main Interaction Button */}
                        {mode !== 'chess' && (
                            <div className="mt-12 relative z-10">
                                <button
                                    onClick={mode === 'random' && !isActive ? startRandom : toggleTimer}
                                    className={`brutal-button px-16 py-6 text-2xl ${isActive ? 'bg-white dark:bg-black text-black dark:text-white' : 'bg-[#33FF77] text-black'}`}
                                >
                                    {isActive ? <><Pause className="w-6 h-6" /> STOP</> : <><Play className="w-6 h-6" /> {mode === 'random' ? 'ROLL & START' : 'START TIMER'}</>}
                                </button>
                            </div>
                        )}

                        {mode === 'chess' && !activePlayer && (
                            <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-md z-20 flex flex-col items-center justify-center">
                                <p className="text-black dark:text-white font-black uppercase tracking-[0.2em] mb-8 bg-white dark:bg-black border-[3px] border-black dark:border-white px-6 py-2 rotate-[2deg]">Tap a clock to start</p>
                                <div className="flex gap-4">
                                    <button onClick={() => setActivePlayer('A')} className="brutal-button bg-[#9D7AFF] px-8 py-4 text-xs">START P1</button>
                                    <button onClick={() => setActivePlayer('B')} className="brutal-button bg-[#FF66AA] px-8 py-4 text-xs">START P2</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Settings / Controls Area */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    {/* Mode Specific Settings */}
                    <div className="bg-white dark:bg-black p-8 md:p-10 border-[4px] border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex-1">
                        <h3 className="text-black dark:text-white font-black mb-8 text-xs uppercase tracking-[0.2em] italic underline underline-offset-4">Settings</h3>

                        {showSettings ? (
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest block mb-4">Duration</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <input
                                                type="number"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                value={customMins}
                                                onChange={(e) => setCustomMins(e.target.value)}
                                                className="w-full bg-black/5 dark:bg-white/5 p-6 pt-10 border-[3px] border-black dark:border-white font-scoreboard font-black text-3xl text-black dark:text-white focus:outline-none"
                                            />
                                            <span className="absolute top-3 left-4 text-[8px] font-black text-black/30 dark:text-white/20 uppercase tracking-tighter">Minutes</span>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                value={customSecs}
                                                onChange={(e) => setCustomSecs(e.target.value)}
                                                className="w-full bg-black/5 dark:bg-white/5 p-6 pt-10 border-[3px] border-black dark:border-white font-scoreboard font-black text-3xl text-black dark:text-white focus:outline-none"
                                            />
                                            <span className="absolute top-3 left-4 text-[8px] font-black text-black/30 dark:text-white/20 uppercase tracking-tighter">Seconds</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={handleApplySettings} className="brutal-button bg-[#33FF77] w-full py-4 text-sm mt-4">APPLY CHANGES</button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {mode === 'random' ? (
                                    <>
                                        <div className="p-6 bg-[#FFD21E]/10 border-[2px] border-dashed border-black dark:border-white">
                                            <p className="text-[#FF8800] text-[0.6rem] font-black uppercase tracking-widest mb-4 italic">Random Range (Secs)</p>
                                            <div className="flex items-center gap-4">
                                                <input type="number" inputMode="numeric" pattern="[0-9]*" value={randomRange.min} onChange={(e) => setRandomRange({ ...randomRange, min: e.target.value })} className="w-20 bg-white dark:bg-black border-[2px] border-black dark:border-white p-3 font-scoreboard font-black text-lg text-center text-black dark:text-white" />
                                                <span className="text-black/20 dark:text-white/10 font-black">TO</span>
                                                <input type="number" inputMode="numeric" pattern="[0-9]*" value={randomRange.max} onChange={(e) => setRandomRange({ ...randomRange, max: e.target.value })} className="w-20 bg-white dark:bg-black border-[2px] border-black dark:border-white p-3 font-scoreboard font-black text-lg text-center text-black dark:text-white" />
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsRandomHidden(!isRandomHidden)}
                                            className={`w-full p-4 border-[2px] border-black font-black text-[10px] uppercase tracking-widest transition-all ${isRandomHidden ? 'bg-black text-white dark:bg-white dark:text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]' : 'bg-white text-black'}`}
                                        >
                                            {isRandomHidden ? 'UNMASK MYSTERY' : 'MASK MYSTERY'}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[30, 60, 120, 300].map(s => (
                                                <button
                                                    key={s}
                                                    onClick={() => { setInitialSeconds(s); setSeconds(s); setChessA(s); setChessB(s); }}
                                                    className={`p-4 border-[2px] border-black font-scoreboard font-black transition-all ${initialSeconds === s ? 'bg-[#00E1FF] text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]' : 'bg-white text-black/40 hover:bg-zinc-100 hover:text-black'}`}
                                                >
                                                    {s < 60 ? `${s}s` : `${s / 60}m`}
                                                </button>
                                            ))}
                                        </div>
                                        <button onClick={() => setShowSettings(true)} className="w-full flex items-center justify-between p-5 border-[2px] border-black bg-white hover:bg-zinc-100 transition-all text-black group">
                                            <span className="text-[10px] font-black uppercase tracking-widest">Custom Duration</span>
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </>
                                )}

                                <div className="p-4 bg-black dark:bg-zinc-900 border-[2px] border-white/10 flex flex-col gap-1">
                                    <p className="text-white/20 text-[0.6rem] font-black uppercase tracking-[0.2em] italic">Pro Tip</p>
                                    <p className="text-[10px] font-bold text-white/40 leading-tight">Use Chess mode for turn-based games to keep things competitive!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameTimer;
