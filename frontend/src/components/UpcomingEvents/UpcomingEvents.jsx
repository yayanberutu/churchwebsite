// src/components/UpcomingEvents/UpcomingEvents.jsx
import React from 'react';

const events = [
  {
    id: 1,
    title: "Ibadah Raya Minggu",
    category: "Ibadah Minggu",
    date: "Minggu, 12 Nov 2023",
    time: "09:00 WIB",
    location: "Gereja HKBP Kernolong",
    image: "/images/event1.png",
    categoryColor: "bg-secondary"
  },
  {
    id: 2,
    title: "Persekutuan Naposobulung",
    category: "Pemuda",
    date: "Sabtu, 18 Nov 2023",
    time: "18:00 WIB",
    location: "Ruang Serbaguna",
    image: "/images/event2.png",
    categoryColor: "bg-primary-container"
  },
  {
    id: 3,
    title: "Sermon & Pemahaman Alkitab",
    category: "Pendalaman Alkitab",
    date: "Rabu, 15 Nov 2023",
    time: "19:00 WIB",
    location: "Zoom Meeting",
    image: "/images/event3.png",
    categoryColor: "bg-tertiary-container"
  }
];

const UpcomingEvents = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline text-4xl font-bold text-primary tracking-tight">Kegiatan Mendatang</h2>
            <p className="font-body text-on-surface-variant mt-2 text-lg">Ikuti berbagai kegiatan persekutuan dan pelayanan.</p>
          </div>
          <button className="text-primary font-body font-semibold hover:text-secondary transition-colors flex items-center gap-2 group">
            Lihat Semua
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map(event => (
            <div key={event.id} className="bg-surface-container-lowest rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4">
                  <span className={`${event.categoryColor} text-on-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-body shadow-sm`}>
                    {event.category}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-headline text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-2 font-body text-sm text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">calendar_today</span>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">schedule</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">location_on</span>
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
