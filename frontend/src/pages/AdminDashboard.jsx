import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Trash2, PlusCircle, LayoutDashboard, Database, Users, Calendar, ShieldCheck, ArrowRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function AdminDashboard() {
  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [category, setCategory] = useState('Strengths');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [res1, res2] = await Promise.all([
        api.get('/admin/responses'),
        api.get('/user/questions')
      ]);
      setResponses(res1.data);
      setQuestions(res2.data);
    } catch (err) {
      console.error('Error fetching admin data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/questions', { question: newQuestion, category });
      setNewQuestion('');
      fetchData();
    } catch (err) {
      alert('Failed to add question');
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await api.delete(`/admin/questions/${id}`);
        fetchData();
      } catch (err) {
        alert('Failed to delete question');
      }
    }
  };

  return (
    <div className="space-y-16 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-indigo-600 p-12 rounded-[3.5rem] text-white shadow-3xl shadow-indigo-100 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden"
      >
        <div className="flex-1 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                <ShieldCheck size={14} /> System Access
            </div>
            <h1 className="text-5xl font-black mb-4 tracking-tight leading-none">
              Admin <span className="text-indigo-200">Terminal</span>
            </h1>
            <p className="text-indigo-100 text-xl font-medium max-w-2xl leading-relaxed opacity-90">
              Manage the discovery engine and monitor user insights. Your control center for platform growth and optimization.
            </p>
        </div>
        <div className="w-32 h-32 bg-white/10 rounded-[2.5rem] flex items-center justify-center text-white shadow-inner relative z-10">
            <LayoutDashboard size={64} />
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left Column: Management */}
        <div className="lg:col-span-4 space-y-12">
            {/* Add Question Section */}
            <section className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-50 border border-slate-50">
                <h2 className="text-2xl font-black mb-8 text-slate-800 flex items-center gap-3">
                    <PlusCircle className="text-indigo-600" /> New Question
                </h2>
                <form onSubmit={handleAddQuestion} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Question Content</label>
                        <textarea
                            className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl focus:outline-none focus:border-indigo-400 focus:bg-white transition-all text-slate-800 font-medium resize-none h-32"
                            placeholder="What do you want to ask?"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                        <select
                            className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-3xl focus:outline-none focus:border-indigo-400 focus:bg-white transition-all text-slate-800 font-bold appearance-none cursor-pointer"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Strengths">Strengths</option>
                            <option value="Weaknesses">Weaknesses</option>
                            <option value="Opportunities">Opportunities</option>
                            <option value="Threats">Threats</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition flex items-center justify-center gap-2 active:scale-95">
                        Post to Test <ArrowRight size={20} />
                    </button>
                </form>
            </section>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-indigo-50 p-6 rounded-4xl border border-indigo-100 flex flex-col items-center text-center">
                    <Database className="text-indigo-600 mb-2" />
                    <span className="text-2xl font-black text-slate-800">{questions.length}</span>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Questions</span>
                </div>
                <div className="bg-emerald-50 p-6 rounded-4xl border border-emerald-100 flex flex-col items-center text-center">
                    <Users className="text-emerald-600 mb-2" />
                    <span className="text-2xl font-black text-slate-800">{responses.length}</span>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Responses</span>
                </div>
            </div>
        </div>

        {/* Right Column: Tables */}
        <div className="lg:col-span-8 space-y-12">
            {/* Current Questions */}
            <section className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-50 border border-slate-50 overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex justify-between items-center">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Active Matrix</h2>
                    <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">Question Bank</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Question Content</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                                <th className="px-10 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400 shrink-0">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {questions.map((q) => (
                                <tr key={q._id} className="group hover:bg-slate-50 transition-colors">
                                    <td className="px-10 py-6 font-bold text-slate-700 leading-relaxed min-w-[300px]">{q.question}</td>
                                    <td className="px-6 py-6 font-bold">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            q.category === 'Strengths' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                            q.category === 'Weaknesses' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                            q.category === 'Opportunities' ? 'bg-sky-50 text-sky-600 border border-sky-100' :
                                            'bg-amber-50 text-amber-600 border border-amber-100'
                                        }`}>
                                            {q.category}
                                        </span>
                                    </td>
                                    <td className="px-10 py-6 text-right">
                                        <button 
                                            onClick={() => handleDeleteQuestion(q._id)} 
                                            className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
