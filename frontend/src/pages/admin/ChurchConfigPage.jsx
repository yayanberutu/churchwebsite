import { useEffect, useState } from 'react';
import { Image as ImageIcon, Save } from 'lucide-react';
import { Button, Card, Input, Textarea } from '../../components/admin/UI';
import { churchConfigApi } from '../../api/adminApi';

const fileURL = (config, group, key) => config?.[group]?.[key]?.file_url || '';

const ChurchConfigPage = () => {
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [heroPreview, setHeroPreview] = useState('');

  const fetchConfig = async () => {
    try {
      setIsLoading(true);
      const response = await churchConfigApi.get();
      setConfig(response.data.data);
      setLogoPreview(fileURL(response.data.data, 'identity', 'church_logo'));
      setHeroPreview(fileURL(response.data.data, 'home_hero', 'home_hero_image'));
    } catch (error) {
      setMessage({ type: 'error', text: 'Gagal memuat konfigurasi.' });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const previewFile = (file, setter) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setter(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setIsSubmitting(true);
    setMessage(null);
    try {
      const response = await churchConfigApi.update(formData);
      setConfig(response.data.data);
      setMessage({ type: 'success', text: 'Konfigurasi berhasil disimpan' });
      await fetchConfig();
    } catch (error) {
      setMessage({ type: 'error', text: 'Gagal menyimpan konfigurasi' });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="animate-pulse text-primary font-bold">Memuat konfigurasi...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-on-surface">Konfigurasi Website</h1>
          <p className="text-on-surface/50 text-sm font-medium mt-1">Kelola identitas gereja dan konten Hero Home.</p>
        </div>
        <Button type="submit" isLoading={isSubmitting} className="px-8 shadow-xl">
          <Save size={18} /> Simpan Konfigurasi
        </Button>
      </div>

      {message && (
        <div className={`rounded-xl px-5 py-4 text-sm font-bold ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-secondary/10 text-secondary'}`}>
          {message.text}
        </div>
      )}

      <Card className="space-y-6">
        <div>
          <h2 className="font-headline text-xl font-bold text-primary">Identitas Gereja</h2>
          <p className="text-sm text-on-surface/50">Nama dan logo yang tampil di header dan halaman publik.</p>
        </div>
        <Input
          label="Nama Gereja"
          name="church_name"
          maxLength={255}
          defaultValue={config?.identity?.church_name || ''}
          required
        />
        <ImageUpload
          label="Logo Gereja"
          name="church_logo"
          preview={logoPreview}
          onChange={(file) => previewFile(file, setLogoPreview)}
        />
      </Card>

      <Card className="space-y-6">
        <div>
          <h2 className="font-headline text-xl font-bold text-primary">Hero Home</h2>
          <p className="text-sm text-on-surface/50">Teks dan gambar utama pada bagian atas Home Page.</p>
        </div>
        <Input
          label="Judul Hero"
          name="home_hero_title"
          maxLength={255}
          defaultValue={config?.home_hero?.home_hero_title || ''}
          required
        />
        <Textarea
          label="Subjudul Hero"
          name="home_hero_subtitle"
          maxLength={1000}
          defaultValue={config?.home_hero?.home_hero_subtitle || ''}
          required
        />
        <ImageUpload
          label="Gambar Hero"
          name="home_hero_image"
          preview={heroPreview}
          onChange={(file) => previewFile(file, setHeroPreview)}
        />
      </Card>
    </form>
  );
};

const ImageUpload = ({ label, name, preview, onChange }) => (
  <div className="space-y-3">
    <label className="text-xs font-bold text-on-surface/50 uppercase tracking-wider ml-1">{label}</label>
    <div className="overflow-hidden rounded-2xl border-2 border-dashed border-outline-variant/30 bg-surface-container-low">
      {preview ? (
        <img src={preview} alt={label} className="h-56 w-full object-cover" />
      ) : (
        <div className="flex h-40 flex-col items-center justify-center gap-3 text-primary">
          <ImageIcon size={32} />
          <p className="text-xs font-bold uppercase tracking-widest">Pilih Gambar</p>
        </div>
      )}
      <div className="p-4">
        <input
          type="file"
          name={name}
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => onChange(e.target.files?.[0])}
          className="w-full text-xs text-on-surface/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
        />
        <p className="mt-2 text-[11px] font-medium text-on-surface/40">JPEG, PNG, atau WebP. Maksimal 5MB.</p>
      </div>
    </div>
  </div>
);

export default ChurchConfigPage;
