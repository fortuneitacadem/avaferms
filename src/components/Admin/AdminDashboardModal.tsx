import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Newspaper, Car, UserCheck, HelpCircle, X, Plus, Trash2, Save, Paperclip, Download, Smartphone, Monitor, FileText } from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { SiteSettings } from '../../types/cms';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const {
    settings,
    updateSettings,
    localPcInstaller,
    setLocalPcInstaller,
    founders,
    addFounder,
    deleteFounder,
    news,
    addNewsItem,
    deleteNewsItem,
    cars,
    addCarItem,
    deleteCarItem,
    faqs,
    addFaqItem,
    deleteFaqItem,
  } = useData();

  const [activeTab, setActiveTab] = useState<'general' | 'founders' | 'builds' | 'news' | 'cars' | 'faqs'>('general');

  // Form states
  const [generalForm, setGeneralForm] = useState(settings);

  const handleGeneralChange = (field: keyof SiteSettings, value: string) => {
    setGeneralForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePcInstallerFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setLocalPcInstaller(file);

    if (file) {
      setGeneralForm((prev) => ({ ...prev, pcDownloadFileName: file.name }));
      alert(`Selected installer: ${file.name}`);
    }
  };

  useEffect(() => {
    setGeneralForm(settings);
  }, [settings]);
  
  // Founder Form state
  const [newFounderName, setNewFounderName] = useState('');
  const [newFounderRole, setNewFounderRole] = useState('Hammuassis & Dasturchi');
  const [newFounderPhoto, setNewFounderPhoto] = useState('/ubt-logo.jpg');
  const [newFounderQuote, setNewFounderQuote] = useState("Uddalab bo'lmas topshiriq yo'q!");
  const [newFounderBio, setNewFounderBio] = useState('');

  // News Form state
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState('GAME UPDATE');
  const [newNewsImage, setNewNewsImage] = useState('https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80');
  const [newNewsSummary, setNewNewsSummary] = useState('');
  const [newNewsFileName, setNewNewsFileName] = useState('');
  const [newNewsFileUrl, setNewNewsFileUrl] = useState('');
  const [newNewsFileSize, setNewNewsFileSize] = useState('');

  // Car Form state
  const [newCarName, setNewCarName] = useState('');
  const [newCarBrand, setNewCarBrand] = useState('UBT RACING WORKS');
  const [newCarSpeed, setNewCarSpeed] = useState('400 km/h');
  const [newCarAccel, setNewCarAccel] = useState('2.0 sec');
  const [newCarPower, setNewCarPower] = useState('1,500 HP');
  const [newCarWeight, setNewCarWeight] = useState('1,300 kg');
  const [newCarDrive, setNewCarDrive] = useState('AWD');
  const [newCarImg, setNewCarImg] = useState('https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=85');

  // FAQ Form state
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  if (!isOpen) return null;

  const handleSaveGeneral = () => {
    updateSettings(generalForm);
    alert("Site Settings & Game Build Links Saved Successfully!");
  };

  const handleCreateFounder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFounderName) return;
    addFounder({
      name: newFounderName,
      role: newFounderRole,
      photo: newFounderPhoto,
      quote: newFounderQuote,
      bio: newFounderBio || "UBTTeam gamedev jamoasining faol a'zosi.",
    });
    setNewFounderName('');
    setNewFounderBio('');
    alert("New Founder Profile Added!");
  };

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitle || !newNewsSummary) return;

    addNewsItem({
      title: newNewsTitle,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      category: newNewsCategory,
      image: newNewsImage,
      summary: newNewsSummary,
      attachment: newNewsFileName ? { name: newNewsFileName, url: newNewsFileUrl || '#', size: newNewsFileSize || '1.0 MB' } : undefined,
    });

    setNewNewsTitle('');
    setNewNewsSummary('');
    setNewNewsFileName('');
    setNewNewsFileUrl('');
    setNewNewsFileSize('');
    alert("News Article Published!");
  };

  const handleCreateCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCarName) return;

    addCarItem({
      name: newCarName,
      brand: newCarBrand,
      speed: newCarSpeed,
      accel: newCarAccel,
      power: newCarPower,
      weight: newCarWeight,
      drive: newCarDrive,
      image: newCarImg,
      description: 'Custom tuned UBT Racing Works performance build.',
      colors: ['#00E5FF', '#5B5BFF', '#FF9F00', '#111827'],
    });

    setNewCarName('');
    alert("Supercar added to Showcase Garage!");
  };

  const handleCreateFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaqQ || !newFaqA) return;
    addFaqItem({ q: newFaqQ, a: newFaqA });
    setNewFaqQ('');
    setNewFaqA('');
    alert("FAQ Question Added!");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
      >
        <div className="relative w-full max-w-5xl h-[88vh] bg-[#05070D] border border-primary/40 rounded-3xl flex flex-col shadow-[0_0_60px_rgba(0,229,255,0.3)] overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-card/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-white">
                  HYPER CAR UBT-TEAM — CMS CONTROL CENTER (FULL ADMIN)
                </h3>
                <span className="text-[10px] font-tech text-gray-400 uppercase tracking-widest">
                  Manage Builds, Links, Company Founders, Cars, and News Attachments
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-red-500/80 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-black/60 border-b border-white/10 px-6 overflow-x-auto gap-2 py-2">
            <button
              onClick={() => setActiveTab('general')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-bold uppercase transition-all ${
                activeTab === 'general'
                  ? 'bg-primary text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>General & Logo</span>
            </button>

            <button
              onClick={() => setActiveTab('builds')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-bold uppercase transition-all ${
                activeTab === 'builds'
                  ? 'bg-primary text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Game Builds & Links</span>
            </button>

            <button
              onClick={() => setActiveTab('founders')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-bold uppercase transition-all ${
                activeTab === 'founders'
                  ? 'bg-primary text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Asoschilar (Founders)</span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-bold uppercase transition-all ${
                activeTab === 'news'
                  ? 'bg-primary text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>News & Files</span>
            </button>

            <button
              onClick={() => setActiveTab('cars')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-bold uppercase transition-all ${
                activeTab === 'cars'
                  ? 'bg-primary text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Supercars</span>
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-bold uppercase transition-all ${
                activeTab === 'faqs'
                  ? 'bg-primary text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>FAQs</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 text-xs text-gray-200">
            {/* TAB 1: GENERAL & LOGO */}
            {activeTab === 'general' && (
              <div className="space-y-6 max-w-3xl">
                <h4 className="text-sm font-bold font-display text-primary uppercase border-b border-white/10 pb-2">
                  1. General Branding & Company Info
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-tech text-gray-400 uppercase mb-1">
                      Official Logo URL/Path:
                    </label>
                    <input
                      type="text"
                      value={generalForm.logoUrl}
                      onChange={(e) => handleGeneralChange('logoUrl', e.target.value)}
                      className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-tech text-gray-400 uppercase mb-1">
                    Logo Display Size:
                  </label>
                  <select
                    value={generalForm.logoSize}
                    onChange={(e) => handleGeneralChange('logoSize', e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="sm">Small</option>
                    <option value="md">Medium</option>
                    <option value="lg">Large</option>
                  </select>
                </div>

                <div>
                  <label className="block font-tech text-gray-400 uppercase mb-1">
                    Logo Alignment:
                  </label>
                  <select
                    value={generalForm.logoPosition}
                    onChange={(e) => handleGeneralChange('logoPosition', e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>

                <div>
                  <label className="block font-tech text-gray-400 uppercase mb-1">
                    Main Title Part 1:
                  </label>
                  <input
                    type="text"
                    value={generalForm.gameTitle1}
                    onChange={(e) => setGeneralForm({ ...generalForm, gameTitle1: e.target.value })}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block font-tech text-gray-400 uppercase mb-1">
                    Main Title Part 2:
                  </label>
                  <input
                    type="text"
                    value={generalForm.gameTitle2}
                    onChange={(e) => setGeneralForm({ ...generalForm, gameTitle2: e.target.value })}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-tech text-gray-400 uppercase mb-1">
                    Homepage Subtitle:
                  </label>
                  <textarea
                    rows={2}
                    value={generalForm.gameSubtitle}
                    onChange={(e) => handleGeneralChange('gameSubtitle', e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block font-tech text-gray-400 uppercase mb-1">
                    Company Description:
                  </label>
                  <textarea
                    rows={2}
                    value={generalForm.companyDescription}
                    onChange={(e) => setGeneralForm({ ...generalForm, companyDescription: e.target.value })}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block font-tech text-gray-400 uppercase mb-1">
                    Company Oliy Maqsadi (Mission Statement):
                  </label>
                  <textarea
                    rows={2}
                    value={generalForm.companyMission}
                    onChange={(e) => setGeneralForm({ ...generalForm, companyMission: e.target.value })}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

                <button
                  onClick={handleSaveGeneral}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-black font-extrabold font-display uppercase tracking-wider"
                >
                  <Save className="w-4 h-4" /> Save General Settings
                </button>
              </div>
            )}

            {/* TAB 2: GAME BUILDS & DOWNLOAD LINKS */}
            {activeTab === 'builds' && (
              <div className="space-y-6 max-w-3xl">
                <h4 className="text-sm font-bold font-display text-primary uppercase border-b border-white/10 pb-2">
                  2. Upload Game Builds & Store URLs (Visitors Download This!)
                </h4>

                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 mb-4">
                  <span className="font-bold text-white block mb-1">💡 Custom Build File Instruction:</span>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    Paste your compiled game build direct link (`.apk`, `.exe`, `.zip`, Google Drive, or Server URL) below. When users click "Download Game Build" on the site, they will download YOUR build file directly!
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-tech text-emerald-400 uppercase mb-1 flex items-center gap-1.5 font-bold">
                      <Smartphone className="w-4 h-4" /> Google Play Store URL (Android App):
                    </label>
                    <input
                      type="text"
                      value={generalForm.googlePlayUrl}
                      onChange={(e) => setGeneralForm({ ...generalForm, googlePlayUrl: e.target.value })}
                      className="w-full bg-black/60 border border-emerald-500/40 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-tech text-primary uppercase mb-1 flex items-center gap-1.5 font-bold">
                      <Monitor className="w-4 h-4" /> Windows PC Build File Direct Link (.EXE / .ZIP):
                    </label>
                    <input
                      type="text"
                      placeholder="Paste your PC build URL here..."
                      value={generalForm.pcDownloadUrl}
                      onChange={(e) => handleGeneralChange('pcDownloadUrl', e.target.value)}
                      className="w-full bg-black/60 border border-primary/40 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block font-tech text-primary uppercase mb-1 flex items-center gap-1.5 font-bold">
                      <FileText className="w-4 h-4" /> Select Local PC Installer (.exe)
                    </label>
                    <input
                      type="file"
                      accept=".exe,.zip"
                      onChange={handlePcInstallerFile}
                      className="w-full bg-black/60 border border-primary/40 rounded-xl px-3 py-2 text-white file:bg-primary file:text-black file:px-3 file:py-2 file:rounded-xl"
                    />
                    {localPcInstaller && (
                      <div className="text-sm text-emerald-300">
                        Selected file: {localPcInstaller.name} ({(localPcInstaller.size / (1024 * 1024)).toFixed(1)} MB)
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block font-tech text-accent uppercase mb-1 flex items-center gap-1.5 font-bold">
                      <Download className="w-4 h-4" /> Direct Standalone Android APK File Link (.APK):
                    </label>
                    <input
                      type="text"
                      placeholder="Paste your APK build URL here..."
                      value={generalForm.apkDownloadUrl}
                      onChange={(e) => setGeneralForm({ ...generalForm, apkDownloadUrl: e.target.value })}
                      className="w-full bg-black/60 border border-accent/40 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-tech text-gray-400 uppercase mb-1">Version Number:</label>
                      <input
                        type="text"
                        value={generalForm.version}
                        onChange={(e) => setGeneralForm({ ...generalForm, version: e.target.value })}
                        className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-tech text-gray-400 uppercase mb-1">Release Date:</label>
                      <input
                        type="text"
                        value={generalForm.releaseDate}
                        onChange={(e) => setGeneralForm({ ...generalForm, releaseDate: e.target.value })}
                        className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-tech text-gray-400 uppercase mb-1">File Size:</label>
                      <input
                        type="text"
                        value={generalForm.fileSize}
                        onChange={(e) => setGeneralForm({ ...generalForm, fileSize: e.target.value })}
                        className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSaveGeneral}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-black font-extrabold font-display uppercase tracking-wider"
                >
                  <Save className="w-4 h-4" /> Save Game Build Links
                </button>
              </div>
            )}

            {/* TAB 3: FOUNDERS (ASOSCHILAR) */}
            {activeTab === 'founders' && (
              <div className="space-y-6">
                <h4 className="text-sm font-bold font-display text-primary uppercase border-b border-white/10 pb-2">
                  3. Asoschilar Roster (Founders Management)
                </h4>

                <form onSubmit={handleCreateFounder} className="glass-card p-4 rounded-2xl border border-white/10 space-y-3">
                  <span className="font-tech text-accent uppercase font-bold block">Yangi Asoschi Qo'shish:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Founder Ismi..."
                      value={newFounderName}
                      onChange={(e) => setNewFounderName(e.target.value)}
                      className="bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Lavozimi (Role)..."
                      value={newFounderRole}
                      onChange={(e) => setNewFounderRole(e.target.value)}
                      className="bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Foto URL..."
                    value={newFounderPhoto}
                    onChange={(e) => setNewFounderPhoto(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                  />

                  <input
                    type="text"
                    placeholder="Hikmatli so'zi (Quote)..."
                    value={newFounderQuote}
                    onChange={(e) => setNewFounderQuote(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                  />

                  <textarea
                    rows={2}
                    placeholder="Asoschi haqida biografiya..."
                    value={newFounderBio}
                    onChange={(e) => setNewFounderBio(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                  />

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-black font-extrabold font-display uppercase"
                  >
                    <Plus className="w-4 h-4" /> Add Founder Profile
                  </button>
                </form>

                <div className="space-y-3">
                  <span className="font-tech text-gray-400 uppercase font-bold block">Current Founders Roster:</span>
                  {founders.map((f) => (
                    <div key={f.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                      <div>
                        <span className="font-bold text-white">{f.name}</span>
                        <span className="ml-2 text-xs text-primary font-tech">({f.role})</span>
                      </div>
                      <button
                        onClick={() => deleteFounder(f.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: NEWS & FILES */}
            {activeTab === 'news' && (
              <div className="space-y-6">
                <h4 className="text-sm font-bold font-display text-primary uppercase border-b border-white/10 pb-2">
                  4. Publish News & Attach Update Files (.exe / .pdf / .apk)
                </h4>

                <form onSubmit={handleCreateNews} className="glass-card p-4 rounded-2xl border border-white/10 space-y-4">
                  <span className="font-tech text-accent uppercase font-bold block">Create New Article & Attachment:</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Article Title..."
                      value={newNewsTitle}
                      onChange={(e) => setNewNewsTitle(e.target.value)}
                      className="bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Category (e.g. GAME UPDATE)..."
                      value={newNewsCategory}
                      onChange={(e) => setNewNewsCategory(e.target.value)}
                      className="bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Cover Image URL..."
                    value={newNewsImage}
                    onChange={(e) => setNewNewsImage(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                  />

                  <textarea
                    rows={2}
                    placeholder="Summary text..."
                    value={newNewsSummary}
                    onChange={(e) => setNewNewsSummary(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                  />

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-[11px] font-tech text-primary font-bold flex items-center gap-1">
                      <Paperclip className="w-3.5 h-3.5" /> Attach Downloadable File (Optional):
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="File Display Name (e.g. Patch_1.4.2.apk)..."
                        value={newNewsFileName}
                        onChange={(e) => setNewNewsFileName(e.target.value)}
                        className="bg-black/60 border border-white/20 rounded-xl px-3 py-1.5 text-white"
                      />
                      <input
                        type="text"
                        placeholder="File Direct URL / Path..."
                        value={newNewsFileUrl}
                        onChange={(e) => setNewNewsFileUrl(e.target.value)}
                        className="bg-black/60 border border-white/20 rounded-xl px-3 py-1.5 text-white"
                      />
                      <input
                        type="text"
                        placeholder="File Size (e.g. 1.2 GB)..."
                        value={newNewsFileSize}
                        onChange={(e) => setNewNewsFileSize(e.target.value)}
                        className="bg-black/60 border border-white/20 rounded-xl px-3 py-1.5 text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-black font-extrabold font-display uppercase"
                  >
                    <Plus className="w-4 h-4" /> Publish News Article
                  </button>
                </form>

                <div className="space-y-3">
                  <span className="font-tech text-gray-400 uppercase font-bold block">Published Articles:</span>
                  {news.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <span className="text-[10px] font-tech text-primary uppercase font-bold mr-2">[{item.category}]</span>
                        <span className="font-bold text-white">{item.title}</span>
                        {item.attachment && (
                          <span className="ml-3 text-[10px] font-tech text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            📎 {item.attachment.name} ({item.attachment.size})
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => deleteNewsItem(item.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: SUPERCARS */}
            {activeTab === 'cars' && (
              <div className="space-y-6">
                <h4 className="text-sm font-bold font-display text-primary uppercase border-b border-white/10 pb-2">
                  5. Manage Supercars Roster
                </h4>

                <form onSubmit={handleCreateCar} className="glass-card p-4 rounded-2xl border border-white/10 space-y-4">
                  <span className="font-tech text-accent uppercase font-bold block">Add New Supercar to Showcase:</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Car Name (e.g. UBT BUGATTI V12)..."
                      value={newCarName}
                      onChange={(e) => setNewCarName(e.target.value)}
                      className="bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Brand (e.g. UBT RACING WORKS)..."
                      value={newCarBrand}
                      onChange={(e) => setNewCarBrand(e.target.value)}
                      className="bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Image URL..."
                      value={newCarImg}
                      onChange={(e) => setNewCarImg(e.target.value)}
                      className="bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <input
                      type="text"
                      placeholder="Top Speed (e.g. 400 km/h)"
                      value={newCarSpeed}
                      onChange={(e) => setNewCarSpeed(e.target.value)}
                      className="bg-black/60 border border-white/20 rounded-xl px-3 py-1.5 text-white"
                    />
                    <input
                      type="text"
                      placeholder="0-100 km/h (e.g. 1.9 sec)"
                      value={newCarAccel}
                      onChange={(e) => setNewCarAccel(e.target.value)}
                      className="bg-black/60 border border-white/20 rounded-xl px-3 py-1.5 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Horsepower (e.g. 1,600 HP)"
                      value={newCarPower}
                      onChange={(e) => setNewCarPower(e.target.value)}
                      className="bg-black/60 border border-white/20 rounded-xl px-3 py-1.5 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Weight (e.g. 1,200 kg)"
                      value={newCarWeight}
                      onChange={(e) => setNewCarWeight(e.target.value)}
                      className="bg-black/60 border border-white/20 rounded-xl px-3 py-1.5 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Drive (e.g. AWD)"
                      value={newCarDrive}
                      onChange={(e) => setNewCarDrive(e.target.value)}
                      className="bg-black/60 border border-white/20 rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-black font-extrabold font-display uppercase"
                  >
                    <Plus className="w-4 h-4" /> Add Supercar
                  </button>
                </form>

                <div className="space-y-3">
                  <span className="font-tech text-gray-400 uppercase font-bold block">Current Garage Roster:</span>
                  {cars.map((car) => (
                    <div key={car.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <span className="font-bold text-white">{car.name}</span>
                        <span className="ml-2 text-xs text-primary font-tech">({car.speed} &bull; {car.power})</span>
                      </div>
                      <button
                        onClick={() => deleteCarItem(car.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: FAQS */}
            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <h4 className="text-sm font-bold font-display text-primary uppercase border-b border-white/10 pb-2">
                  6. Manage FAQs
                </h4>

                <form onSubmit={handleCreateFaq} className="glass-card p-4 rounded-2xl border border-white/10 space-y-3">
                  <input
                    type="text"
                    placeholder="Question..."
                    value={newFaqQ}
                    onChange={(e) => setNewFaqQ(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                  />
                  <textarea
                    rows={2}
                    placeholder="Answer..."
                    value={newFaqA}
                    onChange={(e) => setNewFaqA(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-white"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-black font-extrabold font-display uppercase"
                  >
                    <Plus className="w-4 h-4" /> Add FAQ
                  </button>
                </form>

                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-4">
                      <div>
                        <span className="font-bold text-white block mb-1">{faq.q}</span>
                        <p className="text-xs text-gray-400 font-light">{faq.a}</p>
                      </div>
                      <button
                        onClick={() => deleteFaqItem(faq.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
