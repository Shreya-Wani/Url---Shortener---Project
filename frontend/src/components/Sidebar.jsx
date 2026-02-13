// FILE: src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, BarChart2, CreditCard, LogOut, Link2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const { logout } = useAuth();
    const location = useLocation();

    const links = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Analytics', path: '/analytics', icon: BarChart2 },
        { name: 'Pricing', path: '/pricing', icon: CreditCard },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-dark-900 border-r border-white/5 flex flex-col z-40">
            <div className="p-6">
                <Link to="/" className="flex items-center gap-2 mb-8">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                        <Link2 className="text-indigo-400" size={24} />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                        Shortr
                    </span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;

                    return (
                        <Link key={link.path} to={link.path}>
                            <div
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group ${isActive
                                        ? 'text-white bg-indigo-600 shadow-lg shadow-indigo-500/20'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Icon size={20} className={isActive ? 'text-white' : 'group-hover:text-indigo-400 transition-colors'} />
                                <span className="font-medium">{link.name}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white"
                                    />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all group"
                >
                    <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
