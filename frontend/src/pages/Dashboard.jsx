// FILE: src/pages/Dashboard.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link as LinkIcon, BarChart3, MousePointer2, LogOut } from 'lucide-react';
import logo from '../assets/logo.png';
import toast from 'react-hot-toast';
import api from '../api/axios';
import StatsCard from '../components/StatsCard';
import UrlTable from '../components/UrlTable';
import Pagination from '../components/Pagination';
import QRModal from '../components/QRModal';

const Dashboard = () => {
    const { logout } = useAuth();
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [stats, setStats] = useState({ totalUrls: 0, totalClicks: 0 });

    // Create Modal State
    const [newUrl, setNewUrl] = useState('');
    const [customCode, setCustomCode] = useState('');
    const [createLoading, setCreateLoading] = useState(false);
    const [showQR, setShowQR] = useState('');

    const fetchUrls = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/urls?page=${page}&limit=5`);
            const data = res.data.data;
            const urlList = data?.urls || [];
            setUrls(urlList);
            setTotalPages(data?.totalPages || 1);

            // Calculate stats dynamically
            const totalLinks = data?.totalUrls || 0;
            const totalClicks = urlList.reduce((sum, url) => sum + (url.clicks || 0), 0);
            const avgCTR = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : 0; // Avg Clicks per Link

            setStats({ totalUrls: totalLinks, totalClicks, avgCTR });

            setLoading(false);
        } catch (err) {
            console.error('Error fetching URLs:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUrls();
    }, [page]);

    const handleShorten = async (e) => {
        e.preventDefault();

        // 1. Frontend Validation
        let urlToShorten = newUrl.trim();
        const code = customCode.trim();

        if (!urlToShorten) {
            toast.error('Please enter a URL');
            return;
        }

        // Auto-prepend https:// if missing
        if (!/^https?:\/\//i.test(urlToShorten)) {
            urlToShorten = 'https://' + urlToShorten;
        }

        try {
            new URL(urlToShorten); // Validate URL format
        } catch (_) {
            toast.error('Invalid URL format (must include http:// or https://)');
            return;
        }

        if (code && (code.length < 3 || !/^[a-zA-Z0-9-]+$/.test(code))) {
            toast.error('Alias must be at least 3 characters (letters, numbers, hyphens)');
            return;
        }

        setCreateLoading(true);
        const toastId = toast.loading('Creating your link...');

        try {
            // 2. Exact Payload Calculation
            const payload = {
                originalUrl: urlToShorten,
                customCode: code || undefined // Send undefined if empty to avoid schema validation error
            };

            await api.post('/urls/shorten', payload);

            // 3. Success Handling
            setNewUrl('');
            setCustomCode('');
            toast.success('Link created successfully!', { id: toastId });

            await fetchUrls(); // Refresh list and stats
        } catch (err) {
            console.error(err);
            // 4. Error Handling
            const msg = err.response?.data?.message || 'Failed to create URL';

            if (err.response?.status === 409) {
                toast.error('Custom alias already taken', { id: toastId });
            } else {
                toast.error(msg, { id: toastId });
            }
        } finally {
            setCreateLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this URL?')) {
            try {
                await api.delete(`/urls/${id}`);
                fetchUrls();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (

        <div className="min-h-screen bg-[#050505] selection:bg-indigo-500/30 text-white relative overflow-hidden">
            {/* Background Ambient Glows */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-cyan-600/5 rounded-full blur-[120px]" />
            </div>

            {/* Fixed Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
                <div className="w-full px-2 pt-0 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src={logo} alt="Shortr Logo" className="h-28 md:h-40 w-auto object-contain drop-shadow-lg transition-transform group-hover:scale-105 -mt-4 md:-mt-6" />
                    </Link>

                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-full transition-all"
                    >
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>
                </div>
            </nav>

            <main className="container mx-auto px-4 pt-32 pb-12 relative z-10 max-w-6xl">

                {/* Hero / Create Section */}
                <div className="mb-20 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 tracking-tight leading-tight">
                        Shorten Your Links,<br /> Expand Your Reach.
                    </h1>
                    <p className="text-slate-400 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
                        Transform long, ugly URLs into sleek, trackable short links in seconds.
                        Track clicks and manage your audience with ease.
                    </p>

                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white/5 backdrop-blur-2xl p-2 rounded-[2rem] border border-white/10 shadow-2xl shadow-indigo-500/10">
                            <form onSubmit={handleShorten} className="flex flex-col md:flex-row gap-2">
                                <div className="flex-1 relative group">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                        <LinkIcon className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                    </div>
                                    <input
                                        type="url"
                                        placeholder="Paste a long URL to shorten..."
                                        value={newUrl}
                                        onChange={(e) => setNewUrl(e.target.value)}
                                        required
                                        className="w-full h-14 bg-transparent border-none pl-12 pr-4 text-lg text-white placeholder-slate-500 focus:outline-none focus:ring-0"
                                    />
                                </div>

                                <div className="md:w-48 relative border-t md:border-t-0 md:border-l border-white/10">
                                    <input
                                        type="text"
                                        placeholder="Alias (Optional)"
                                        value={customCode}
                                        onChange={(e) => setCustomCode(e.target.value)}
                                        className="w-full h-14 bg-transparent border-none px-6 text-lg text-white placeholder-slate-500 focus:outline-none focus:ring-0 text-center md:text-left"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={createLoading}
                                    className="h-14 px-8 rounded-[1.5rem] bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-lg shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 whitespace-nowrap"
                                >
                                    {createLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Shorten'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatsCard title="Total Links Created" value={stats.totalUrls} icon={LinkIcon} />
                    <StatsCard title="Total Clicks Recorded" value={stats.totalClicks} icon={MousePointer2} />
                    <StatsCard title="Avg. Clicks / Link" value={stats.avgCTR || 0} icon={BarChart3} />
                </div>

                {/* URL Table Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
                        <button onClick={fetchUrls} className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                            Refresh List
                        </button>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">

                        {loading ? (
                            <div className="p-12 text-center text-slate-400">Loading links...</div>
                        ) : (
                            <UrlTable urls={urls} onDelete={handleDelete} onShowQR={setShowQR} />
                        )}

                        <div className="p-6 border-t border-slate-700/50">
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={(p) => setPage(p)}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <QRModal isOpen={!!showQR} onClose={() => setShowQR('')} url={showQR} />
        </div>
    );
};

export default Dashboard;
