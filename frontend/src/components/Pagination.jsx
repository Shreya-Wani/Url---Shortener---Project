// FILE: src/components/Pagination.jsx
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-8"
        >
            <motion.button
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-dark-800 border border-slate-700 text-slate-400 hover:text-white hover:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <ChevronLeft size={20} />
            </motion.button>

            <motion.span
                key={currentPage}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-slate-400 text-sm"
            >
                Page <span className="text-white font-medium">{currentPage}</span> of <span className="text-white font-medium">{totalPages}</span>
            </motion.span>

            <motion.button
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-dark-800 border border-slate-700 text-slate-400 hover:text-white hover:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <ChevronRight size={20} />
            </motion.button>
        </motion.div>
    );
};

export default Pagination;
