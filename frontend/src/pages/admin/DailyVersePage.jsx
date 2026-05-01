import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar as CalendarIcon, Quote } from 'lucide-react';
import { Button, Input, Textarea, Card } from '../../components/admin/UI';
import { Table, Modal } from '../../components/admin/DataComponents';
import { dailyVerseApi } from '../../api/adminApi';

const DailyVersePage = () => {
  const [verses, setVerses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchVerses();
  }, []);

  const fetchVerses = async () => {
    try {
      setIsLoading(true);
      const response = await dailyVerseApi.getAll();
      // Format dates for display
      const data = (response.data.data || []).map(v => ({
        ...v,
        date: v.date.split('T')[0] // Assuming backend sends ISO string
      }));
      setVerses(data);
    } catch (error) {
      console.error('Error fetching verses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    setIsSubmitting(true);
    try {
      if (currentVerse) {
        await dailyVerseApi.update(currentVerse.id, data);
      } else {
        await dailyVerseApi.create(data);
      }
      fetchVerses();
      setIsModalOpen(false);
      setCurrentVerse(null);
    } catch (error) {
      console.error('Error saving verse:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus ayat ini?')) {
      try {
        await dailyVerseApi.delete(id);
        fetchVerses();
      } catch (error) {
        console.error('Error deleting verse:', error);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold text-on-surface">Manajemen Ayat Harian</h1>
          <p className="text-on-surface/50 text-sm font-medium mt-1">Kelola firman Tuhan untuk dibagikan setiap hari.</p>
        </div>
        <Button onClick={() => { setCurrentVerse(null); setIsModalOpen(true); }} className="px-8 shadow-xl">
          <Plus size={20} /> Tambah Ayat
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          [1, 2].map(i => (
            <Card key={i} className="animate-pulse h-[140px]" />
          ))
        ) : verses.length === 0 ? (
          <Card className="py-20 text-center text-on-surface/40 font-medium">
            Belum ada data ayat harian.
          </Card>
        ) : (
          verses.map((verse) => (
            <Card key={verse.id} className="relative group hover:scale-[1.01] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary/20" />
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Quote size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-widest">
                      {verse.reference}
                    </span>
                    <div className="flex items-center gap-2 text-on-surface/30 font-medium text-sm">
                      <CalendarIcon size={14} />
                      {new Date(verse.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                  <p className="text-lg font-medium text-on-surface leading-relaxed mb-4 italic">
                    "{verse.content}"
                  </p>
                  {(verse.devotional_title || verse.devotional_url) && (
                    <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Renungan Terkait</p>
                      <p className="text-sm font-bold text-on-surface">{verse.devotional_title || 'Video Renungan'}</p>
                      {verse.devotional_url && (
                        <p className="text-xs text-primary truncate mt-1">{verse.devotional_url}</p>
                      )}
                    </div>
                  )}
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity mt-4">
                    <Button variant="ghost" className="px-4 py-2" onClick={() => { setCurrentVerse(verse); setIsModalOpen(true); }}>
                      <Edit2 size={16} /> Edit
                    </Button>
                    <Button variant="danger" className="px-4 py-2" onClick={() => handleDelete(verse.id)}>
                      <Trash2 size={16} /> Hapus
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentVerse ? 'Edit Ayat Harian' : 'Tambah Ayat Baru'}
        footer={(
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit" form="verse-form" isLoading={isSubmitting}>
              {currentVerse ? 'Simpan Perubahan' : 'Tambah Ayat'}
            </Button>
          </>
        )}
      >
        <form id="verse-form" onSubmit={handleSave} className="space-y-6">
          <Input 
            label="Referensi Ayat" 
            name="reference" 
            placeholder="Contoh: Mazmur 23:1" 
            defaultValue={currentVerse?.reference} 
            required 
          />
          <Input 
            label="Tanggal" 
            name="date" 
            type="date"
            defaultValue={currentVerse?.date} 
            required 
          />
          <Textarea 
            label="Isi Ayat" 
            name="content" 
            placeholder="Ketikkan firman Tuhan di sini..." 
            defaultValue={currentVerse?.content} 
            required 
          />
          <div className="pt-4 border-t border-outline-variant">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Materi Renungan (Opsional)</p>
            <div className="space-y-4">
              <Input 
                label="Tema Renungan" 
                name="devotional_title" 
                placeholder="Contoh: Menghadapi Badai Kehidupan" 
                defaultValue={currentVerse?.devotional_title} 
              />
              <Input 
                label="URL Video Renungan (YouTube)" 
                name="devotional_url" 
                placeholder="https://youtube.com/watch?v=..." 
                defaultValue={currentVerse?.devotional_url} 
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DailyVersePage;
