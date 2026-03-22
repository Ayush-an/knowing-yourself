import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Phone, Briefcase, Calendar, Info, ShieldCheck, MapPin } from 'lucide-react';

function Profile() {
    const { user } = useContext(AuthContext);

    if (!user) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center p-12 bg-white rounded-3xl shadow-xl">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Access Denied</h2>
                <p className="text-slate-500 mb-6">Please log in to view your profile.</p>
                <a href="/login" className="btn-primary inline-flex">Login Now</a>
            </div>
        </div>
    );

    const stats = [
        { label: "Age", value: `${user.age} Years`, icon: <Calendar className="text-indigo-500" /> },
        { label: "Gender", value: user.gender, icon: <User className="text-sky-500" /> },
        { label: "Mobile", value: user.mobileNumber, icon: <Phone className="text-emerald-500" /> },
        { label: "Occupation", value: user.occupation, icon: <Briefcase className="text-orange-500" /> },
    ];

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-3xl shadow-indigo-100 border border-white/40 overflow-hidden relative"
            >
                {/* Header Section */}
                <div className="relative h-48 bg-linear-to-r from-indigo-600 to-sky-500">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute -bottom-16 left-12">
                        <div className="relative">
                            <div className="w-32 h-32 bg-white rounded-[2.5rem] p-1 shadow-2xl">
                                <div className="w-full h-full bg-linear-to-tr from-indigo-500 to-sky-500 rounded-[2.2rem] flex items-center justify-center text-white text-5xl font-black shadow-inner">
                                    {user.name.charAt(0)}
                                </div>
                            </div>
                            {user.role === 'admin' && (
                                <div className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-xl shadow-lg border-2 border-white" title="Admin Account">
                                    <ShieldCheck size={20} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-20 px-12 pb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-black text-slate-800 tracking-tight">{user.name}</h1>
                            <div className="flex items-center gap-4 mt-2">
                                <p className="text-indigo-600 font-bold flex items-center gap-1">
                                    <Briefcase size={16} /> {user.occupation}
                                </p>
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <div key={i} className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all group">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </div>
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                                <p className="text-lg font-bold text-slate-800">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100/50 relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-xl shadow-indigo-100">
                                <Info size={32} />
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-xl font-black text-slate-800 mb-2">Self Awareness Status</h3>
                                <p className="text-slate-500 font-medium max-w-lg">
                                    You've joined the platform to discover your true potential. Take the personality test to unlock your first SWOT analysis.
                                </p>
                            </div>
                            <button
                                onClick={() => window.location.href = '/personality'}
                                className="ml-auto bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black hover:bg-indigo-600 hover:text-white transition-all shadow-xl shadow-indigo-100 active:scale-95"
                            >
                                Start Test
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/50 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Profile;
