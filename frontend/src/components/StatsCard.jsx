// FILE: src/components/StatsCard.jsx
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="relative p-6 rounded-3xl overflow-hidden group"
        >
            {/* Glass Background */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 transition-colors group-hover:bg-white/10" />

            {/* Gradient Glow */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all" />
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-all" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-indigo-400 shadow-lg shadow-indigo-500/20 backdrop-blur-sm">
                        <Icon size={24} />
                    </div>
                    {/* Trend Indicator (Hidden if not provided) */}
                    {value.trend && (
                        <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                            {value.trend}
                        </div>
                    )}
                </div>

                <div className="space-y-1">
                    <h3 className="text-slate-400 font-medium text-sm">{title}</h3>
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                        {value}
                    </h2>
                </div>
            </div>
        </motion.div>
    );
};

export default StatsCard;
