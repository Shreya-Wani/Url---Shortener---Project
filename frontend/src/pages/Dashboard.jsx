// FILE: src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import UrlTable from '../components/UrlTable';
import Pagination from '../components/Pagination';
import QRModal from '../components/QRModal';
import { Plus, Link as LinkIcon, BarChart3, MousePointer2 } from 'lucide-react';

const Dashboard = () => {
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
            const avgCTR = totalLinks > 0 ? ((totalClicks / totalLinks) * 100).toFixed(1) : 0; // Simulated CTR (Clicks / Links)

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
        <div className="flex min-h-screen bg-dark-900">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-slate-400">Manage your links and visualize performance.</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatsCard title="Total Links" value={stats.totalUrls} icon={LinkIcon} />
                    <StatsCard title="Total Clicks" value={stats.totalClicks} icon={MousePointer2} />
                    <StatsCard title="Avg. CTR" value={`${stats.avgCTR || 0}%`} icon={BarChart3} />
                </div>

                {/* Create URL Section */}
                <div className="mb-12 bg-dark-800 p-6 rounded-2xl border border-slate-700/50">
                    <h2 className="text-xl font-bold mb-4">Create New Link</h2>
                    <form onSubmit={handleShorten} className="flex flex-col md:flex-row gap-4">
                        <input
                            type="url"
                            placeholder="Paste long URL here..."
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}
                            required
                            className="flex-1 bg-dark-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                        <input
                            type="text"
                            placeholder="Custom alias (optional)"
                            value={customCode}
                            onChange={(e) => setCustomCode(e.target.value)}
                            className="md:w-48 bg-dark-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={createLoading}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-indigo-500/25 disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {createLoading ? 'Creating...' : <><Plus size={20} /> Shorten</>}
                        </button>
                    </form>
                </div>

                {/* URL Table */}
                <div className="bg-dark-800 rounded-2xl border border-slate-700/50 overflow-hidden">
                    <div className="p-6 border-b border-slate-700/50">
                        <h2 className="text-xl font-bold">Recent Links</h2>
                    </div>

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
            </main>

            <QRModal isOpen={!!showQR} onClose={() => setShowQR('')} url={showQR} />
        </div>
    );
};

export default Dashboard;
