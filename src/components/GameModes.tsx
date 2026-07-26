import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Compass, Flame, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';

export const GameModes: React.FC = () => {
  const { t } = useLanguage();
  const { playClick } = useSound();

  const modes = [
    {
      id: 'career',
      icon: Trophy,
      title: t.modes.careerTitle,
      desc: t.modes.careerDesc,
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
      badge: '100+ MISSIONS',
      color: 'border-amber-500/40',
    },
    {
      id: 'multiplayer',
      icon: Users,
      title: t.modes.multiplayerTitle,
      desc: t.modes.multiplayerDesc,
      image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
      badge: '32-PLAYER LOBBY',
      color: 'border-cyan-500/40',
    },
    {
      id: 'drift',
      icon: Flame,
      title: t.modes.driftTitle,
      desc: t.modes.driftDesc,
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
      badge: 'HIGH SCORE DRIFT',
      color: 'border-orange-500/40',
    },
    {
      id: 'freeRoam',
      icon: Compass,
      title: t.modes.freeRoamTitle,
      desc: t.modes.freeRoamDesc,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      badge: 'NO SPEED LIMIT',
      color: 'border-purple-500/40',
    },
  ];

  return (
    <section id="modes" className="relative py-24 bg-[#05070D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/80 border border-secondary/30 mb-4"
          >
            <Trophy className="w-3.5 h-3.5 text-secondary" />
            <span className="text-xs font-tech tracking-widest text-secondary uppercase font-bold">
              {t.modes.badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white uppercase"
          >
            {t.modes.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-400 font-light"
          >
            {t.modes.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modes.map((mode, idx) => {
            const Icon = mode.icon;
            return (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={playClick}
                className={`relative group rounded-3xl overflow-hidden border ${mode.color} bg-card/60 backdrop-blur-xl hover:shadow-[0_15px_35px_rgba(0,229,255,0.2)] transition-all duration-500 cursor-pointer flex flex-col justify-end min-h-[380px]`}
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={mode.image}
                    alt={mode.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-75 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-[#05070D]/70 to-transparent" />
                </div>

                <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-tech font-extrabold tracking-widest text-primary px-3 py-1 rounded-full bg-black/60 border border-primary/40 backdrop-blur-md">
                      {mode.badge}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                      <Icon className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-2 group-hover:text-primary transition-colors">
                      {mode.title}
                    </h3>
                    <p className="text-sm text-gray-300 font-light leading-relaxed mb-6">
                      {mode.desc}
                    </p>

                    <div className="inline-flex items-center gap-2 text-xs font-bold font-display uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                      <span>Explore Mode</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
