// src/components/DailyDevotional/DailyDevotional.jsx
import React, { useState, useEffect } from 'react';
import { fetchDailyDevotional } from '../../api/publicContentApi';

const DailyDevotional = () => {
  const [devotional, setDevotional] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDevotional = async () => {
      try {
        setLoading(true);
        const result = await fetchDailyDevotional();
        if (result.success) {
          setDevotional(result.data);
        }
      } catch (error) {
        console.error("Gagal memuat renungan harian:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDevotional();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-4xl mx-auto px-8 text-center animate-pulse">
          <p className="font-body text-primary">Memuat renungan video...</p>
        </div>
      </section>
    );
  }

  if (!devotional) return null;

  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-5xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4">Renungan Hari Ini</h2>
          <p className="font-body text-on-surface-variant text-lg max-w-2xl mx-auto italic">
            "{devotional.title}"
          </p>
        </div>
        
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-surface-container-lowest">
          <iframe
            src={devotional.youtube_url}
            title={devotional.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default DailyDevotional;
