import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Volume2, VolumeX, RotateCcw, Play, Pause, ChevronRight, Settings } from 'lucide-react';
import CurrentCall from '../components/Housie/CurrentCall';
import NumberGrid from '../components/Housie/NumberGrid';
import HistorySidebar from '../components/Housie/HistorySidebar';

const HousieGame = () => {
    const [callHistory, setCallHistory] = useState([]);
    const [currentNumber, setCurrentNumber] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const [autoPlaySpeed, setAutoPlaySpeed] = useState(5000); // 5 seconds default
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);

    const autoPlayRef = useRef(null);

    // Initialize speech synthesis voices
    useEffect(() => {
        const loadVoices = () => {
            const allVoices = window.speechSynthesis.getVoices();
            // Filter for English voices only
            const englishVoices = allVoices.filter(v => v.lang.startsWith('en-'));
            setVoices(englishVoices);

            // Try to load saved voice or find a nice English default
            const savedVoiceName = localStorage.getItem('housie_voice');
            const savedVoice = englishVoices.find(v => v.name === savedVoiceName);

            if (savedVoice) {
                setSelectedVoice(savedVoice);
            } else {
                const preferredVoice = englishVoices.find(v => v.name.includes('Google')) || englishVoices[0];
                setSelectedVoice(preferredVoice);
            }
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const handleVoiceChange = (e) => {
        const voiceName = e.target.value;
        const voice = voices.find(v => v.name === voiceName);
        if (voice) {
            setSelectedVoice(voice);
            localStorage.setItem('housie_voice', voiceName);

            // Preview the voice
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance("Voice updated");
            utterance.voice = voice;
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    const speakNumber = useCallback((number) => {
        if (isMuted || !number) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(number.toString());
        if (selectedVoice) utterance.voice = selectedVoice;
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }, [isMuted, selectedVoice]);

    const callNextNumber = useCallback(() => {
        if (callHistory.length >= 90) {
            setIsAutoPlaying(false);
            return;
        }

        let newNumber;
        do {
            newNumber = Math.floor(Math.random() * 90) + 1;
        } while (callHistory.includes(newNumber));

        setCurrentNumber(newNumber);
        setCallHistory(prev => [...prev, newNumber]);
        speakNumber(newNumber);
    }, [callHistory, speakNumber]);

    const resetGame = () => {
        if (window.confirm('Reset this session? All history will be cleared.')) {
            setCallHistory([]);
            setCurrentNumber(null);
            setIsAutoPlaying(false);
        }
    };

    // Auto-play logic
    useEffect(() => {
        if (isAutoPlaying) {
            autoPlayRef.current = setInterval(callNextNumber, autoPlaySpeed);
        } else {
            clearInterval(autoPlayRef.current);
        }
        return () => clearInterval(autoPlayRef.current);
    }, [isAutoPlaying, callNextNumber, autoPlaySpeed]);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header / Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-5xl font-[900] text-slate-800 tracking-tight mb-2">Housie Picker</h1>
                    <p className="text-slate-400 font-medium">Automatic number caller for your physical bingo cards.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={`w-14 h-14 flex items-center justify-center rounded-[1.5rem] transition-all duration-300 ${isMuted ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                        title={isMuted ? 'Unmute voice' : 'Mute voice'}
                    >
                        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>

                    <button
                        onClick={resetGame}
                        className="w-14 h-14 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-slate-100 rounded-[1.5rem] transition-all duration-300"
                        title="Reset game"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </button>

                    <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className={`px-8 h-14 flex items-center gap-3 rounded-[1.5rem] font-black uppercase tracking-widest text-xs transition-all duration-500 ${isAutoPlaying ? 'bg-rose-50 text-rose-600' : 'bg-green-50 text-green-600 hover:scale-105'}`}
                    >
                        {isAutoPlaying ? <><Pause className="w-5 h-5" /> Stop Auto</> : <><Play className="w-5 h-5" /> Start Auto</>}
                    </button>

                    <button
                        onClick={callNextNumber}
                        disabled={isAutoPlaying || callHistory.length >= 90}
                        className="btn-sunset px-10 h-14 flex items-center gap-3 text-sm disabled:opacity-50 disabled:scale-100"
                    >
                        Draw Next <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Game Board */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left: Current Call Information */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    <CurrentCall currentNumber={currentNumber} />

                    <div className="bg-white p-8 rounded-[3.5rem] border-8 border-slate-50 shadow-[0_20px_60px_rgba(0,0,0,0.03)] flex-1">
                        <h3 className="text-slate-400 font-black mb-6 text-[0.7rem] uppercase tracking-[0.2em]">Game Stats</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-slate-50 rounded-[2rem] border border-white">
                                <p className="text-slate-400 text-[0.6rem] font-black uppercase tracking-widest mb-1">Drawn</p>
                                <p className="text-3xl font-black text-slate-800">{callHistory.length}<span className="text-slate-300 text-sm">/90</span></p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-[2rem] border border-white">
                                <p className="text-slate-400 text-[0.6rem] font-black uppercase tracking-widest mb-1">Left</p>
                                <p className="text-3xl font-black text-slate-800">{90 - callHistory.length}</p>
                            </div>
                        </div>

                        <div className="mt-8 space-y-3">
                            {/* Speed Selection */}
                            <div className="flex items-center gap-4 p-4 bg-indigo-50/50 rounded-full">
                                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-black">
                                    <Settings className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <select
                                        className="w-full bg-transparent text-xs font-black text-indigo-600 focus:outline-none appearance-none"
                                        onChange={(e) => setAutoPlaySpeed(Number(e.target.value))}
                                        value={autoPlaySpeed}
                                    >
                                        <option value={3000}>3s Fast Draw</option>
                                        <option value={5000}>5s Normal Draw</option>
                                        <option value={10000}>10s Relaxed Draw</option>
                                    </select>
                                </div>
                            </div>

                            {/* Voice Selection */}
                            <div className="flex items-center gap-4 p-4 bg-purple-50/50 rounded-full">
                                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-black">
                                    <Volume2 className="w-5 h-5" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <select
                                        className="w-full bg-transparent text-xs font-black text-purple-600 focus:outline-none appearance-none truncate"
                                        onChange={handleVoiceChange}
                                        value={selectedVoice?.name || ''}
                                    >
                                        {voices.length === 0 ? (
                                            <option value="">No English Voices</option>
                                        ) : (
                                            voices.map(voice => (
                                                <option key={voice.name} value={voice.name}>
                                                    {voice.name.replace('Google ', '').split(' (')[0]}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center: Main Number Grid */}
                <div className="lg:col-span-5">
                    <NumberGrid callHistory={callHistory} currentNumber={currentNumber} />
                </div>

                {/* Right: History Sidebar */}
                <div className="lg:col-span-3">
                    <HistorySidebar history={callHistory} />
                </div>
            </div>
        </div>
    );
};

export default HousieGame;
