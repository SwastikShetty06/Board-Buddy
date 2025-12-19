import React from 'react';

const HistorySidebar = ({ history }) => {
    return (
        <div className="bg-white dark:bg-black border-[4px] border-black dark:border-white p-8 flex flex-col h-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            <h3 className="text-black dark:text-white font-black mb-6 text-xs uppercase tracking-[0.2em] italic underline underline-offset-4">
                Drawn Logs
            </h3>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 no-scrollbar">
                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full opacity-20 dark:invert">
                        <div className="w-16 h-16 border-4 border-dashed border-black mb-4 flex items-center justify-center font-black">?</div>
                        <p className="text-black text-[10px] font-black uppercase tracking-widest">No data</p>
                    </div>
                ) : (
                    [...history].reverse().slice(0, 10).map((num, idx) => (
                        <div
                            key={`${num}-${idx}`}
                            className="flex items-center justify-between p-4 border-[2px] border-black dark:border-white bg-[#FFFBF0] dark:bg-zinc-900 group"
                        >
                            <div className="flex items-center gap-4">
                                <span className="w-12 h-12 flex items-center justify-center border-[2px] border-black bg-[#9D7AFF] text-black font-scoreboard font-black text-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-transform">
                                    {num}
                                </span>
                                <div>
                                    <p className="text-black dark:text-white text-xs font-black uppercase italic tracking-tighter">Drawn</p>
                                    <p className="text-black/40 dark:text-white/40 text-[8px] font-black uppercase tracking-widest">Verified</p>
                                </div>
                            </div>
                            <span className="text-black/20 dark:text-white/20 font-scoreboard font-black text-xs italic">
                                #{history.length - idx}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HistorySidebar;
