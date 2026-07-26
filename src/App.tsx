import { useEffect, useState } from 'react';
import Lenis from 'lenis';

import { LanguageProvider } from './context/LanguageContext';
import { SoundProvider } from './context/SoundContext';
import { DataProvider } from './context/DataContext';

import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { GameModes } from './components/GameModes';
import { CarShowcase } from './components/CarShowcase';
import { FounderSection } from './components/FounderSection';
import { ScreenshotGallery } from './components/ScreenshotGallery';
import { TrailerModal } from './components/TrailerModal';
import { SystemRequirements } from './components/SystemRequirements';
import { NewsSection } from './components/NewsSection';
import { Roadmap } from './components/Roadmap';
import { DownloadSection } from './components/DownloadSection';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

// Admin CMS Components
import { AdminToolbar } from './components/Admin/AdminToolbar';
import { AdminLoginModal } from './components/Admin/AdminLoginModal';
import { AdminDashboardModal } from './components/Admin/AdminDashboardModal';

export function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#05070D] text-white selection:bg-primary selection:text-black overflow-x-hidden">
      {/* Top Floating Admin Toolbar (when logged in) */}
      <AdminToolbar onOpenDashboard={() => setIsAdminDashboardOpen(true)} />

      {/* Custom Cyber Cursor */}
      <CustomCursor />

      {/* Telemetry Preloader with Official Logo */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Navigation Bar */}
      <Navbar onOpenAdminLogin={() => setIsAdminLoginOpen(true)} />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenTrailer={() => setIsTrailerOpen(true)} />
        <Features />
        <GameModes />
        <CarShowcase />
        <FounderSection />
        <ScreenshotGallery />
        <SystemRequirements />
        <NewsSection />
        <Roadmap />
        <DownloadSection />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <TrailerModal isOpen={isTrailerOpen} onClose={() => setIsTrailerOpen(false)} />
      <AdminLoginModal isOpen={isAdminLoginOpen} onClose={() => setIsAdminLoginOpen(false)} />
      <AdminDashboardModal isOpen={isAdminDashboardOpen} onClose={() => setIsAdminDashboardOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <LanguageProvider>
        <SoundProvider>
          <AppContent />
        </SoundProvider>
      </LanguageProvider>
    </DataProvider>
  );
}
