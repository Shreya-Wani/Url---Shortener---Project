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
        <div className="relative">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wider">
                            <th className="p-6 font-medium">Short Link</th>
                            <th className="p-6 font-medium">Original URL</th>
                            <th className="p-6 font-medium">Clicks</th>
                            <th className="p-6 font-medium">Date</th>
                            <th className="p-6 font-medium text-right">Actions</th>
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
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                                            <ExternalLink size={16} />
                                        </div>
                                        <div className="flex flex-col">
                                            <a
                                                href={url.shortUrl}
                                                onClick={(e) => { e.preventDefault(); window.open(url.shortUrl, '_blank', 'noopener,noreferrer'); }}
                                                className="text-white font-medium hover:text-indigo-400 transition-colors cursor-pointer"
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
                                <td className="p-6">
                                    <div className="max-w-xs truncate text-slate-400 text-sm font-mono bg-white/5 px-2 py-1 rounded border border-white/5" title={url.originalUrl}>
                                        {url.originalUrl}
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                        <BarChart size={12} />
                                        {url.clicks}
                                    </div>
                                </td>
                                <td className="p-6 text-slate-400 text-sm">
                                    {new Date(url.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </td>
                                <td className="p-6">
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

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {urls.map((url, index) => (
                    <motion.div
                        key={url.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col gap-4"
                    >
                        {/* Header: Short Link & Actions */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400 shrink-0">
                                    <ExternalLink size={16} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <a
                                        href={url.shortUrl}
                                        onClick={(e) => { e.preventDefault(); window.open(url.shortUrl, '_blank', 'noopener,noreferrer'); }}
                                        className="text-white font-medium truncate hover:text-indigo-400 transition-colors cursor-pointer"
                                    >
                                        {url.shortUrl}
                                    </a>
                                    <span className="text-xs text-slate-500">
                                        {new Date(url.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <button
                                    onClick={() => onShowQR(url.shortUrl)}
                                    className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                >
                                    <QrCode size={16} />
                                </button>
                                <button
                                    onClick={() => onDelete(url.id)}
                                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Body: Original Link */}
                        <div className="bg-black/20 p-2 rounded-lg border border-white/5">
                            <div className="truncate text-slate-400 text-xs font-mono">
                                {url.originalUrl}
                            </div>
                        </div>

                        {/* Footer: Stats & Copy */}
                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <BarChart size={12} />
                                {url.clicks} Clicks
                            </div>
                            <button
                                onClick={() => handleCopy(url.shortUrl, url.id)}
                                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                            >
                                {copiedId === url.id ? (
                                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                                        <Copy size={12} /> Copied!
                                    </span>
                                ) : (
                                    <>
                                        <Copy size={12} />
                                        <span>Copy Link</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default UrlTable;
