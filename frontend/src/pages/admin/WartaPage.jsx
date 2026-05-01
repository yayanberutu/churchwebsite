import React, { useState, useEffect } from 'react';
import { Upload, FileText, Trash2, Download, Search } from 'lucide-react';
import { Button, Input, Card } from '../../components/admin/UI';
import { Table, Modal } from '../../components/admin/DataComponents';
import { cn } from '../../utils/cn';
import { wartaApi } from '../../api/adminApi';

const WartaPage = () => {
  const [wartas, setWartas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

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

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);

    try {
      await wartaApi.create(formData);
      fetchWartas();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error uploading warta:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus warta ini?')) {
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
        <h1 className="text-3xl font-headline font-bold text-on-surface">Manajemen Warta</h1>
        <Button onClick={() => setIsModalOpen(true)} className="px-8">
          <Upload size={20} /> Upload Warta Baru
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <Table headers={['Judul Warta', 'File', 'Tanggal', 'Aksi']}>
          {isLoading ? (
            [1, 2, 3].map(i => (
              <tr key={i} className="animate-pulse h-[72px]">
                <td colSpan={4} className="px-6"><div className="h-4 bg-surface-container-high rounded w-full" /></td>
              </tr>
            ))
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
                <td className="px-6 py-5 text-sm text-on-surface/50 font-medium">{warta.file_name}</td>
                <td className="px-6 py-5 text-sm text-on-surface/50 font-medium">{warta.date}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors">
                      <Download size={18} />
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
        title="Upload Warta Jemaat"
        footer={(
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit" form="warta-form" isLoading={isSubmitting}>Upload & Simpan</Button>
          </>
        )}
      >
        <form id="warta-form" onSubmit={handleSave} className="space-y-6">
          <Input label="Judul Warta" name="title" placeholder="Contoh: Warta Jemaat 4 Mei 2026" required />
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-on-surface/50 uppercase tracking-wider ml-1">File PDF</label>
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
              <p className="text-sm font-bold text-on-surface mb-1">Klik atau seret file PDF ke sini</p>
              <p className="text-xs text-on-surface/40 font-medium">Maksimal 10MB • Format PDF</p>
              <input type="file" name="file" accept=".pdf" className="hidden" id="file-upload" required />
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
