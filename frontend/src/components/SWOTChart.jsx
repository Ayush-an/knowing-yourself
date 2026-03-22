import { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ShieldCheck, AlertCircle, TrendingUp, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

function SWOTChart() {
  const [swot, setSwot] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      api.get('/user/swot')
        .then(res => {
          setSwot(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching SWOT', err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Analyzing Your Profile...</p>
    </div>
  );

  if (!user) {
    return (
      <div className="grid md:grid-cols-2 gap-8 ">
        {[
          { title: "Strengths", icon: <ShieldCheck />, color: "yellow", desc: "Skills and qualities you excel at." },
          { title: "Weaknesses", icon: <AlertCircle />, color: "yellow", desc: "Areas that need your attention." },
          { title: "Opportunities", icon: <TrendingUp />, color: "yellow", desc: "Growth paths waiting for you." },
          { title: "Threats", icon: <Zap />, color: "yellow", desc: "External factors to watch out for." }
        ].map((item, i) => (
          <div key={i} className={`bg-${item.color}-50/50 border border-${item.color}-100 p-8 rounded-4xl group hover:bg-white transition-all duration-500`}>
            <div className={`w-14 h-14 bg-whit rounded-2xl flex items-center justify-center text-${item.color}-600 shadow-xl shadow-${item.color}-100 mb-6 group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <h2 className="font-black text-2xl mb-2 text-slate-800">{item.title}</h2>
            <p className="text-slate-500 font-medium">{item.desc}</p>
          </div>
        ))}
        <div className="md:col-span-2 text-center py-16 bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[3rem] shadow-3xl shadow-indigo-100 mt-8">
          <Sparkles className="text-indigo-600 mx-auto mb-6" size={48} />
          <h3 className="text-3xl font-black text-slate-800 mb-4">Ready to see yours?</h3>
          <p className="text-slate-500 max-w-md mx-auto mb-10 font-medium">Log in to take the personality test and generate your own deep-dive SWOT analysis.</p>
          <a href="/login" className="btn-primary inline-flex">Join the Platform</a>
        </div>
      </div>
    );
  }

  if (!swot) {
    return (
      <div className="text-center py-24 bg-white/50 backdrop-blur-lg rounded-[3.5rem] shadow-3xl shadow-indigo-100 border border-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <TrendingUp className="text-indigo-600 mx-auto mb-8 opacity-20" size={80} />
          <h3 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">Your analysis is waiting...</h3>
          <p className="text-slate-500 mb-12 max-w-md mx-auto font-medium text-lg leading-relaxed">
            Complete the personality test and our system will instantly map out your unique strengths and growth areas.
          </p>
          <a href="/personality" className="bg-indigo-600 text-white px-10 py-5 rounded-3xl font-black shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition flex items-center gap-3 w-fit mx-auto active:scale-95">
            Take the Discovery Test <ArrowRight size={20} />
          </a>
        </div>
      </div>
    );
  }

  const chartData = [
    { name: 'Strengths', value: swot.Strengths.length || 1, color: '#10b981' },
    { name: 'Weaknesses', value: swot.Weaknesses.length || 1, color: '#ef4444' },
    { name: 'Opportunities', value: swot.Opportunities.length || 1, color: '#3b82f6' },
    { name: 'Threats', value: swot.Threats.length || 1, color: '#f59e0b' },
  ];

  const categories = [
    { title: "Strengths", data: swot.Strengths, color: "green", icon: <ShieldCheck size={20} />, bullet: "✔" },
    { title: "Weaknesses", data: swot.Weaknesses, color: "red", icon: <AlertCircle size={20} />, bullet: "⚠" },
    { title: "Opportunities", data: swot.Opportunities, color: "blue", icon: <TrendingUp size={20} />, bullet: "★" },
    { title: "Threats", data: swot.Threats, color: "yellow", icon: <Zap size={20} />, bullet: "!" }
  ];

  return (
    <div className="space-y-12 pb-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid md:grid-cols-2 gap-12 items-center bg-white/70 backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-3xl shadow-indigo-100 border border-white"
      >
        <div className="h-80 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={80}
                outerRadius={110}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Profile</p>
              <p className="text-3xl font-black text-indigo-600">Balance</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-4xl font-black mb-6 text-slate-800 tracking-tight">Executive Summary</h3>
          <p className="text-slate-500 leading-relaxed text-lg font-medium mb-8">
            Based on your qualitative responses, our algorithms have mapped out a comprehensive self-awareness profile.
            This visual representation helps you see the balance between your internal power and external potential.
          </p>
          <div className="flex gap-4">
            <div className="bg-indigo-50 p-4 rounded-3xl flex-1 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-indigo-600">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Primary Power</p>
                <p className="font-bold text-slate-800">{swot.Strengths[0] || "Discovering..."}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-slate-50 relative overflow-hidden group hover:border-indigo-200 transition-all duration-500"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className={`font-black text-2xl text-slate-800 flex items-center gap-3`}>
                <span className={`p-3 bg-${cat.color}-50 text-${cat.color}-600 rounded-2xl group-hover:scale-110 transition-transform`}>{cat.icon}</span>
                {cat.title}
              </h2>
              <span className={`text-xs font-black px-4 py-1.5 bg-${cat.color}-50 text-${cat.color}-600 rounded-full uppercase tracking-tighter`}>
                {cat.data.length} INSIGHTS
              </span>
            </div>

            <ul className="space-y-4">
              {cat.data.map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start group/item">
                  <span className={`mt-1.5 w-2 h-2 rounded-full bg-${cat.color}-500 group-hover/item:scale-150 transition-transform`}></span>
                  <p className="text-slate-600 font-medium leading-relaxed group-hover/item:text-slate-900 transition-colors">
                    {item}
                  </p>
                </li>
              ))}
              {cat.data.length === 0 && (
                <li className="text-slate-300 italic font-medium py-4 text-center border-2 border-dashed border-slate-50 rounded-3xl">
                  No specific {cat.title.toLowerCase()} identified yet.
                </li>
              )}
            </ul>

            {/* Decorative background element */}
            <div className={`absolute -bottom-8 -right-8 w-24 h-24 bg-${cat.color}-500/5 rounded-full blur-2xl group-hover:bg-${cat.color}-500/10 transition-colors`}></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default SWOTChart;