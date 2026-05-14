import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { fetchMinistryActivityDetail } from '../../api/publicContentApi';
import { fetchSiteConfig } from '../../api/siteConfigApi';

const MinistryActivityDetailPage = () => {
  const { id } = useParams();
  const [config, setConfig] = useState(null);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSiteConfig().then((response) => response.success && setConfig(response.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const response = await fetchMinistryActivityDetail(id);
      if (response.success) setActivity(response.data);
      else setError(response.message || 'Data tidak ditemukan atau sudah tidak tersedia.');
      setLoading(false);
    };
    load();
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      <Header churchName={config?.churchName} churchLogoUrl={config?.churchLogoUrl} menus={config?.menus} />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <Link to="/kegiatan-pelayanan" className="text-sm font-bold text-primary hover:text-secondary">← Kembali ke Dokumentasi</Link>
        {loading ? (
          <p className="mt-10 animate-pulse text-primary">Memuat detail kegiatan...</p>
        ) : error ? (
          <div className="mt-10 rounded-xl bg-surface-container-low p-10 text-center text-on-surface-variant">{error}</div>
        ) : (
          <article className="mt-8">
            <img src={activity.image_url} alt={activity.name} className="aspect-video w-full rounded-2xl object-cover shadow-lg" />
            <div className="mx-auto mt-8 max-w-3xl">
              <p className="mb-3 text-sm text-on-surface/45">
                {activity.activity_date ? new Date(activity.activity_date).toLocaleDateString('id-ID') : new Date(activity.created_at).toLocaleDateString('id-ID')}
              </p>
              <h1 className="font-headline text-4xl font-bold text-primary">{activity.name}</h1>
              <div className="mt-6 whitespace-pre-line text-base leading-8 text-on-surface-variant">
                {activity.content || activity.short_caption}
              </div>
            </div>
          </article>
        )}
      </main>
      <Footer churchName={config?.churchName} />
    </div>
  );
};

export default MinistryActivityDetailPage;
