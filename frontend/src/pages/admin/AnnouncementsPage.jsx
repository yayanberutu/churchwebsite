import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Megaphone, Users, Search } from 'lucide-react';
import { Button, Input, Card } from '../../components/admin/UI';
import { Table, Modal } from '../../components/admin/DataComponents';
import { cn } from '../../utils/cn';
import { announcementApi } from '../../api/adminApi';

const targetAudiences = ["Semua", "Pemuda", "Kaum Ibu", "Kaum Bapak", "Remaja"];

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      const response = await announcementApi.getAll();
      setAnnouncements(response.data.data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    setIsSubmitting(true);
    try {
      if (currentAnnouncement) {
        await announcementApi.update(currentAnnouncement.id, formData);
      } else {
        await announcementApi.create(formData);
      }
      fetchAnnouncements();
      setIsModalOpen(false);
      setCurrentAnnouncement(null);
    } catch (error) {
      console.error('Error saving announcement:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus pengumuman ini?')) {
      try {
        await announcementApi.delete(id);
        fetchAnnouncements();
      } catch (error) {
        console.error('Error deleting announcement:', error);
      }
    }
  };

  const getTargetColor = (target) => {
    switch (target) {
      case 'Pemuda': return 'bg-blue-100 text-blue-700';
      case 'Kaum Ibu': return 'bg-pink-100 text-pink-700';
      case 'Kaum Bapak': return 'bg-indigo-100 text-indigo-700';
      case 'Remaja': return 'bg-teal-100 text-teal-700';
      default: return 'bg-primary/10 text-primary';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-on-surface">Manajemen Pengumuman</h1>
          <p className="text-on-surface/50 text-sm font-medium mt-1">Sampaikan informasi penting kepada seluruh jemaat.</p>
        </div>
        <Button onClick={() => { setCurrentAnnouncement(null); setIsModalOpen(true); }} className="px-8 shadow-xl">
          <Plus size={20} /> Tambah Pengumuman
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <Table headers={['Pengumuman', 'Target Audience', 'Lampiran', 'Aksi']}>
          {isLoading ? (
            [1, 2, 3].map(i => (
              <tr key={i} className="animate-pulse h-[72px]">
                <td colSpan={4} className="px-6"><div className="h-4 bg-surface-container-high rounded w-full" /></td>
              </tr>
            ))
          ) : announcements.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-20 text-center text-on-surface/40 font-medium">
                Belum ada pengumuman.
              </td>
            </tr>
          ) : (
            announcements.map((ann) => (
              <tr key={ann.id} className="hover:bg-surface-container-low/20 transition-colors group">
                <td className="px-6 py-5 max-w-xs">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0">
                      <Megaphone size={16} />
                    </div>
                    <span className="font-bold text-on-surface truncate">{ann.title}</span>
                  </div>
                  <p className="text-xs text-on-surface/40 truncate ml-11">{ann.content || "Tidak ada isi"}</p>
                </td>
                <td className="px-6 py-5">
                  <span className={cn("px-3 py-1 rounded-full text-xs font-bold", getTargetColor(ann.target_audience))}>
                    {ann.target_audience}
                  </span>
                </td>
                <td className="px-6 py-5">
                   <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface/60">
                      <div className="w-6 h-6 rounded bg-surface-container-high flex items-center justify-center">
                        {ann.attachments?.length || 0}
                      </div>
                      Lampiran
                   </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => { setCurrentAnnouncement(ann); setIsModalOpen(true); }}
                      className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(ann.id)} className="p-2 hover:bg-secondary/10 rounded-lg text-secondary transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </Table>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentAnnouncement ? 'Edit Pengumuman' : 'Tambah Pengumuman'}
        footer={(
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit" form="announcement-form" isLoading={isSubmitting}>Simpan</Button>
          </>
        )}
      >
        <form id="announcement-form" onSubmit={handleSave} className="space-y-6">
          <Input 
            label="Judul Pengumuman" 
            name="title" 
            placeholder="Contoh: Rapat Majelis Jemaat" 
            defaultValue={currentAnnouncement?.title} 
            required 
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-on-surface/50 uppercase tracking-wider ml-1">Isi Pengumuman</label>
            <textarea 
              name="content"
              placeholder="Tuliskan isi pengumuman di sini..."
              defaultValue={currentAnnouncement?.content}
              className="w-full bg-surface-container-highest rounded-xl px-4 py-3 text-sm font-medium border-0 transition-all duration-300 outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px] resize-none"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-bold text-on-surface/50 uppercase tracking-wider ml-1">Target Audience</label>
              <select 
                name="target_audience"
                defaultValue={currentAnnouncement?.target_audience || "Semua"}
                className="w-full bg-surface-container-highest rounded-xl px-4 py-3 text-sm font-medium border-0 transition-all duration-300 outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
              >
                {targetAudiences.map(target => (
                  <option key={target} value={target}>{target}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-bold text-on-surface/50 uppercase tracking-wider ml-1">Lampiran (Multiple)</label>
              <input 
                type="file"
                name="attachments"
                multiple
                className="w-full text-xs text-on-surface/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AnnouncementsPage;
