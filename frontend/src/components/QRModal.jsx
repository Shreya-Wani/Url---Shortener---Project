// FILE: src/components/QRModal.jsx
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';
import { X, Download } from 'lucide-react';

const QRModal = ({ isOpen, onClose, url }) => {
    const qrRef = useRef(null);

    const downloadQR = () => {
        const canvas = qrRef.current.querySelector('canvas');
        const image = canvas.toDataURL("image/png");
        const anchor = document.createElement("a");
        anchor.href = image;
        anchor.download = `qr-code.png`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-dark-800 rounded-2xl border border-slate-700 shadow-2xl w-full max-w-sm overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold text-white">QR Code</h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex flex-col items-center gap-6">
                                <div ref={qrRef} className="p-4 bg-white rounded-xl">
                                    <QRCodeCanvas
                                        value={url}
                                        size={200}
                                        level={"H"}
                                        includeMargin={true}
                                    />
                                </div>

                                <p className="text-sm text-slate-400 text-center break-all">
                                    {url}
                                </p>

                                <button
                                    onClick={downloadQR}
                                    className="flex items-center gap-2 w-full justify-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all active:scale-95"
                                >
                                    <Download size={18} />
                                    Download PNG
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default QRModal;
