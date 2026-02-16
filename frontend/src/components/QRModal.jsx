// FILE: src/components/QRModal.jsx
import { useRef } from 'react';
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
                <>
                    {/* Backdrop with fade */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal with spring entrance */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="bg-dark-800 rounded-2xl border border-slate-700 shadow-2xl w-[90%] max-w-sm overflow-hidden pointer-events-auto"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <motion.h3
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-xl font-semibold text-white"
                                    >
                                        QR Code
                                    </motion.h3>
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={onClose}
                                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </motion.button>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                                    className="flex flex-col items-center gap-6"
                                >
                                    <div ref={qrRef} className="p-4 bg-white rounded-xl shadow-lg">
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

                                    <motion.button
                                        whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(99, 102, 241, 0.3)' }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={downloadQR}
                                        className="flex items-center gap-2 w-full justify-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all"
                                    >
                                        <Download size={18} />
                                        Download PNG
                                    </motion.button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default QRModal;
