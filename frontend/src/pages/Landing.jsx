// FILE: src/pages/Landing.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Shield, BarChart, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';

const Landing = () => {
    return (
        <div className="min-h-screen bg-dark-900 overflow-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float delay-1000" />
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-bold tracking-tight mb-8"
                    >
                        Shorten. <span className="text-gradient">Track.</span> Scale.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12"
                    >
                        Modern URL management built for creators and teams. Gain insights,
                        control your links, and grow your audience.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link to="/signup">
                            <button className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 group">
                                Get Started Free
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <Link to="/login">
                            <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-lg transition-all">
                                Login
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-dark-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: ExternalLink, title: 'Custom URLs', desc: 'Branded links that look professional.' },
                            { icon: BarChart, title: 'Deep Analytics', desc: 'Track clicks, locations, and devices.' },
                            { icon: CheckCircle, title: 'QR Codes', desc: 'Generate QR codes instantly.' },
                            { icon: Shield, title: 'Secure Links', desc: 'Enterprise-grade link protection.' },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-2xl bg-dark-900 border border-white/5 hover:border-indigo-500/30 transition-colors group"
                            >
                                <div className="p-3 bg-indigo-500/10 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon className="text-indigo-400" size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-slate-400">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Teaser */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-12">Simple Pricing</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {['Free', 'Pro', 'Enterprise'].map((plan, i) => (
                            <div key={plan} className={`p-8 rounded-2xl border ${i === 1 ? 'border-indigo-500 bg-indigo-500/5 relative' : 'border-white/10 bg-dark-800'} flex flex-col`}>
                                {i === 1 && <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-white text-sm font-bold rounded-full">Popular</span>}
                                <h3 className="text-2xl font-bold mb-2">{plan}</h3>
                                <div className="text-3xl font-bold mb-6">{i === 0 ? '$0' : i === 1 ? '$29' : 'Custom'}</div>
                                <ul className="space-y-4 mb-8 flex-1 text-left text-slate-400">
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-indigo-400" /> All basics</li>
                                    {i > 0 && <li className="flex items-center gap-2"><CheckCircle size={16} className="text-indigo-400" /> Advanced Analytics</li>}
                                    {i > 1 && <li className="flex items-center gap-2"><CheckCircle size={16} className="text-indigo-400" /> SSO & Teams</li>}
                                </ul>
                                <button className={`w-full py-3 rounded-lg font-bold transition-all ${i === 1 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-white/10 hover:bg-white/20'}`}>
                                    Choose {plan}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
