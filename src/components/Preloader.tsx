import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const { settings } = useData();
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState("INITIALIZING ENGINE V12...");

  useEffect(() => {
    const steps = [
      "INITIALIZING ENGINE V12...",
      "LOADING DLSS 3.5 RAY-TRACING SHADERS...",
      "CONNECTING TO UBT-TEAM GLOBAL SERVERS...",
      "CALIBRATING TASHKENT HIGHWAY TELEMETRY...",
      "HYPER CAR UBT-TEAM READY!"
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 8) + 4;
        const stepIdx = Math.min(Math.floor((next / 100) * steps.length), steps.length - 1);
        setLoadingStep(steps[stepIdx]);
        return Math.min(next, 100);
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05070D] text-white selection:bg-none"
    >
      <div className="absolute inset-0 bg-hero-pattern opacity-60 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />

      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
        {/* Animated Official UBT Logo Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="relative mb-8 flex items-center justify-center"
        >
          <div className="w-28 h-28 rounded-full border-2 border-primary/20 border-t-primary border-r-secondary animate-spin" />
          <div className="absolute w-20 h-20 rounded-2xl overflow-hidden p-1 bg-gradient-to-br from-primary via-secondary to-accent shadow-[0_0_25px_rgba(0,229,255,0.6)]">
            <img src={settings.logoUrl} alt="UBT Official Logo" className="w-full h-full object-cover rounded-xl" />
          </div>
        </motion.div>

        <h1 className="text-3xl font-extrabold tracking-widest font-display text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary mb-2 drop-shadow-md">
          {settings.gameTitle1} <span className="text-accent">{settings.gameTitle2}</span>
        </h1>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-8 font-tech">
          AAA Realistic PC Racing Simulator
        </p>

        <div className="w-full bg-card/80 border border-white/10 rounded-full h-3 p-0.5 overflow-hidden mb-4 relative shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_10px_#fff]" />
          </motion.div>
        </div>

        <div className="flex items-center justify-between w-full text-xs font-tech tracking-wider text-gray-300">
          <span className="flex items-center gap-1.5 text-primary">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            {loadingStep}
          </span>
          <span className="text-xl font-bold font-display text-white drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
            {progress}%
          </span>
        </div>

        <div className="mt-12 flex items-center gap-2 text-[10px] text-gray-500 font-tech uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          DirectX 12 Ultimate &bull; Ray Tracing Ready &bull; PC Win 10/11
        </div>
      </div>
    </motion.div>
  );
};
