// FILE: src/components/StatsCard.jsx
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="relative p-3 sm:p-6 rounded-2xl sm:rounded-3xl overflow-hidden group"
        >
            {/* Glass Background */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 transition-colors group-hover:bg-white/10" />

            {/* Gradient Glow */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all" />
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-all" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
                {/* Mobile: Icon on top */}
                <div className="md:order-2 mb-2 sm:mb-4 md:mb-0">
                    <div className="p-2 sm:p-3 md:p-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 text-indigo-400 shadow-lg shadow-indigo-500/20 backdrop-blur-sm inline-flex group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                    </div>
                </div>

                {/* Text content */}
                <div className="md:order-1 space-y-1">
                    <h3 className="text-slate-400 font-medium text-xs sm:text-sm">{title}</h3>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                        {value}
                    </h2>
                </div>
            </div>
        </motion.div>
    );
};

export default StatsCard;
