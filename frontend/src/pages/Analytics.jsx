// FILE: src/pages/Analytics.jsx
import Sidebar from '../components/Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';

const data = [
    { name: 'Mon', clicks: 400 },
    { name: 'Tue', clicks: 300 },
    { name: 'Wed', clicks: 600 },
    { name: 'Thu', clicks: 800 },
    { name: 'Fri', clicks: 500 },
    { name: 'Sat', clicks: 900 },
    { name: 'Sun', clicks: 750 },
];

const Analytics = () => {
    return (
        <div className="flex min-h-screen bg-dark-900 text-white">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
                <h1 className="text-3xl font-bold mb-8">Analytics Overview</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Growth Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-dark-800 p-6 rounded-2xl border border-slate-700/50 shadow-xl"
                    >
                        <h2 className="text-xl font-bold mb-6">Click Growth</h2>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="name" stroke="#94a3b8" />
                                    <YAxis stroke="#94a3b8" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="clicks"
                                        stroke="#6366f1"
                                        strokeWidth={3}
                                        dot={{ fill: '#6366f1', strokeWidth: 2 }}
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Device Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-dark-800 p-6 rounded-2xl border border-slate-700/50 shadow-xl"
                    >
                        <h2 className="text-xl font-bold mb-6">Clicks by Device</h2>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="name" stroke="#94a3b8" />
                                    <YAxis stroke="#94a3b8" />
                                    <Tooltip
                                        cursor={{ fill: '#334155', opacity: 0.2 }}
                                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                    />
                                    <Bar dataKey="clicks" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
