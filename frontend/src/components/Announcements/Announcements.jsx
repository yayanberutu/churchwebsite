// src/components/Announcements/Announcements.jsx
import React from 'react';

const MOCK_ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Pendaftaran Baptisan Kudus Anak Gelombang II",
    target_audience: "Semua",
    snippet: "Dibuka pendaftaran untuk baptisan kudus yang akan dilaksanakan pada akhir bulan Desember...",
  },
  {
    id: 2,
    title: "Latihan Paduan Suara Gabungan Ina",
    target_audience: "Kaum Ibu",
    snippet: "Mengundang seluruh anggota seksi perempuan untuk hadir dalam latihan rutin persiapan Natal...",
  },
  {
    id: 3,
    title: "Gathering Akhir Tahun NHKBP Kernolong",
    target_audience: "Pemuda",
    snippet: "Kebersamaan pemuda-pemudi dalam rangka mempererat tali persaudaraan menyambut tahun baru...",
  },
];

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
          {MOCK_ANNOUNCEMENTS.map((item) => (
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
                {item.snippet}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Announcements;
