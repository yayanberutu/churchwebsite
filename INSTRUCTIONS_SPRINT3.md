# Instruksi Implementasi Sprint 3 (Backend & Frontend)

Dokumen ini berisi panduan langkah demi langkah untuk melakukan implementasi fitur pada **Sprint 3**, sesuai dengan PRD `prd/Sprint3.md`. Panduan ini dirancang khusus untuk diikuti secara sistematis oleh AI Agent.

---

## FASE 1: IMPLEMENTASI BACKEND (Golang/Gin)

### Langkah 1: Database Migration
1. Buat file baru: `backend/migrations/003_create_sprint3_tables.sql`.
2. Tulis perintah DDL untuk membuat 4 tabel:
   - `worship_schedules` (id, name, schedule_time, location, created_at, updated_at)
   - `daily_verses` (id, reference, content, date, created_at, updated_at)
   - `upcoming_activities` (id, title, date, time_string, location, created_at, updated_at)
   - `daily_devotionals` (id, title, youtube_url, date, created_at, updated_at)
3. Tambahkan `INSERT` statements untuk *seed data* (data palsu) agar fitur bisa dites di Frontend.
4. **Jalankan migrasi** ke database `church_db`.

### Langkah 2: Entity Models
1. Buka atau buat file baru di `backend/internal/entity/`.
2. Definisikan 4 `struct` Go (`WorshipSchedule`, `DailyVerse`, `UpcomingActivity`, `DailyDevotional`) yang berkorespondensi dengan tabel-tabel di Langkah 1.
3. Tambahkan *tags* `json` dan `db`.

### Langkah 3: Repository Layer
1. Buka `backend/internal/repository/public_content_repository.go` (atau buat file baru).
2. Tambahkan 4 *method* ke interface dan implementasinya:
   - `GetWorshipSchedules()` -> Query: `SELECT * FROM worship_schedules`
   - `GetDailyVerseByDate(date string)` -> Query: `SELECT * FROM daily_verses WHERE date = ?`
   - `GetUpcomingActivities()` -> Query: `SELECT * FROM upcoming_activities ORDER BY date ASC LIMIT 3`
   - `GetDailyDevotionalByDate(date string)` -> Query: `SELECT * FROM daily_devotionals WHERE date = ?`

### Langkah 4: Service Layer
1. Buka `backend/internal/service/public_content_service.go` (atau buat file baru).
2. Tambahkan 4 *method* yang meneruskan *call* dari Handler ke Repository.
3. **Logika Khusus:** Untuk *Daily Verse* dan *Daily Devotional*, Service menerima parameter `date`. Jika parameter `date` kosong, gunakan format tanggal hari ini (`time.Now().Format("2006-01-02")`).

### Langkah 5: Handler & Router
1. Buka `backend/internal/handler/public_content_handler.go`.
2. Buat 4 fungsi Gin Handler yang membungkus respons dalam standar JSON (`{"success": true, "message": "...", "data": ...}`).
3. Buka `backend/cmd/main.go` dan daftarkan rute berikut di bawah group `/api/v1/public`:
   - `GET /worship-schedules`
   - `GET /daily-verses/today` (atau `/daily-verses` yang menerima query `?date=`)
   - `GET /upcoming-activities`
   - `GET /daily-devotionals/today`

---

## FASE 2: IMPLEMENTASI FRONTEND (React)

### Langkah 1: Setup API Service
1. Buka `frontend/src/api/publicContentApi.js`.
2. Tambahkan 4 fungsi *fetch* baru: `fetchWorshipSchedules`, `fetchDailyVerse`, `fetchUpcomingActivities`, dan `fetchDailyDevotional`.
3. Kembalikan respons dalam format objek JSON yang *standard*.

### Langkah 2: Dinamisasi Ayat Harian (`DailyVerse.jsx`)
1. Buka `frontend/src/components/DailyVerse/DailyVerse.jsx`.
2. Gunakan `useState` dan `useEffect` untuk memanggil `fetchDailyVerse()` saat komponen dimuat.
3. Gantikan teks *hardcoded* dengan `data.reference` dan `data.content`. Tampilkan teks "Memuat..." saat *loading*.

### Langkah 3: Dinamisasi Kegiatan Mendatang (`UpcomingEvents.jsx`)
1. Buka `frontend/src/components/UpcomingEvents/UpcomingEvents.jsx`.
2. Hapus konstan `MOCK_EVENTS`.
3. Integrasikan dengan `fetchUpcomingActivities()`. Tangani kondisi *loading* dan *error*.

### Langkah 4: Implementasi Seksi Baru (Video Renungan Harian)
1. Buat direktori dan file baru: `frontend/src/components/DailyDevotional/DailyDevotional.jsx`.
2. Implementasikan struktur HTML/Tailwind sesuai arahan desain Sprint 3 (berisi *iframe* YouTube `aspect-video`).
3. Integrasikan dengan `fetchDailyDevotional()`.
4. Buka `frontend/src/pages/Home/HomePage.jsx` dan *render* `<DailyDevotional />` tepat di bawah `<DailyVerse />`.

### Langkah 5: Implementasi Modal Jadwal Ibadah (`HeroSection.jsx`)
1. Buka `frontend/src/components/HeroSection/HeroSection.jsx`.
2. Buat *state* lokal `isModalOpen` (boolean) dan `worshipSchedules` (array).
3. Ubah tombol "Jadwal Ibadah" agar mengubah `isModalOpen` menjadi `true` saat diklik.
4. Buat komponen UI Modal (dengan *overlay* hitam `bg-black/50` dan posisi `fixed inset-0`) di bagian bawah *return statement*.
5. Di dalam modal, petakan (map) `worshipSchedules` menjadi daftar yang rapi. Jangan lupa tombol untuk menutup modal (`isModalOpen(false)`).

---

## KRITERIA SUKSES (DONE)
1. Keempat *endpoint* API merespons dengan HTTP 200 dan data yang valid saat diakses.
2. Tidak ada lagi konten statis (*hardcoded*) di Frontend untuk Ayat Harian dan Kegiatan Mendatang.
3. Tombol "Jadwal Ibadah" berhasil memunculkan *pop-up* yang berisi data jadwal.
4. Seksi Video Renungan terlihat di bawah Ayat Harian dan menampilkan *player* YouTube secara sempurna.
