import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ShieldCheck, Award, Sparkles, Building2, Target } from 'lucide-react';
import { useData } from '../context/DataContext';
import { resolveAssetUrl } from '../utils/resolveAssetUrl';

export const FounderSection: React.FC = () => {
  const { settings, founders, isEditModeActive, updateFounder } = useData();
  const resolvedLogoUrl = resolveAssetUrl(settings.logoUrl) || settings.logoUrl;

  return (
    <section id="founder" className="relative py-24 bg-[#05070D] overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/80 border border-primary/30 mb-4"
          >
            <Building2 className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-tech tracking-widest text-primary uppercase font-bold">
              STUDIYA VA ASOSCHILAR
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white uppercase"
          >
            UBTTEAM <span className="text-primary">STUDIO & ASOSCHILARI</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-400 font-light"
          >
            {settings.companyDescription}
          </motion.p>
        </div>

        {/* Studio Mission Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 sm:p-8 border border-primary/40 mb-16 max-w-4xl mx-auto text-center relative overflow-hidden"
        >
          <div className="flex items-center justify-center gap-2 text-accent font-tech text-xs uppercase tracking-widest font-bold mb-2">
            <Target className="w-4 h-4 text-accent" />
            <span>KAMPANIYA OLIY MAQSADI (UBT MISSION STATEMENT)</span>
          </div>
          <p className="text-lg sm:text-2xl font-bold font-display text-white italic">
            "{settings.companyMission}"
          </p>
        </motion.div>

        {/* Founders Cards List */}
        <div className="space-y-12">
          {founders.map((founder, idx) => (
            <div key={founder.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Photo Column */}
              <div className={`lg:col-span-5 flex justify-center ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative rounded-3xl p-1 bg-gradient-to-br from-primary via-secondary to-accent shadow-[0_0_50px_rgba(0,229,255,0.3)] max-w-md w-full"
                >
                  <div className="relative rounded-[22px] bg-[#05070D] overflow-hidden p-3">
                    <img
                      src={resolveAssetUrl(founder.photo || settings.logoUrl) || settings.logoUrl}
                      alt={founder.name}
                      className="w-full h-96 object-cover object-center rounded-2xl filter contrast-110 border border-white/10"
                    />

                    <div className="absolute bottom-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 border border-primary/40 backdrop-blur-md">
                      <img src={resolvedLogoUrl} alt="UBT" className="w-6 h-6 object-contain" />
                      <span className="text-[10px] font-tech text-white uppercase font-bold tracking-wider">
                        UBT OFFICIAL LOGO
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Details Column */}
              <div className={`lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10 border border-white/10 flex flex-col justify-between ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-accent" />
                    <span className="text-xs font-tech text-accent uppercase tracking-widest font-bold">
                      UBTTEAM FOUNDERSHIP
                    </span>
                  </div>

                  {isEditModeActive ? (
                    <div className="space-y-2 mb-4">
                      <input
                        type="text"
                        value={founder.name}
                        onChange={(e) => updateFounder(founder.id, { name: e.target.value })}
                        className="w-full bg-black/80 border border-primary rounded-xl px-3 py-2 text-xl font-bold font-display text-white"
                      />
                      <input
                        type="text"
                        value={founder.role}
                        onChange={(e) => updateFounder(founder.id, { role: e.target.value })}
                        className="w-full bg-black/80 border border-primary rounded-xl px-3 py-2 text-sm text-primary font-tech"
                      />
                    </div>
                  ) : (
                    <div className="mb-6">
                      <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
                        {founder.name}
                      </h3>
                      <p className="text-sm font-tech text-primary font-semibold tracking-wider uppercase mt-1">
                        {founder.role}
                      </p>
                    </div>
                  )}

                  <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 mb-6">
                    <Quote className="w-8 h-8 text-primary/30 absolute top-3 right-3" />
                    <p className="text-base sm:text-lg font-light text-gray-200 italic leading-relaxed relative z-10">
                      "{founder.quote}"
                    </p>
                    <span className="text-[10px] font-tech text-accent uppercase tracking-widest font-bold block mt-3">
                      — UDDALAB BO'LMAS TOPSHIRIQ (UBT PHILOSOPHY)
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mb-6">
                    {founder.bio}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs font-tech text-gray-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>UBTTEAM STUDIO 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-tech text-gray-300">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>UNREAL ENGINE 5.4 CERTIFIED</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
