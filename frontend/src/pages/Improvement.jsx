import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import ImprovementTracker from "../components/ImprovementTracker";
import { Sparkles, Target, Flame, Lightbulb, ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

function Improvement() {
  const { user } = useContext(AuthContext);
  const [swot, setSwot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.get('/user/swot')
        .then(res => {
          setSwot(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching SWOT for suggestions", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  const generateSuggestions = () => {
    if (!swot) return [];
    
    const suggestions = [];
    
    if (swot.Weaknesses.length > 0) {
      suggestions.push({
        title: "Overcome Weaknesses",
        desc: `Focus on improving: ${swot.Weaknesses.slice(0, 2).join(", ")}. Setting small, daily goals can help bridge these gaps.`,
        icon: <Target className="text-rose-500" />,
        color: "rose"
      });
    }

    if (swot.Strengths.length > 0) {
      suggestions.push({
        title: "Leverage Your Strengths",
        desc: `You excel at ${swot.Strengths[0]}. Look for ways to mentor others or take on leadership roles in this area.`,
        icon: <Sparkles className="text-emerald-500" />,
        color: "emerald"
      });
    }

    if (swot.Opportunities.length > 0) {
      suggestions.push({
        title: "Seize Opportunities",
        desc: `Don't miss out on ${swot.Opportunities[0]}. Networking and continuous learning are key to unlocking this potential.`,
        icon: <Lightbulb className="text-amber-500" />,
        color: "amber"
      });
    }

    return suggestions;
  };

  const suggestions = generateSuggestions();

  return (
    <div className="space-y-16 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-3xl shadow-indigo-100 border border-white flex flex-col md:flex-row items-center gap-10 relative overflow-hidden"
      >
        <div className="flex-1 relative z-10">
            <h1 className="text-5xl font-black text-slate-800 mb-6 tracking-tight leading-none">
              Your <span className="text-indigo-600">Growth</span> Journey
            </h1>
            <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
              Self-improvement is an intentional process. Use this space to set goals, 
              build powerful habits, and monitor your personal evolution.
            </p>
        </div>
        <div className="w-32 h-32 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center text-indigo-600 shadow-inner relative z-10">
            <TrendingUp size={64} />
        </div>
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 bg-white p-12 rounded-[3rem] shadow-3xl shadow-indigo-50 border border-slate-50">
          <ImprovementTracker />
        </div>

        <div className="lg:col-span-5 space-y-8">
          {loading ? (
            <div className="p-8 bg-white/50 rounded-3xl animate-pulse flex items-center gap-4">
               <div className="w-12 h-12 bg-slate-200 rounded-2xl"></div>
               <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded-full w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded-full w-1/2"></div>
               </div>
            </div>
          ) : user && suggestions.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">AI Generated Tips</h2>
              {suggestions.map((s, i) => (
                <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-50 border border-slate-50 hover:border-indigo-200 transition-all duration-500 group"
                >
                  <div className="flex items-start gap-6">
                    <div className={`p-4 bg-${s.color}-50 rounded-2xl group-hover:bg-${s.color}-100 transition-colors`}>
                      {s.icon}
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-slate-800 mb-2">{s.title}</h3>
                      <p className="text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-indigo-600/5 p-10 rounded-[2.5rem] border border-indigo-100 flex flex-col gap-6 group hover:bg-white transition-all duration-500">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-xl shadow-indigo-100 group-hover:scale-110 transition-transform">
                  <Target size={28} />
                </div>
                <div>
                    <h3 className="font-black text-2xl text-slate-800 mb-2">Focus on Growth</h3>
                    <p className="text-slate-500 font-medium italic opacity-80 text-lg leading-relaxed">
                        "The only person you should try to be better than is the person you were yesterday."
                    </p>
                </div>
              </div>

              <div className="bg-rose-600/5 p-10 rounded-[2.5rem] border border-rose-100 flex flex-col gap-6 group hover:bg-white transition-all duration-500">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-xl shadow-rose-100 group-hover:scale-110 transition-transform">
                  <Flame size={28} />
                </div>
                <div>
                    <h3 className="font-black text-2xl text-slate-800 mb-3">Stay Motivated</h3>
                    <ul className="space-y-3 font-bold text-slate-500">
                      <li className="flex items-center gap-3"><span className="w-2 h-2 bg-rose-400 rounded-full"></span> Break large goals into small tasks</li>
                      <li className="flex items-center gap-3"><span className="w-2 h-2 bg-rose-400 rounded-full"></span> Celebrate every small victory</li>
                      <li className="flex items-center gap-3"><span className="w-2 h-2 bg-rose-400 rounded-full"></span> Be consistent, not perfect</li>
                    </ul>
                </div>
              </div>
            </div>
          )}

          {user && !swot && !loading && (
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-indigo-600 p-12 rounded-[3.5rem] text-white shadow-3xl shadow-indigo-200 relative overflow-hidden"
             >
                <div className="relative z-10 flex flex-col gap-6">
                  <h3 className="text-3xl font-black mb-2 leading-none">Personalized Tips Locked</h3>
                  <p className="text-indigo-100 font-medium text-lg leading-relaxed opacity-90">
                    Your SWOT analysis is the foundation of our recommendations. Take the test to unlock expert guidance.
                  </p>
                  <a href="/personality" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black hover:bg-indigo-50 transition w-fit active:scale-95 shadow-xl shadow-indigo-700/20">
                    Get Analyzed <ArrowRight size={20} />
                  </a>
                </div>
                {/* Background effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
             </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Improvement;