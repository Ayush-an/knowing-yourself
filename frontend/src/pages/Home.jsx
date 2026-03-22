import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Hero from "../components/Hero";
import { motion } from "framer-motion";
import { Compass, Users, TrendingUp, Sparkles, Quote } from "lucide-react";

function Home() {
  const { user } = useContext(AuthContext);

  const features = [
    {
      title: "Self Awareness",
      desc: "Learn how to understand your emotions, thoughts, and behaviour to improve your personal growth.",
      icon: <Users className="text-indigo-600" />,
      delay: 0.2
    },
    {
      title: "Personality Test",
      desc: "Discover whether you are an Introvert, Extrovert, or Ambivert through an interactive personality quiz.",
      icon: <Sparkles className="text-indigo-600" />,
      delay: 0.4,
      condition: !!user
    },
    {
      title: "Self Improvement",
      desc: "Track your goals, identify weaknesses, and build a powerful plan to improve yourself.",
      icon: <TrendingUp className="text-indigo-600" />,
      delay: 0.6
    }
  ];

  return (
    <div className="space-y-32 pb-32">
      <Hero />

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            (!feature.condition || feature.condition) && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
                className="group bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-slate-50 hover:border-indigo-200 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  {feature.icon}
                </div>
                <h2 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">
                  {feature.title}
                </h2>
                <p className="text-slate-500 leading-relaxed text-lg">
                  {feature.desc}
                </p>
              </motion.div>
            )
          ))}
        </div>
      </div>

      {/* Motivation Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-6"
      >
        <div className="relative bg-indigo-600 rounded-[3rem] p-16 md:p-24 overflow-hidden shadow-3xl shadow-indigo-200">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32"></div>
          
          <div className="relative text-center max-w-3xl mx-auto flex flex-col items-center">
            <Quote className="text-indigo-400 mb-8 w-16 h-16 opacity-50" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-10 leading-tight">
              Personal Growth Starts With Self Awareness
            </h2>
            <p className="text-xl md:text-2xl text-indigo-100 font-medium italic leading-relaxed opacity-90">
              "The better you understand yourself, the better decisions you make in life. 
              Discover your strengths, improve weaknesses, and build a strong personality."
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;