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
                    <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wider">
                        <th className="p-4 md:p-6 font-medium">Short Link</th>
                        <th className="p-4 md:p-6 font-medium">Original URL</th>
                        <th className="p-4 md:p-6 font-medium">Clicks</th>
                        <th className="p-4 md:p-6 font-medium">Date</th>
                        <th className="p-4 md:p-6 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {urls.map((url, index) => (
                        <motion.tr
                            key={url.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group hover:bg-white/5 transition-colors"
                        >
                            <td className="p-4 md:p-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                                        <ExternalLink size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <a
                                            href={url.shortUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white font-medium hover:text-indigo-400 transition-colors"
                                        >
                                            {url.shortUrl}
                                        </a>
                                        <button
                                            onClick={() => handleCopy(url.shortUrl, url.id)}
                                            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 mt-0.5 transition-colors text-left"
                                        >
                                            {copiedId === url.id ? (
                                                <span className="text-emerald-400 font-medium flex items-center gap-1">
                                                    Copied!
                                                </span>
                                            ) : (
                                                <>
                                                    <Copy size={12} />
                                                    <span>Copy Link</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 md:p-6">
                                <div className="max-w-xs truncate text-slate-400 text-sm font-mono bg-white/5 px-2 py-1 rounded border border-white/5" title={url.originalUrl}>
                                    {url.originalUrl}
                                </div>
                            </td>
                            <td className="p-4 md:p-6">
                                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    <BarChart size={12} />
                                    {url.clicks}
                                </div>
                            </td>
                            <td className="p-4 md:p-6 text-slate-400 text-sm">
                                {new Date(url.createdAt).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </td>
                            <td className="p-4 md:p-6">
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => onShowQR(url.shortUrl)}
                                        className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-all border border-indigo-500/20 hover:border-indigo-500/50"
                                        title="Show QR Code"
                                    >
                                        <QrCode size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(url.id)}
                                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all border border-red-500/20 hover:border-red-500/50"
                                        title="Delete URL"
                                    >
                                        <Trash2 size={16} />
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
