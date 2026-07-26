import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Volume2, VolumeX, Menu, X, Globe, Lock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';
import { useData } from '../context/DataContext';
import type { Language } from '../i18n/translations';

interface NavbarProps {
  onOpenAdminLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdminLogin }) => {
  const { language, setLanguage, t } = useLanguage();
  const { soundEnabled, toggleSound, playClick } = useSound();
  const { settings, isAdminLoggedIn } = useData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#hero' },
    { name: t.nav.features, href: '#features' },
    { name: t.nav.modes, href: '#modes' },
    { name: t.nav.cars, href: '#cars' },
    { name: 'Asoschi', href: '#founder' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.requirements, href: '#requirements' },
    { name: t.nav.news, href: '#news' },
    { name: t.nav.faq, href: '#faq' },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'UZ', label: "O'zbekcha", flag: '🇺🇿' },
    { code: 'EN', label: 'English', flag: '🇬🇧' },
    { code: 'RU', label: 'Русский', flag: '🇷🇺' },
  ];

  const logoSizeClass = settings.logoSize === 'sm' ? 'w-12 h-12' : settings.logoSize === 'lg' ? 'w-30 h-18' : 'w-16 h-16';
  const logoPositionClass =
    settings.logoPosition === 'right'
      ? ''
      : settings.logoPosition === 'left'
      ? 'ml-auto'
      : 'mx-auto';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isAdminLoggedIn ? 'mt-8' : ''
      } ${
        scrolled
          ? 'bg-[#05070D]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
          : 'bg-gradient-to-b from-[#05070D]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo Image */}
        <a
          href="#hero"
          onClick={playClick}
          className={`flex items-center gap-3 group focus:outline-none ${logoPositionClass}`}
        >
          <div className={`relative ${logoSizeClass} rounded-none overflow-hidden bg-transparent border-none`}>
            <img
              src={settings.logoUrl}
              alt="UBT Official Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold tracking-wider text-lg text-white group-hover:text-primary transition-colors leading-none">
              {settings.gameTitle1}
            </span>
            <span className="text-[10px] font-tech tracking-[0.25em] text-accent font-semibold leading-tight">
              {settings.gameTitle2}
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-card/40 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={playClick}
              className="px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-primary hover:bg-white/5 rounded-full transition-all tracking-wide"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Admin CMS Lock Button */}
          <button
            onClick={() => {
              playClick();
              onOpenAdminLogin();
            }}
            title={isAdminLoggedIn ? 'Admin Panel Active' : 'Admin CMS Login'}
            className={`p-2.5 rounded-full border transition-all ${
              isAdminLoggedIn
                ? 'bg-primary text-black border-primary shadow-[0_0_15px_rgba(0,229,255,0.6)]'
                : 'bg-card/60 border-white/10 text-gray-300 hover:text-primary hover:border-primary/50'
            }`}
          >
            {isAdminLoggedIn ? <ShieldCheck className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              playClick();
              toggleSound();
            }}
            title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
            className="relative p-2.5 rounded-full bg-card/60 border border-white/10 hover:border-primary/50 text-gray-300 hover:text-primary transition-all flex items-center justify-center group"
          >
            {soundEnabled ? (
              <div className="flex items-center gap-1">
                <Volume2 className="w-4 h-4 text-primary" />
                <span className="flex gap-0.5 items-end h-3">
                  <span className="w-0.5 bg-primary animate-pulse h-2" />
                  <span className="w-0.5 bg-primary animate-pulse h-3 delay-75" />
                  <span className="w-0.5 bg-primary animate-pulse h-1.5 delay-150" />
                </span>
              </div>
            ) : (
              <VolumeX className="w-4 h-4 text-gray-500 group-hover:text-red-400" />
            )}
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-300 bg-card/60 border border-white/10 rounded-full hover:border-primary/50 hover:text-white transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>{language}</span>
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-36 bg-[#05070D]/95 border border-white/15 rounded-xl shadow-2xl backdrop-blur-2xl overflow-hidden z-50 p-1"
                >
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        playClick();
                        setLanguage(item.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors ${
                        language === item.code
                          ? 'bg-primary/20 text-primary font-bold'
                          : 'text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.flag}</span>
                        <span>{item.label}</span>
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#download"
            onClick={playClick}
            className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent animate-pulse-glow" />
            <span className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#05070D] text-xs font-bold font-display tracking-wider text-white group-hover:bg-transparent transition-colors">
              <Download className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
              {t.nav.download}
            </span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => {
              playClick();
              onOpenAdminLogin();
            }}
            className="p-2 rounded-lg bg-card border border-white/10 text-primary"
          >
            <Lock className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg bg-card border border-white/10 text-white hover:text-primary transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#05070D]/95 border-b border-white/15 backdrop-blur-2xl overflow-hidden px-4 py-6"
          >
            <div className="flex flex-col gap-3 mb-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2.5 text-sm font-medium text-gray-200 hover:text-primary hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <a
              href="#download"
              onClick={() => {
                playClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-extrabold font-display text-sm uppercase tracking-wider"
            >
              <Download className="w-4 h-4" />
              {t.nav.download}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
