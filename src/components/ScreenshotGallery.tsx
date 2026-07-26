import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';

export const ScreenshotGallery: React.FC = () => {
  const { t } = useLanguage();
  const { playClick } = useSound();
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const screenshots = [
    {
      url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=85',
      title: 'Tashkent Night Expressway',
      category: '4K Ray Tracing',
    },
    {
      url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=85',
      title: 'Rain Puddle Reflection Physics',
      category: 'DLSS 3.5',
    },
    {
      url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85',
      title: 'Tokyo Midnight Drift Battles',
      category: 'Multiplayer',
    },
    {
      url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
      title: 'Swiss Alps Mountain Pass',
      category: 'Dynamic Weather',
    },
    {
      url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=85',
      title: 'Hypercar Cockpit Telemetry',
      category: 'Photomode',
    },
    {
      url: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=85',
      title: 'V12 Exhaust Flame Afterburn',
      category: 'Unreal Engine 5.4',
    },
  ];

  const openLightbox = (index: number) => {
    playClick();
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    playClick();
    setActiveLightboxIndex(null);
  };

  const nextImage = () => {
    if (activeLightboxIndex === null) return;
    playClick();
    setActiveLightboxIndex((prev) => (prev! + 1) % screenshots.length);
  };

  const prevImage = () => {
    if (activeLightboxIndex === null) return;
    playClick();
    setActiveLightboxIndex((prev) => (prev! - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <section id="gallery" className="relative py-24 bg-[#05070D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/80 border border-primary/30 mb-4"
          >
            <ImageIcon className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-tech tracking-widest text-primary uppercase font-bold">
              {t.gallery.badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white uppercase"
          >
            {t.gallery.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-400 font-light"
          >
            {t.gallery.subtitle}
          </motion.p>
        </div>

        {/* Gallery Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {screenshots.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => openLightbox(idx)}
              className="relative group rounded-3xl overflow-hidden border border-white/10 glass-card cursor-pointer aspect-video flex flex-col justify-end p-6 hover:border-primary/60 transition-all duration-300"
            >
              <img
                src={item.url}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-75 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all">
                <Maximize2 className="w-4 h-4 text-primary" />
              </div>

              {/* Caption */}
              <div className="relative z-10">
                <span className="text-[10px] font-tech font-extrabold tracking-widest text-accent px-2.5 py-0.5 rounded-full bg-black/60 border border-accent/30">
                  {item.category}
                </span>
                <h4 className="text-lg font-bold font-display text-white mt-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-red-500/80 text-white transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Nav Prev/Next */}
            <button
              onClick={prevImage}
              className="absolute left-6 p-4 rounded-full bg-white/10 hover:bg-primary hover:text-black text-white transition-colors z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 p-4 rounded-full bg-white/10 hover:bg-primary hover:text-black text-white transition-colors z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Main Image */}
            <div className="max-w-6xl max-h-[85vh] relative flex flex-col items-center">
              <img
                src={screenshots[activeLightboxIndex].url}
                alt={screenshots[activeLightboxIndex].title}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
              />
              <div className="mt-4 text-center">
                <span className="text-xs font-tech text-accent uppercase tracking-widest font-bold">
                  {screenshots[activeLightboxIndex].category}
                </span>
                <h3 className="text-xl font-bold font-display text-white mt-1">
                  {screenshots[activeLightboxIndex].title}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
