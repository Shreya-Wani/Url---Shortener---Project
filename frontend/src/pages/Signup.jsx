// FILE: src/pages/Signup.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Loader2, Mail, Lock, User } from 'lucide-react';
import Navbar from '../components/Navbar';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await signup(formData);

        if (result.success) {
            navigate('/login');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-dark-900 flex flex-col justify-center items-center px-4 relative overflow-hidden py-20">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl animate-float delay-1000" />
            </div>

            <Navbar />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-dark-800/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                        Create Account
                    </h2>
                    <p className="text-slate-400 mt-2">Start shortening links for free</p>
                </div>

                {error && (
                    <div className="p-3 mb-6 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                    {/* Dummy inputs to prevent autofill */}
                    <input type="text" style={{ display: 'none' }} />
                    <input type="password" style={{ display: 'none' }} />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">First Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-dark-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                    placeholder="John"
                                    autoComplete="off"
                                    readOnly
                                    onFocus={(e) => e.target.readOnly = false}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Last Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-dark-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                    placeholder="Doe"
                                    autoComplete="off"
                                    readOnly
                                    onFocus={(e) => e.target.readOnly = false}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                className="w-full bg-dark-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                placeholder="you@example.com"
                                readOnly
                                onFocus={(e) => e.target.readOnly = false}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-dark-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                readOnly
                                onFocus={(e) => e.target.readOnly = false}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center mt-4"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Create Account'}
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
