import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { fetchAnnouncementDetail } from '../../api/publicContentApi';
import { fetchSiteConfig } from '../../api/siteConfigApi';

const AnnouncementDetailPage = () => {
  const { id } = useParams();
  const [config, setConfig] = useState(null);
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSiteConfig().then((response) => response.success && setConfig(response.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const response = await fetchAnnouncementDetail(id);
      if (response.success) setAnnouncement(response.data);
      else setError(response.message || 'Data tidak ditemukan atau sudah tidak tersedia.');
      setLoading(false);
    };
    load();
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      <Header churchName={config?.churchName} churchLogoUrl={config?.churchLogoUrl} menus={config?.menus} />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <Link to="/pengumuman" className="text-sm font-bold text-primary hover:text-secondary">← Kembali ke Pengumuman</Link>
        {loading ? (
          <p className="mt-10 animate-pulse text-primary">Memuat detail pengumuman...</p>
        ) : error ? (
          <div className="mt-10 rounded-xl bg-surface-container-low p-10 text-center text-on-surface-variant">{error}</div>
        ) : (
          <article className="mt-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{announcement.target_audience}</span>
              <span className="text-xs text-on-surface/45">{new Date(announcement.created_at).toLocaleDateString('id-ID')}</span>
            </div>
            <h1 className="font-headline text-4xl font-bold text-primary leading-tight">{announcement.title}</h1>
            <div className="mt-8 whitespace-pre-line text-base leading-8 text-on-surface-variant">{announcement.content}</div>
            {announcement.attachments?.length > 0 && (
              <section className="mt-10">
                <h2 className="font-headline text-xl font-bold text-primary mb-4">Lampiran</h2>
                <div className="space-y-3">
                  {announcement.attachments.map((attachment) => (
                    <a key={attachment.id} href={attachment.file_url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl bg-surface-container-low p-4 text-sm font-bold text-primary hover:bg-surface-container-high">
                      {attachment.file_name}
                      <span className="material-symbols-outlined text-base">open_in_new</span>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </article>
        )}
      </main>
      <Footer churchName={config?.churchName} />
    </div>
  );
};

export default AnnouncementDetailPage;
