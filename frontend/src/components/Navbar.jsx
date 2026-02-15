// FILE: src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const isDashboard = location.pathname.includes('/dashboard');

    if (isDashboard) return null;

    return (
        <nav className="absolute top-0 w-full z-50 bg-transparent py-4">
            {/* Added container constraints for alignment */}
            <div className="w-full px-4 sm:px-6 items-center max-w-7xl mx-auto flex justify-between">
                <Link to="/" className="flex items-center gap-2 group z-50 shrink-0">
                    {/* Restored larger logo size as requested */}
                    <img src={logo} alt="Shortr Logo" className="h-24 md:h-32 w-auto object-contain drop-shadow-lg transition-transform group-hover:scale-105" />
                </Link>

                {/* Desktop & Mobile Navigation - Always Visible */}
                <div className="flex items-center gap-2 sm:gap-4 shrink-0">

                    {/* 
                        Logic Update:
                        1. Landing ('/'): ALWAYS show 'Login' & 'Get Started' (User request)
                        2. Other Pages: Show context-aware buttons (Dashboard, Sign Up, Login)
                    */}

                    {location.pathname === '/' ? (
                        <>
                            <Link
                                to="/login"
                                className="px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base text-slate-400 hover:text-white font-medium transition-colors hover:bg-white/5"
                            >
                                Login
                            </Link>
                            <Link to="/signup">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white text-black text-sm sm:text-base font-bold shadow-lg hover:shadow-white/20 transition-all border border-transparent hover:border-white/50 whitespace-nowrap"
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        </>
                    ) : (
                        // Not on Landing Page
                        <>
                            {/* Show Dashboard button if logged in (and not on landing, login, or signup) */}
                            {user && location.pathname !== '/login' && location.pathname !== '/signup' && (
                                <Link to="/dashboard">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm sm:text-base font-medium transition-colors border border-white/10 whitespace-nowrap"
                                    >
                                        Dashboard
                                    </motion.button>
                                </Link>
                            )}

                            {/* Show Auth Buttons if NOT logged in */}
                            {!user && (
                                <>
                                    {location.pathname === '/login' && (
                                        <Link to="/signup">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white text-black text-sm sm:text-base font-bold shadow-lg hover:shadow-white/20 transition-all border border-transparent hover:border-white/50 whitespace-nowrap"
                                            >
                                                Sign Up
                                            </motion.button>
                                        </Link>
                                    )}

                                    {location.pathname === '/signup' && (
                                        <Link
                                            to="/login"
                                            className="px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base text-slate-400 hover:text-white font-medium transition-colors hover:bg-white/5 border border-white/10 whitespace-nowrap"
                                        >
                                            Login
                                        </Link>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
