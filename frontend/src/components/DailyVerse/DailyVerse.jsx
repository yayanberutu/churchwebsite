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
    try {
      if (url.includes('youtu.be')) {
        videoId = url.split('/').pop().split('?')[0];
      } else if (url.includes('youtube.com')) {
        const urlParams = new URLSearchParams(new URL(url).search);
        videoId = urlParams.get('v');
      }
    } catch {
      return null;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const embedUrl = getEmbedUrl(verse?.devotional_url);

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 bg-background py-16 md:py-20">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
        <div className="animate-pulse font-body text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Memuat Berkat Hari Ini</div>
      </section>
    );
  }

  if (!verse) {
    return (
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
          <div className="rounded-2xl bg-surface-container-low p-8 text-on-surface-variant">
            Ayat harian belum tersedia.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-20">
      <div className="absolute inset-0 bg-primary/[0.03]"></div>
      
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 md:px-8">
        <div className="mb-8 flex flex-col items-center gap-3">
          <span className="rounded-full border border-primary/10 bg-primary/5 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-primary">
            Ayat Hari Ini
          </span>
        </div>

        <div className="mb-12 max-w-[820px] space-y-6 text-center animate-in fade-in zoom-in-95 duration-1000 md:mb-14">
          <span className="material-symbols-outlined block select-none text-5xl text-primary/25 md:text-6xl">format_quote</span>
          
          <h2 className="font-headline text-2xl font-medium italic leading-[1.35] tracking-tight text-primary sm:text-3xl md:text-4xl lg:text-[42px]">
            "{verse.content}"
          </h2>
          
          <div className="flex flex-col items-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-secondary/40 to-transparent"></div>
            <p className="font-headline text-base font-bold uppercase tracking-[0.18em] text-secondary md:text-lg">
              {verse.reference}
            </p>
          </div>
        </div>

        <div className="w-full max-w-[980px] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <div className="overflow-hidden rounded-2xl bg-surface-container-low shadow-[0_24px_60px_-28px_rgba(25,28,29,0.35)] ring-1 ring-outline-variant/15">
            <div className="grid grid-cols-1 gap-0 md:grid-cols-[0.42fr_0.58fr]">
              <div className="order-2 flex flex-col justify-center space-y-4 p-6 text-center md:order-1 md:p-8 md:text-left lg:p-10">
                <div className="inline-flex items-center justify-center gap-2 text-primary md:justify-start">
                  <span className="material-symbols-outlined text-xl">slow_motion_video</span>
                  <span className="text-[11px] font-black uppercase tracking-[0.18em]">Renungan Harian</span>
                </div>
                <h3 className="font-headline text-2xl font-bold leading-tight text-on-surface lg:text-3xl">
                  {verse.devotional_title || "Renungan harian belum tersedia"}
                </h3>
                <p className="mx-auto max-w-md font-body text-sm leading-7 text-on-surface/65 md:mx-0">
                  {verse.devotional_url ? "Saksikan video renungan harian untuk mendalami firman Tuhan lebih dalam hari ini." : "Video renungan akan ditampilkan di sini saat sudah tersedia."}
                </p>
                {verse.devotional_url && (
                  <a
                    href={verse.devotional_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-on-primary transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:w-fit"
                  >
                    Tonton Renungan
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                )}
              </div>

              <div className="order-1 p-4 md:order-2 md:p-5">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-primary/10 shadow-lg ring-1 ring-white/20">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={verse.devotional_title || "Renungan Harian"}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center text-primary">
                      <span className="material-symbols-outlined text-4xl">video_library</span>
                      <p className="text-sm font-bold">Video renungan belum tersedia.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyVerse;
