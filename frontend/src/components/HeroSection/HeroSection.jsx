// src/components/HeroSection/HeroSection.jsx
import { useState } from 'react';
import { fetchLatestWarta, fetchWorshipSchedules } from '../../api/publicContentApi';

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [loadingSchedules, setLoadingSchedules] = useState(false);

  const handleOpenSchedules = async () => {
    setIsModalOpen(true);
    if (schedules.length === 0) {
      setLoadingSchedules(true);
      try {
        const result = await fetchWorshipSchedules();
        if (result.success) {
          setSchedules(result.data || []);
        }
      } catch (error) {
        console.error("Gagal memuat jadwal ibadah:", error);
      } finally {
        setLoadingSchedules(false);
      }
    }
  };

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
            <button
              onClick={handleOpenSchedules}
              className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-3 rounded-md font-body font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Jadwal Ibadah
            </button>
            <button
              onClick={async () => {
                const result = await fetchLatestWarta();
                if (result.success && result.data?.file_url) {
                  window.open(result.data.file_url, '_blank');
                } else {
                  alert('Warta minggu ini belum tersedia.');
                }
              }}
              className="bg-surface-container-highest text-on-primary-fixed-variant px-8 py-3 rounded-md font-body font-semibold hover:bg-surface-variant transition-colors flex items-center gap-2"
            >
              Download Warta Minggu Ini
              <span className="material-symbols-outlined text-sm">download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Worship Schedules Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="relative bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center p-6 border-b border-outline-variant">
              <h2 className="font-headline text-2xl font-bold text-primary">Jadwal Ibadah</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {loadingSchedules ? (
                <div className="text-center py-12 animate-pulse text-primary font-body">Memuat jadwal...</div>
              ) : schedules.length > 0 ? (
                <div className="grid gap-4">
                  {schedules.map((schedule) => (
                    <div 
                      key={schedule.id}
                      className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/50 transition-colors"
                    >
                      <h3 className="font-headline text-lg font-bold text-primary mb-3">{schedule.name}</h3>
                      <div className="flex flex-wrap gap-6 text-sm text-on-surface-variant font-body">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-base text-secondary">schedule</span>
                          {schedule.schedule_time}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-base text-secondary">location_on</span>
                          {schedule.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-on-surface-variant font-body italic">Belum ada jadwal yang terdaftar.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
