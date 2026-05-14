// src/components/MinistryActivities/MinistryActivities.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchLatestMinistryActivities } from '../../api/publicContentApi';

const MinistryActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        const result = await fetchLatestMinistryActivities();
        if (result.success) {
          setActivities(result.data || []);
        } else {
          setError(result.message);
        }
      } catch {
        setError("Gagal memuat kegiatan pelayanan");
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) {
    return (
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
          <div className="rounded-2xl bg-surface-container-low p-8">
            <p className="font-body text-primary animate-pulse">Memuat kegiatan pelayanan...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">Kegiatan Pelayanan Gereja</h2>
            <p className="mt-3 font-body text-base leading-7 text-on-surface-variant md:text-lg">Dokumentasi momen pelayanan dan kebersamaan jemaat.</p>
          </div>
          <Link to="/kegiatan-pelayanan" className="group inline-flex w-fit items-center gap-2 rounded-lg px-1 py-2 font-body font-bold text-primary transition-colors hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            Lihat Dokumentasi
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">collections</span>
          </Link>
        </div>

        {error ? (
          <div className="rounded-2xl bg-surface-container-low p-8 text-center text-on-surface-variant">
            Kegiatan pelayanan belum dapat dimuat saat ini.
          </div>
        ) : activities.length === 0 ? (
          <div className="rounded-2xl bg-surface-container-low p-8 text-center text-on-surface-variant">
            Belum ada dokumentasi kegiatan pelayanan.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {activities.map((activity) => (
              <Link
                key={activity.id}
                to={`/kegiatan-pelayanan/${activity.id}`}
                className="group block overflow-hidden rounded-2xl bg-surface-container-low shadow-sm ring-1 ring-outline-variant/10 transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <div className="relative aspect-video overflow-hidden bg-primary/10">
                  {activity.image_url ? (
                    <img
                      src={activity.image_url}
                      alt={activity.name || "Kegiatan pelayanan gereja"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-4xl">image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="material-symbols-outlined text-4xl text-white">visibility</span>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="mb-2 font-headline text-xl font-bold leading-tight text-primary transition-colors group-hover:text-secondary">
                    {activity.name || "Kegiatan Pelayanan"}
                  </h3>
                  <p className="line-clamp-3 font-body text-sm leading-7 text-on-surface-variant">
                    {activity.short_caption || activity.content || "Lihat dokumentasi kegiatan pelayanan gereja."}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors group-hover:text-secondary">
                    Lihat Detail
                    <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MinistryActivities;
