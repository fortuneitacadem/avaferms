import React from 'react';
import { Send, Video, MessageSquare, Mail, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';
import { useData } from '../context/DataContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { playClick } = useSound();
  const { settings } = useData();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#030408] border-t border-white/10 pt-16 pb-12 overflow-hidden text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl p-0.5 bg-gradient-to-br from-primary via-secondary to-accent shadow-[0_0_20px_rgba(0,229,255,0.4)] overflow-hidden">
                  <img src={settings.logoUrl} alt="UBT Logo" className="w-full h-full object-cover rounded-[10px]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-extrabold tracking-wider text-xl text-white">
                    {settings.gameTitle1}
                  </span>
                  <span className="text-[10px] font-tech tracking-[0.25em] text-accent font-semibold">
                    {settings.gameTitle2}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm mb-6">
                Hyper Car UBT-Team is an ultra-realistic AAA PC racing simulator developed by UBT-Team Games. Featuring dynamic V12 engine physics, Tashkent Night Highways, and ray-tracing graphics.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-tech text-emerald-400 font-bold w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {t.footer.status}
            </div>
          </div>

          {/* Col 2: Social Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-tech text-white uppercase tracking-widest font-bold mb-4">
              {t.footer.community}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={settings.telegramLink}
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary hover:bg-primary/10 text-xs font-semibold text-gray-300 hover:text-primary transition-all group"
              >
                <Send className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                <span>Telegram</span>
              </a>

              <a
                href={settings.youtubeLink}
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-500 hover:bg-red-500/10 text-xs font-semibold text-gray-300 hover:text-red-400 transition-all group"
              >
                <Video className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                <span>YouTube</span>
              </a>

              <a
                href={settings.discordLink}
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500 hover:bg-indigo-500/10 text-xs font-semibold text-gray-300 hover:text-indigo-400 transition-all group"
              >
                <MessageSquare className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>Discord</span>
              </a>

              <a
                href={`mailto:${settings.supportEmail}`}
                onClick={playClick}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-accent hover:bg-accent/10 text-xs font-semibold text-gray-300 hover:text-accent transition-all group"
              >
                <Mail className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                <span>Email Support</span>
              </a>
            </div>
          </div>

          {/* Col 3: Legal */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-tech text-white uppercase tracking-widest font-bold mb-4">
                LEGAL & POLICY
              </h4>
              <ul className="space-y-2 text-xs font-light">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">{t.footer.privacy}</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">{t.footer.terms}</a>
                </li>
                <li>
                  <a href="#requirements" className="hover:text-primary transition-colors">DirectX 12 Compatibility</a>
                </li>
              </ul>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-primary text-xs font-tech text-gray-300 hover:text-primary transition-all w-fit"
            >
              <ChevronUp className="w-4 h-4" />
              <span>BACK TO TOP</span>
            </button>
          </div>

        </div>

        <div className="pt-8 text-center text-[11px] font-tech text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 UBT-TEAM GAMES. {t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">DEVELOPED FOR WINDOWS PC</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
