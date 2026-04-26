// src/components/DailyVerse/DailyVerse.jsx
import React from 'react';

const DailyVerse = () => {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-4xl mx-auto px-8">
        <div className="surface-card rounded-xl p-12 relative overflow-hidden">
          <div className="absolute top-8 left-8 text-secondary/10">
            <span className="material-symbols-outlined text-8xl" style={{ fontSize: '8rem' }}>format_quote</span>
          </div>
          <div className="relative z-10 space-y-6 text-center">
            <h2 className="font-headline text-2xl text-secondary font-semibold uppercase tracking-widest">Ayat Harian</h2>
            <blockquote className="font-headline text-3xl md:text-5xl text-primary leading-tight font-medium italic">
              "Tetapi carilah dahulu Kerajaan Allah dan kebenarannya, maka semuanya itu akan ditambahkan kepadamu."
            </blockquote>
            <p className="font-body text-xl text-on-surface-variant font-medium">Matius 6:33</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyVerse;
