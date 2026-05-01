import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { Button, Input, Card } from '../../components/admin/UI';
import { Table, Modal } from '../../components/admin/DataComponents';
import { worshipScheduleApi } from '../../api/adminApi';

const WorshipSchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      setIsLoading(true);
      const response = await worshipScheduleApi.getAll();
      setSchedules(response.data.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
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
      if (currentSchedule) {
        await worshipScheduleApi.update(currentSchedule.id, data);
      } else {
        await worshipScheduleApi.create(data);
      }
      fetchSchedules();
      setIsModalOpen(false);
      setCurrentSchedule(null);
    } catch (error) {
      console.error('Error saving schedule:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
      try {
        await worshipScheduleApi.delete(id);
        fetchSchedules();
      } catch (error) {
        console.error('Error deleting schedule:', error);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full max-w-sm group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30 group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Cari jadwal ibadah..." 
            className="w-full bg-surface-container-low rounded-xl pl-12 pr-4 py-3 text-sm font-medium border-0 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>
        <Button onClick={() => { setCurrentSchedule(null); setIsModalOpen(true); }} className="px-8">
          <Plus size={20} /> Tambah Jadwal
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <Table headers={['Nama Ibadah', 'Waktu', 'Lokasi', 'Aksi']}>
          {isLoading ? (
            [1, 2, 3].map(i => (
              <tr key={i} className="animate-pulse">
                <td className="px-6 py-8"><div className="h-4 bg-surface-container-high rounded w-3/4" /></td>
                <td className="px-6 py-8"><div className="h-4 bg-surface-container-high rounded w-1/2" /></td>
                <td className="px-6 py-8"><div className="h-4 bg-surface-container-high rounded w-2/3" /></td>
                <td className="px-6 py-8"><div className="h-8 bg-surface-container-high rounded w-20" /></td>
              </tr>
            ))
          ) : schedules.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-20 text-center text-on-surface/40 font-medium">
                Belum ada data jadwal ibadah.
              </td>
            </tr>
          ) : (
            schedules.map((schedule) => (
              <tr key={schedule.id} className="hover:bg-surface-container-low/20 transition-colors group">
                <td className="px-6 py-5 font-bold text-on-surface">{schedule.name}</td>
                <td className="px-6 py-5 text-sm text-on-surface/70 font-medium">{schedule.schedule_time}</td>
                <td className="px-6 py-5 text-sm text-on-surface/70 font-medium">{schedule.location}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => { setCurrentSchedule(schedule); setIsModalOpen(true); }}
                      className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(schedule.id)}
                      className="p-2 hover:bg-secondary/10 rounded-lg text-secondary transition-colors"
                    >
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
        title={currentSchedule ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}
        footer={(
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit" form="schedule-form" isLoading={isSubmitting}>
              {currentSchedule ? 'Simpan Perubahan' : 'Tambah Jadwal'}
            </Button>
          </>
        )}
      >
        <form id="schedule-form" onSubmit={handleSave} className="space-y-6">
          <Input 
            label="Nama Ibadah" 
            name="name" 
            placeholder="Contoh: Ibadah Minggu Pagi" 
            defaultValue={currentSchedule?.name} 
            required 
          />
          <Input 
            label="Waktu Ibadah" 
            name="schedule_time" 
            placeholder="Contoh: Minggu, 09:00 WIB" 
            defaultValue={currentSchedule?.schedule_time} 
            required 
          />
          <Input 
            label="Lokasi" 
            name="location" 
            placeholder="Contoh: Gedung Gereja Utama" 
            defaultValue={currentSchedule?.location} 
            required 
          />
        </form>
      </Modal>
    </div>
  );
};

export default WorshipSchedulePage;
