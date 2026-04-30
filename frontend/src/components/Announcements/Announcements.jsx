// src/components/Announcements/Announcements.jsx
import React, { useState, useEffect } from 'react';
import { fetchLatestAnnouncements } from '../../api/publicContentApi';

const getBadgeClasses = (target) => {
  switch (target) {
    case 'Semua':
      return 'bg-primary/10 text-primary';
    case 'Kaum Bapak':
      return 'bg-primary-container/10 text-on-primary-fixed-variant';
    case 'Kaum Ibu':
      return 'bg-secondary/10 text-secondary';
    case 'Pemuda':
      return 'bg-tertiary-container/10 text-on-tertiary-fixed-variant';
    case 'Remaja':
      return 'bg-tertiary-fixed-dim/20 text-tertiary';
    default:
      return 'bg-primary/10 text-primary';
  }
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        setLoading(true);
        const result = await fetchLatestAnnouncements();
        if (result.success) {
          setAnnouncements(result.data || []);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Gagal memuat pengumuman");
      } finally {
        setLoading(false);
      }
    };

    loadAnnouncements();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="font-body text-primary animate-pulse">Memuat pengumuman...</p>
        </div>
      </section>
    );
  }

  if (error) return null; // Hide section if error

  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline text-4xl font-bold text-primary tracking-tight">Pengumuman</h2>
            <p className="font-body text-on-surface-variant mt-2 text-lg">Informasi terkini untuk seluruh jemaat.</p>
          </div>
          <button className="text-primary font-body font-semibold hover:text-secondary transition-colors flex items-center gap-2 group">
            Lihat Semua
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {announcements.map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/30 hover:border-primary/50 transition-colors"
            >
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold font-body uppercase tracking-wider mb-4 ${getBadgeClasses(item.target_audience)}`}
              >
                {item.target_audience}
              </span>
              <h3 className="font-headline text-xl font-bold text-primary mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="font-body text-on-surface-variant text-sm line-clamp-2">
                {item.snippet || "Lihat detail pengumuman untuk informasi lebih lanjut."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Announcements;
