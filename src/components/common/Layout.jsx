import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Dices, Trophy, Hand, Timer, Grid3X3, Users, Heart, Coins, Zap, Layers, Menu, X, Plus, Gamepad2, Bell, LayoutGrid } from 'lucide-react';

const Layout = ({ children }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-indigo-100 overflow-x-hidden relative">
            {/* Soft Background Accents */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50/50 blur-[120px] rounded-full -z-10" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-50/50 blur-[100px] rounded-full -z-10" />

            {/* Floating Top Header */}
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                <header className="bg-white/80 backdrop-blur-xl border border-slate-100 h-16 rounded-full flex items-center justify-between px-6 lg:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] w-full max-w-5xl">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 bg-gradient-to-br from-[#ff9d6c] to-[#ff6b95] rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-500">
                            <Gamepad2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-black text-xl tracking-tight text-slate-800">
                            Game Night
                        </span>
                    </Link>

                    <nav className="hidden lg:flex gap-1 py-1">
                        {navItems.slice(0, 4).map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${isActive
                                        ? 'bg-slate-50 text-indigo-600 shadow-sm'
                                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-500' : ''}`} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400">
                            <Bell className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                    </div>
                </header>
            </div>

            {/* Main Content */}
            <main className="pt-32 pb-32 px-4 max-w-7xl mx-auto min-h-screen relative z-10">
                {children}
            </main>

            {/* Playful Full-Screen Tool Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/10 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsMenuOpen(false)}>
                    <div className="w-full max-w-2xl bg-white rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-500 border border-slate-100" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Mini Tools</h2>
                                <p className="text-slate-400 font-medium">Pick a toy to play with!</p>
                            </div>
                            <button onClick={() => setIsMenuOpen(false)} className="w-12 h-12 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-full transition-colors">
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;
                                // Simple color map for playful look
                                const colors = ['bg-purple-50 text-purple-600', 'bg-yellow-50 text-yellow-600', 'bg-blue-50 text-blue-600', 'bg-green-50 text-green-600', 'bg-pink-50 text-pink-600', 'bg-orange-50 text-orange-600'];
                                const colorClass = colors[navItems.indexOf(item) % colors.length];

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex flex-col items-center justify-center p-6 rounded-[2rem] transition-all duration-500 group ${isActive
                                            ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-95'
                                            : `${colorClass} hover:scale-105 border border-transparent hover:border-white/50`
                                            }`}
                                    >
                                        <Icon className={`w-8 h-8 mb-3 transition-transform duration-500 ${isActive ? '' : 'group-hover:rotate-12 group-hover:scale-110'}`} />
                                        <span className="text-xs font-black uppercase tracking-widest text-center">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Layout;
