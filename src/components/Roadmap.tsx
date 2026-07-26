import React from 'react';
import { motion } from 'framer-motion';
import { Flag, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Roadmap: React.FC = () => {
  const { t } = useLanguage();

  const phases = [
    {
      quarter: 'Q1 2026',
      title: 'CLOSED BETA & ENGINE PHYSICS 2.0',
      status: 'COMPLETED',
      badgeColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
      items: [
        'V12 Telemetry engine physics calibration',
        'DirectX 12 Ultimate graphics pipeline integration',
        'Tashkent City Expressway base map rendering',
      ],
    },
    {
      quarter: 'Q2 2026',
      title: 'GLOBAL PC PUBLIC LAUNCH (v1.4.2)',
      status: 'LIVE NOW',
      badgeColor: 'text-primary border-primary/50 bg-primary/20 animate-pulse',
      items: [
        '32-Player online low-latency lobby release',
        '50+ Licensed & tuned hypercar roster',
        'Ray-Tracing & DLSS 3.5 frame generation support',
      ],
    },
    {
      quarter: 'Q3 2026',
      title: 'TOKYO NIGHT EXPANSION & VR MODE',
      status: 'IN PROGRESS',
      badgeColor: 'text-accent border-accent/40 bg-accent/10',
      items: [
        'Tokyo Highway Loop open-world map addition',
        'Full PC Virtual Reality (Oculus / SteamVR) support',
        'Ranked Esports Drift & Sprint Leagues',
      ],
    },
    {
      quarter: 'Q4 2026',
      title: 'CROSS-PLATFORM & CUSTOM LIVERY STUDIO',
      status: 'PLANNED',
      badgeColor: 'text-secondary border-secondary/40 bg-secondary/10',
      items: [
        'In-game 3D Livery & Vinyl creation studio',
        'Console cross-play multiplayer sync',
        'Endurance 24-Hour Day/Night race league',
      ],
    },
  ];

  return (
    <section id="roadmap" className="relative py-24 bg-[#05070D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/80 border border-primary/30 mb-4"
          >
            <Flag className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-tech tracking-widest text-primary uppercase font-bold">
              {t.roadmap.badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white uppercase"
          >
            {t.roadmap.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-400 font-light"
          >
            {t.roadmap.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, idx) => (
            <motion.div
              key={phase.quarter}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:border-primary/40 transition-all duration-300 relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-black font-display text-white">
                    {phase.quarter}
                  </span>
                  <span className={`text-[10px] font-tech font-bold tracking-widest px-2.5 py-1 rounded-full border ${phase.badgeColor}`}>
                    {phase.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold font-display text-primary mb-4">
                  {phase.title}
                </h3>

                <ul className="space-y-2.5">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-300 font-light leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-tech text-gray-500 uppercase tracking-widest">
                <span>Phase 0{idx + 1}</span>
                <span>UBT-TEAM ROADMAP</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
