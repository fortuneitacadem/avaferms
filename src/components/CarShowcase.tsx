import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Gauge, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';
import { useData } from '../context/DataContext';

export const CarShowcase: React.FC = () => {
  const { t } = useLanguage();
  const { playRev, playClick } = useSound();
  const { cars } = useData();
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#00E5FF');
  const [isRevving, setIsRevving] = useState(false);

  const currentCar = cars[selectedCarIndex] || cars[0];

  const handleRevEngine = () => {
    playClick();
    setIsRevving(true);
    playRev();
    setTimeout(() => {
      setIsRevving(false);
    }, 2300);
  };

  const nextCar = () => {
    playClick();
    setSelectedCarIndex((prev) => (prev + 1) % cars.length);
  };

  const prevCar = () => {
    playClick();
    setSelectedCarIndex((prev) => (prev - 1 + cars.length) % cars.length);
  };

  if (!currentCar) return null;

  return (
    <section id="cars" className="relative py-24 bg-[#05070D] overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-25 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: selectedColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/80 border border-primary/30 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-tech tracking-widest text-primary uppercase font-bold">
              {t.cars.badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white uppercase"
          >
            {t.cars.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-400 font-light"
          >
            {t.cars.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 relative">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 overflow-hidden shadow-2xl relative min-h-[420px] flex flex-col justify-between">
              <div className="flex items-center justify-between z-10">
                <div>
                  <span className="text-xs font-tech uppercase tracking-widest text-accent font-bold">
                    {currentCar.brand}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black font-display text-white">
                    {currentCar.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevCar}
                    className="p-3 rounded-full bg-black/60 border border-white/10 hover:border-primary text-white hover:text-primary transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextCar}
                    className="p-3 rounded-full bg-black/60 border border-white/10 hover:border-primary text-white hover:text-primary transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative my-8 h-64 sm:h-80 w-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentCar.id}
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    src={currentCar.image}
                    alt={currentCar.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                  />
                </AnimatePresence>

                <div
                  className="absolute inset-0 pointer-events-none mix-blend-color opacity-30 transition-all duration-500 rounded-2xl"
                  style={{ backgroundColor: selectedColor }}
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 z-10 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-tech text-gray-400 uppercase tracking-widest">
                    {t.cars.selectColor}
                  </span>
                  <div className="flex items-center gap-2">
                    {(currentCar.colors || ['#00E5FF', '#5B5BFF', '#FF9F00']).map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          playClick();
                          setSelectedColor(color);
                        }}
                        style={{ backgroundColor: color }}
                        className={`w-6 h-6 rounded-full border-2 transition-transform ${
                          selectedColor === color
                            ? 'border-white scale-125 shadow-[0_0_12px_#fff]'
                            : 'border-transparent hover:scale-110'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleRevEngine}
                  disabled={isRevving}
                  className="w-full sm:w-auto relative group overflow-hidden rounded-xl p-[1px] focus:outline-none"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-secondary animate-pulse-glow" />
                  <span className="relative flex items-center justify-center gap-2 px-6 py-3 rounded-[11px] bg-[#05070D] group-hover:bg-transparent text-xs font-extrabold font-display uppercase tracking-wider text-white transition-all">
                    <Volume2 className={`w-4 h-4 text-accent ${isRevving ? 'animate-bounce text-primary' : ''}`} />
                    <span>{isRevving ? t.cars.revving : t.cars.revEngine}</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="glass-card rounded-3xl p-6 border border-white/10">
              <h4 className="text-sm font-tech font-bold tracking-widest text-primary uppercase mb-6 flex items-center gap-2">
                <Gauge className="w-4 h-4" /> Telemetry Specs
              </h4>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs text-gray-400">{t.cars.speed}</span>
                  <span className="text-lg font-bold font-display text-white">{currentCar.speed}</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs text-gray-400">{t.cars.accel}</span>
                  <span className="text-lg font-bold font-display text-primary">{currentCar.accel}</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs text-gray-400">{t.cars.power}</span>
                  <span className="text-lg font-bold font-display text-accent">{currentCar.power}</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs text-gray-400">{t.cars.weight}</span>
                  <span className="text-sm font-bold font-display text-white">{currentCar.weight}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{t.cars.drive}</span>
                  <span className="text-xs font-bold font-tech text-secondary tracking-wider">{currentCar.drive}</span>
                </div>
              </div>

              <p className="mt-6 text-xs text-gray-400 font-light leading-relaxed border-t border-white/10 pt-4">
                {currentCar.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
