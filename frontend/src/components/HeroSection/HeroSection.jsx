// src/components/HeroSection/HeroSection.jsx
import { useState } from 'react';
import { fetchLatestWarta, fetchWorshipSchedules } from '../../api/publicContentApi';

const HeroSection = ({ hero, churchName }) => {
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
    <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden bg-surface-container-low md:min-h-[620px]">
      <div className="absolute inset-0 z-0">
        <img
          src={hero?.imageUrl || "/images/hkbpkernolong.jpg"}
          alt="Church congregation"
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/25"></div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-5 py-20 md:grid-cols-[0.62fr_0.38fr] md:px-8">
        <div className="max-w-3xl space-y-5">
          <p className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            {churchName || "HKBP Kernolong"}
          </p>
          <h1 className="font-headline text-4xl font-bold leading-[1.08] tracking-tight text-primary sm:text-5xl md:text-6xl">
            {hero?.title || "Selamat Datang di HKBP Kernolong"}
          </h1>
          <p className="max-w-xl font-body text-base leading-8 text-on-surface-variant md:text-lg">
            {hero?.subtitle || "Membangun iman, harapan, dan kasih dalam persekutuan yang hidup."}
          </p>
          <div className="flex flex-wrap gap-3 pt-3">
            <button
              onClick={handleOpenSchedules}
              className="cursor-pointer rounded-lg bg-primary px-6 py-3 font-body text-sm font-bold text-on-primary shadow-lg shadow-primary/15 transition-all hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {hero?.primaryButtonText || "Jadwal Ibadah"}
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
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-surface-container-highest px-6 py-3 font-body text-sm font-bold text-on-primary-fixed-variant shadow-sm transition-all hover:-translate-y-0.5 hover:bg-surface-variant hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {hero?.secondaryButtonText || "Download Warta Minggu Ini"}
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
          
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-surface-container-lowest shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between border-b border-outline-variant p-6">
              <h2 className="font-headline text-2xl font-bold text-primary">Jadwal Ibadah</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
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
