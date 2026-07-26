import React from 'react';
import { motion } from 'framer-motion';
import { Download, Play, Gauge, Zap, Flame, Cpu, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';
import { useData } from '../context/DataContext';

interface HeroProps {
  onOpenTrailer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrailer }) => {
  const { t } = useLanguage();
  const { playRev, playClick } = useSound();
  const { settings, isEditModeActive, updateSettings } = useData();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2000&q=90"
          alt="Hyper Car UBT-Team Night City Racing"
          className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-[#05070D]/60 to-[#05070D]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Version Badge & Official Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`w-full flex ${
            settings.logoPosition === 'left'
              ? 'justify-start'
              : settings.logoPosition === 'right'
              ? 'justify-end'
              : 'justify-center'
          } items-center gap-2.5 px-4 py-1.5 rounded-full bg-card/80 border border-primary/40 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(0,229,255,0.2)]`}
        >
          <img
            src={settings.logoUrl}
            alt="UBT"
            className={`object-contain ${
              settings.logoSize === 'sm'
                ? 'w-4 h-4'
                : settings.logoSize === 'lg'
                ? 'w-8 h-8'
                : 'w-5 h-5'
            }`}
          />
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span className="text-xs font-tech tracking-widest text-primary uppercase font-bold">
            VERSIYA {settings.version} — GOOGLE PLAY & PC LAUNCH
          </span>
        </motion.div>

        {/* Dynamic Titles */}
        {isEditModeActive ? (
          <div className="w-full max-w-2xl space-y-2 mb-4">
            <input
              type="text"
              value={settings.gameTitle1}
              onChange={(e) => updateSettings({ gameTitle1: e.target.value })}
              className="w-full bg-black/80 border border-primary rounded-xl px-4 py-2 text-center text-4xl font-extrabold font-display text-white"
            />
            <input
              type="text"
              value={settings.gameTitle2}
              onChange={(e) => updateSettings({ gameTitle2: e.target.value })}
              className="w-full bg-black/80 border border-primary rounded-xl px-4 py-2 text-center text-4xl font-extrabold font-display text-primary"
            />
          </div>
        ) : (
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-7xl lg:text-9xl font-black font-display tracking-tight text-white uppercase leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400">
              {settings.gameTitle1}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#00F0FF] to-secondary text-glow-cyan">
              {settings.gameTitle2}
            </span>
          </motion.h1>
        )}

        {/* Dynamic Subtitle */}
        {isEditModeActive ? (
          <textarea
            rows={2}
            value={settings.gameSubtitle}
            onChange={(e) => updateSettings({ gameSubtitle: e.target.value })}
            className="w-full max-w-2xl bg-black/80 border border-primary rounded-xl px-4 py-2 text-center text-sm text-gray-200 mt-4"
          />
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-3xl text-base sm:text-xl text-gray-300 font-light leading-relaxed tracking-wide"
          >
            {settings.gameSubtitle}
          </motion.p>
        )}

        {/* CTA Buttons - PC Download + Official Google Play Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl"
        >
          {/* Main Download Button */}
          <a
            href="#download"
            onClick={() => {
              playClick();
              playRev();
            }}
            className="w-full sm:w-auto relative group overflow-hidden rounded-2xl p-[2px] transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent animate-pulse-glow" />
            <span className="relative flex items-center justify-center gap-2.5 px-7 py-4 rounded-[14px] bg-[#05070D] hover:bg-transparent text-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(0,229,255,0.4)]">
              <Download className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              <span>{t.hero.downloadBtn}</span>
            </span>
          </a>

          {/* Official Google Play Store Link */}
          <a
            href={settings.googlePlayUrl}
            target="_blank"
            rel="noreferrer"
            onClick={playClick}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 hover:bg-emerald-500/40 text-emerald-300 hover:text-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] group"
          >
            <Smartphone className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>{t.hero.googlePlayBtn}</span>
          </a>

          {/* Watch Trailer Button */}
          <button
            onClick={() => {
              playClick();
              onOpenTrailer();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-card/80 border border-white/20 hover:border-primary/60 hover:bg-white/10 backdrop-blur-md text-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] group"
          >
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
              <Play className="w-3.5 h-3.5 text-primary group-hover:text-black fill-current transition-colors ml-0.5" />
            </div>
            <span>{t.hero.trailerBtn}</span>
          </button>
        </motion.div>

        {/* Live Telemetry Stats Ticker Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl"
        >
          <div
            onClick={playRev}
            className="glass-card glass-card-hover p-4 rounded-2xl flex flex-col items-center justify-center border border-white/10 cursor-pointer group"
          >
            <div className="flex items-center gap-2 mb-1 text-primary">
              <Gauge className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              <span className="text-xs font-tech uppercase tracking-widest text-gray-400">
                {t.hero.stat1Label}
              </span>
            </div>
            <span className="font-display font-extrabold text-xl sm:text-2xl text-white group-hover:text-primary transition-colors">
              {t.hero.stat1Value}
            </span>
          </div>

          <div className="glass-card glass-card-hover p-4 rounded-2xl flex flex-col items-center justify-center border border-white/10">
            <div className="flex items-center gap-2 mb-1 text-secondary">
              <Zap className="w-5 h-5" />
              <span className="text-xs font-tech uppercase tracking-widest text-gray-400">
                {t.hero.stat2Label}
              </span>
            </div>
            <span className="font-display font-extrabold text-xl sm:text-2xl text-white">
              {t.hero.stat2Value}
            </span>
          </div>

          <div className="glass-card glass-card-hover p-4 rounded-2xl flex flex-col items-center justify-center border border-white/10">
            <div className="flex items-center gap-2 mb-1 text-accent">
              <Flame className="w-5 h-5" />
              <span className="text-xs font-tech uppercase tracking-widest text-gray-400">
                {t.hero.stat3Label}
              </span>
            </div>
            <span className="font-display font-extrabold text-xl sm:text-2xl text-white">
              {t.hero.stat3Value}
            </span>
          </div>

          <div className="glass-card glass-card-hover p-4 rounded-2xl flex flex-col items-center justify-center border border-white/10">
            <div className="flex items-center gap-2 mb-1 text-emerald-400">
              <Cpu className="w-5 h-5" />
              <span className="text-xs font-tech uppercase tracking-widest text-gray-400">
                {t.hero.stat4Label}
              </span>
            </div>
            <span className="font-display font-extrabold text-xl sm:text-2xl text-white">
              {t.hero.stat4Value}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
