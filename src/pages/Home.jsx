import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Hand, Timer, Grid3X3, Dices, Users, Heart, Coins, Zap, Layers, Sparkles, ChevronRight, Gamepad2, ArrowRight } from 'lucide-react';

const ToolCard = ({ tool }) => {
    const { to, title, description, icon: Icon, color, delay, span } = tool;

    // Playful color map
    const colorMap = {
        'bg-purple-50': 'text-purple-600',
        'bg-yellow-50': 'text-yellow-600',
        'bg-blue-50': 'text-blue-600',
        'bg-green-50': 'text-green-600',
        'bg-pink-50': 'text-pink-600',
        'bg-orange-50': 'text-orange-600',
        'bg-rose-50': 'text-rose-600',
        'bg-emerald-50': 'text-emerald-600',
        'bg-amber-50': 'text-amber-600',
        'bg-indigo-50': 'text-indigo-600',
    };

    const textColor = colorMap[color] || 'text-indigo-600';

    return (
        <Link
            to={to}
            className={`group relative flex flex-col items-center text-center playful-card p-10 hover:-translate-y-2 ${span || ''} ${color}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6 bg-white shadow-sm border border-white/50 group-hover:scale-110 transition-transform duration-500`}>
                <Icon className={`w-10 h-10 ${textColor}`} />
            </div>

            <h3 className="text-2xl font-[900] text-slate-800 mb-3 tracking-tight">
                {title}
            </h3>

            <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                {description}
            </p>

            <Icon className="absolute bottom-4 right-4 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 -rotate-12" />
        </Link>
    );
};

const Home = () => {
    const tools = [
        {
            to: "/housie",
            title: "Housie Picker",
            description: "Friendly bingo caller for family game nights.",
            icon: Grid3X3,
            color: "bg-purple-50",
            delay: 100
        },
        {
            to: "/dice",
            title: "3D Dice Roller",
            description: "Roll the dice with a single friendly tap!",
            icon: Dices,
            color: "bg-yellow-50",
            delay: 200
        },
        {
            to: "/score",
            title: "Scorekeeper",
            description: "Keep track of winners and high scores easily.",
            icon: Trophy,
            color: "bg-blue-50",
            delay: 300
        },
        {
            to: "/finger",
            title: "Who Goes First?",
            description: "Let the app decide who starts the fun.",
            icon: Hand,
            color: "bg-green-50",
            delay: 400
        },
        {
            to: "/timer",
            title: "Game Timer",
            description: "Stay on track with our friendly game clock.",
            icon: Timer,
            color: "bg-pink-50",
            delay: 500
        },
        {
            to: "/team",
            title: "Team Builder",
            description: "Shuffle teams fairly for everyone to play.",
            icon: Users,
            color: "bg-orange-50",
            delay: 600
        },
        {
            to: "/life",
            title: "Life Counter",
            description: "Track your health in competitive card duels.",
            icon: Heart,
            color: "bg-rose-50",
            delay: 700
        },
        {
            to: "/coin",
            title: "Coin Flipper",
            description: "Heads or Tails? Flip the magic coin.",
            icon: Coins,
            color: "bg-emerald-50",
            delay: 800
        },
        {
            to: "/buzzer",
            title: "Quiz Buzzer",
            description: "Be the first to buzz in for game shows!",
            icon: Zap,
            color: "bg-amber-50",
            delay: 900
        },
        {
            to: "/deck",
            title: "Card Dealer",
            description: "Draw cards from a complete virtual deck.",
            icon: Layers,
            color: "bg-indigo-50",
            delay: 1000
        }
    ];

    return (
        <div className="relative">
            {/* Split Hero Section */}
            <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pt-10 pb-24">
                {/* Illustration */}
                <div className="w-full lg:w-1/2 relative group">
                    <div className="absolute inset-0 bg-indigo-50 rounded-[3rem] -rotate-3 scale-105 opacity-50 -z-10 group-hover:rotate-0 transition-transform duration-700" />
                    <img
                        src="https://thumbs.dreamstime.com/b/friends-playing-board-game-vector-illustration-157695303.jpg"
                        alt="Friends playing games"
                        className="w-full h-auto rounded-[3rem] shadow-2xl relative z-10"
                    />
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg z-20 animate-bounce">
                        <Sparkles className="w-10 h-10 text-yellow-400" />
                    </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-6xl md:text-8xl font-[900] tracking-tight text-slate-800 mb-6 leading-[0.9]">
                        Level Up Your<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9d6c] to-[#ff6b95]">
                            Game Night
                        </span>
                    </h1>

                    <p className="text-xl text-slate-500 max-w-xl mb-10 font-medium leading-relaxed uppercase tracking-widest text-[0.8rem]">
                        The ultimate digital toolbox for board game enthusiasts. Simple, beautiful, and completely free.
                    </p>

                    <button
                        onClick={() => document.getElementById('tools-grid').scrollIntoView({ behavior: 'smooth' })}
                        className="btn-sunset px-10 py-5 text-sm uppercase tracking-widest flex items-center gap-3 mx-auto lg:mx-0"
                    >
                        Explore Tools <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

            {/* Tools Grid Header */}
            <div className="mb-12 flex items-center gap-4">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Game Chest</h2>
                <div className="h-px flex-grow bg-slate-100" />
            </div>

            {/* Tools Grid */}
            <div id="tools-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {tools.map((tool) => (
                    <ToolCard key={tool.to} tool={tool} />
                ))}
            </div>

            {/* Floating Decorative Elements */}
            <div className="fixed top-40 right-[-5%] -z-10 opacity-10 animate-float">
                <Dices className="w-64 h-64 text-indigo-200 -rotate-12" />
            </div>
            <div className="fixed bottom-20 left-[-5%] -z-10 opacity-10 animate-float delay-1000">
                <Trophy className="w-48 h-48 text-yellow-200 rotate-12" />
            </div>
        </div>
    );
};

export default Home;
