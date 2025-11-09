import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful authentication
    onAuthSuccess();
  };
  
  const formVariants = {
    hidden: { opacity: 0, x: isLogin ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: isLogin ? 100 : -100, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      className="flex items-center justify-center min-h-screen p-4 bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-lg">
        <div className="text-center">
            <h1 className="text-4xl font-bold text-emerald-400">ভ্রমণ গাইড</h1>
            <p className="mt-2 text-gray-400">বাংলাদেশে আপনার অভিযান এখান থেকেই শুরু।</p>
        </div>
        
        <AnimatePresence mode="wait">
            {isLogin ? (
                <motion.form key="login" onSubmit={handleSubmit} className="space-y-6" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-300">ইমেইল</label>
                        <input type="email" id="email" required className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="you@example.com" />
                    </div>
                    <div>
                        <label htmlFor="password"  className="text-sm font-medium text-gray-300">পাসওয়ার্ড</label>
                        <input type="password" id="password" required className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="••••••••" />
                    </div>
                     <button type="submit" className="w-full px-4 py-3 font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-gray-800 transition-colors duration-300">
                        সাইন ইন
                    </button>
                </motion.form>
            ) : (
                 <motion.form key="signup" onSubmit={handleSubmit} className="space-y-6" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                    <div>
                        <label htmlFor="name-signup" className="text-sm font-medium text-gray-300">পুরো নাম</label>
                        <input type="text" id="name-signup" required className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="আপনার নাম" />
                    </div>
                    <div>
                        <label htmlFor="email-signup" className="text-sm font-medium text-gray-300">ইমেইল</label>
                        <input type="email" id="email-signup" required className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="you@example.com" />
                    </div>
                    <div>
                        <label htmlFor="password-signup" className="text-sm font-medium text-gray-300">পাসওয়ার্ড</label>
                        <input type="password" id="password-signup" required className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="একটি পাসওয়ার্ড তৈরি করুন" />
                    </div>
                     <button type="submit" className="w-full px-4 py-3 font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-gray-800 transition-colors duration-300">
                        সাইন আপ
                    </button>
                </motion.form>
            )}
        </AnimatePresence>

        <p className="text-sm text-center text-gray-400">
            {isLogin ? "কোনো একাউন্ট নেই?" : "ইতিমধ্যে একটি একাউন্ট আছে?"}
            <button onClick={() => setIsLogin(!isLogin)} className="ml-2 font-medium text-emerald-400 hover:text-emerald-300">
                 {isLogin ? "সাইন আপ করুন" : "সাইন ইন করুন"}
            </button>
        </p>
      </div>
    </motion.div>
  );
};

export default AuthScreen;