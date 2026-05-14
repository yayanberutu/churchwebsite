import { useEffect, useState } from 'react';
import { CalendarClock, Clock, Edit2, MapPin, Plus, Trash2 } from 'lucide-react';
import { Button, Card, Input } from '../../components/admin/UI';
import { Modal, Table } from '../../components/admin/DataComponents';
import { upcomingActivityApi } from '../../api/adminApi';

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const toDateInputValue = (dateStr) => {
  if (!dateStr) return '';
  return dateStr.split('T')[0];
};

const UpcomingActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      const response = await upcomingActivityApi.getAll();
      setActivities(response.data.data || []);
    } catch (error) {
      console.error('Error fetching upcoming activities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const openCreate = () => {
    setCurrentActivity(null);
    setIsModalOpen(true);
  };

  const openEdit = (activity) => {
    setCurrentActivity(activity);
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    setIsSubmitting(true);
    try {
      if (currentActivity) {
        await upcomingActivityApi.update(currentActivity.id, data);
      } else {
        await upcomingActivityApi.create(data);
      }
      await fetchActivities();
      setIsModalOpen(false);
      setCurrentActivity(null);
    } catch (error) {
      console.error('Error saving upcoming activity:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus kegiatan mendatang ini?')) {
      try {
        await upcomingActivityApi.delete(id);
        await fetchActivities();
      } catch (error) {
        console.error('Error deleting upcoming activity:', error);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-on-surface">Kegiatan Mendatang</h1>
          <p className="text-on-surface/50 text-sm font-medium mt-1">Kelola agenda yang tampil pada kalender kegiatan di halaman utama.</p>
        </div>
        <Button onClick={openCreate} className="px-8 shadow-xl">
          <Plus size={20} /> Tambah Kegiatan
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <Table headers={['Kegiatan', 'Tanggal', 'Waktu', 'Lokasi', 'Aksi']}>
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <tr key={i} className="animate-pulse h-[72px]">
                <td colSpan={5} className="px-6"><div className="h-4 bg-surface-container-high rounded w-full" /></td>
              </tr>
            ))
          ) : activities.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-20 text-center text-on-surface/40 font-medium">
                Belum ada kegiatan mendatang.
              </td>
            </tr>
          ) : (
            activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-surface-container-low/20 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                      <CalendarClock size={20} />
                    </div>
                    <span className="font-bold text-on-surface">{activity.title}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-on-surface/70">
                  {formatDate(activity.date)}
                </td>
                <td className="px-6 py-5">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-on-surface/70">
                    <Clock size={16} className="text-primary" />
                    {activity.time_string}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-on-surface/70">
                    <MapPin size={16} className="text-secondary" />
                    {activity.location}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEdit(activity)}
                      className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(activity.id)}
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
        title={currentActivity ? 'Edit Kegiatan Mendatang' : 'Tambah Kegiatan Mendatang'}
        footer={(
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit" form="upcoming-activity-form" isLoading={isSubmitting}>
              {currentActivity ? 'Simpan Perubahan' : 'Tambah Kegiatan'}
            </Button>
          </>
        )}
      >
        <form id="upcoming-activity-form" onSubmit={handleSave} className="space-y-6">
          <Input
            label="Judul Kegiatan"
            name="title"
            placeholder="Contoh: Rapat Panitia Natal"
            defaultValue={currentActivity?.title}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Tanggal"
              name="date"
              type="date"
              defaultValue={toDateInputValue(currentActivity?.date)}
              required
            />
            <Input
              label="Waktu"
              name="time_string"
              placeholder="Contoh: 19.00 WIB"
              defaultValue={currentActivity?.time_string}
              required
            />
          </div>

          <Input
            label="Lokasi"
            name="location"
            placeholder="Contoh: Ruang Konsistori"
            defaultValue={currentActivity?.location}
            required
          />
        </form>
      </Modal>
    </div>
  );
};

export default UpcomingActivitiesPage;
