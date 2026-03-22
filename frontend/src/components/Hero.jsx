import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ArrowRight, Sparkles, Shield, Compass } from "lucide-react";

function Hero() {
  const { user } = useContext(AuthContext);

  return (
    <div className="relative pt-10 pb-20 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl"></div>

      <div className="relative text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold mb-8 uppercase tracking-widest border border-indigo-100"
        >
          <Sparkles size={16} /> Empower Your Identity
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black text-slate-800 mb-8 leading-[0.9] tracking-tight"
        >
          Unlock the <span className="text-indigo-600">Power</span> of Your True Self
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Embark on a transformative journey to understand your personality,
          uncover your strengths, and build a roadmap for a better version of you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          {user ? (
            <Link
              to="/personality"
              className="group bg-indigo-600 text-white px-10 py-5 rounded-3xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all duration-300 shadow-2xl shadow-indigo-200 hover:scale-105 active:scale-95"
            >
              Start Personality Test
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="group bg-indigo-600 text-white px-10 py-5 rounded-3xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all duration-300 shadow-2xl shadow-indigo-100 hover:scale-105 active:scale-95"
              >
                Join the Journey
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </>
          )}

          <Link
            to="/swot"
            className="group border-2 border-indigo-600/30 text-indigo-600 px-10 py-5 rounded-3xl font-bold flex items-center justify-center gap-3 hover:border-indigo-600 transition-all duration-300 hover:bg-indigo-50 hover:scale-105 active:scale-95"
          >
            <Compass size={20} />
            Explore SWOT
          </Link>
        </motion.div>
      </div>

      {/* Floating Elements Animation */}
      <div className="mt-20 flex justify-center gap-8 opacity-20">
        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce delay-75"></div>
        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce delay-150"></div>
        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce delay-300"></div>
      </div>
    </div>
  );
}

export default Hero;