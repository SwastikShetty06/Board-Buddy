import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Dices, Trophy, Hand, Timer, Grid3X3, Users, Heart, Coins, Zap, Layers, Menu, X, Plus, Gamepad2, Bell, LayoutGrid, Sun, Moon } from 'lucide-react';

const Layout = ({ children }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/housie', icon: Grid3X3, label: 'Housie' },
        { path: '/dice', icon: Dices, label: 'Dice' },
        { path: '/score', icon: Trophy, label: 'Score' },
        { path: '/finger', icon: Hand, label: 'Chooser' },
        { path: '/timer', icon: Timer, label: 'Timer' },
        { path: '/team', icon: Users, label: 'Team' },
        { path: '/life', icon: Heart, label: 'Life' },
        { path: '/coin', icon: Coins, label: 'Coin' },
        { path: '/buzzer', icon: Zap, label: 'Buzzer' },
        { path: '/deck', icon: Layers, label: 'Deck' },
    ];

    return (
        <div className="min-h-screen bg-[#FFFBF0] dark:bg-[#0D0B14] text-black dark:text-white font-sans selection:bg-yellow-200 overflow-x-hidden relative transition-colors duration-300">
            {/* Top Header */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
                <header className="bg-white dark:bg-black border-[3px] border-black dark:border-white h-16 rounded-none flex items-center justify-between px-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] w-full max-w-5xl">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-[#FFD21E] border-[2px] border-black flex items-center justify-center transition-transform group-hover:rotate-12">
                            <Gamepad2 className="w-6 h-6 text-black" />
                        </div>
                        <span className="font-black text-2xl tracking-tighter uppercase italic">
                            Board Buddy
                        </span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="w-10 h-10 flex items-center justify-center border-[2px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="h-10 px-4 flex items-center gap-2 bg-[#FF66AA] border-[2px] border-black text-black font-black uppercase text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                        >
                            <LayoutGrid className="w-5 h-5" />
                            <span className="hidden sm:inline">Tools</span>
                        </button>
                    </div>
                </header>
            </div>

            {/* Main Content */}
            <main className="pt-32 pb-32 px-4 max-w-7xl mx-auto min-h-screen relative z-10">
                {children}
            </main>

            {/* Full-Screen Tool Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-2xl bg-[#FFFBF0] dark:bg-[#0D0B14] border-[4px] border-black dark:border-white p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_2px_rgba(255,255,255,1)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h2 className="text-5xl font-black text-black dark:text-white tracking-tighter uppercase italic leading-none">Game Chest</h2>
                                    <p className="text-black/60 dark:text-white/60 font-bold uppercase tracking-widest text-sm mt-2">Pick your weapon of choice</p>
                                </div>
                                <button onClick={() => setIsMenuOpen(false)} className="w-14 h-14 flex items-center justify-center border-[3px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                                    <X className="w-8 h-8" />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = location.pathname === item.path;
                                    const colors = ['bg-[#9D7AFF]', 'bg-[#FFD21E]', 'bg-[#00E1FF]', 'bg-[#33FF77]', 'bg-[#FF66AA]', 'bg-[#FF8800]'];
                                    const colorClass = colors[navItems.indexOf(item) % colors.length];

                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`flex flex-col items-center justify-center p-6 border-[3px] border-black dark:border-white transition-all group ${isActive
                                                ? 'bg-black text-white dark:bg-white dark:text-black translate-x-1 translate-y-1 shadow-none'
                                                : `${colorClass} text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]`
                                                }`}
                                        >
                                            <Icon className={`w-8 h-8 mb-3 transition-transform duration-500 group-hover:scale-110`} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-center">{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Layout;
