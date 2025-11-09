import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getDestinationDetails } from '../services/geminiService';
import { DestinationDetails } from '../types';
import { ArrowLeft, MapPin, Calendar, Hotel, Utensils, Info, ThumbsUp, ThumbsDown, AlertTriangle, Lightbulb } from 'lucide-react';

interface DestinationDetailScreenProps {
  destinationName: string;
  onBack: () => void;
}

const Loader: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-emerald-500"></div>
        <p className="mt-4 text-lg text-gray-300">আপনার ভ্রমণ নির্দেশিকা তৈরি করা হচ্ছে...</p>
        <p className="text-sm text-gray-500">এতে কিছুক্ষণ সময় লাগতে পারে।</p>
    </div>
);

const DetailSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <motion.div
        className="bg-gray-800/50 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="flex items-center mb-4">
            <div className="bg-emerald-900/50 p-2 rounded-full mr-4 text-emerald-400">{icon}</div>
            <h3 className="text-2xl font-semibold text-emerald-400">{title}</h3>
        </div>
        <div className="text-gray-300 leading-relaxed prose prose-invert prose-p:my-1 prose-ul:my-1 text-justify">{children}</div>
    </motion.div>
);

const DestinationDetailScreen: React.FC<DestinationDetailScreenProps> = ({ destinationName, onBack }) => {
  const [details, setDetails] = useState<DestinationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getDestinationDetails(destinationName);
        setDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'একটি অজানা ত্রুটি ঘটেছে।');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationName]);

  return (
    <motion.div
      className="min-h-screen p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 text-emerald-400 hover:text-emerald-300 transition-colors"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} /> গন্তব্যে ফিরে যান
        </motion.button>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">{destinationName}</h1>
        <p className="text-lg text-gray-400 mb-8">আপনার সম্পূর্ণ ভ্রমণ নির্দেশিকা।</p>

        {loading && <div className="flex justify-center items-center h-96"><Loader /></div>}
        {error && <div className="text-center p-8 bg-red-900/50 rounded-lg text-red-300">{error}</div>}

        {details && (
          <div className="space-y-6">
            <DetailSection title="কিভাবে যাবেন" icon={<MapPin size={24} />}>
              <p>{details.howToGo}</p>
            </DetailSection>

            <DetailSection title="পরিদর্শনের সেরা সময়" icon={<Calendar size={24} />}>
              <p>{details.bestTimeToVisit}</p>
            </DetailSection>

            <DetailSection title="জনপ্রিয় হোটেল" icon={<Hotel size={24} />}>
              <ul>{details.hotels.map((item, i) => <li key={i}>{item}</li>)}</ul>
            </DetailSection>

            <DetailSection title="বিখ্যাত খাবার" icon={<Utensils size={24} />}>
              <ul>{details.famousFoods.map((item, i) => <li key={i}>{item}</li>)}</ul>
            </DetailSection>

            <DetailSection title="অনুসরণীয় নীতি" icon={<Info size={24} />}>
              <p>{details.policies}</p>
            </DetailSection>

            <DetailSection title="ভ্রমণ টিপস" icon={<Lightbulb size={24} />}>
              <ul>{details.tipsAndTricks.map((item, i) => <li key={i}>{item}</li>)}</ul>
            </DetailSection>
            
            <div className="grid md:grid-cols-2 gap-6">
              <DetailSection title="কী করবেন" icon={<ThumbsUp size={24} />}>
                <ul>{details.dos.map((item, i) => <li key={i}>{item}</li>)}</ul>
              </DetailSection>
              <DetailSection title="কী করবেন না" icon={<ThumbsDown size={24} />}>
                <ul>{details.donts.map((item, i) => <li key={i}>{item}</li>)}</ul>
              </DetailSection>
            </div>
            
            <DetailSection title="যা এড়িয়ে চলবেন" icon={<AlertTriangle size={24} />}>
              <ul>{details.thingsToAvoid.map((item, i) => <li key={i}>{item}</li>)}</ul>
            </DetailSection>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DestinationDetailScreen;