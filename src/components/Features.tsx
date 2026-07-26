import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Cpu, Car, MapPin, CloudRain, Wrench, Zap, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';

export const Features: React.FC = () => {
  const { t } = useLanguage();
  const { playClick } = useSound();

  const featureCards = [
    {
      icon: Eye,
      title: t.features.graphicsTitle,
      desc: t.features.graphicsDesc,
      color: 'from-cyan-500 to-blue-600',
      borderColor: 'hover:border-cyan-400',
      badge: '4K DLSS 3.5',
    },
    {
      icon: Cpu,
      title: t.features.physicsTitle,
      desc: t.features.physicsDesc,
      color: 'from-indigo-500 to-purple-600',
      borderColor: 'hover:border-indigo-400',
      badge: 'V12 TELEMETRY',
    },
    {
      icon: Car,
      title: t.features.carsTitle,
      desc: t.features.carsDesc,
      color: 'from-amber-500 to-orange-600',
      borderColor: 'hover:border-amber-400',
      badge: '50+ HYPERCARS',
    },
    {
      icon: MapPin,
      title: t.features.mapsTitle,
      desc: t.features.mapsDesc,
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'hover:border-emerald-400',
      badge: 'TASHKENT & TOKYO',
    },
    {
      icon: CloudRain,
      title: t.features.weatherTitle,
      desc: t.features.weatherDesc,
      color: 'from-blue-500 to-cyan-600',
      borderColor: 'hover:border-blue-400',
      badge: 'DYNAMIC 2.0',
    },
    {
      icon: Wrench,
      title: t.features.customizationTitle,
      desc: t.features.customizationDesc,
      color: 'from-pink-500 to-rose-600',
      borderColor: 'hover:border-pink-400',
      badge: 'PRO TUNING',
    },
    {
      icon: Zap,
      title: t.features.performanceTitle,
      desc: t.features.performanceDesc,
      color: 'from-violet-500 to-purple-600',
      borderColor: 'hover:border-violet-400',
      badge: '144+ FPS PC',
    },
  ];

  return (
    <section id="features" className="relative py-24 bg-[#05070D] overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/80 border border-primary/30 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-tech tracking-widest text-primary uppercase font-bold">
              {t.features.badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white uppercase"
          >
            {t.features.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-400 font-light"
          >
            {t.features.subtitle}
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={playClick}
                className={`glass-card p-6 rounded-3xl border border-white/10 transition-all duration-300 ${card.borderColor} hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] group cursor-pointer relative overflow-hidden flex flex-col justify-between`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} p-0.5 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <div className="w-full h-full bg-[#05070D] rounded-[14px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <span className="text-[10px] font-tech font-bold tracking-widest text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                    {card.badge}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom Glowing Accent Line */}
                <div className={`mt-6 h-0.5 w-full bg-gradient-to-r ${card.color} opacity-30 group-hover:opacity-100 transition-opacity`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
