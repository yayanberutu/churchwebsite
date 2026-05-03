// src/pages/Home/HomePage.jsx
import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import HeroSection from '../../components/HeroSection/HeroSection';
import DailyVerse from '../../components/DailyVerse/DailyVerse';
import UpcomingEvents from '../../components/UpcomingEvents/UpcomingEvents';
import Announcements from '../../components/Announcements/Announcements';
import MinistryActivities from '../../components/MinistryActivities/MinistryActivities';
import Footer from '../../components/Footer/Footer';
import { fetchSiteConfig } from '../../api/siteConfigApi';

const HomePage = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setLoading(true);
        const response = await fetchSiteConfig();
        if (response.success) {
          setConfig(response.data);
        } else {
          setError(response.message || "Failed to fetch site configuration");
        }
      } catch (err) {
        setError("An unexpected error occurred while loading the site.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="font-body text-primary font-medium">Memuat berkat...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-8">
        <div className="max-w-md w-full bg-surface-container-lowest p-8 rounded-xl shadow-lg text-center space-y-6">
          <span className="material-symbols-outlined text-error text-6xl">error_outline</span>
          <h2 className="font-headline text-2xl font-bold text-primary">Ups! Terjadi Kesalahan</h2>
          <p className="font-body text-on-surface-variant">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-on-primary px-6 py-2 rounded-md font-body font-semibold hover:opacity-90 transition-opacity"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        churchName={config?.churchName} 
        churchLogoUrl={config?.churchLogoUrl} 
        menus={config?.menus} 
      />
      <main className="flex-grow">
        <HeroSection hero={config?.homeHero} churchName={config?.churchName} />
        <DailyVerse />
        <UpcomingEvents />
        <Announcements />
        <MinistryActivities />
      </main>
      <Footer churchName={config?.churchName} />
    </div>
  );
};

export default HomePage;
