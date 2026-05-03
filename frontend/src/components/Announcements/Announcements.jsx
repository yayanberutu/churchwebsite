// src/components/Announcements/Announcements.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      } catch {
        setError("Gagal memuat pengumuman");
      } finally {
        setLoading(false);
      }
    };

    loadAnnouncements();
  }, []);

  if (loading) {
    return (
      <section className="bg-surface-container-low py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
          <div className="rounded-2xl bg-surface-container-lowest p-8">
            <p className="font-body text-primary animate-pulse">Memuat pengumuman...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-surface-container-low py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">Pengumuman</h2>
            <p className="mt-3 font-body text-base leading-7 text-on-surface-variant md:text-lg">Informasi terkini untuk seluruh jemaat.</p>
          </div>
          <Link to="/pengumuman" className="group inline-flex w-fit items-center gap-2 rounded-lg px-1 py-2 font-body font-bold text-primary transition-colors hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            Lihat Semua
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>

        {error ? (
          <div className="rounded-2xl bg-surface-container-lowest p-8 text-center text-on-surface-variant shadow-sm">
            Pengumuman belum dapat dimuat saat ini.
          </div>
        ) : announcements.length === 0 ? (
          <div className="rounded-2xl bg-surface-container-lowest p-8 text-center text-on-surface-variant shadow-sm">
            Belum ada pengumuman terbaru.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {announcements.map((item) => (
              <Link
                key={item.id}
                to={`/pengumuman/${item.id}`}
                className="group flex min-h-full flex-col rounded-2xl bg-surface-container-lowest p-6 shadow-sm ring-1 ring-outline-variant/20 transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:p-7"
              >
                <span
                  className={`mb-4 inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${getBadgeClasses(item.target_audience)}`}
                >
                  {item.target_audience || "Jemaat"}
                </span>
                <h3 className="mb-3 font-headline text-xl font-bold leading-tight text-primary transition-colors group-hover:text-secondary">
                  {item.title || "Pengumuman Gereja"}
                </h3>
                <p className="line-clamp-3 overflow-hidden font-body text-sm leading-7 text-on-surface-variant">
                  {item.content_preview || item.content || "Lihat detail pengumuman untuk informasi lebih lanjut."}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors group-hover:text-secondary">
                  Lihat Detail
                  <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Announcements;
