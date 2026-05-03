// src/components/DailyVerse/DailyVerse.jsx
import { useState, useEffect } from 'react';
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

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('embed')) return url;
    let videoId = '';
    if (url.includes('youtu.be')) {
      videoId = url.split('/').pop().split('?')[0];
    } else if (url.includes('youtube.com')) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get('v');
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  if (loading) {
    return (
      <section className="py-24 bg-background flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="animate-pulse text-primary font-body font-medium uppercase tracking-[0.2em] text-[10px]">Memuat Berkat Hari Ini</div>
      </section>
    );
  }

  if (!verse) return null;

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(var(--color-primary-rgb),0.05),transparent_70%)]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-primary/20 to-transparent"></div>
      
      <div className="max-w-5xl mx-auto px-8 relative z-10 flex flex-col items-center">
        {/* Header Label */}
        <div className="mb-12 flex flex-col items-center gap-3">
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] bg-primary/5 px-6 py-2 rounded-full border border-primary/10">
            Ayat Hari Ini
          </span>
        </div>

        {/* Verse Content Area */}
        <div className="text-center max-w-4xl mb-20 space-y-8 animate-in fade-in zoom-in-95 duration-1000">
          <span className="material-symbols-outlined text-primary/20 text-6xl block select-none">format_quote</span>
          
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-primary font-medium italic leading-[1.4] tracking-tight">
            "{verse.content}"
          </h2>
          
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent"></div>
            <p className="font-headline text-xl text-secondary font-bold tracking-[0.2em] uppercase">
              {verse.reference}
            </p>
          </div>
        </div>

        {/* Devotional Video Section (Stacked) */}
        {verse.devotional_url && (
          <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <div className="relative group p-1 rounded-[2.5rem] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent shadow-2xl">
              <div className="bg-surface-container-low rounded-[2.3rem] overflow-hidden border border-white/10">
                <div className="p-8 lg:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  {/* Video Title & Info */}
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-xl">slow_motion_video</span>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Renungan Video</span>
                    </div>
                    <h3 className="font-headline text-2xl lg:text-3xl font-bold text-on-surface leading-tight">
                      {verse.devotional_title || "Menemukan Kedamaian di Dalam Kristus"}
                    </h3>
                    <p className="font-body text-on-surface/60 text-sm leading-relaxed max-w-md">
                      Saksikan video renungan harian kami untuk mendalami firman Tuhan lebih dalam lagi hari ini.
                    </p>
                  </div>

                  {/* Video Embed Frame */}
                  <div className="w-full md:w-[350px] lg:w-[450px] shrink-0">
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group-hover:scale-[1.02] transition-transform duration-700">
                      <iframe
                        src={getEmbedUrl(verse.devotional_url)}
                        title={verse.devotional_title}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DailyVerse;
