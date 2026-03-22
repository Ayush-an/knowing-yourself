import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Smartphone, Lock, Briefcase, Calendar, ChevronRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    mobileNumber: '',
    occupation: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/signup', formData);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 py-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white/70 backdrop-blur-2xl p-5 rounded-[3rem] shadow-3xl shadow-indigo-100 border border-white/40 relative overflow-hidden">
          {/* Decorative Orbs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                Join the platform
              </div>
              <h2 className="text-4xl font-black text-slate-800 mb-3 tracking-tight">Create Your Account</h2>
              <p className="text-slate-500 font-medium text-lg">Unlock personalized self-awareness tools</p>
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

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                      <User size={20} />
                    </div>
                    <input
                      name="name"
                      type="text"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-indigo-400 focus:bg-white transition-all text-slate-800 placeholder-slate-300 font-medium"
                      placeholder="Your name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Mobile Number</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                      <Smartphone size={20} />
                    </div>
                    <input
                      name="mobileNumber"
                      type="text"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-indigo-400 focus:bg-white transition-all text-slate-800 placeholder-slate-300 font-medium"
                      placeholder="10 digit number"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Age</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                      <Calendar size={20} />
                    </div>
                    <input
                      name="age"
                      type="number"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-indigo-400 focus:bg-white transition-all text-slate-800 placeholder-slate-300 font-medium"
                      placeholder="Years"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Gender</label>
                  <select
                    name="gender"
                    className="w-full px-5 py-4 bg-slate-50/50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-indigo-400 focus:bg-white transition-all text-slate-800 font-medium appearance-none cursor-pointer"
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Occupation */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Occupation</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                      <Briefcase size={20} />
                    </div>
                    <input
                      name="occupation"
                      type="text"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-indigo-400 focus:bg-white transition-all text-slate-800 placeholder-slate-300 font-medium"
                      placeholder="What you do"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Secure Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                      <Lock size={20} />
                    </div>
                    <input
                      name="password"
                      type="password"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-indigo-400 focus:bg-white transition-all text-slate-800 placeholder-slate-300 font-medium"
                      placeholder="Min 6 characters"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black text-lg transition-all duration-300 flex items-center justify-center gap-3 hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-100 active:scale-95 disabled:opacity-50"
              >
                {loading ? "Creating Account..." : (
                  <>
                    Complete Registration
                    <CheckCircle2 size={24} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-2 text-center pt-8 border-t border-slate-50">
              <p className="text-slate-500 font-medium">
                Already part of the community?
                <Link to="/login" className="text-indigo-600 font-black ml-2 hover:underline inline-flex items-center gap-1 group">
                  Welcome Back
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
