// src/components/UpcomingEvents/UpcomingEvents.jsx
import { useState, useEffect } from 'react';
import { fetchUpcomingActivities } from '../../api/publicContentApi';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const result = await fetchUpcomingActivities();
        if (result.success) {
          setEvents(result.data || []);
        }
      } catch (error) {
        console.error("Gagal memuat kegiatan mendatang:", error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString('id-ID', { month: 'short' }).toUpperCase();
    return { day, month };
  };

  if (loading) {
    return (
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="animate-pulse text-primary font-body">Memuat kegiatan mendatang...</p>
        </div>
      </section>
    );
  }

  if (events.length === 0) return null;

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline text-4xl font-bold text-primary tracking-tight">Kegiatan Mendatang</h2>
            <p className="font-body text-on-surface-variant mt-2 text-lg">Jangan lewatkan momen kebersamaan dan pelayanan kami.</p>
          </div>
          <button className="text-primary font-body font-semibold hover:text-secondary transition-colors flex items-center gap-2 group">
            Lihat Semua Kalender
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">calendar_month</span>
          </button>
        </div>

        <div className="space-y-6">
          {events.map((event) => {
            const { day, month } = formatDate(event.date);
            return (
              <div
                key={event.id}
                className="group flex items-center gap-8 p-6 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all cursor-pointer shadow-sm"
              >
                <div className="flex flex-col items-center justify-center min-w-[80px] h-[80px] bg-primary text-on-primary rounded-lg shadow-md">
                  <span className="text-2xl font-bold font-headline leading-none">{day}</span>
                  <span className="text-xs font-medium font-body tracking-wider uppercase opacity-80">{month}</span>
                </div>

                <div className="flex-grow space-y-1">
                  <h3 className="font-headline text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap gap-6 text-on-surface-variant font-body text-sm">
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">schedule</span>
                      {event.time_string}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">location_on</span>
                      {event.location}
                    </span>
                  </div>
                </div>

                <button className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-outline-variant text-primary hover:bg-primary hover:text-on-primary hover:border-primary transition-all">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
