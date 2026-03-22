import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.jpeg";
import { LogOut, User as UserIcon, Shield, Menu, X, BarChart3 } from "lucide-react";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-white/80 backdrop-blur-lg shadow-lg py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src={logo}
              alt="logo"
              className="w-12 h-12 object-contain rounded-2xl shadow-md transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
            />
            <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 group-hover:bg-transparent transition-colors"></div>
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-800 group-hover:text-indigo-600 transition-colors">
            Knowing<span className="text-indigo-600 group-hover:text-slate-800">Yourself</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-slate-600">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>

          {/* Hide user features for admin */}
          {!isAdmin && (
            <>
              {user && (
                <Link to="/personality" className="hover:text-indigo-600 transition-colors">Personality Test</Link>
              )}
              <Link to="/swot" className="hover:text-indigo-600 transition-colors">SWOT Analysis</Link>
              <Link to="/improvement" className="hover:text-indigo-600 transition-colors">Self Improvement</Link>
            </>
          )}

          {isAdmin && (
            <div className="flex items-center gap-4">
              <Link
                to="/admin"
                className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl hover:bg-indigo-100 transition shadow-sm font-bold border border-indigo-100"
              >
                <Shield size={18} /> Matrix
              </Link>
              <Link
                to="/admin/responses"
                className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl hover:bg-emerald-100 transition shadow-sm font-bold border border-emerald-100"
              >
                <BarChart3 size={18} /> Insights
              </Link>
            </div>
          )}

          <div className="h-6 w-px bg-slate-200 mx-2"></div>

          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-linear-to-tr from-indigo-500 to-sky-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                  {user.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800 leading-none">{user.name}</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Profile</span>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all duration-300 shadow-sm"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">

              <Link to="/login" className="px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">Login</Link>
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-7 py-2.5 rounded-xl hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 font-bold"
              >
                Join Now
              </Link>
              <Link to="/login" className="px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-colors hover:text-rose-500 " >
                Admin
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top duration-300">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>

          {!isAdmin && (
            <>
              {user && <Link to="/personality" onClick={() => setIsMenuOpen(false)}>Personality Test</Link>}
              <Link to="/swot" onClick={() => setIsMenuOpen(false)}>SWOT Analysis</Link>
              <Link to="/improvement" onClick={() => setIsMenuOpen(false)}>Self Improvement</Link>
            </>
          )}

          {isAdmin && (
            <>
              <Link to="/admin" className="font-bold text-indigo-600" onClick={() => setIsMenuOpen(false)}>Matrix Control</Link>
              <Link to="/admin/responses" className="font-bold text-emerald-600" onClick={() => setIsMenuOpen(false)}>User Insights</Link>
            </>
          )}

          <div className="h-px bg-slate-100 my-2"></div>
          {user ? (
            <>
              <Link to="/profile" className="font-bold flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <UserIcon size={18} /> My Profile
              </Link>
              <button onClick={handleLogout} className="text-left text-red-500 font-bold">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="bg-indigo-600 text-white p-3 rounded-xl text-center font-bold" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;