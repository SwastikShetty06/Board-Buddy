import React from 'react';

const NumberGrid = ({ callHistory, currentNumber }) => {
    const numbers = Array.from({ length: 90 }, (_, i) => i + 1);

    return (
        <div className="bg-white rounded-[3.5rem] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border-8 border-slate-50 relative overflow-hidden h-full flex flex-col">
            <div className="grid grid-cols-5 md:grid-cols-10 gap-1 md:gap-3 flex-grow content-start">
                {numbers.map((number) => {
                    const isCalled = callHistory.includes(number);
                    const isCurrent = currentNumber === number;

                    return (
                        <div
                            key={number}
                            className={`
                                aspect-square flex items-center justify-center rounded-2xl text-sm md:text-base font-black transition-all duration-500 relative group
                                ${isCurrent
                                    ? 'bg-purple-600 text-white scale-110 z-10 shadow-lg shadow-purple-200'
                                    : isCalled
                                        ? 'bg-purple-100 text-purple-600'
                                        : 'bg-slate-50 text-slate-300 hover:bg-slate-100/50 hover:text-slate-400'}
                            `}
                        >
                            <span className={isCurrent ? 'animate-bounce' : ''}>
                                {number}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NumberGrid;
