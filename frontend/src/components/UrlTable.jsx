// FILE: src/components/UrlTable.jsx
import { ExternalLink, Trash2, Copy, BarChart, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const UrlTable = ({ urls, onDelete, onShowQR }) => {
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = (shortUrl, id) => {
        navigator.clipboard.writeText(shortUrl);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-700/50 text-slate-400 text-sm uppercase tracking-wider">
                        <th className="p-4 font-medium">Short Link</th>
                        <th className="p-4 font-medium">Original URL</th>
                        <th className="p-4 font-medium">Clicks</th>
                        <th className="p-4 font-medium">Date</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                    {urls.map((url, index) => (
                        <motion.tr
                            key={url._id || url.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group hover:bg-white/5 transition-colors"
                        >
                            <td className="p-4">
                                <div className="flex items-center gap-2">
                                    <a
                                        href={url.shortUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
                                    >
                                        {url.shortUrl}
                                    </a>
                                    <button
                                        onClick={() => handleCopy(url.shortUrl, url._id)}
                                        className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                                        title="Copy Link"
                                    >
                                        {copiedId === url._id ? (
                                            <span className="text-green-400 text-xs font-bold">Copied!</span>
                                        ) : (
                                            <Copy size={14} />
                                        )}
                                    </button>
                                </div>
                            </td>
                            <td className="p-4 max-w-xs truncate text-slate-400" title={url.originalUrl}>
                                {url.originalUrl}
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                        {url.clicks}
                                    </span>
                                </div>
                            </td>
                            <td className="p-4 text-slate-400 text-sm">
                                {new Date(url.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4">
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => onShowQR(url.shortUrl)}
                                        className="p-2 rounded-lg hover:bg-indigo-500/10 text-slate-400 hover:text-indigo-400 transition-colors"
                                        title="Show QR Code"
                                    >
                                        <QrCode size={18} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(url._id)}
                                        className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                                        title="Delete URL"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UrlTable;
