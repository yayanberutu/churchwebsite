import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { fetchAnnouncements } from '../../api/publicContentApi';
import { fetchSiteConfig } from '../../api/siteConfigApi';

const AnnouncementListPage = () => {
  const [config, setConfig] = useState(null);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSiteConfig().then((response) => response.success && setConfig(response.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const response = await fetchAnnouncements(page, 10);
      if (response.success) {
        setItems(response.data?.items || []);
        setPagination(response.data?.pagination || null);
      }
      setLoading(false);
    };
    load();
  }, [page]);

  return (
    <div className="min-h-screen bg-background">
      <Header churchName={config?.churchName} churchLogoUrl={config?.churchLogoUrl} menus={config?.menus} />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <Link to="/" className="text-sm font-bold text-primary hover:text-secondary">← Kembali ke Home</Link>
        <div className="mt-8 mb-10">
          <h1 className="font-headline text-4xl font-bold text-primary">Pengumuman Gereja</h1>
          <p className="mt-2 text-on-surface-variant">Informasi terbaru seputar pelayanan dan kegiatan jemaat.</p>
        </div>

        {loading ? (
          <p className="animate-pulse text-primary">Memuat pengumuman...</p>
        ) : items.length === 0 ? (
          <div className="rounded-xl bg-surface-container-low p-10 text-center text-on-surface-variant">Belum ada pengumuman.</div>
        ) : (
          <div className="space-y-5">
            {items.map((item) => (
              <article key={item.id} className="rounded-xl bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/20">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{item.target_audience}</span>
                  <span className="text-xs text-on-surface/45">{new Date(item.created_at).toLocaleDateString('id-ID')}</span>
                </div>
                <h2 className="font-headline text-2xl font-bold text-primary">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant line-clamp-3">{item.content_preview}</p>
                <Link to={`/pengumuman/${item.id}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary">
                  Lihat Detail <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </article>
            ))}
          </div>
        )}

        {pagination && pagination.total_pages > 1 && (
          <div className="mt-10 flex items-center justify-between">
            <button disabled={!pagination.has_previous} onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded-lg bg-surface-container-high px-4 py-2 text-sm font-bold disabled:opacity-40">Sebelumnya</button>
            <span className="text-sm text-on-surface-variant">Halaman {pagination.page} dari {pagination.total_pages}</span>
            <button disabled={!pagination.has_next} onClick={() => setPage((p) => p + 1)} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white disabled:opacity-40">Berikutnya</button>
          </div>
        )}
      </main>
      <Footer churchName={config?.churchName} />
    </div>
  );
};

export default AnnouncementListPage;
