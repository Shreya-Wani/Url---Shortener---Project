// FILE: src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Navbar from '../components/Navbar';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#050505] selection:bg-indigo-500/30 text-white flex flex-col justify-center items-center px-4 relative overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-4">
            {/* Background Ambient Glows - Animated */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 30, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, -20, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-cyan-600/5 rounded-full blur-[120px]"
                />
            </div>

            <Navbar />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-sm sm:max-w-md bg-white/5 backdrop-blur-xl px-5 py-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl relative z-10"
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-center mb-4 sm:mb-8"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                        Welcome Back
                    </h2>
                    <p className="text-slate-400 mt-2 text-xs sm:text-base">Sign in to manage your links</p>
                </motion.div>

                {/* Error with shake animation */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: [0, -8, 8, -4, 4, 0] }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4 }}
                            className="p-3 mb-6 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm text-center"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-3 sm:space-y-6"
                    autoComplete="off"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Dummy inputs to prevent autofill */}
                    <input type="text" style={{ display: 'none' }} />
                    <input type="password" style={{ display: 'none' }} />

                    <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2">
                        <label className="text-xs sm:text-sm font-medium text-slate-300">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="off"
                                required
                                className="w-full bg-dark-900/50 border border-slate-700 rounded-lg sm:rounded-xl py-2 sm:py-3 pl-9 sm:pl-10 pr-4 text-xs sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                placeholder="you@example.com"
                                readOnly
                                onFocus={(e) => e.target.readOnly = false}
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2">
                        <label className="text-xs sm:text-sm font-medium text-slate-300">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-dark-900/50 border border-slate-700 rounded-lg sm:rounded-xl py-2 sm:py-3 pl-9 sm:pl-10 pr-12 text-xs sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                readOnly
                                onFocus={(e) => e.target.readOnly = false}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)' }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold py-3 sm:py-3.5 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center text-sm sm:text-base"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
                        </motion.button>
                    </motion.div>
                </motion.form>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-4 sm:mt-8 text-center text-slate-400 text-xs sm:text-base"
                >
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        Sign up
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Login;
