// FILE: src/components/Pagination.jsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-4 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-dark-800 border border-slate-700 text-slate-400 hover:text-white hover:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <ChevronLeft size={20} />
            </button>

            <span className="text-slate-400 text-sm">
                Page <span className="text-white font-medium">{currentPage}</span> of <span className="text-white font-medium">{totalPages}</span>
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-dark-800 border border-slate-700 text-slate-400 hover:text-white hover:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Pagination;
