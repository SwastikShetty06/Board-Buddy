import React from 'react';
import { Trophy, Hand, Timer, Grid3X3, Dices, Users, Heart, Coins, Zap, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollMorphHero from '../components/ui/scroll-morph-hero';

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
        <div className="relative w-full h-[100dvh] overflow-hidden bg-[#FFFBF0] dark:bg-[#0D0B14]">
            <ScrollMorphHero items={tools} />
        </div>
    );
};

export default Home;
