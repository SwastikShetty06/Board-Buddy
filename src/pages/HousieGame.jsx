import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
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
        <div className="max-w-6xl mx-auto px-4 overflow-hidden">
            {/* Header / Toolbar */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                    <h1 className="text-5xl md:text-7xl font-black text-black dark:text-white tracking-tighter uppercase italic leading-none mb-4">Housie Picker</h1>
                    <p className="text-black/50 dark:text-white/40 font-bold uppercase tracking-widest text-xs">Automatic caller for your physical bingo cards.</p>
                </motion.div>

                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
                    className="flex flex-wrap items-center gap-3"
                >
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: -10 }}
                        whileTap={{ scale: 0.9, rotate: 10 }}
                        onClick={() => setIsMuted(!isMuted)}
                        className={`w-14 h-14 border-[3px] border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors flex justify-center items-center ${isMuted ? 'bg-[#FF66AA] text-black' : 'bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'}`}
                    >
                        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1, rotate: -90, backgroundColor: "#FF8800" }}
                        whileTap={{ scale: 0.9, rotate: 90 }}
                        onClick={resetGame}
                        className="w-14 h-14 bg-white dark:bg-black border-[3px] border-black dark:border-white text-black dark:text-white transition-colors flex justify-center items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95, y: 0 }}
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className={`flex justify-center items-center px-6 h-14 border-[3px] border-black dark:border-white font-black uppercase text-xs transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] ${isAutoPlaying ? 'bg-[#FF66AA] text-black' : 'bg-[#33FF77] text-black'}`}
                    >
                        {isAutoPlaying ? "Stop Auto" : "Start Auto"}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95, y: 0 }}
                        onClick={callNextNumber}
                        disabled={isAutoPlaying || callHistory.length >= 90}
                        className="brutal-button bg-[#FFD21E] px-8 h-14 text-sm disabled:opacity-50 flex justify-center items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                        Draw Next <ChevronRight className="w-5 h-5 flex-shrink-0" />
                    </motion.button>
                </motion.div>
            </div>

            {/* Game Board */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left: Current Call Information */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
                    className="lg:col-span-4 flex flex-col gap-8"
                >
                    <CurrentCall currentNumber={currentNumber} />

                    <div className="bg-white dark:bg-black border-[4px] border-black dark:border-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                        <h3 className="text-black dark:text-white font-black mb-6 text-xs uppercase tracking-[0.2em] italic underline underline-offset-4">Game Stats</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="p-4 bg-white dark:bg-black border-[2px] border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                            >
                                <p className="text-black/40 dark:text-white/40 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Drawn</p>
                                <p className="text-4xl font-scoreboard font-black text-black dark:text-white">{callHistory.length}<span className="text-black/20 dark:text-white/20 text-sm">/90</span></p>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="p-4 bg-white dark:bg-black border-[2px] border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                            >
                                <p className="text-black/40 dark:text-white/40 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Left</p>
                                <p className="text-4xl font-scoreboard font-black text-black dark:text-white">{90 - callHistory.length}</p>
                            </motion.div>
                        </div>

                        <div className="mt-8 space-y-4">
                            {/* Speed Selection */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center gap-4 p-2 border-[2px] border-black dark:border-white bg-[#00E1FF] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <Settings className="w-5 h-5 text-black ml-2" />
                                <select
                                    className="w-full bg-transparent text-sm font-black text-black focus:outline-none appearance-none cursor-pointer"
                                    onChange={(e) => setAutoPlaySpeed(Number(e.target.value))}
                                    value={autoPlaySpeed}
                                >
                                    <option value={3000}>3S SPEEDY</option>
                                    <option value={5000}>5S NORMAL</option>
                                    <option value={10000}>10S CHILL</option>
                                </select>
                            </motion.div>

                            {/* Voice Selection */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center gap-4 p-2 border-[2px] border-black dark:border-white bg-[#9D7AFF] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <Volume2 className="w-5 h-5 text-black ml-2" />
                                <select
                                    className="w-full bg-transparent text-sm font-black text-black focus:outline-none appearance-none cursor-pointer truncate"
                                    onChange={handleVoiceChange}
                                    value={selectedVoice?.name || ''}
                                >
                                    {voices.length === 0 ? (
                                        <option value="">NO VOICES</option>
                                    ) : (
                                        voices.map(voice => (
                                            <option key={voice.name} value={voice.name}>
                                                {voice.name.replace('Google ', '').split(' (')[0].toUpperCase()}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Center: Main Number Grid */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
                    className="lg:col-span-5"
                >
                    <NumberGrid callHistory={callHistory} currentNumber={currentNumber} />
                </motion.div>

                {/* Right: History Sidebar */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}
                    className="lg:col-span-3"
                >
                    <HistorySidebar history={callHistory} />
                </motion.div>
            </div>
        </div>
    );
};

export default HousieGame;
