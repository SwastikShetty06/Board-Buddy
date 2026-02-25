import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Hand, Timer, Grid3X3, Dices, Users, Heart, Coins, Zap, Layers, Sparkles, ChevronRight, Gamepad2, ArrowRight } from 'lucide-react';

const ToolCard = ({ tool, index }) => {
    const { to, title, description, icon: Icon, color, delay } = tool;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.1
            }}
            whileHover={{ y: -8, x: -8, scale: 1.02, rotate: 2 }}
            whileTap={{ scale: 0.95, rotate: -2 }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.2}
            className="h-full z-10 cursor-grab active:cursor-grabbing"
        >
            <Link
                to={to}
                className="group relative flex flex-col items-center text-center bg-white dark:bg-black border-[4px] border-black dark:border-white p-8 h-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[16px_16px_2px_rgba(255,255,255,1)] transition-shadow duration-300"
            >
                <motion.div
                    className={`w-16 h-16 border-[4px] border-black flex items-center justify-center mb-6 ${color} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                    <Icon className="w-8 h-8 text-black" />
                </motion.div>

                <h3 className="text-xl font-black text-black dark:text-white mb-3 tracking-tighter uppercase italic">
                    {title}
                </h3>

                <p className="text-black/50 dark:text-white/40 text-xs leading-tight mb-6 font-bold uppercase tracking-wider">
                    {description}
                </p>

                <div className="mt-auto pt-4 w-full border-t-[3px] border-black/10 dark:border-white/10 flex justify-center group-hover:border-black dark:group-hover:border-white transition-colors">
                    <motion.span
                        className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-black dark:text-white"
                        whileHover={{ x: 5 }}
                    >
                        Launch <ChevronRight className="w-4 h-4" />
                    </motion.span>
                </div>
            </Link>
        </motion.div>
    );
};

const Home = () => {
    const tools = [
        {
            to: "/housie",
            title: "Housie Picker",
            description: "Friendly bingo caller for family game nights.",
            icon: Grid3X3,
            color: "bg-[#9D7AFF]",
            delay: 100
        },
        {
            to: "/dice",
            title: "3D Dice Roller",
            description: "Roll the dice with a single friendly tap!",
            icon: Dices,
            color: "bg-[#FFD21E]",
            delay: 200
        },
        {
            to: "/score",
            title: "Scorekeeper",
            description: "Keep track of winners and high scores easily.",
            icon: Trophy,
            color: "bg-[#00E1FF]",
            delay: 300
        },
        {
            to: "/finger",
            title: "Who Goes First?",
            description: "Let the app decide who starts the fun.",
            icon: Hand,
            color: "bg-[#33FF77]",
            delay: 400
        },
        {
            to: "/timer",
            title: "Game Timer",
            description: "Stay on track with our friendly game clock.",
            icon: Timer,
            color: "bg-[#FF66AA]",
            delay: 500
        },
        {
            to: "/team",
            title: "Team Builder",
            description: "Shuffle teams fairly for everyone to play.",
            icon: Users,
            color: "bg-[#FF8800]",
            delay: 600
        },
        {
            to: "/life",
            title: "Life Counter",
            description: "Track your health in competitive card duels.",
            icon: Heart,
            color: "bg-[#FF6B95]",
            delay: 700
        },
        {
            to: "/coin",
            title: "Coin Flipper",
            description: "Heads or Tails? Flip the magic coin.",
            icon: Coins,
            color: "bg-[#00FFCC]",
            delay: 800
        },
        {
            to: "/buzzer",
            title: "Quiz Buzzer",
            description: "Be the first to buzz in for game shows!",
            icon: Zap,
            color: "bg-[#FFCC00]",
            delay: 900
        },
        {
            to: "/deck",
            title: "Card Dealer",
            description: "Draw cards from a complete virtual deck.",
            icon: Layers,
            color: "bg-[#BB88FF]",
            delay: 1000
        }
    ];

    return (
        <div className="relative">
            {/* Split Hero Section */}
            <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pt-10 pb-24 overflow-hidden">
                {/* Content */}
                <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1 relative z-10">
                    <motion.h1
                        initial={{ x: -150, opacity: 0, rotate: -5 }}
                        animate={{ x: 0, opacity: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 12 }}
                        className="text-6xl md:text-9xl font-black tracking-tighter text-black dark:text-white mb-6 leading-[0.8] uppercase italic"
                    >
                        Level Up<br />
                        <motion.span
                            className="bg-[#FFD21E] dark:bg-[#FFD21E] text-black px-4 py-2 border-[6px] border-black dark:border-white inline-block mt-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] rotate-[-2deg] cursor-grab active:cursor-grabbing"
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            dragElastic={0.5}
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            whileTap={{ scale: 0.95, rotate: -5 }}
                        >
                            Game Night
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.2 }}
                        className="text-xl md:text-2xl text-black dark:text-white font-black max-w-xl mb-12 leading-none uppercase tracking-tighter italic"
                    >
                        The ultimate digital toolbox for enthusiasts. <br />
                        <span className="text-black/30 dark:text-white/20">Ready. Set. Brutal.</span>
                    </motion.p>

                    <motion.button
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.4 }}
                        whileHover={{ scale: 1.05, y: -5, boxShadow: "16px 16px 0px 0px rgba(0,0,0,1)" }}
                        whileTap={{ scale: 0.95, y: 0, boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
                        onClick={() => document.getElementById('tools-grid').scrollIntoView({ behavior: 'smooth' })}
                        className="brutal-button bg-[#FF66AA] px-12 py-6 text-2xl flex items-center gap-4 mx-auto lg:mx-0 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] border-[4px] border-black dark:border-white text-black font-black uppercase tracking-widest transition-all"
                    >
                        EXPLORE CARGO <ArrowRight className="w-8 h-8 stroke-[3px]" />
                    </motion.button>
                </div>

                {/* Illustration */}
                <motion.div
                    className="w-full lg:w-1/2 relative group order-1 lg:order-2"
                    initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
                >
                    <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 -z-10 transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6" />
                    <motion.img
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.1}
                        src="https://img.freepik.com/free-vector/board-game-with-dice-card-game-cartoon-vector-icon-illustration-holiday-object-icon-isolated_138676-7545.jpg"
                        alt="Friends playing games"
                        className="w-full h-auto border-[4px] border-black relative z-10 cursor-grab active:cursor-grabbing hover:rotate-1 transition-transform duration-300 bg-white"
                        style={{ filter: "saturate(1.2) contrast(1.1)" }}
                    />
                    <motion.div
                        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        className="absolute -top-6 -right-6 w-24 h-24 bg-[#FFD21E] border-[4px] border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 cursor-grab active:cursor-grabbing"
                    >
                        <Sparkles className="w-12 h-12 text-black" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Tools Grid Header */}
            <div className="mb-16 flex flex-col md:flex-row md:items-end gap-6 relative">
                <h2 className="text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter uppercase italic leading-none">The Chest</h2>
                <p className="text-black/40 dark:text-white/30 font-black uppercase tracking-[0.2em] text-xs mb-2 underline underline-offset-8 decoration-[3px]">Pick your weapon of choice</p>
                <div className="h-[6px] flex-grow bg-black dark:bg-white hidden md:block mb-3" />
            </div>

            {/* Tools Grid */}
            <div id="tools-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {tools.map((tool, index) => (
                    <ToolCard key={tool.to} tool={tool} index={index} />
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
