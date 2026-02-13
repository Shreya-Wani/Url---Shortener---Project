// FILE: src/pages/Pricing.jsx
import Sidebar from '../components/Sidebar';
import { CheckCircle } from 'lucide-react';

const Pricing = () => {
    return (
        <div className="flex min-h-screen bg-dark-900 text-white">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold mb-4">Upgrade your plan</h1>
                        <p className="text-slate-400 text-lg">Scale with your needs. Cancel anytime.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {['Starter', 'Pro', 'Business'].map((plan, i) => (
                            <div
                                key={plan}
                                className={`p-8 rounded-3xl border flex flex-col relative overflow-hidden ${i === 1
                                        ? 'border-indigo-500 bg-indigo-900/10 shadow-2xl shadow-indigo-500/10'
                                        : 'border-slate-700 bg-dark-800'
                                    }`}
                            >
                                {i === 1 && (
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
                                )}

                                <h3 className="text-2xl font-bold mb-2">{plan}</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-bold">
                                        {i === 0 ? '$0' : i === 1 ? '$29' : '$99'}
                                    </span>
                                    <span className="text-slate-400">/mo</span>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {[1, 2, 3, 4].map((_, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-slate-300">
                                            <CheckCircle size={18} className="text-indigo-400 flex-shrink-0" />
                                            <span>Feature {idx + 1} included</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full py-4 rounded-xl font-bold transition-all ${i === 1
                                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/25'
                                            : 'bg-white/5 hover:bg-white/10 text-white'
                                        }`}
                                >
                                    {i === 0 ? 'Current Plan' : 'Upgrade Now'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
