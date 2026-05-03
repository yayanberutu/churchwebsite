// src/components/UpcomingEvents/UpcomingEvents.jsx
import { useEffect, useMemo, useState } from 'react';
import {
  fetchCalendarActivitiesByDate,
  fetchCalendarActivityDates,
  fetchUpcomingActivities,
} from '../../api/publicContentApi';

const toDateKey = (date) => {
  if (typeof date === 'string') return date.split('T')[0];
  return date.toISOString().slice(0, 10);
};

const formatDate = (dateStr) => {
  const [year, month, day] = toDateKey(dateStr).split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return {
    day: String(date.getDate()),
    month: date.toLocaleString('id-ID', { month: 'short' }).toUpperCase(),
    long: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
  };
};

const monthKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(toDateKey(new Date()));
  const [eventDates, setEventDates] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [calendarError, setCalendarError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const result = await fetchUpcomingActivities();
        if (result.success) setEvents(result.data || []);
      } catch (error) {
        console.error("Gagal memuat kegiatan mendatang:", error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  useEffect(() => {
    if (!isCalendarOpen) return;
    const loadMarkers = async () => {
      const result = await fetchCalendarActivityDates(monthKey(calendarMonth));
      if (result.success) setEventDates(result.data || []);
    };
    loadMarkers();
  }, [calendarMonth, isCalendarOpen]);

  useEffect(() => {
    if (!isCalendarOpen || !selectedDate) return;
    const loadSelectedDate = async () => {
      try {
        setCalendarLoading(true);
        setCalendarError(null);
        const result = await fetchCalendarActivitiesByDate(selectedDate);
        if (result.success) {
          setSelectedEvents(result.data || []);
        } else {
          setCalendarError(result.message);
        }
      } finally {
        setCalendarLoading(false);
      }
    };
    loadSelectedDate();
  }, [selectedDate, isCalendarOpen]);

  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const first = new Date(year, month, 1);
    const startOffset = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return [
      ...Array.from({ length: startOffset }, () => null),
      ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
    ];
  }, [calendarMonth]);

  const openCalendar = (dateKey = toDateKey(new Date())) => {
    const [year, month, day] = dateKey.split('-').map(Number);
    setSelectedDate(dateKey);
    setCalendarMonth(new Date(year, month - 1, day));
    setIsCalendarOpen(true);
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

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-12">
          <div>
            <h2 className="font-headline text-4xl font-bold text-primary tracking-tight">Kegiatan Mendatang</h2>
            <p className="font-body text-on-surface-variant mt-2 text-lg">Jangan lewatkan momen kebersamaan dan pelayanan kami.</p>
          </div>
          <button onClick={() => openCalendar()} className="text-primary font-body font-semibold hover:text-secondary transition-colors flex items-center gap-2 group">
            Lihat Semua Kalender
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">calendar_month</span>
          </button>
        </div>

        {events.length === 0 ? (
          <div className="rounded-xl bg-surface-container-low p-10 text-center text-on-surface-variant">
            Belum ada kegiatan mendatang.
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event) => {
              const { day, month } = formatDate(event.date);
              return (
                <button
                  key={event.id}
                  onClick={() => openCalendar(toDateKey(event.date))}
                  className="w-full text-left group flex items-center gap-6 p-6 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all shadow-sm"
                >
                  <div className="flex flex-col items-center justify-center min-w-[84px] h-[84px] bg-primary text-on-primary rounded-xl shadow-md">
                    <span className="text-3xl font-bold font-headline leading-none">{day}</span>
                    <span className="text-xs font-medium font-body tracking-wider uppercase opacity-85">{month}</span>
                  </div>
                  <div className="flex-grow space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-headline text-xl md:text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
                        {event.title}
                      </h3>
                      {event.relative_date_label && (
                        <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold">
                          {event.relative_date_label}
                        </span>
                      )}
                    </div>
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
                  <span className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-outline-variant text-primary group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-all material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {isCalendarOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCalendarOpen(false)} />
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-surface-container-lowest p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline text-2xl font-bold text-primary">Kalender Kegiatan Gereja</h3>
              <button onClick={() => setIsCalendarOpen(false)} className="w-10 h-10 rounded-full hover:bg-surface-container-high text-on-surface-variant">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))} className="px-3 py-2 rounded-lg hover:bg-surface-container-high">
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <p className="font-headline text-xl font-bold text-primary">
                    {calendarMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                  </p>
                  <button onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))} className="px-3 py-2 rounded-lg hover:bg-surface-container-high">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-on-surface/50 mb-2">
                  {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((dayName) => <div key={dayName}>{dayName}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((date, index) => {
                    if (!date) return <div key={`blank-${index}`} />;
                    const key = toDateKey(date);
                    const isSelected = key === selectedDate;
                    const hasEvent = eventDates.includes(key);
                    const isToday = key === toDateKey(new Date());
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedDate(key)}
                        className={`relative min-h-12 rounded-xl text-sm font-bold transition-all ${isSelected ? 'bg-primary text-white' : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface'} ${isToday && !isSelected ? 'ring-2 ring-primary/30' : ''}`}
                      >
                        {date.getDate()}
                        {hasEvent && <span className={`absolute bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${isSelected ? 'bg-white' : 'bg-secondary'}`} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-xl bg-surface-container-low p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Tanggal Terpilih</p>
                <h4 className="font-headline text-xl font-bold text-on-surface mb-4">{formatDate(selectedDate).long}</h4>
                {calendarLoading ? (
                  <p className="text-sm text-on-surface-variant animate-pulse">Memuat kegiatan...</p>
                ) : calendarError ? (
                  <p className="text-sm text-secondary">{calendarError}</p>
                ) : selectedEvents.length === 0 ? (
                  <p className="text-sm text-on-surface-variant">
                    {new Date(selectedDate) < new Date(toDateKey(new Date())) ? 'Tidak ada kegiatan pada tanggal ini. Tanggal ini sudah berlalu.' : 'Belum ada kegiatan pada tanggal ini.'}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {selectedEvents.map((event) => (
                      <div key={event.id} className={`rounded-xl p-4 ${event.is_past ? 'bg-white/50 text-on-surface/60' : 'bg-white text-on-surface'}`}>
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <h5 className="font-bold text-primary">{event.title}</h5>
                          {(event.status_label || event.relative_date_label) && (
                            <span className="shrink-0 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">
                              {event.status_label || event.relative_date_label}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-on-surface-variant">{event.time_string} • {event.location}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UpcomingEvents;
