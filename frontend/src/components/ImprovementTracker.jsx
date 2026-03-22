import { useState, useEffect } from "react";
import { Plus, Check, Trash2, ListTodo, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../utils/api";

function ImprovementTracker() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/user/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    } finally {
      setLoading(false);
    }
  };

  async function addTask() {
    if (input.trim() === "") return;
    try {
      const res = await api.post('/user/tasks', { text: input });
      setTasks([res.data, ...tasks]);
      setInput("");
    } catch (err) {
      console.error("Error adding task", err);
    }
  }

  async function toggleTask(id) {
    try {
      const res = await api.put(`/user/tasks/${id}`);
      setTasks(tasks.map(t => t.id === id || t._id === id ? res.data : t));
    } catch (err) {
      console.error("Error toggling task", err);
    }
  }

  async function deleteTask(id) {
    try {
      await api.delete(`/user/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id && t._id !== id));
    } catch (err) {
      console.error("Error deleting task", err);
    }
  }

  const progress = tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
          <ListTodo className="text-indigo-600" />
          Improvement Tracker
        </h2>
        <div className="flex items-center gap-2">
           <Trophy className={progress === 100 ? "text-yellow-500" : "text-slate-300"} size={20} />
           <span className="font-black text-indigo-600">{progress}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-8">
        <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-indigo-600 h-full rounded-full shadow-lg shadow-indigo-100 transition-all duration-1000"
        ></motion.div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 group">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="What area do you want to grow in today?"
                className="w-full pl-6 pr-4 py-5 bg-slate-50 border-2 border-transparent rounded-4xl focus:outline-none focus:border-indigo-400 focus:bg-white transition-all text-slate-800 placeholder-slate-300 font-medium"
            />
        </div>
        <button
          onClick={addTask}
          className="bg-indigo-600 text-white p-5 rounded-4xl hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 active:scale-95 group"
        >
          <Plus className="group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
            <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading Goals...</p>
            </div>
        ) : (
            <AnimatePresence>
                {tasks.map((task) => (
                    <motion.div
                        key={task._id || task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`flex items-center gap-4 p-5 rounded-4xl transition-all duration-300 ${
                            task.completed ? "bg-emerald-50 border-emerald-100" : "bg-white border-slate-50 shadow-xl shadow-indigo-50/20"
                        } border`}
                    >
                        <button 
                            onClick={() => toggleTask(task._id || task.id)}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                task.completed ? "bg-emerald-500 text-white" : "bg-slate-100 text-transparent"
                            }`}
                        >
                            <Check size={18} />
                        </button>
                        
                        <span className={`flex-1 font-bold text-lg transition-all ${
                            task.completed ? "text-emerald-700 line-through opacity-50" : "text-slate-800"
                        }`}>
                            {task.text}
                        </span>

                        <button 
                            onClick={() => deleteTask(task._id || task.id)}
                            className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                        >
                            <Trash2 size={20} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        )}

        {!loading && tasks.length === 0 && (
            <div className="text-center py-12 rounded-[2.5rem] border-2 border-dashed border-slate-100">
                <p className="text-slate-400 font-medium">No active growth goals. Add one above to start tracking!</p>
            </div>
        )}
      </div>
    </div>
  );
}

export default ImprovementTracker;