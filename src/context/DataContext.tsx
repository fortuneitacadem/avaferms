import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SiteSettings, NewsItem, CarItem, FaqItem, DownloadMirror, FounderItem } from '../types/cms';

interface DataContextType {
  settings: SiteSettings;
  founders: FounderItem[];
  news: NewsItem[];
  cars: CarItem[];
  faqs: FaqItem[];
  mirrors: DownloadMirror[];
  isAdminLoggedIn: boolean;
  isEditModeActive: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  toggleEditMode: () => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  localPcInstaller: File | null;
  localPcInstallerUrl: string | null;
  setLocalPcInstaller: (file: File | null) => void;
  addFounder: (founder: Omit<FounderItem, 'id'>) => void;
  updateFounder: (id: string, updated: Partial<FounderItem>) => void;
  deleteFounder: (id: string) => void;
  addNewsItem: (item: Omit<NewsItem, 'id'>) => void;
  updateNewsItem: (id: string, updated: Partial<NewsItem>) => void;
  deleteNewsItem: (id: string) => void;
  addCarItem: (car: Omit<CarItem, 'id'>) => void;
  updateCarItem: (id: string, updated: Partial<CarItem>) => void;
  deleteCarItem: (id: string) => void;
  updateFaqItem: (id: string, updated: Partial<FaqItem>) => void;
  addFaqItem: (faq: Omit<FaqItem, 'id'>) => void;
  deleteFaqItem: (id: string) => void;
  resetDefaults: () => void;
}

const DEFAULT_SETTINGS: SiteSettings = {
  logoUrl: '/ubt-logo.jpg',
  logoSize: 'md',
  logoPosition: 'center',
  gameTitle1: 'HYPER CAR',
  gameTitle2: 'UBT-TEAM',
  gameSubtitle: "UBTTeam jamoasidan real avtopoyga simulyatori — Shiddatli V12 dvigatel fizikasi, Ray-Tracing grafikasi, Toshkent tungi ko'chalari va 32-pleyer multiplayer.",
  version: 'v1.4.2',
  releaseDate: 'July 26, 2026',
  fileSize: '18.4 GB (PC) / 1.2 GB (Android)',
  downloadCount: 1248930,
  googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.UBTTeam.HyperCar&referrer=utm_source%3Dapkpure.com',
  pcDownloadUrl: '#',
  pcDownloadFileName: 'HyperCar_UBT-Team_Setup.exe',
  apkDownloadUrl: '#',
  companyName: 'UBTTeam Games Studio',
  companyDescription: "UBTTeam (com.UBTTeam.HyperCar) — O'zbekistondagi yetakchi mobil va PC avtopoyga simulyatsiyalarini yaratuvchi rasmiy gamedev studiya.",
  companyMission: "Bizning oliy maqsadimiz — Har bir poygachi uchun eng yuqori darajadagi realista avtosimulyatorni taqdim etish. Uddalab bo'lmas topshiriq yo'q!",
  telegramLink: 'https://t.me',
  youtubeLink: 'https://youtube.com',
  discordLink: 'https://discord.com',
  supportEmail: 'support@hypercar-ubt.com',
};

const DEFAULT_FOUNDERS: FounderItem[] = [
  {
    id: 'f-1',
    name: 'Sardorbek (UBTTeam)',
    role: 'Loyiha Asoschisi va Bosh Muhandis (Founder & Lead Engine Dev)',
    photo: '/ubt-logo.jpg',
    quote: "Bizning bosh maqsadimiz — O'zbekiston poyga ishqibozlari uchun dunyodagi eng mukammal avtosimulyatorni yaratish. Uddalab bo'lmas topshiriq yo'q!",
    bio: 'Hyper Car UBT-Team loyihasiga 2024-yilda asos solingan. 50+ dan ortiq muhandis va dasturchilar jamoasi bilan Unreal Engine 5.4 va Android platformasida fotorealistik poyga simulyatsiyasi ishlab chiqildi.',
  },
  {
    id: 'f-2',
    name: 'UBT-Team Co-Founder',
    role: 'Hammuassis va Kreativ Direktor (Co-Founder & Creative Director)',
    photo: '/ubt-logo.jpg',
    quote: "Har bir burilish va dvigatel ovozi haqiqiy poygachi hissiyotini berishi shart.",
    bio: 'Toshkent va Tokio tungi avtomagistrallarining 3D vizual va 4K grafik arxitekturasiga rahbarlik qilgan.',
  }
];

const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 'patch-1-4',
    title: 'Patch 1.4.2: Tashkent Night Expressway Expansion',
    date: 'July 24, 2026',
    category: 'GAME UPDATE',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    summary: 'Added 45 km of new Tashkent expressway roads, enhanced rain particle puddles, and 3 new custom tuned hypercars.',
    attachment: {
      name: 'HyperCar_UBT-Team_v1.4.2_Setup.exe',
      url: '#',
      size: '18.4 GB',
    },
  },
  {
    id: 'tournament',
    title: 'UBT-Team Global Championship Season 3 Registration Open',
    date: 'July 18, 2026',
    category: 'ESPORTS',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
    summary: 'Compete against the top 32 racers worldwide for a $50,000 prize pool and exclusive customized hypercar liveries.',
    attachment: {
      name: 'Esports_Rulebook_2026.pdf',
      url: '#',
      size: '1.8 MB',
    },
  },
  {
    id: 'dlss-update',
    title: 'NVIDIA DLSS 3.5 & Path Tracing Integration Guide',
    date: 'July 10, 2026',
    category: 'TECH BLOG',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
    summary: 'Discover how our customized Unreal Engine 5.4 graphics pipeline achieves over 144 FPS with full Ray Tracing.',
  },
];

const DEFAULT_CARS: CarItem[] = [
  {
    id: 'hyperion',
    name: 'APEX HYPERION V12',
    brand: 'UBT RACING WORKS',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=85',
    speed: '395 km/h',
    accel: '2.1 sec',
    power: '1,450 HP',
    weight: '1,280 kg',
    drive: 'AWD Quad-Motor',
    description: 'The pinnacle of aerodynamic carbon craftsmanship. Equipped with twin-turbocharged quad V12 hybrid drive.',
    colors: ['#00E5FF', '#5B5BFF', '#FF9F00', '#111827', '#FF2E55'],
  },
  {
    id: 'tashkent-gtr',
    name: 'UZBEKISTAN GT-R UBT-X',
    brand: 'UBT CONCEPT',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=85',
    speed: '380 km/h',
    accel: '2.3 sec',
    power: '1,280 HP',
    weight: '1,350 kg',
    drive: 'RWD Drift Stance',
    description: 'Custom tuned specifically for Tashkent Night Expressway street warfare and high-RPM drift precision.',
    colors: ['#FF9F00', '#00E5FF', '#10B981', '#111827', '#E11D48'],
  },
  {
    id: 'valkyrie',
    name: 'PHANTOM VALKYRIE RS',
    brand: 'CYBER DYNAMICS',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=85',
    speed: '410 km/h',
    accel: '1.9 sec',
    power: '1,600 HP',
    weight: '1,190 kg',
    drive: 'AWD Torque Vectoring',
    description: 'Ultra-lightweight titanium chassis pushing boundary performance on alpine hairpins.',
    colors: ['#5B5BFF', '#00E5FF', '#F59E0B', '#8B5CF6', '#111827'],
  },
];

const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    q: "Hyper Car UBT-Team o'yinini qayerdan yuklab olish mumkin?",
    a: "O'yinni rasmiy Google Play Store orqali (Android smartfonlar uchun) hamda ushbu rasmiy veb-saytimizdan Windows PC versiyasini bepul yuklab olishingiz mumkin."
  },
  {
    id: 'faq-2',
    q: "O'yinda qaysi boshqaruv moslamalari va rullar qo'llab-quvvatlanadi?",
    a: "Hyper Car UBT-Team o'yinida Logitech G29/G923, Fanatec Direct Drive, Thrustmaster rullari, Xbox/PlayStation geympadlari va Android sensorli boshqaruv native qo'llab-quvvatlanadi."
  },
  {
    id: 'faq-3',
    q: "Windows PC va Android platformasida o'yin bepulmi?",
    a: "Ha! Hyper Car UBT-Team o'yini 100% bepul. Barcha 50+ giperkarlar, Toshkent tungi avtomagistrali va 32-pleyerli multiplayer rejimlari ochiq."
  },
  {
    id: 'faq-4',
    q: "Multiplayer serverlar qayerda joylashgan?",
    a: "Bizning past latency (15ms) ga ega serverlarimiz Toshkent (O'zbekiston), Frankfurt (Yevropa) va Singapurda (Osiyo) uzluksiz ishlamoqda."
  }
];

const DEFAULT_MIRRORS: DownloadMirror[] = [
  { id: 'm-0', name: 'Official Google Play Store (Android App)', speedLabel: 'Official Play Store', url: 'https://play.google.com/store/apps/details?id=com.UBTTeam.HyperCar&referrer=utm_source%3Dapkpure.com', type: 'playstore' },
  { id: 'm-1', name: 'Uzbekistan Local High-Speed CDN (PC Build)', speedLabel: '⚡ 1,000 Mbps', url: '#', type: 'uz' },
  { id: 'm-2', name: 'Global Cloud CDN Mirror', speedLabel: 'Global Mirror', url: '#', type: 'global' },
  { id: 'm-3', name: 'P2P Torrent Mirror (.EXE / .APK)', speedLabel: 'Peer-to-Peer', url: '#', type: 'torrent' },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('ubt_site_settings_v2');
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
  });

  const [founders, setFounders] = useState<FounderItem[]>(() => {
    const saved = localStorage.getItem('ubt_site_founders_v2');
    return saved ? JSON.parse(saved) : DEFAULT_FOUNDERS;
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('ubt_site_news_v2');
    return saved ? JSON.parse(saved) : DEFAULT_NEWS;
  });

  const [cars, setCars] = useState<CarItem[]>(() => {
    const saved = localStorage.getItem('ubt_site_cars_v2');
    return saved ? JSON.parse(saved) : DEFAULT_CARS;
  });

  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    const saved = localStorage.getItem('ubt_site_faqs_v2');
    return saved ? JSON.parse(saved) : DEFAULT_FAQS;
  });

  const [mirrors, setMirrors] = useState<DownloadMirror[]>(() => {
    const saved = localStorage.getItem('ubt_site_mirrors_v2');
    return saved ? JSON.parse(saved) : DEFAULT_MIRRORS;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('ubt_admin_auth') === 'true';
  });

  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false);
  const [localPcInstaller, setLocalPcInstaller] = useState<File | null>(null);
  const [localPcInstallerUrl, setLocalPcInstallerUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!localPcInstaller) {
      setLocalPcInstallerUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(localPcInstaller);
    setLocalPcInstallerUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
      setLocalPcInstallerUrl(null);
    };
  }, [localPcInstaller]);

  useEffect(() => {
    localStorage.setItem('ubt_site_settings_v2', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('ubt_site_founders_v2', JSON.stringify(founders));
  }, [founders]);

  useEffect(() => {
    localStorage.setItem('ubt_site_news_v2', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('ubt_site_cars_v2', JSON.stringify(cars));
  }, [cars]);

  useEffect(() => {
    localStorage.setItem('ubt_site_faqs_v2', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('ubt_site_mirrors_v2', JSON.stringify(mirrors));
  }, [mirrors]);

  const loginAdmin = (pass: string): boolean => {
    if (pass === 'ubt2026' || pass === 'admin' || pass === 'ubt') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('ubt_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setIsEditModeActive(false);
    localStorage.removeItem('ubt_admin_auth');
  };

  const toggleEditMode = () => {
    setIsEditModeActive((prev) => !prev);
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const addFounder = (founder: Omit<FounderItem, 'id'>) => {
    const newF: FounderItem = { ...founder, id: 'f-' + Date.now() };
    setFounders((prev) => [...prev, newF]);
  };

  const updateFounder = (id: string, updated: Partial<FounderItem>) => {
    setFounders((prev) => prev.map((f) => (f.id === id ? { ...f, ...updated } : f)));
  };

  const deleteFounder = (id: string) => {
    setFounders((prev) => prev.filter((f) => f.id !== id));
  };

  const addNewsItem = (item: Omit<NewsItem, 'id'>) => {
    const newItem: NewsItem = { ...item, id: 'news-' + Date.now() };
    setNews((prev) => [newItem, ...prev]);
  };

  const updateNewsItem = (id: string, updated: Partial<NewsItem>) => {
    setNews((prev) => prev.map((n) => (n.id === id ? { ...n, ...updated } : n)));
  };

  const deleteNewsItem = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  const addCarItem = (car: Omit<CarItem, 'id'>) => {
    const newCar: CarItem = { ...car, id: 'car-' + Date.now() };
    setCars((prev) => [...prev, newCar]);
  };

  const updateCarItem = (id: string, updated: Partial<CarItem>) => {
    setCars((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  };

  const deleteCarItem = (id: string) => {
    setCars((prev) => prev.filter((c) => c.id !== id));
  };

  const updateFaqItem = (id: string, updated: Partial<FaqItem>) => {
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...updated } : f)));
  };

  const addFaqItem = (faq: Omit<FaqItem, 'id'>) => {
    setFaqs((prev) => [...prev, { ...faq, id: 'faq-' + Date.now() }]);
  };

  const deleteFaqItem = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  const resetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    setFounders(DEFAULT_FOUNDERS);
    setNews(DEFAULT_NEWS);
    setCars(DEFAULT_CARS);
    setFaqs(DEFAULT_FAQS);
    setMirrors(DEFAULT_MIRRORS);
    localStorage.removeItem('ubt_site_settings_v2');
    localStorage.removeItem('ubt_site_founders_v2');
    localStorage.removeItem('ubt_site_news_v2');
    localStorage.removeItem('ubt_site_cars_v2');
    localStorage.removeItem('ubt_site_faqs_v2');
    localStorage.removeItem('ubt_site_mirrors_v2');
  };

  return (
    <DataContext.Provider
      value={{
        settings,
        founders,
        news,
        cars,
        faqs,
        mirrors,
        isAdminLoggedIn,
        isEditModeActive,
        loginAdmin,
        logoutAdmin,
        toggleEditMode,
        updateSettings,
        localPcInstaller,
        setLocalPcInstaller,
        localPcInstallerUrl,
        addFounder,
        updateFounder,
        deleteFounder,
        addNewsItem,
        updateNewsItem,
        deleteNewsItem,
        addCarItem,
        updateCarItem,
        deleteCarItem,
        updateFaqItem,
        addFaqItem,
        deleteFaqItem,
        resetDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
