import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { Phone, Lock, LogIn, ArrowRight, AlertCircle } from 'lucide-react';

function Login() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { mobileNumber, password });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/70 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-3xl shadow-indigo-100 border border-white/40 relative overflow-hidden">
          {/* Decorative Gradient Blob */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-slate-800 mb-3 tracking-tight">Welcome Back</h2>
              <p className="text-slate-500 font-medium text-lg">Sign in to continue your journey</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 text-red-600 p-4 rounded-2xl mb-8 flex items-center gap-3 border border-red-100"
              >
                <AlertCircle size={20} />
                <span className="text-sm font-bold">{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Mobile Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Phone size={20} />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-indigo-400 focus:bg-white transition-all text-slate-800 placeholder-slate-300 font-medium"
                    placeholder="Enter your registered number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Password</label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Lock size={20} />
                  </div>
                  <input
                    type="password"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-indigo-400 focus:bg-white transition-all text-slate-800 placeholder-slate-300 font-medium"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 hover:scale-[1.02] active:scale-95 duration-300"
              >
                {loading ? "Signing in..." : (
                  <>
                    Sign In
                    <LogIn size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-slate-500 font-medium">
                Don't have an account?
                <Link to="/signup" className="text-indigo-600 font-bold ml-2 hover:underline inline-flex items-center gap-1 group">
                  Create Now
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
