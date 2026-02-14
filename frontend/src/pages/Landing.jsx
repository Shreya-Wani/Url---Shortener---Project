// FILE: src/pages/Landing.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart, CheckCircle, ExternalLink, Shield, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';

const Landing = () => {
    return (
        <div className="min-h-screen bg-[#050505] selection:bg-indigo-500/30 text-white relative overflow-hidden">
            <Navbar />

            {/* Background Ambient Glows - Animated */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 50, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, -30, 0],
                        y: [0, 50, 0]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[120px]"
                />
            </div>

            {/* Main Content Container - Centered Vertically */}
            <main className="relative z-10 h-screen flex flex-col justify-center items-center px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto pt-28">

                {/* Content Wrapper to group Hero and Features together */}
                <div className="w-full max-w-5xl flex flex-col items-center gap-12 sm:gap-16">

                    {/* Hero Section */}
                    <section className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 leading-[1.1]">
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                >
                                    Shorten.
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 inline-block mx-2"
                                >
                                    Track.
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                >
                                    Scale.
                                </motion.span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed font-light"
                        >
                            Modern URL management built for creators. <br className="hidden md:block" />
                            Gain insights, control your links, and grow your audience.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0, duration: 0.8 }}
                            className="flex gap-6 justify-center"
                        >
                            <Link to="/signup">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-lg shadow-2xl shadow-indigo-500/40 transition-all flex items-center gap-2 group"
                                >
                                    Get Started Free
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </section>

                    {/* Features - Grid */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
                    >
                        {[
                            { icon: ExternalLink, title: 'Custom URLs', desc: 'Branded & Professional', delay: 1.2 },
                            { icon: CheckCircle, title: 'QR Codes', desc: 'Instant Generation', delay: 1.3 },
                            { icon: Shield, title: 'Secure Links', desc: 'Enterprise Protection', delay: 1.4 },
                            { icon: Zap, title: 'Blazing Fast', desc: 'Instant Redirection', delay: 1.5 },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: [0, -10, 0]
                                }}
                                transition={{
                                    opacity: { delay: feature.delay, duration: 0.5 },
                                    y: {
                                        delay: feature.delay,
                                        duration: 3 + i, // Different duration for each card
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    y: -15,
                                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                                    transition: { duration: 0.2 } // Fast response on hover
                                }}
                                className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/5 transition-colors group cursor-default text-center flex flex-col items-center justify-center gap-4 hover:border-white/10"
                            >
                                <div className="p-4 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 rounded-2xl w-fit group-hover:scale-110 transition-transform shadow-inner shadow-white/5">
                                    <feature.icon className="text-indigo-400 drop-shadow-lg" size={32} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm text-slate-400 font-medium">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Landing;
