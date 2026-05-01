# PRD — Sprint 5: Cloud Storage, Logging & System Stabilization

## 1. Document Info

- **Product:** Website Gereja (HKBP Kernolong)
- **Sprint:** Sprint 5
- **Type:** Product Requirements Document (AI-Ready)
- **Focus:** Cloudflare R2 Integration, Comprehensive Logging, Schema Merging, and System Stabilization.
- **Status:** COMPLETED (May 2026)

---

## 2. Product Overview

Sprint 5 berfokus pada migrasi penyimpanan aset ke **Cloudflare R2**, implementasi sistem monitoring melalui **Comprehensive Logging**, penyederhanaan skema data untuk **Daily Verse & Devotional**, serta peningkatan stabilitas aplikasi melalui penanganan *error* yang lebih baik di sisi backend dan frontend.

---

## 3. Goals & Success Metrics

### Goals
1. Mengintegrasikan layanan Cloudflare R2 sebagai backend storage utama.
2. Implementasi **Traceable Logging** untuk mempermudah diagnosa masalah di produksi.
3. Sinkronisasi siklus hidup file (Upload/Replace/Delete) antara Database dan R2.
4. Penyederhanaan manajemen konten harian (Merging Daily Verse & Devotional).
5. Peningkatan kualitas UI/UX pada komponen konten harian di Home Page.

### Success Metrics
- Upload file berhasil masuk ke bucket R2.
- Log sistem mencatat setiap API call dengan Trace ID dan Time Cost.
- Tidak ada file yatim (*orphan files*) di R2 setelah penghapusan/pembaruan data.
- API publik tetap mengembalikan status sukses (200 OK) meskipun data tidak ditemukan (Graceful Null Handling).

---

## 4. Key Implementations

### 4.1 Cloudflare R2 Integration
- **Storage Service**: Abstraksi penyimpanan menggunakan AWS SDK v2 untuk Go.
- **Automatic Cleanup**: Backend secara otomatis menghapus file lama di R2 saat admin melakukan pembaruan file atau penghapusan entitas (Warta, Announcements, Activities).
- **Dynamic Paths**: File disimpan dengan struktur `/folder/YYYY/MM/{prefix}_{uuid}.ext` untuk mencegah konflik.

### 4.2 Comprehensive Logging System
- **Trace ID**: Setiap *request* mendapatkan UUID unik yang disuntikkan ke header `X-Trace-ID` dan diteruskan ke seluruh lapisan servis.
- **Digest Log**: Mencatat Method, Path, Request Body, Response Body, Status (Success/Failed), dan Time Cost.
- **Integration Log**: Mencatat interaksi keluar ke Cloudflare R2 (Start, Success, Fail, Time Cost).
- **Persistence**: Log disimpan di `backend/logs/app.log` dengan mekanisme *append* dan *multi-writer* (tampil di konsol & tersimpan di file).

### 4.3 Data Model Merging (Daily Verse & Devotional)
- **Schema Update**: Tabel `daily_devotionals` dihapus dan kolomnya (`devotional_title`, `devotional_url`) digabungkan ke dalam tabel `daily_verses`.
- **Admin Efficiency**: Admin sekarang mengelola Ayat Harian dan Video Renungan dalam satu form tunggal.
- **UI Redesign**: Komponen `DailyVerse` di Home Page menggunakan desain vertikal yang elegan dengan integrasi video YouTube yang lebih rapi.

### 4.4 System Stabilization & Security
- **Graceful Error Handling**: Backend menangani `sql.ErrNoRows` sebagai status sukses dengan `data: null` (mencegah 500 Internal Server Error saat data kosong).
- **Frontend Null Safety**: Semua Admin Page menggunakan pola `data || []` saat melakukan *state assignment* untuk mencegah *crash* pada render.
- **Bug Fix**: Perbaikan isu *z-index* pada pemilihan foto di form `Ministry Activities`.

---

## 5. Folder Structure & Environment

### New Folder Structure
```text
backend/
├── logs/
│   └── app.log (Log file persistent)
├── internal/
│   ├── middleware/
│   │   └── logger.go (Sistem logging utama)
│   ├── service/
│   │   └── storage_service.go (R2 Interface)
```

### Environment Variables (.env)
```env
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=...
R2_PUBLIC_URL=...
```

---

## 6. Definition of Done (DoD)

- [x] Migrasi R2 Cloud Storage selesai untuk semua modul aset.
- [x] Sistem Logging dengan Trace ID aktif dan tersimpan di file.
- [x] Penggabungan tabel Daily Verse & Devotional selesai beserta UI redesign-nya.
- [x] Penanganan data `null` sudah aman di seluruh Dashboard Admin.
- [x] Perbaikan bug pemilih foto di Admin Activities selesai.

---
*Last Updated: 2026-05-02*
