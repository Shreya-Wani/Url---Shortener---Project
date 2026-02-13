// FILE: src/components/StatsCard.jsx
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon }) => {
    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(99, 102, 241, 0.3)' }}
            className="bg-dark-800 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon size={64} />
            </div>

            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                    <Icon size={24} />
                </div>
                <h3 className="text-slate-400 font-medium">{title}</h3>
            </div>

            <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-bold text-white tracking-tight">
                    {value}
                </h2>
            </div>
        </motion.div>
    );
};

export default StatsCard;
