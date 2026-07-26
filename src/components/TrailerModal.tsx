import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { playClick } = useSound();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
      >
        <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/20 blur-[150px] pointer-events-none" />

        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl bg-[#05070D] border border-primary/40 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.3)] flex flex-col"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-card/80">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-tech text-white uppercase tracking-widest font-bold">
                {t.trailer.title} — 4K 60FPS
              </span>
            </div>
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-red-500/80 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative aspect-video w-full bg-black">
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&controls=1&rel=0"
              title="Hyper Car UBT-Team 4K Gameplay Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
