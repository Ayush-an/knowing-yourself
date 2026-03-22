import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Users, Calendar, ArrowLeft, Info, Search, Filter, Download, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function AdminResponses() {
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedId, setExpandedId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchResponses();
    }, []);

    const fetchResponses = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/responses');
            setResponses(res.data);
        } catch (err) {
            console.error('Error fetching responses', err);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const filteredResponses = responses.filter(r =>
        r.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.user?.mobileNumber?.includes(searchTerm)
    );

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Matrix Control
                </button>
                <div className="flex gap-3">
                    <button className="bg-white text-slate-600 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition shadow-sm border border-slate-100 flex items-center gap-2 text-sm">
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-xl shadow-indigo-50 border border-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
            >
                <div className="flex-1 relative z-10 text-center md:text-left">
                    <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">
                        User <span className="text-emerald-600">Insights</span>
                    </h1>
                    <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed opacity-80">
                        Analyze the collective discovery data. Track how users are perceiving their
                        strengths, weaknesses, and growth trajectories.
                    </p>
                </div>
                <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 shadow-inner relative z-10">
                    <Users size={48} />
                </div>
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
            </motion.div>

            <div className="bg-white rounded-4xl shadow-xl shadow-indigo-50 border border-slate-50 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="relative flex-1 max-w-md w-full">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or mobile..."
                            className="w-full pl-12 pr-6 py-3.5 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-400 font-medium text-slate-800 transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Results: {filteredResponses.length}</span>
                        <div className="w-px h-6 bg-slate-100"></div>
                        <button className="p-2.5 bg-slate-50 text-slate-400 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-transparent hover:border-indigo-100">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-20 text-center space-y-4">
                            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Fetching Discoveries...</p>
                        </div>
                    ) : (
                        <table className="w-full text-left table-fixed">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 w-1/4">User Identity</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 w-1/4">Occupation</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 w-1/4">SWOT Summary</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 w-1/6">Date</th>
                                    <th className="px-8 py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400 w-20"> Respons</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredResponses.map((r) => (
                                    <React.Fragment key={r._id}>
                                        <tr
                                            onClick={() => toggleExpand(r._id)}
                                            className={`hover:bg-slate-50/80 transition-colors cursor-pointer group ${expandedId === r._id ? 'bg-indigo-50/30' : ''}`}
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-linear-to-tr from-emerald-500 to-sky-500 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
                                                        {r.user?.name?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-800 text-base leading-none">{r.user?.name}</p>
                                                        <p className="text-[11px] font-bold text-slate-400 mt-1.5">{r.user?.mobileNumber}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
                                                    {r.user?.occupation}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex gap-2">
                                                    {[
                                                        { label: 'S', val: r.analysis?.Strengths?.length || 0, color: 'bg-emerald-500', text: 'text-emerald-700' },
                                                        { label: 'W', val: r.analysis?.Weaknesses?.length || 0, color: 'bg-rose-500', text: 'text-rose-700' },
                                                        { label: 'O', val: r.analysis?.Opportunities?.length || 0, color: 'bg-sky-500', text: 'text-sky-700' },
                                                        { label: 'T', val: r.analysis?.Threats?.length || 0, color: 'bg-amber-500', text: 'text-amber-700' },
                                                    ].map((dot, idx) => (
                                                        <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-lg border border-slate-100 shadow-xs">
                                                            <span className={`w-1.5 h-1.5 rounded-full ${dot.color}`}></span>
                                                            <span className={`text-[11px] font-black ${dot.text}`}>{dot.val}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="text-slate-600 font-bold text-sm flex items-center gap-2">
                                                    <Calendar size={14} className="text-slate-300" />
                                                    {new Date(r.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className={`p-2 rounded-lg transition-colors ${expandedId === r._id ? 'bg-indigo-600 text-white' : 'text-slate-300 group-hover:bg-slate-100 group-hover:text-slate-600'}`}>
                                                    {expandedId === r._id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                                </div>
                                            </td>
                                        </tr>
                                        <AnimatePresence>
                                            {expandedId === r._id && (
                                                <tr>
                                                    <td colSpan="4" className="px-8 py-0 bg-slate-50/50">
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="py-8 px-4 space-y-6">
                                                                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                                                                    <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs flex items-center gap-2">
                                                                        <div className="w-1.5 h-4 bg-indigo-600 rounded-full"></div>
                                                                        Detailed Discovery Response
                                                                    </h4>
                                                                    <div className="flex items-center gap-6">
                                                                        <div className="text-center">
                                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Age</p>
                                                                            <p className="text-sm font-bold text-slate-700">{r.user?.age || 'N/A'}</p>
                                                                        </div>
                                                                        <div className="text-center">
                                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Gender</p>
                                                                            <p className="text-sm font-bold text-slate-700 capitalize">{r.user?.gender || 'N/A'}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="grid gap-3">
                                                                    {r.answers.map((ans, idx) => (
                                                                        <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-6 group/item hover:border-indigo-200 transition-colors">
                                                                            <div className="flex-1">
                                                                                <div className="flex items-center gap-3 mb-1">
                                                                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${ans.questionId?.category === 'Strengths' ? 'bg-emerald-50 text-emerald-600' :
                                                                                        ans.questionId?.category === 'Weaknesses' ? 'bg-rose-50 text-rose-600' :
                                                                                            ans.questionId?.category === 'Opportunities' ? 'bg-sky-50 text-sky-600' :
                                                                                                'bg-amber-50 text-amber-600'
                                                                                        }`}>
                                                                                        {ans.questionId?.category}
                                                                                    </span>
                                                                                </div>
                                                                                <p className="text-slate-700 font-bold text-sm leading-relaxed">{ans.questionId?.question}</p>
                                                                            </div>
                                                                            <div className={`px-5 py-2 rounded-xl font-black text-xs min-w-[80px] text-center shadow-sm ${ans.answer === 'Yes'
                                                                                ? 'bg-emerald-600 text-white shadow-emerald-100'
                                                                                : 'bg-slate-100 text-slate-400'
                                                                                }`}>
                                                                                {ans.answer}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    </td>
                                                </tr>
                                            )}
                                        </AnimatePresence>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {!loading && filteredResponses.length === 0 && (
                        <div className="p-32 text-center flex flex-col items-center">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                <Info className="text-slate-200" size={48} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 mb-2">No Discoveries Found</h3>
                            <p className="text-slate-400 font-medium">Try searching with a different name or number.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminResponses;
