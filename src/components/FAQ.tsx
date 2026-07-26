import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';

export const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const { playClick } = useSound();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is Hyper Car UBT-Team 100% Free to Download and Play on Windows PC?",
      a: "Yes! Hyper Car UBT-Team is completely free to download and play. All 50+ hypercars, Tashkent highway maps, and 32-player online multiplayer modes are unlocked without paywalls."
    },
    {
      q: "What Steering Wheels and Gamepad Controllers are Supported?",
      a: "The game features native force feedback support for all major gaming peripherals including Logitech G29 / G923, Fanatec Direct Drive, Thrustmaster T300, Xbox Series Wireless controllers, DualSense 5, and customizable Keyboard/Mouse keybinds."
    },
    {
      q: "How to Install Hyper Car UBT-Team on Windows 10 and Windows 11?",
      a: "Simply click the 'DOWNLOAD FREE PC' button to download the official setup executable (18.4 GB). Run the installer, select your target NVMe SSD drive, and the launcher will auto-configure graphics presets according to your GPU."
    },
    {
      q: "Where are the Online Multiplayer Servers Located?",
      a: "We maintain low-latency dedicated server clusters in Tashkent (Uzbekistan), Frankfurt (Europe), Singapore (Asia), and Virginia (USA) ensuring ping under 15ms."
    },
    {
      q: "Can I Run Hyper Car UBT-Team on a Mid-Tier Gaming PC?",
      a: "Absolutely. Our custom Unreal Engine 5.4 rendering engine is heavily optimized. Mid-tier GPUs such as GTX 1660 Super or RTX 3060 run smoothly at 60 to 120 FPS."
    }
  ];

  const toggleFaq = (index: number) => {
    playClick();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 bg-[#05070D] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/80 border border-primary/30 mb-4"
          >
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-tech tracking-widest text-primary uppercase font-bold">
              {t.faq.badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white uppercase"
          >
            {t.faq.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-400 font-light"
          >
            {t.faq.subtitle}
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none group"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-white group-hover:text-primary transition-colors">
                    {faq.q}
                  </span>
                  <div className={`p-2 rounded-full bg-white/5 group-hover:bg-primary/20 transition-all ${isOpen ? 'rotate-180 text-primary' : 'text-gray-400'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 pt-0 border-t border-white/5 text-sm text-gray-300 font-light leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
