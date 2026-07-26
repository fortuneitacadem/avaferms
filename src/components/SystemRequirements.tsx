import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, Zap, CheckCircle2, ShieldCheck, Monitor } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';

export const SystemRequirements: React.FC = () => {
  const { t } = useLanguage();
  const { playClick } = useSound();
  const [activeTab, setActiveTab] = useState<'min' | 'rec' | 'ultra'>('rec');
  
  const [selectedCpu, setSelectedCpu] = useState('i7-12700K');
  const [selectedGpu, setSelectedGpu] = useState('RTX 3070');
  const [selectedRam, setSelectedRam] = useState('16GB');
  const [checkResult, setCheckResult] = useState<string | null>(null);

  const specs = {
    min: {
      os: 'Windows 10 / 11 64-Bit (latest Service Pack)',
      cpu: 'Intel Core i5-9400F / AMD Ryzen 5 3600',
      gpu: 'NVIDIA GeForce GTX 1660 Super (6GB) / AMD Radeon RX 5600 XT',
      ram: '12 GB RAM',
      storage: '25 GB High-Speed NVMe SSD',
      directx: 'Version 12 Ultimate',
      target: '1080p @ 60 FPS (Medium Preset)',
    },
    rec: {
      os: 'Windows 11 64-Bit (latest)',
      cpu: 'Intel Core i7-12700K / AMD Ryzen 7 5800X3D',
      gpu: 'NVIDIA GeForce RTX 3070 Ti (8GB) / AMD Radeon RX 6800 XT',
      ram: '16 GB High-Speed DDR5 RAM',
      storage: '25 GB PCIe 4.0 NVMe SSD',
      directx: 'Version 12 Ultimate (Ray Tracing On)',
      target: '1440p @ 120 FPS (High / Ultra Preset)',
    },
    ultra: {
      os: 'Windows 11 64-Bit (DirectStorage Ready)',
      cpu: 'Intel Core i9-14900K / AMD Ryzen 9 7950X3D',
      gpu: 'NVIDIA GeForce RTX 4080 / RTX 4090 (16GB+ VRAM)',
      ram: '32 GB Ultra DDR5 6400MHz',
      storage: '25 GB PCIe 5.0 Ultra NVMe SSD',
      directx: 'Version 12 Ultimate (Path Tracing DLSS 3.5)',
      target: '4K Ultra HDR @ 144+ FPS (Maxed Out)',
    },
  };

  const currentSpec = specs[activeTab];

  const handleCheckPc = () => {
    playClick();
    setCheckResult(t.requirements.compatible);
  };

  return (
    <section id="requirements" className="relative py-24 bg-[#05070D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/80 border border-primary/30 mb-4"
          >
            <Monitor className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-tech tracking-widest text-primary uppercase font-bold">
              {t.requirements.badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white uppercase"
          >
            {t.requirements.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-400 font-light"
          >
            {t.requirements.subtitle}
          </motion.p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-card/80 border border-white/10 backdrop-blur-md gap-2">
            <button
              onClick={() => {
                playClick();
                setActiveTab('min');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all ${
                activeTab === 'min'
                  ? 'bg-primary text-black shadow-[0_0_15px_rgba(0,229,255,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t.requirements.minTab}
            </button>
            <button
              onClick={() => {
                playClick();
                setActiveTab('rec');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all ${
                activeTab === 'rec'
                  ? 'bg-primary text-black shadow-[0_0_15px_rgba(0,229,255,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t.requirements.recTab}
            </button>
            <button
              onClick={() => {
                playClick();
                setActiveTab('ultra');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all ${
                activeTab === 'ultra'
                  ? 'bg-accent text-black shadow-[0_0_15px_rgba(255,159,0,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t.requirements.ultraTab}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="text-xs font-tech text-accent uppercase tracking-widest font-bold">
                  TARGET PERFORMANCE:
                </span>
                <span className="text-sm font-bold font-display text-white bg-accent/10 border border-accent/30 px-3 py-1 rounded-full">
                  {currentSpec.target}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                  <Monitor className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <div>
                    <span className="text-xs text-gray-400 font-tech uppercase block">OS:</span>
                    <span className="text-sm font-semibold text-white">{currentSpec.os}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                  <Cpu className="w-5 h-5 text-secondary mt-1 shrink-0" />
                  <div>
                    <span className="text-xs text-gray-400 font-tech uppercase block">CPU:</span>
                    <span className="text-sm font-semibold text-white">{currentSpec.cpu}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                  <Zap className="w-5 h-5 text-accent mt-1 shrink-0" />
                  <div>
                    <span className="text-xs text-gray-400 font-tech uppercase block">GPU:</span>
                    <span className="text-sm font-semibold text-white">{currentSpec.gpu}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                  <HardDrive className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <span className="text-xs text-gray-400 font-tech uppercase block">RAM & STORAGE:</span>
                    <span className="text-sm font-semibold text-white">{currentSpec.ram} &bull; {currentSpec.storage}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs text-gray-400 font-tech">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full Xbox & PlayStation Controller Force Feedback Supported</span>
            </div>
          </div>

          <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 border border-primary/30 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold font-display text-white mb-2 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" />
                {t.requirements.checkerTitle}
              </h3>
              <p className="text-xs text-gray-400 font-light mb-6">
                Select your PC components below to verify game compatibility.
              </p>

              <div className="mb-4">
                <label className="block text-xs font-tech text-gray-300 uppercase mb-1">
                  {t.requirements.selectCpu}
                </label>
                <select
                  value={selectedCpu}
                  onChange={(e) => setSelectedCpu(e.target.value)}
                  className="w-full bg-[#05070D] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:border-primary focus:outline-none"
                >
                  <option value="i5-9400F">Intel Core i5-9400F / Ryzen 3600</option>
                  <option value="i7-12700K">Intel Core i7-12700K / Ryzen 5800X3D</option>
                  <option value="i9-14900K">Intel Core i9-14900K / Ryzen 7950X3D</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-tech text-gray-300 uppercase mb-1">
                  {t.requirements.selectGpu}
                </label>
                <select
                  value={selectedGpu}
                  onChange={(e) => setSelectedGpu(e.target.value)}
                  className="w-full bg-[#05070D] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:border-primary focus:outline-none"
                >
                  <option value="GTX 1660">NVIDIA GTX 1660 Super / RX 5600 XT</option>
                  <option value="RTX 3070">NVIDIA RTX 3070 Ti / RX 6800 XT</option>
                  <option value="RTX 4090">NVIDIA RTX 4080 / RTX 4090</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-tech text-gray-300 uppercase mb-1">
                  {t.requirements.selectRam}
                </label>
                <select
                  value={selectedRam}
                  onChange={(e) => setSelectedRam(e.target.value)}
                  className="w-full bg-[#05070D] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:border-primary focus:outline-none"
                >
                  <option value="8GB">8 GB DDR4</option>
                  <option value="16GB">16 GB DDR4/DDR5</option>
                  <option value="32GB">32 GB DDR5 Ultra</option>
                </select>
              </div>

              <button
                onClick={handleCheckPc}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-extrabold font-display text-xs uppercase tracking-wider shadow-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all"
              >
                {t.requirements.checkBtn}
              </button>

              {checkResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center gap-2 text-xs text-emerald-300 font-bold"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{checkResult}</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
