import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Camera, Image as ImageIcon } from 'lucide-react';
import { Button, Input, Card } from '../../components/admin/UI';
import { Table, Modal } from '../../components/admin/DataComponents';
import { cn } from '../../utils/cn';
import { ministryActivityApi } from '../../api/adminApi';

const MinistryActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      const response = await ministryActivityApi.getAll();
      setActivities(response.data.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    setIsSubmitting(true);
    try {
      if (currentActivity) {
        // If no new image, we might need to send the existing one
        if (!e.target.image.files[0]) {
          formData.append('existing_image_url', currentActivity.image_url);
        }
        await ministryActivityApi.update(currentActivity.id, formData);
      } else {
        await ministryActivityApi.create(formData);
      }
      fetchActivities();
      setIsModalOpen(false);
      setCurrentActivity(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error saving activity:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus kegiatan pelayanan ini?')) {
      try {
        await ministryActivityApi.delete(id);
        fetchActivities();
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-on-surface">Kegiatan Pelayanan</h1>
          <p className="text-on-surface/50 text-sm font-medium mt-1">Kelola foto dan deskripsi kegiatan pelayanan gereja.</p>
        </div>
        <Button onClick={() => { setCurrentActivity(null); setImagePreview(null); setIsModalOpen(true); }} className="px-8 shadow-xl">
          <Plus size={20} /> Tambah Kegiatan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3].map(i => (
            <Card key={i} className="h-[300px] animate-pulse bg-surface-container-high" />
          ))
        ) : activities.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-surface-container-low rounded-2xl border-2 border-dashed border-outline-variant">
            <p className="text-on-surface/40 font-medium">Belum ada kegiatan pelayanan.</p>
          </div>
        ) : (
          activities.map((act) => (
            <Card key={act.id} className="p-0 overflow-hidden group border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={act.image_url} 
                  alt={act.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => { 
                      setCurrentActivity(act); 
                      setImagePreview(act.image_url); 
                      setIsModalOpen(true); 
                    }}
                    className="p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(act.id)}
                    className="p-2 bg-secondary/80 hover:bg-secondary text-white rounded-full transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-on-surface text-lg mb-1">{act.name}</h3>
                <p className="text-sm text-on-surface/60 line-clamp-2">{act.short_caption}</p>
              </div>
            </Card>
          ))
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentActivity ? 'Edit Kegiatan' : 'Tambah Kegiatan'}
        footer={(
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit" form="activity-form" isLoading={isSubmitting}>Simpan</Button>
          </>
        )}
      >
        <form id="activity-form" onSubmit={handleSave} className="space-y-6">
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-surface-container-highest border-2 border-dashed border-outline-variant flex items-center justify-center group cursor-pointer">
              {imagePreview ? (
                <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mx-auto">
                    <ImageIcon size={24} />
                  </div>
                  <p className="text-xs font-bold text-on-surface/40 uppercase tracking-widest">Pilih Foto Kegiatan</p>
                </div>
              )}
              <input 
                type="file" 
                name="image" 
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                required={!currentActivity}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" />
              </div>
            </div>
            <p className="text-[10px] text-center text-on-surface/40 font-bold uppercase tracking-widest px-8">Disarankan menggunakan foto landscape dengan kualitas tinggi.</p>
          </div>

          <Input 
            label="Nama Kegiatan" 
            name="name" 
            placeholder="Contoh: Paduan Suara Gabungan" 
            defaultValue={currentActivity?.name} 
            required 
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-on-surface/50 uppercase tracking-wider ml-1">Keterangan Singkat</label>
            <textarea 
              name="short_caption"
              placeholder="Berikan deskripsi singkat mengenai kegiatan ini..."
              defaultValue={currentActivity?.short_caption}
              className="w-full bg-surface-container-highest rounded-xl px-4 py-3 text-sm font-medium border-0 transition-all duration-300 outline-none focus:ring-2 focus:ring-primary/20 min-h-[80px] resize-none"
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MinistryActivitiesPage;
