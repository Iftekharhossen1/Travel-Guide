import React from 'react';
import { motion } from 'framer-motion';
import { DESTINATIONS } from '../constants';

interface HomeScreenProps {
  onSelectDestination: (destination: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectDestination }) => {
  return (
    <motion.div
      className="p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                বাংলাদেশ ঘুরে দেখুন
            </h1>
            <p className="mt-4 text-lg text-gray-300">আপনার যাত্রা শুরু করতে একটি গন্তব্য নির্বাচন করুন।</p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {DESTINATIONS.map((dest) => (
            <motion.div
              key={dest.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectDestination(dest.name)}
              className="relative rounded-xl overflow-hidden cursor-pointer shadow-lg group"
            >
              <img
                src={`https://picsum.photos/seed/${dest.imageId}/800/600`}
                alt={dest.name}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h2 className="text-2xl font-bold text-white">{dest.name}</h2>
                <p className="text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">বিস্তারিত দেখুন &rarr;</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomeScreen;