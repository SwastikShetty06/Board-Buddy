import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Hand, Timer, Grid3X3, Dices, Users, Heart, Coins, Zap, Layers, ChevronRight, ArrowRight, Gamepad2 } from 'lucide-react';

const Marquee = () => {
    return (
        <div className="w-full bg-black dark:bg-white py-4 md:py-6 border-y-[4px] border-black dark:border-white overflow-hidden relative z-20 shadow-[0_8px_0px_rgba(0,0,0,1)] dark:shadow-[0_8px_0px_rgba(255,255,255,1)]">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20
                }}
            >
                {[...Array(6)].map((_, i) => (
                    <span key={i} className="text-white dark:text-black font-black text-xl md:text-3xl uppercase tracking-widest mx-6 flex items-center gap-6">
                        CHOOSE YOUR WEAPON <span className="w-3 h-3 bg-[#FFD21E] shadow-[2px_2px_0_0_rgba(255,255,255,0.5)] dark:shadow-[2px_2px_0_0_rgba(0,0,0,0.5)] inline-block" /> ROLL THE DICE <span className="w-3 h-3 bg-[#33FF77] shadow-[2px_2px_0_0_rgba(255,255,255,0.5)] dark:shadow-[2px_2px_0_0_rgba(0,0,0,0.5)] inline-block" />
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

const ToolCard = ({ tool, index }) => {
    const { to, title, description, icon: Icon, color } = tool;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.4,
                delay: (index % 4) * 0.1,
                ease: "easeOut"
            }}
            className="h-full z-10"
        >
            <Link
                to={to}
                className="group flex flex-col items-center text-center bg-white dark:bg-[#111] border-[4px] border-black dark:border-white p-6 md:p-8 h-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_rgba(255,255,255,1)] hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300"
            >
                <div
                    className={`w-20 h-20 border-[4px] border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform ${color}`}
                >
                    <Icon className="w-10 h-10 text-black stroke-[2.5]" />
                </div>

                <h3 className="text-xl md:text-2xl font-black text-black dark:text-white mb-3 tracking-tighter uppercase italic">
                    {title}
                </h3>

                <p className="text-black/70 dark:text-white/70 text-sm leading-tight mb-8 font-bold uppercase tracking-wider">
                    {description}
                </p>

                <div className="mt-auto pt-4 w-full border-t-[4px] border-black dark:border-white border-dashed flex justify-center">
                    <span
                        className="text-[12px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-black dark:text-white"
                    >
                        Launch <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
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
        },
        {
            to: "/dice",
            title: "3D Dice",
            description: "Roll the dice with a single friendly tap!",
            icon: Dices,
            color: "bg-[#FFD21E]",
        },
        {
            to: "/score",
            title: "Scorekeeper",
            description: "Keep track of winners and high scores easily.",
            icon: Trophy,
            color: "bg-[#00E1FF]",
        },
        {
            to: "/finger",
            title: "Who's First?",
            description: "Let the app decide who starts the fun.",
            icon: Hand,
            color: "bg-[#33FF77]",
        },
        {
            to: "/timer",
            title: "Game Timer",
            description: "Stay on track with our friendly game clock.",
            icon: Timer,
            color: "bg-[#FF66AA]",
        },
        {
            to: "/team",
            title: "Team Builder",
            description: "Shuffle teams fairly for everyone to play.",
            icon: Users,
            color: "bg-[#FF8800]",
        },
        {
            to: "/life",
            title: "Life Counter",
            description: "Track your health in competitive card duels.",
            icon: Heart,
            color: "bg-[#FF6B95]",
        },
        {
            to: "/coin",
            title: "Coin Flipper",
            description: "Heads or Tails? Flip the magic coin.",
            icon: Coins,
            color: "bg-[#00FFCC]",
        },
        {
            to: "/buzzer",
            title: "Quiz Buzzer",
            description: "Be the first to buzz in for game shows!",
            icon: Zap,
            color: "bg-[#FFCC00]",
        },
        {
            to: "/deck",
            title: "Card Dealer",
            description: "Draw cards from a complete virtual deck.",
            icon: Layers,
            color: "bg-[#BB88FF]",
        }
    ];

    return (
        <div className="relative min-h-screen selection:bg-[#FFD21E] selection:text-black">

            {/* Hero Section */}
            <section className="relative pt-16 md:pt-24 pb-20 md:pb-32 px-6 max-w-7xl mx-auto overflow-hidden">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Hero Content */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left z-10 flex flex-col items-center lg:items-start">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-black dark:text-white mb-4 leading-[0.8] uppercase italic"
                        >
                            LEVEL UP
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-[#FFD21E] text-black px-6 py-2 border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg] mb-8 text-3xl sm:text-4xl md:text-5xl font-black uppercase italic inline-block"
                        >
                            GAME NIGHT
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-xl sm:text-2xl md:text-3xl text-black dark:text-white font-black max-w-xl mb-12 leading-tight uppercase tracking-tighter italic"
                        >
                            The ultimate toolkit for board game champions. <br />
                            <span className="text-[#FF66AA] dark:text-[#FF66AA]">Simple. Fast. Brutal.</span>
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            onClick={() => document.getElementById('tools-grid').scrollIntoView({ behavior: 'smooth' })}
                            className="group bg-[#00E1FF] px-8 py-5 md:px-12 md:py-6 text-xl md:text-2xl flex items-center gap-4 text-black font-black uppercase tracking-widest border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all"
                        >
                            Unlock Chest <ArrowRight className="w-8 h-8 stroke-[3px] group-hover:translate-x-2 transition-transform" />
                        </motion.button>
                    </div>

                    {/* Hero Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full lg:w-1/2 relative"
                    >
                        {/* Decorative Background Block */}
                        <div className="absolute inset-0 bg-[#FF66AA] translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 -z-10 border-[4px] border-black" />

                        {/* Main Image */}
                        <div className="relative border-[4px] border-black bg-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-2">
                            <img
                                src="https://img.freepik.com/free-vector/board-game-with-dice-card-game-cartoon-vector-icon-illustration-holiday-object-icon-isolated_138676-7545.jpg"
                                alt="Board Game Illustration"
                                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                                style={{ filter: "saturate(1.2)" }}
                            />
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-24 h-24 md:w-32 md:h-32 bg-[#33FF77] border-[4px] border-black rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-20"
                        >
                            <Gamepad2 className="w-12 h-12 md:w-16 md:h-16 text-black" strokeWidth={2} />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <Marquee />

            {/* Tools Section */}
            <section className="max-w-7xl mx-auto px-6 pt-20 pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end gap-4 md:gap-6 relative"
                >
                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-black dark:text-white tracking-tighter uppercase italic leading-none">
                        THE CHEST
                    </h2>
                    <p className="text-black/60 dark:text-white/60 font-black uppercase tracking-[0.2em] text-sm md:text-xl md:mb-2 md:pb-2 border-l-[4px] md:border-l-0 md:border-b-[4px] border-black dark:border-white pl-4 md:pl-0">
                        Select an app
                    </p>
                    <div className="h-[8px] flex-grow bg-black dark:bg-white hidden md:block md:mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]" />
                </motion.div>

                {/* Grid */}
                <div id="tools-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                    {tools.map((tool, index) => (
                        <ToolCard key={tool.to} tool={tool} index={index} />
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Home;
