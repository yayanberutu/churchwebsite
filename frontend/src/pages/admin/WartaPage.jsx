import { useState, useEffect } from 'react';
import { Upload, FileText, Trash2, Download, Edit2 } from 'lucide-react';
import { Button, Input, Card } from '../../components/admin/UI';
import { Table, Modal } from '../../components/admin/DataComponents';
import { cn } from '../../utils/cn';
import { wartaApi } from '../../api/adminApi';

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

const WartaPage = () => {
  const [wartas, setWartas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWarta, setCurrentWarta] = useState(null); // null = create, object = edit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');

  useEffect(() => {
    fetchWartas();
  }, []);

  const fetchWartas = async () => {
    try {
      setIsLoading(true);
      const response = await wartaApi.getAll();
      setWartas(response.data.data || []);
    } catch (error) {
      console.error('Error fetching wartas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreate = () => {
    setCurrentWarta(null);
    setSelectedFileName('');
    setIsModalOpen(true);
  };

  const openEdit = (warta) => {
    setCurrentWarta(warta);
    setSelectedFileName('');
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) setSelectedFileName(e.target.files[0].name);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);

    try {
      if (currentWarta) {
        // If no new file selected, keep existing file URL
        if (!e.target.file.files[0]) {
          formData.append('existing_file_url', currentWarta.file_url);
        }
        await wartaApi.update(currentWarta.id, formData);
      } else {
        await wartaApi.create(formData);
      }
      fetchWartas();
      setIsModalOpen(false);
      setCurrentWarta(null);
    } catch (error) {
      console.error('Error saving warta:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus warta ini? File PDF juga akan dihapus dari penyimpanan cloud.')) {
      try {
        await wartaApi.delete(id);
        fetchWartas();
      } catch (error) {
        console.error('Error deleting warta:', error);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-on-surface">Manajemen Warta</h1>
          <p className="text-on-surface/50 text-sm font-medium mt-1">Kelola file Warta Jemaat PDF beserta tanggal pemakaiannya.</p>
        </div>
        <Button onClick={openCreate} className="px-8">
          <Upload size={20} /> Upload Warta Baru
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <Table headers={['Judul Warta', 'Tanggal Dipakai', 'File', 'Aksi']}>
          {isLoading ? (
            [1, 2, 3].map(i => (
              <tr key={i} className="animate-pulse h-[72px]">
                <td colSpan={4} className="px-6"><div className="h-4 bg-surface-container-high rounded w-full" /></td>
              </tr>
            ))
          ) : wartas.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-20 text-center text-on-surface/40 font-medium">
                Belum ada warta yang diupload.
              </td>
            </tr>
          ) : (
            wartas.map((warta) => (
              <tr key={warta.id} className="hover:bg-surface-container-low/20 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                      <FileText size={20} />
                    </div>
                    <span className="font-bold text-on-surface">{warta.title}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-on-surface/70 font-medium">
                  {formatDate(warta.date)}
                </td>
                <td className="px-6 py-5">
                  {warta.file_url ? (
                    <a
                      href={warta.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      <Download size={14} /> Lihat PDF
                    </a>
                  ) : (
                    <span className="text-xs text-on-surface/40">-</span>
                  )}
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEdit(warta)}
                      className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(warta.id)} className="p-2 hover:bg-secondary/10 rounded-lg text-secondary transition-colors">
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
        title={currentWarta ? 'Edit Warta' : 'Upload Warta Jemaat'}
        footer={(
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit" form="warta-form" isLoading={isSubmitting}>
              {currentWarta ? 'Simpan Perubahan' : 'Upload & Simpan'}
            </Button>
          </>
        )}
      >
        <form id="warta-form" onSubmit={handleSave} className="space-y-6">
          <Input
            label="Judul Warta"
            name="title"
            placeholder="Contoh: Warta Jemaat 4 Mei 2026"
            defaultValue={currentWarta?.title}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-on-surface/50 uppercase tracking-wider ml-1">Tanggal Warta</label>
            <input
              type="date"
              name="date"
              required
              defaultValue={currentWarta?.date ? currentWarta.date.substring(0, 10) : ''}
              className="w-full bg-surface-container-highest rounded-xl px-4 py-3 text-sm font-medium border-0 outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-on-surface/50 uppercase tracking-wider ml-1">
              File PDF {currentWarta && <span className="normal-case font-normal">(kosongkan jika tidak ingin mengganti)</span>}
            </label>
            <div
              className={cn(
                "border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all duration-300",
                dragActive ? "border-primary bg-primary/5" : "border-outline-variant/30 bg-surface-container-low/30 hover:border-primary/50"
              )}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Upload size={32} />
              </div>
              {selectedFileName ? (
                <p className="text-sm font-bold text-primary mb-1">{selectedFileName}</p>
              ) : currentWarta ? (
                <p className="text-sm font-medium text-on-surface/50 mb-1">File saat ini akan dipertahankan</p>
              ) : (
                <p className="text-sm font-bold text-on-surface mb-1">Klik atau seret file PDF ke sini</p>
              )}
              <p className="text-xs text-on-surface/40 font-medium">Maksimal 10MB • Format PDF</p>
              <input
                type="file"
                name="file"
                accept=".pdf"
                className="hidden"
                id="file-upload"
                required={!currentWarta}
                onChange={handleFileChange}
              />
              <Button type="button" variant="ghost" className="mt-6" onClick={() => document.getElementById('file-upload').click()}>
                Pilih File
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default WartaPage;
