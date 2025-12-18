import React, { useState, useEffect, useCallback, useRef } from 'react';
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
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-5xl mx-auto px-4 md:px-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div>
                    <h1 className="text-5xl md:text-6xl font-[900] text-slate-800 tracking-tight mb-4">Game Timer</h1>
                    <div className="flex bg-slate-100 p-1.5 rounded-[2rem] inline-flex">
                        {[
                            { id: 'countdown', icon: TimerIcon, label: 'Classic' },
                            { id: 'hourglass', icon: HourglassIcon, label: 'Hourglass' },
                            { id: 'chess', icon: Swords, label: 'Chess' },
                            { id: 'random', icon: Dices, label: 'Party' }
                        ].map(m => (
                            <button
                                key={m.id}
                                onClick={() => { setMode(m.id); resetTimer(); }}
                                className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest transition-all ${mode === m.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
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
                        className={`w-14 h-14 flex items-center justify-center rounded-[1.5rem] transition-all ${isMuted ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-300 hover:bg-slate-100'}`}
                    >
                        {isMuted ? <BellOff className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
                    </button>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className={`w-14 h-14 flex items-center justify-center rounded-[1.5rem] transition-all ${showSettings ? 'bg-indigo-50 text-indigo-500' : 'bg-slate-50 text-slate-300 hover:bg-slate-100'}`}
                    >
                        <Settings className="w-6 h-6" />
                    </button>
                    <button
                        onClick={resetTimer}
                        className="w-14 h-14 flex items-center justify-center bg-slate-50 text-slate-300 hover:bg-slate-100 rounded-[1.5rem] transition-all"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                {/* Timer Display */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-[4rem] p-12 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border-8 border-slate-50 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">

                        {/* Countdown / Random Mode */}
                        {(mode === 'countdown' || mode === 'random') && (
                            <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle cx="50%" cy="50%" r="45%" className="fill-none stroke-slate-50" strokeWidth="12" />
                                    <circle
                                        cx="50%" cy="50%" r="45%"
                                        className={`fill-none transition-all duration-1000 ease-linear ${mode === 'random' ? 'stroke-amber-400' : 'stroke-pink-500'}`}
                                        strokeWidth="12"
                                        strokeDasharray="283%"
                                        strokeDashoffset={`${283 - (283 * progress) / 100}%`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="text-center relative z-10">
                                    {mode === 'random' && isRandomHidden && isActive ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-[5rem] md:text-[6rem] font-[900] text-amber-500">?</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Mystery Time</span>
                                        </div>
                                    ) : (
                                        <span className={`text-[6rem] md:text-[8rem] font-[900] tracking-tighter leading-none ${seconds < 10 ? 'text-rose-500 animate-pulse' : 'text-slate-800'}`}>
                                            {formatTime(seconds)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Hourglass Mode */}
                        {mode === 'hourglass' && (
                            <div className="flex flex-col items-center gap-8">
                                <div className="relative w-48 h-72 md:w-64 md:h-96">
                                    <svg viewBox="0 0 100 150" className="w-full h-full">
                                        {/* Frame */}
                                        <path d="M10,10 L90,10 L90,20 Q50,75 90,130 L90,140 L10,140 L10,130 Q50,75 10,20 Z" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                                        {/* Sand Top */}
                                        <path d={`M15,20 L85,20 Q50,75 15,20`} fill="#fde68a" style={{ transform: `scaleY(${progress / 100})`, transformOrigin: 'bottom' }} />
                                        {/* Sand Bottom */}
                                        <path d={`M15,130 L85,130 Q50,75 15,130`} fill="#fde68a" style={{ transform: `scaleY(${(100 - progress) / 100})`, transformOrigin: 'top' }} />
                                        {/* Falling Sand */}
                                        {isActive && seconds > 0 && <line x1="50" y1="50" x2="50" y2="100" stroke="#fde68a" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />}
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-4xl font-[900] text-slate-800 bg-white/80 px-4 py-2 rounded-2xl shadow-sm">{formatTime(seconds)}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Chess Mode */}
                        {mode === 'chess' && (
                            <div className="w-full h-full flex flex-col md:flex-row gap-4 items-stretch">
                                <button
                                    onClick={() => setActivePlayer('B')}
                                    disabled={activePlayer === 'B' || chessA === 0}
                                    className={`flex-1 rounded-[3rem] p-8 flex flex-col items-center justify-center transition-all ${activePlayer === 'A' ? 'bg-indigo-600 text-white shadow-2xl scale-105 z-10' : 'bg-slate-50 text-slate-400'}`}
                                >
                                    <span className="text-[10px] font-black uppercase tracking-widest mb-4">Player One</span>
                                    <span className="text-6xl md:text-8xl font-[900]">{formatTime(chessA)}</span>
                                </button>
                                <button
                                    onClick={() => setActivePlayer('A')}
                                    disabled={activePlayer === 'A' || chessB === 0}
                                    className={`flex-1 rounded-[3rem] p-8 flex flex-col items-center justify-center transition-all ${activePlayer === 'B' ? 'bg-rose-500 text-white shadow-2xl scale-105 z-10' : 'bg-slate-50 text-slate-400'}`}
                                >
                                    <span className="text-[10px] font-black uppercase tracking-widest mb-4">Player Two</span>
                                    <span className="text-6xl md:text-8xl font-[900]">{formatTime(chessB)}</span>
                                </button>
                            </div>
                        )}

                        {/* Main Interaction Button */}
                        {mode !== 'chess' && (
                            <div className="mt-12">
                                <button
                                    onClick={mode === 'random' && !isActive ? startRandom : toggleTimer}
                                    className={`px-12 py-6 rounded-[2.5rem] font-black text-lg uppercase tracking-[0.2em] flex items-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-xl ${isActive ? 'bg-slate-50 text-slate-400' : 'btn-sunset text-white'}`}
                                >
                                    {isActive ? <><Pause className="w-6 h-6 fill-current" /> Stop</> : <><Play className="w-6 h-6 fill-current" /> {mode === 'random' ? 'Roll & Start' : 'Start Timer'}</>}
                                </button>
                            </div>
                        )}

                        {mode === 'chess' && !activePlayer && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                                <p className="text-slate-400 font-black uppercase tracking-[0.2em] mb-8">Tap a clock to start</p>
                                <div className="flex gap-4">
                                    <button onClick={() => setActivePlayer('A')} className="btn-sunset px-10 py-5">Start Player 1</button>
                                    <button onClick={() => setActivePlayer('B')} className="bg-slate-800 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs">Start Player 2</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Settings / Controls Area */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    {/* Mode Specific Settings */}
                    <div className="bg-white p-10 rounded-[3.5rem] border-8 border-slate-50 shadow-[0_20px_60px_rgba(0,0,0,0.03)] flex-1">
                        <h3 className="text-slate-400 font-black mb-8 text-[0.7rem] uppercase tracking-[0.2em]">Settings</h3>

                        {showSettings ? (
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Duration</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="relative">
                                            <input
                                                type="number"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                value={customMins}
                                                onChange={(e) => setCustomMins(e.target.value)}
                                                className="w-full bg-slate-50 p-6 pt-10 rounded-[2rem] font-black text-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                                            />
                                            <span className="absolute top-4 left-6 text-[8px] font-black text-slate-300 uppercase letter-widest">Minutes</span>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                value={customSecs}
                                                onChange={(e) => setCustomSecs(e.target.value)}
                                                className="w-full bg-slate-50 p-6 pt-10 rounded-[2rem] font-black text-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                                            />
                                            <span className="absolute top-4 left-6 text-[8px] font-black text-slate-300 uppercase letter-widest">Seconds</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={handleApplySettings} className="w-full btn-sunset py-6 text-sm">Apply Changes</button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {mode === 'random' ? (
                                    <>
                                        <div className="p-6 bg-amber-50 rounded-[2rem] border border-white">
                                            <p className="text-amber-400 text-[0.6rem] font-black uppercase tracking-widest mb-4">Random Range</p>
                                            <div className="flex items-center gap-4">
                                                <input type="number" inputMode="numeric" pattern="[0-9]*" value={randomRange.min} onChange={(e) => setRandomRange({ ...randomRange, min: e.target.value })} className="w-16 bg-white p-3 rounded-xl font-black text-sm text-center" />
                                                <span className="text-amber-200">to</span>
                                                <input type="number" inputMode="numeric" pattern="[0-9]*" value={randomRange.max} onChange={(e) => setRandomRange({ ...randomRange, max: e.target.value })} className="w-16 bg-white p-3 rounded-xl font-black text-sm text-center" />
                                                <span className="text-slate-400 text-[10px] font-bold">Secs</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsRandomHidden(!isRandomHidden)}
                                            className={`w-full p-6 rounded-[2rem] font-black text-[10px] uppercase tracking-widest border border-slate-100 transition-all ${isRandomHidden ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'}`}
                                        >
                                            {isRandomHidden ? 'Unmask Mystery' : 'Mask Mystery'}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[30, 60, 120, 300].map(s => (
                                                <button
                                                    key={s}
                                                    onClick={() => { setInitialSeconds(s); setSeconds(s); setChessA(s); setChessB(s); }}
                                                    className={`p-5 rounded-2xl text-[10px] font-black transition-all ${initialSeconds === s ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400 border border-white hover:bg-slate-100'}`}
                                                >
                                                    {s < 60 ? `${s}s` : `${s / 60}m`}
                                                </button>
                                            ))}
                                        </div>
                                        <button onClick={() => setShowSettings(true)} className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 rounded-[2rem] transition-all text-slate-400">
                                            <span className="text-[10px] font-black uppercase tracking-widest">Custom Duration</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </>
                                )}

                                <div className="p-6 bg-slate-50 rounded-[2rem] border border-white opacity-50 cursor-not-allowed">
                                    <p className="text-slate-400 text-[0.6rem] font-black uppercase tracking-widest mb-1">Coming Soon</p>
                                    <p className="text-xs font-black text-slate-300">Daily Class Timer Integration</p>
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
