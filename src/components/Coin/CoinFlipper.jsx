import React, { useState } from 'react';
import { Coins } from 'lucide-react';

const CoinFlipper = () => {
    const [isFlipping, setIsFlipping] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState(null); // 'Heads' or 'Tails'

    const flipCoin = () => {
        if (isFlipping) return;

        setIsFlipping(true);
        setResult(null);

        // Determine outcome
        const outcome = Math.random() < 0.5 ? 'Heads' : 'Tails';

        // Calculate rotation
        // Base rotation ensures we spin enough times (e.g. 5 full rotations = 1800deg)
        // Add extra 180deg if we need to land on Tails (assuming 0deg is Heads)
        const baseRotation = 1800 + (Math.floor(Math.random() * 3) * 360); // Randomize spin count slightly
        const targetRotation = outcome === 'Heads'
            ? rotation + baseRotation
            : rotation + baseRotation + 180;

        // Ensure we land on a multiple of 180 that matches the outcome
        // If current rotation % 360 is 0 (Heads) and we want Heads -> add 360s
        // If current rotation % 360 is 0 (Heads) and we want Tails -> add 360s + 180

        // Simplified: Just add a huge amount to the current rotation state
        // To land on Heads: Final rotation % 360 must be 0
        // To land on Tails: Final rotation % 360 must be 180

        let nextRotation = rotation + 1800 + (Math.random() * 720);
        // Normalize to nearest 180
        nextRotation = Math.ceil(nextRotation / 180) * 180;

        // Adjust for outcome
        const isCurrentlyHeads = (nextRotation % 360) === 0;
        if (outcome === 'Heads' && !isCurrentlyHeads) {
            nextRotation += 180;
        } else if (outcome === 'Tails' && isCurrentlyHeads) {
            nextRotation += 180;
        }

        setRotation(nextRotation);

        setTimeout(() => {
            setResult(outcome);
            setIsFlipping(false);
        }, 2000); // Matches CSS transition duration
    };

    return (
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-12 min-h-[60vh] justify-center perspective-[1000px]">

            {/* Coin Container */}
            <div className="relative w-64 h-64 preserve-3d transition-transform duration-[2000ms] ease-out"
                style={{ transform: `rotateY(${rotation}deg)` }}>

                {/* Front (Heads) */}
                <div className="absolute inset-0 backface-hidden rounded-full border-8 border-yellow-500 bg-yellow-400 shadow-xl flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full border-4 border-yellow-600/20 flex items-center justify-center">
                        <span className="text-5xl font-black text-yellow-700 uppercase tracking-widest drop-shadow-sm">Heads</span>
                    </div>
                </div>

                {/* Back (Tails) */}
                <div className="absolute inset-0 backface-hidden rounded-full border-8 border-slate-300 bg-slate-200 shadow-xl flex items-center justify-center"
                    style={{ transform: 'rotateY(180deg)' }}>
                    <div className="w-48 h-48 rounded-full border-4 border-slate-400/20 flex items-center justify-center">
                        <span className="text-5xl font-black text-slate-600 uppercase tracking-widest drop-shadow-sm">Tails</span>
                    </div>
                </div>
            </div>

            <div className="text-center space-y-8 relative z-10">
                <div className="h-16 flex items-center justify-center">
                    {result && !isFlipping && (
                        <h2 className="text-6xl font-black text-white animate-in zoom-in slide-in-from-bottom-4 duration-500 uppercase tracking-wider drop-shadow-lg">
                            {result}!
                        </h2>
                    )}
                </div>

                <button
                    onClick={flipCoin}
                    disabled={isFlipping}
                    className="px-12 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-2xl rounded-full shadow-lg shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
                >
                    <Coins className={`w-8 h-8 ${isFlipping ? 'animate-spin' : ''}`} />
                    {isFlipping ? 'Flipping...' : 'Flip Coin'}
                </button>
            </div>

            {/* Shadow for depth */}
            <div className="w-32 h-8 bg-black/20 blur-xl rounded-full absolute top-[60%] -z-10 transition-all duration-1000"
                style={{
                    opacity: isFlipping ? 0.2 : 0.5,
                    transform: isFlipping ? 'scale(0.5)' : 'scale(1)'
                }}
            />
        </div>
    );
};

export default CoinFlipper;
