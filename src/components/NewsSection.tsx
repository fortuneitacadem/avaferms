import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Calendar, Paperclip, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';
import { useData } from '../context/DataContext';

export const NewsSection: React.FC = () => {
  const { t } = useLanguage();
  const { playClick } = useSound();
  const { news } = useData();

  return (
    <section id="news" className="relative py-24 bg-[#05070D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/80 border border-primary/30 mb-4"
          >
            <Newspaper className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-tech tracking-widest text-primary uppercase font-bold">
              {t.news.badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white uppercase"
          >
            {t.news.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-400 font-light"
          >
            {t.news.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={playClick}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group cursor-pointer"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-tech font-extrabold tracking-widest text-primary px-3 py-1 rounded-full bg-black/70 border border-primary/40 backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-tech mb-3">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-white group-hover:text-primary transition-colors leading-snug mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  {/* Downloadable Attachment File Badge */}
                  {item.attachment && (
                    <div className="p-3 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-between gap-2 mt-4">
                      <div className="flex items-center gap-2 min-w-0">
                        <Paperclip className="w-4 h-4 text-primary shrink-0" />
                        <div className="truncate">
                          <span className="text-xs font-bold text-white block truncate">{item.attachment.name}</span>
                          <span className="text-[10px] text-gray-400 font-tech">{item.attachment.size}</span>
                        </div>
                      </div>
                      <a
                        href={item.attachment.url || '#'}
                        download={item.attachment.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          playClick();
                          alert(`Downloading attached file: ${item.attachment?.name}`);
                        }}
                        className="p-2 rounded-xl bg-primary text-black hover:bg-white transition-colors shrink-0"
                        title="Download attached file"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center gap-2 text-xs font-bold font-display uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                <span>{t.news.readMore}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
