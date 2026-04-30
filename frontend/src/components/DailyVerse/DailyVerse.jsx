// src/components/DailyVerse/DailyVerse.jsx
import React, { useState, useEffect } from 'react';
import { fetchDailyVerse } from '../../api/publicContentApi';

const DailyVerse = () => {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVerse = async () => {
      try {
        setLoading(true);
        const result = await fetchDailyVerse();
        if (result.success) {
          setVerse(result.data);
        }
      } catch (error) {
        console.error("Gagal memuat ayat harian:", error);
      } finally {
        setLoading(false);
      }
    };
    loadVerse();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-background flex justify-center">
        <div className="animate-pulse text-primary font-body">Memuat ayat harian...</div>
      </section>
    );
  }

  if (!verse) return null;

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-primary/20 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
        <span className="material-symbols-outlined text-secondary text-4xl mb-6 opacity-40">format_quote</span>
        
        <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl text-primary font-medium italic leading-relaxed mb-8">
          "{verse.content}"
        </h2>
        
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-px bg-secondary/30"></div>
          <p className="font-headline text-lg text-secondary font-bold tracking-widest uppercase">
            {verse.reference}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DailyVerse;
