import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NumberGrid = ({ callHistory, currentNumber }) => {
    const numbers = Array.from({ length: 90 }, (_, i) => i + 1);

    return (
        <div className="bg-white dark:bg-black border-[4px] border-black dark:border-white p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden h-full">
            <motion.div
                className="grid grid-cols-5 md:grid-cols-10 gap-2 flex-grow content-start"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.01 }
                    }
                }}
            >
                {numbers.map((number, index) => {
                    const isCalled = callHistory.includes(number);
                    const isCurrent = currentNumber === number;

                    return (
                        <motion.div
                            key={number}
                            variants={{
                                hidden: { opacity: 0, scale: 0.5 },
                                visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
                            }}
                            whileHover={{ scale: 1.1, zIndex: 20, boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
                            className={`
                                aspect-square flex items-center justify-center border-[2px] border-black transition-colors duration-300 relative overflow-hidden
                                ${isCurrent
                                    ? 'bg-[#FFD21E] text-black scale-110 z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                    : isCalled
                                        ? 'bg-[#33FF77] text-black'
                                        : 'bg-white dark:bg-zinc-900 text-black/20 dark:text-white/10'}
                            `}
                        >
                            <span className={`font-scoreboard font-black text-sm md:text-base ${isCurrent ? 'scale-110' : ''}`}>
                                {number}
                            </span>

                            {/* Stamp Overlay for called numbers */}
                            <AnimatePresence>
                                {isCalled && !isCurrent && (
                                    <motion.div
                                        initial={{ scale: 3, opacity: 0, rotate: -45 }}
                                        animate={{ scale: 1, opacity: 0.2, rotate: -15 }}
                                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                    >
                                        <div className="w-8 h-8 rounded-full border-[2px] border-black flex items-center justify-center font-black text-[10px]">OK</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default NumberGrid;
