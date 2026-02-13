// FILE: src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const isDashboard = location.pathname.includes('/dashboard');

    if (isDashboard) return null;

    return (
        <nav className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-lg border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
                            <Link2 className="text-indigo-400" size={24} />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                            Shortr
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <Link to="/dashboard">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all"
                                >
                                    Dashboard
                                </motion.button>
                            </Link>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className="px-5 py-2 rounded-xl text-slate-300 hover:text-white font-medium transition-colors">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-5 py-2 rounded-xl bg-white text-dark-900 font-bold shadow-lg hover:shadow-white/20 transition-all"
                                    >
                                        Get Started
                                    </motion.button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
