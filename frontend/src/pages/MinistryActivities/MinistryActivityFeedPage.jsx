import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { fetchMinistryActivities } from '../../api/publicContentApi';
import { fetchSiteConfig } from '../../api/siteConfigApi';

const MinistryActivityFeedPage = () => {
  const [config, setConfig] = useState(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSiteConfig().then((response) => response.success && setConfig(response.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const response = await fetchMinistryActivities(page, 6);
      if (response.success) {
        setItems((prev) => page === 1 ? (response.data?.items || []) : [...prev, ...(response.data?.items || [])]);
        setHasNext(Boolean(response.data?.pagination?.has_next));
      }
      setLoading(false);
    };
    load();
  }, [page]);

  return (
    <div className="min-h-screen bg-background">
      <Header churchName={config?.churchName} churchLogoUrl={config?.churchLogoUrl} menus={config?.menus} />
      <main className="max-w-[780px] mx-auto px-6 py-16">
        <Link to="/" className="text-sm font-bold text-primary hover:text-secondary">← Kembali ke Home</Link>
        <div className="mt-8 mb-10">
          <h1 className="font-headline text-4xl font-bold text-primary">Dokumentasi Kegiatan Pelayanan</h1>
          <p className="mt-2 text-on-surface-variant">Melihat kembali momen pelayanan dan kebersamaan jemaat.</p>
        </div>

        {loading && page === 1 ? (
          <p className="animate-pulse text-primary">Memuat dokumentasi...</p>
        ) : items.length === 0 ? (
          <div className="rounded-xl bg-surface-container-low p-10 text-center text-on-surface-variant">Belum ada dokumentasi kegiatan.</div>
        ) : (
          <div className="space-y-8">
            {items.map((activity) => (
              <article key={activity.id} className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/20">
                <img src={activity.image_url} alt={activity.name} className="aspect-video w-full object-cover" loading="lazy" />
                <div className="p-6">
                  <p className="mb-2 text-xs font-medium text-on-surface/45">
                    {activity.activity_date ? new Date(activity.activity_date).toLocaleDateString('id-ID') : new Date(activity.created_at).toLocaleDateString('id-ID')}
                  </p>
                  <h2 className="font-headline text-2xl font-bold text-primary">{activity.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{activity.short_caption}</p>
                  <Link to={`/kegiatan-pelayanan/${activity.id}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary">
                    Lihat Detail <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {hasNext && (
          <div className="mt-10 text-center">
            <button onClick={() => setPage((p) => p + 1)} className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white disabled:opacity-50" disabled={loading}>
              {loading ? 'Memuat...' : 'Muat Lebih Banyak'}
            </button>
          </div>
        )}
      </main>
      <Footer churchName={config?.churchName} />
    </div>
  );
};

export default MinistryActivityFeedPage;
