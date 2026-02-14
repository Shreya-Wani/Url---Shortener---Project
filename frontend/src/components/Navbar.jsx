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
        <nav className="fixed top-0 w-full z-50 bg-transparent">
            {/* Added container constraints for alignment */}
            <div className="w-full px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
                <Link to="/" className="flex items-center gap-2 group">
                    {/* Restored Massive Logo Size per User Request */}
                    <img src={logo} alt="Shortr Logo" className="h-28 md:h-40 w-auto object-contain drop-shadow-lg transition-transform group-hover:scale-105 -mt-4 md:-mt-6" />
                </Link>

                <div className="flex items-center gap-4">
                    {/* Add Debug Log */}
                    {console.log('Navbar Debug:', { user: !!user, pathname: location.pathname })}

                    {/* 
                        Logic Update:
                        1. Landing ('/'): ALWAYS show 'Login' & 'Get Started' (User request)
                        2. Other Pages: Show context-aware buttons (Dashboard, Sign Up, Login)
                    */}

                    {location.pathname === '/' ? (
                        <>
                            <Link
                                to="/login"
                                className="px-6 py-2.5 rounded-full text-slate-400 hover:text-white font-medium transition-colors hover:bg-white/5"
                            >
                                Login
                            </Link>
                            <Link to="/signup">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-2.5 rounded-full bg-white text-black font-bold shadow-lg hover:shadow-white/20 transition-all border border-transparent hover:border-white/50"
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
                                        className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/10"
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
                                                className="px-6 py-2.5 rounded-full bg-white text-black font-bold shadow-lg hover:shadow-white/20 transition-all border border-transparent hover:border-white/50"
                                            >
                                                Sign Up
                                            </motion.button>
                                        </Link>
                                    )}

                                    {location.pathname === '/signup' && (
                                        <Link
                                            to="/login"
                                            className="px-6 py-2.5 rounded-full text-slate-400 hover:text-white font-medium transition-colors hover:bg-white/5 border border-white/10"
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
