
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AdBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-16 bg-gray-800 border-t border-gray-700 flex items-center justify-between p-4 z-50"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        <div className="flex items-center">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg mr-3 flex items-center justify-center font-bold text-gray-900">
            Ad
          </div>
          <div>
            <p className="text-white font-semibold">আপনার পরবর্তী ভ্রমণের জন্য সেরা ডিল!</p>
            <p className="text-gray-400 text-sm">প্রয়োজিত</p>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-white"
          aria-label="Close ad"
        >
          <X size={20} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdBanner;
