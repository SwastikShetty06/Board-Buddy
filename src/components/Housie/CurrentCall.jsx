import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CurrentCall = ({ currentNumber }) => {
    return (
        <div className="relative flex flex-col items-center justify-center p-8 bg-[#9D7AFF] border-[4px] border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] min-h-[350px] w-full group overflow-hidden">
            <h2 className="relative z-10 text-black font-black tracking-[0.2em] text-[10px] uppercase mb-4 bg-white px-3 py-1 border-[2px] border-black italic">
                Now Calling
            </h2>

            <AnimatePresence mode="wait">
                {currentNumber ? (
                    <motion.div
                        key={currentNumber}
                        initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 1.5, rotate: 10, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <span className="text-[10rem] md:text-[14rem] font-scoreboard font-[900] text-black tracking-tighter leading-none drop-shadow-[4px_4px_0px_rgba(255,255,255,1)]">
                            {currentNumber}
                        </span>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <span className="text-[10rem] font-black text-black">??</span>
                        <p className="text-black font-black uppercase tracking-widest text-[10px]">Waiting for draw</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decorative Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>
        </div>
    );
};

export default CurrentCall;
