import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ShieldCheck, Zap, CheckCircle2, FileText, X, Smartphone, Monitor } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';
import { useData } from '../context/DataContext';
import { resolveAssetUrl } from '../utils/resolveAssetUrl';

export const DownloadSection: React.FC = () => {
  const { t } = useLanguage();
  const { playRev, playClick } = useSound();
  const { settings, localPcInstallerUrl } = useData();
  const logoUrl = resolveAssetUrl(settings.logoUrl) || settings.logoUrl;
  const [selectedMirror, setSelectedMirror] = useState<'playstore' | 'pc' | 'apk'>('playstore');
  const [showChangelog, setShowChangelog] = useState(false);
  const [downloadCount, setDownloadCount] = useState(settings.downloadCount || 1248930);

  const handleDownload = () => {
    playClick();
    playRev();

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00E5FF', '#5B5BFF', '#FF9F00'],
    });

    setDownloadCount((prev) => prev + 1);

    if (selectedMirror === 'playstore') {
      window.open(settings.googlePlayUrl, '_blank');
      return;
    }

    const downloadTargetUrl = selectedMirror === 'apk'
      ? settings.apkDownloadUrl
      : selectedMirror === 'pc'
      ? localPcInstallerUrl || settings.pcDownloadUrl
      : settings.pcDownloadUrl;

    if (downloadTargetUrl && downloadTargetUrl !== '#') {
      const link = document.createElement('a');
      link.href = downloadTargetUrl;
      link.target = '_blank';
      link.rel = 'noreferrer noopener';
      if (selectedMirror === 'pc' && localPcInstallerUrl) {
        link.download = settings.pcDownloadFileName || 'HyperCar_UBT-Team_Setup.exe';
      }
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(`No download URL or installer selected for ${selectedMirror.toUpperCase()}. Please configure it in the admin panel.`);
    }
  };

  return (
    <section id="download" className="relative py-24 bg-[#05070D] overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card rounded-[36px] p-8 sm:p-12 border border-primary/40 shadow-[0_0_80px_rgba(0,229,255,0.25)] relative overflow-hidden">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 mb-4"
            >
              <img src={logoUrl} alt="UBT" className="w-5 h-5 object-contain" />
              <span className="text-xs font-tech tracking-widest text-primary uppercase font-extrabold">
                {t.download.badge}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-6xl font-black font-display tracking-tight text-white uppercase text-glow-cyan"
            >
              {t.download.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-base sm:text-lg text-gray-300 font-light"
            >
              {t.download.subtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-gray-400 font-tech uppercase block">{t.download.currentVersion}</span>
              <span className="text-lg font-bold font-display text-primary">{settings.version} (Latest)</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-gray-400 font-tech uppercase block">{t.download.releaseDate}</span>
              <span className="text-lg font-bold font-display text-white">{settings.releaseDate}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-gray-400 font-tech uppercase block">{t.download.fileSize}</span>
              <span className="text-lg font-bold font-display text-accent">{settings.fileSize}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-gray-400 font-tech uppercase block">{t.download.platform}</span>
              <span className="text-lg font-bold font-display text-emerald-400">Android & Win 10/11</span>
            </div>
          </div>

          {/* Download Mirrors Selector */}
          <div className="max-w-3xl mx-auto mb-10">
            <span className="text-xs font-tech text-gray-300 uppercase tracking-widest block text-center mb-3">
              {t.download.mirrorsTitle}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => {
                  playClick();
                  setSelectedMirror('playstore');
                }}
                className={`p-4 rounded-2xl border text-xs font-bold font-display flex flex-col items-center justify-center gap-1.5 transition-all ${
                  selectedMirror === 'playstore'
                    ? 'border-emerald-400 bg-emerald-500/20 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                    : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <span>Google Play Store</span>
                <span className="text-[9px] font-tech text-emerald-400">Official Android App</span>
              </button>

              <button
                onClick={() => {
                  playClick();
                  setSelectedMirror('pc');
                }}
                className={`p-4 rounded-2xl border text-xs font-bold font-display flex flex-col items-center justify-center gap-1.5 transition-all ${
                  selectedMirror === 'pc'
                    ? 'border-primary bg-primary/20 text-white shadow-[0_0_20px_rgba(0,229,255,0.4)]'
                    : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <Monitor className="w-5 h-5 text-primary" />
                <span>Windows PC Build</span>
                <span className="text-[9px] font-tech text-primary">Direct Installer (.EXE)</span>
              </button>

              <button
                onClick={() => {
                  playClick();
                  setSelectedMirror('apk');
                }}
                className={`p-4 rounded-2xl border text-xs font-bold font-display flex flex-col items-center justify-center gap-1.5 transition-all ${
                  selectedMirror === 'apk'
                    ? 'border-accent bg-accent/20 text-white shadow-[0_0_20px_rgba(255,159,0,0.4)]'
                    : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <Zap className="w-5 h-5 text-accent" />
                <span>Direct Android APK</span>
                <span className="text-[9px] font-tech text-accent">Standalone .APK</span>
              </button>
            </div>
          </div>

          {/* MAIN BIG DOWNLOAD BUTTON */}
          <div className="flex flex-col items-center justify-center mb-8">
            <button
              onClick={handleDownload}
              className="relative group w-full max-w-xl overflow-hidden rounded-3xl p-[2px] transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent animate-pulse-glow" />
              <div className="relative flex items-center justify-center gap-4 px-10 py-6 rounded-[22px] bg-[#05070D] hover:bg-transparent text-white font-display font-extrabold text-lg sm:text-2xl uppercase tracking-wider transition-all duration-300 shadow-[0_0_50px_rgba(0,229,255,0.6)]">
                {selectedMirror === 'playstore' ? (
                  <Smartphone className="w-8 h-8 text-emerald-400 group-hover:text-white animate-bounce" />
                ) : (
                  <Download className="w-8 h-8 text-primary group-hover:text-white animate-bounce" />
                )}
                <span>
                  {selectedMirror === 'playstore' ? t.download.googlePlayNowBtn : t.download.downloadNowBtn}
                </span>
              </div>
            </button>

            <button
              onClick={() => {
                playClick();
                setShowChangelog(true);
              }}
              className="mt-4 inline-flex items-center gap-2 text-xs font-tech text-gray-400 hover:text-primary transition-colors underline underline-offset-4"
            >
              <FileText className="w-3.5 h-3.5" />
              {t.download.changelogBtn}
            </button>
          </div>

          {/* Security & Verification Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-8 max-w-4xl mx-auto text-xs font-tech text-gray-300">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.download.virusFree}</span>
            </div>

            <div className="flex items-center gap-2 text-primary">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.download.secureDownload}</span>
            </div>

            <div className="flex items-center gap-2 text-accent">
              <Zap className="w-4 h-4" />
              <span>{t.download.counterLabel} <strong className="text-white font-display">{downloadCount.toLocaleString()}+</strong></span>
            </div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {showChangelog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          >
            <div className="relative w-full max-w-2xl bg-[#05070D] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <h3 className="text-xl font-bold font-display text-white">
                  HYPER CAR UBT-TEAM — CHANGELOG {settings.version}
                </h3>
                <button
                  onClick={() => setShowChangelog(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-red-500/80 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 text-xs font-light text-gray-300 leading-relaxed">
                <div>
                  <span className="font-bold text-primary font-display block mb-1">NEW FEATURES ({settings.version}):</span>
                  <ul className="list-disc list-inside space-y-1 text-gray-400">
                    <li>Official Google Play Mobile & PC cross-play release (com.UBTTeam.HyperCar).</li>
                    <li>Added Tashkent Night Expressway 45km open highway map route.</li>
                    <li>Integrated NVIDIA DLSS 3.5 Frame Generation & Ray Reconstruction.</li>
                    <li>3 New Hypercars: Apex Hyperion V12, Uzbekistan GT-R UBT-X, Valkyrie RS.</li>
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-accent font-display block mb-1">STUDIO & CMS UPDATES:</span>
                  <ul className="list-disc list-inside space-y-1 text-gray-400">
                    <li>Custom build upload capability in UBT-Team CMS Admin Control Center.</li>
                    <li>Multi-founder studio profile roster management.</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
