
import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 1.5,
        staggerChildren: 0.3,
      }
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-900 to-gray-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div variants={itemVariants}>
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.3-.8.8l1.8 8.4.5 2.3L8 18l2 2 1.5 1.5.5.5L18 22l.8-2.8Z"/><path d="m2.3 2.3 7.9 7.9"/>
        </svg>
      </motion.div>
      <motion.h1 
        className="text-4xl md:text-5xl font-bold text-white mt-6"
        variants={itemVariants}
      >
        ভ্রমণ গাইড
      </motion.h1>
      <motion.p 
        className="text-lg md:text-xl text-emerald-300 mt-2"
        variants={itemVariants}
      >
        আপনার ভ্রমণ সঙ্গী
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;
