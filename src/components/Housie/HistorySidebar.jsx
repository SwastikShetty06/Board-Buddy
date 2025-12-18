import React from 'react';

const HistorySidebar = ({ history }) => {
    return (
        <div className="bg-white p-8 rounded-[3.5rem] border-8 border-slate-50 flex flex-col h-full shadow-[0_20px_60px_rgba(0,0,0,0.03)]">
            <h3 className="text-slate-400 font-black mb-8 text-[0.7rem] uppercase tracking-[0.2em]">
                Drawn Logs
            </h3>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 no-scrollbar">
                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full opacity-20">
                        <div className="w-16 h-16 rounded-full border-4 border-dashed border-slate-200 mb-4" />
                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">No data</p>
                    </div>
                ) : (
                    [...history].reverse().slice(0, 10).map((num, idx) => (
                        <div
                            key={`${num}-${idx}`}
                            className="flex items-center justify-between p-5 bg-slate-50 rounded-[2rem] border border-white hover:bg-slate-100 transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <span className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl text-purple-600 font-[900] text-xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                                    {num}
                                </span>
                                <div>
                                    <p className="text-slate-800 text-sm font-black tracking-tight">Drawn</p>
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight">Verified</p>
                                </div>
                            </div>
                            <span className="text-slate-200 text-xs font-black">
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
