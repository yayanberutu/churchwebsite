// src/components/HeroSection/HeroSection.jsx
import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[700px] flex items-center justify-center bg-surface-container-low overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hkbpkernolong.jpg"
          alt="Church congregation"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary tracking-tight leading-tight">
            Selamat Datang di HKBP Kernolong
          </h1>
          <p className="font-body text-lg text-on-surface-variant max-w-md leading-relaxed">
            Membangun iman, harapan, dan kasih dalam persekutuan yang hidup. Bergabunglah bersama kami dalam perjalanan rohani yang mendalam.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-3 rounded-md font-body font-semibold shadow-lg hover:shadow-xl transition-all">
              Jadwal Ibadah
            </button>
            <button
              onClick={() => {
                fetch('http://localhost:8080/api/v1/public/warta/latest/download')
                  .then(res => res.json())
                  .then(data => {
                    if (data.success && data.data?.file_url) {
                      window.open(data.data.file_url, '_blank');
                    } else {
                      alert('Warta minggu ini belum tersedia.');
                    }
                  })
                  .catch(() => alert('Gagal mengunduh warta. Coba lagi nanti.'));
              }}
              className="bg-surface-container-highest text-on-primary-fixed-variant px-8 py-3 rounded-md font-body font-semibold hover:bg-surface-variant transition-colors flex items-center gap-2"
            >
              Download Warta Minggu Ini
              <span className="material-symbols-outlined text-sm">download</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
