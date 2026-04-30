// src/components/MinistryActivities/MinistryActivities.jsx
import React, { useState, useEffect } from 'react';
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
      } catch (err) {
        setError("Gagal memuat kegiatan pelayanan");
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="font-body text-primary animate-pulse">Memuat kegiatan pelayanan...</p>
        </div>
      </section>
    );
  }

  if (error) return null; // Hide section if error

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline text-4xl font-bold text-primary tracking-tight">Kegiatan Pelayanan Gereja</h2>
            <p className="font-body text-on-surface-variant mt-2 text-lg">Dokumentasi momen-momen indah dalam pelayanan kami.</p>
          </div>
          <button className="text-primary font-body font-semibold hover:text-secondary transition-colors flex items-center gap-2 group">
            Lihat Dokumentasi
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">collections</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <div key={activity.id} className="group">
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 relative shadow-md">
                <img
                  src={activity.image_url}
                  alt={activity.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-4xl">visibility</span>
                </div>
              </div>
              <h3 className="font-headline text-xl font-bold text-primary mb-2">{activity.name}</h3>
              <p className="font-body text-on-surface-variant text-sm">{activity.short_caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MinistryActivities;
