# PRD — Sprint 6: Calendar Experience, Content Detail Pages & Configurable Home

## 1. Document Information

- **Product:** Website Gereja HKBP Kernolong
- **Sprint:** Sprint 6
- **Document Type:** Product Requirements Document (PRD) — AI Ready
- **Status:** Draft for Implementation
- **Primary Focus:**
  1. Perbaikan UX Kegiatan Mendatang dan tampilan kalender interaktif.
  2. Halaman list dan detail Pengumuman.
  3. Halaman list dokumentasi dan detail Kegiatan Pelayanan Gereja.
  4. Pembersihan header/footer yang belum memiliki fungsi.
  5. Menjadikan konten utama Home Page configurable dari database dan Admin Panel.
- **Frontend Stack:** React JS, Vite, Tailwind CSS
- **Backend Stack:** Golang, Gin
- **Database:** MySQL
- **Object Storage:** Cloudflare R2 / OSS existing storage service
- **Primary Consumers:**
  - AI Frontend Agent
  - AI Backend Agent
  - AI UI Designer Agent

---

## 2. Background

Pada sprint sebelumnya, website sudah memiliki Home Page dengan komponen Kegiatan Mendatang, Pengumuman, dan Kegiatan Pelayanan Gereja. Sebagian data sudah dibuat dinamis melalui backend, admin dashboard sudah tersedia untuk beberapa modul, dan penyimpanan file sudah menggunakan object storage.

Sprint 6 difokuskan untuk menaikkan kualitas pengalaman pengguna pada Home Page dan memperluas konten menjadi halaman yang dapat dibaca lebih lengkap oleh jemaat. Selain itu, beberapa konten Hero/Home yang saat ini masih hardcoded harus dipindahkan ke database agar dapat diatur dari Admin Panel tanpa perubahan kode.

---

## 3. Goals

Tujuan Sprint 6 adalah:

1. Menampilkan hanya kegiatan yang belum berlalu pada seksi **Kegiatan Mendatang** di Home Page.
2. Memberikan konteks waktu seperti **Hari ini**, **Besok**, atau **X hari lagi** pada setiap kegiatan mendatang.
3. Menyediakan tampilan kalender interaktif saat user menekan **Lihat Semua Kalender**.
4. Menyediakan halaman list Pengumuman dengan pagination dan halaman detail Pengumuman.
5. Menambahkan tombol **Lihat Detail** pada setiap Pengumuman di Home Page.
6. Menyediakan halaman detail Kegiatan Pelayanan.
7. Menyediakan halaman dokumentasi Kegiatan Pelayanan dalam bentuk timeline/feed visual yang sesuai untuk website gereja.
8. Menghapus elemen UI yang belum berfungsi: Search icon di header dan beberapa link footer.
9. Memindahkan konfigurasi identitas gereja dan Hero Home dari hardcoded/frontend/table `churches` ke tabel baru `church_config`.
10. Menyediakan menu Admin untuk mengelola konfigurasi Home dan identitas gereja.

---

## 4. Scope

### 4.1 In Scope

#### Public User Side

- Update UI seksi **Kegiatan Mendatang** di Home Page.
- Filter Kegiatan Mendatang agar tidak menampilkan kegiatan yang sudah berlalu.
- Tambahkan label waktu relatif: `Hari ini`, `Besok`, atau `{X} hari lagi`.
- Tambahkan tampilan kalender saat klik **Lihat Semua Kalender**.
- Kalender dapat menampilkan kegiatan berdasarkan tanggal yang dipilih.
- Kalender menampilkan status kegiatan tanggal lampau sebagai **Sudah selesai**.
- Halaman list Pengumuman dengan pagination.
- Halaman detail Pengumuman.
- Tombol **Lihat Detail** untuk setiap Pengumuman di Home Page.
- Halaman list dokumentasi Kegiatan Pelayanan dengan desain timeline/feed.
- Halaman detail Kegiatan Pelayanan.
- Tombol **Lihat Detail** untuk setiap Kegiatan Pelayanan di Home Page.
- Redirect dari **Lihat Dokumentasi** ke halaman list dokumentasi Kegiatan Pelayanan.
- Hapus Search icon di header.
- Hapus footer link yang belum digunakan: Privacy Policy, Church Locations, Ministries, Archive.
- Home Page mengambil konten Hero dan identitas gereja dari database.

#### Admin Side

- Tambah menu Admin: **Konfigurasi Website**.
- Admin dapat mengubah:
  - Nama gereja
  - Logo gereja
  - Judul Hero Home
  - Subjudul Hero Home
  - Gambar Hero Home
- Upload gambar konfigurasi menggunakan object storage existing Cloudflare R2/OSS.
- Saat gambar konfigurasi diganti, file lama di object storage harus dihapus untuk mencegah orphan file.

#### Backend

- Migration tabel `church_config`.
- Migrasi data dari tabel `churches` ke `church_config`.
- Drop tabel `churches` setelah data berhasil dimigrasikan.
- Update endpoint public `site-config` agar membaca dari `church_config`.
- Tambah endpoint public untuk calendar activities, list/detail Pengumuman, list/detail Kegiatan Pelayanan.
- Tambah endpoint admin untuk konfigurasi website.

---

### 4.2 Out of Scope

- Search functionality.
- Authentication/authorization enhancement.
- Rich text editor advanced untuk Pengumuman.
- Komentar/like/share seperti social media.
- Multi-language.
- SEO advanced.
- Recurring event engine untuk kegiatan berulang.
- Calendar export ke Google Calendar/ICS.
- Admin CRUD generic untuk semua key `church_config`; Sprint 6 cukup mengelola key yang dibutuhkan Home Page.

---

## 5. User Personas

### 5.1 Jemaat / Pengunjung Website

Pengunjung yang ingin melihat kegiatan gereja yang akan datang, membaca pengumuman secara lengkap, dan melihat dokumentasi kegiatan gereja dengan mudah dari perangkat desktop maupun mobile.

### 5.2 Admin Gereja

Pengelola website yang ingin memperbarui konten utama Home Page, gambar Hero, logo gereja, dan informasi website tanpa menyentuh source code atau database secara manual.

---

## 6. User Stories

### 6.1 Kegiatan Mendatang & Kalender

- Sebagai jemaat, saya ingin hanya melihat kegiatan yang belum berlalu agar informasi di Home Page tetap relevan.
- Sebagai jemaat, saya ingin melihat informasi **X hari lagi** agar saya tahu seberapa dekat kegiatan tersebut.
- Sebagai jemaat, saya ingin membuka kalender dan memilih tanggal agar saya dapat melihat kegiatan pada tanggal tertentu.
- Sebagai jemaat, saat memilih tanggal yang sudah berlalu, saya ingin mengetahui bahwa kegiatan pada tanggal tersebut sudah selesai.

### 6.2 Pengumuman

- Sebagai jemaat, saya ingin melihat semua pengumuman pada halaman khusus agar saya tidak hanya melihat 3 pengumuman terbaru di Home Page.
- Sebagai jemaat, saya ingin pengumuman panjang ditampilkan sebagai ringkasan di list agar halaman tetap mudah dibaca.
- Sebagai jemaat, saya ingin membuka detail pengumuman agar dapat membaca isi lengkap dan attachment jika ada.

### 6.3 Kegiatan Pelayanan

- Sebagai jemaat, saya ingin membuka detail kegiatan pelayanan agar dapat melihat dokumentasi dan cerita kegiatan secara lengkap.
- Sebagai jemaat, saya ingin melihat semua dokumentasi kegiatan dalam bentuk feed visual agar pengalaman melihat dokumentasi terasa lebih hidup namun tetap formal.

### 6.4 Konfigurasi Home

- Sebagai admin, saya ingin mengubah nama gereja, logo, teks Hero, dan gambar Hero dari Admin Panel agar Home Page tidak lagi bergantung pada data hardcoded.

---

## 7. Functional Requirements

## 7.1 Kegiatan Mendatang — Home Page

### FR-1 — Filter kegiatan yang sudah berlalu

Sistem hanya boleh menampilkan kegiatan dengan `date >= current_date` pada seksi **Kegiatan Mendatang** di Home Page.

**Rules:**

- Gunakan timezone server/application: `Asia/Jakarta`.
- Jika `date` sama dengan tanggal hari ini, kegiatan tetap tampil.
- Jika `date < current_date`, kegiatan tidak tampil di Home Page.
- Default limit Home Page: maksimal 3 kegiatan terdekat.
- Sorting: `date ASC`, lalu `time_string ASC` jika memungkinkan.

---

### FR-2 — Label waktu relatif

Setiap kegiatan mendatang harus memiliki label waktu relatif.

**Rules:**

- Jika `days_until = 0`, tampilkan `Hari ini`.
- Jika `days_until = 1`, tampilkan `Besok`.
- Jika `days_until > 1`, tampilkan `{days_until} hari lagi`.

**Backend harus mengembalikan:**

```json
{
  "days_until": 7,
  "relative_date_label": "7 hari lagi"
}
```

Frontend tidak boleh menghitung label sendiri kecuali sebagai fallback. Backend menjadi source of truth untuk perhitungan tanggal.

---

### FR-3 — Perbaikan visual card Kegiatan Mendatang

Perbaiki desain card Kegiatan Mendatang dengan aturan berikut:

- Judul kegiatan lebih dominan:
  - Desktop: 20–24px, font weight 700.
  - Mobile: 18–20px, font weight 700.
- Waktu dan lokasi dibuat secondary:
  - Warna lebih soft seperti slate/gray.
  - Font size lebih kecil dari judul.
  - Gunakan icon jam dan lokasi.
- Date box tetap dipertahankan namun lebih kontras:
  - Background primary/navy.
  - Text putih.
  - Day number besar.
  - Month uppercase kecil.
  - Gunakan rounded corner dan soft shadow.
- Tambahkan pill label waktu relatif di dekat judul atau metadata.
- Seluruh card boleh dibuat clickable untuk membuka Calendar Modal pada tanggal kegiatan tersebut.
- Arrow kanan boleh tetap ditampilkan sebagai visual cue, tetapi bukan satu-satunya area klik.

---

## 7.2 Calendar Interaction

### FR-4 — Tombol Lihat Semua Kalender

Saat user menekan **Lihat Semua Kalender** di Home Page, sistem harus menampilkan Calendar View.

**Recommended UX Decision:**

Gunakan modal/overlay pada desktop dan mobile-friendly bottom sheet/full-screen modal pada mobile.

**Alasan:**

- User tetap berada di Home Page.
- Interaksi terasa ringan.
- Sesuai wording “muncul tampilan kalender”.

---

### FR-5 — Calendar View

Calendar View harus memiliki:

- Header bulan dan tahun.
- Navigasi bulan sebelumnya/berikutnya.
- Grid tanggal.
- Marker/dot pada tanggal yang memiliki kegiatan.
- Panel detail tanggal terpilih.
- State loading, empty, dan error.

---

### FR-6 — Pilih tanggal pada kalender

Saat user memilih tanggal:

- Sistem mengambil daftar kegiatan pada tanggal tersebut.
- Jika ada kegiatan, tampilkan daftar kegiatan pada panel detail.
- Jika tidak ada kegiatan, tampilkan empty state.

**Wording empty state untuk tanggal sekarang/masa depan:**

> Belum ada kegiatan pada tanggal ini.

**Wording untuk tanggal lampau tanpa kegiatan:**

> Tidak ada kegiatan pada tanggal ini. Tanggal ini sudah berlalu.

---

### FR-7 — Tanggal back-dated

Jika tanggal yang dipilih adalah tanggal lampau (`selected_date < current_date`):

- Panel detail menampilkan label status: `Sudah selesai`.
- Jika ada kegiatan pada tanggal tersebut, kegiatan tetap ditampilkan dengan badge `Sudah selesai`.
- Card kegiatan lampau menggunakan tone visual lebih soft/neutral agar berbeda dari kegiatan mendatang.

---

## 7.3 Pengumuman — Home, List, Detail

### FR-8 — Tombol Lihat Detail pada Pengumuman Home

Setiap card Pengumuman di Home Page harus memiliki tombol/link **Lihat Detail**.

**Behavior:**

- Klik `Lihat Detail` redirect ke `/pengumuman/:id`.
- Card tetap menampilkan judul, target audience badge, dan ringkasan singkat jika tersedia.

---

### FR-9 — Tombol Lihat Semua Pengumuman

Tombol **Lihat Semua** pada seksi Pengumuman harus redirect ke halaman list Pengumuman.

**Route:**

```text
/pengumuman
```

---

### FR-10 — Halaman List Pengumuman

Halaman `/pengumuman` menampilkan semua pengumuman dengan pagination.

**Sorting:**

```sql
ORDER BY created_at DESC
```

**Pagination Decision:**

- Default page size: 10 item per page.
- Alasan: 10 item cukup familiar bagi user, tidak terlalu panjang di mobile, dan tetap efisien untuk scanning.

**List item wajib menampilkan:**

- Judul pengumuman.
- Target audience badge.
- Tanggal dibuat/publish.
- Preview konten.
- Tombol `Lihat Detail`.

**Preview content rules:**

- Backend mengembalikan `content_preview` maksimal 180 karakter.
- Preview harus strip HTML jika content di masa depan mengandung HTML.
- Jika konten melebihi 180 karakter, tambahkan suffix `...`.
- Frontend juga menerapkan line clamp 2–3 baris sebagai safety.

---

### FR-11 — Halaman Detail Pengumuman

Halaman `/pengumuman/:id` menampilkan pengumuman lengkap.

**Detail page wajib menampilkan:**

- Judul.
- Target audience badge.
- Tanggal dibuat/publish.
- Konten lengkap.
- Attachment jika ada.
- Tombol kembali ke `/pengumuman`.

**Attachment behavior:**

- Jika attachment berupa PDF/file, tampilkan sebagai daftar file dengan tombol download/open.
- Jika tidak ada attachment, section attachment tidak perlu ditampilkan.

---

## 7.4 Kegiatan Pelayanan Gereja — Home, Documentation Feed, Detail

### FR-12 — Tombol Lihat Detail pada Home

Setiap card Kegiatan Pelayanan di Home Page harus memiliki tombol/link **Lihat Detail**.

**Behavior:**

- Klik redirect ke `/kegiatan-pelayanan/:id`.

---

### FR-13 — Tombol Lihat Dokumentasi

Tombol **Lihat Dokumentasi** pada seksi Kegiatan Pelayanan harus redirect ke halaman list dokumentasi.

**Route:**

```text
/kegiatan-pelayanan
```

---

### FR-14 — Halaman Dokumentasi Kegiatan Pelayanan

Halaman `/kegiatan-pelayanan` menampilkan list kegiatan pelayanan yang diurutkan berdasarkan kegiatan terbaru.

**Sorting:**

- Default: `created_at DESC`.
- Jika field `activity_date` tersedia, gunakan `activity_date DESC, created_at DESC`.

**Design direction:**

Desain menggunakan konsep timeline/feed seperti Instagram Feed, tetapi disesuaikan untuk kelas website gereja:

- Satu feed card per kegiatan.
- Foto berada di bagian atas.
- Caption berada di bawah foto.
- Tampilan formal, clean, tidak terlalu social-media heavy.
- Maksimum lebar feed desktop: 720–800px agar nyaman dibaca.
- Mobile: full-width card dengan padding aman.
- Gunakan soft shadow, rounded corner, dan tonal background.
- Tidak menggunakan tombol like/comment/share.

**Pagination / Load More Decision:**

- Gunakan `Muat Lebih Banyak` dengan page size 6 item.
- Alasan: gambar cukup berat, 6 item menjaga performa dan tetap terasa seperti feed.
- Backend tetap menggunakan query `page` dan `page_size` agar implementasi sederhana.

---

### FR-15 — Halaman Detail Kegiatan Pelayanan

Halaman `/kegiatan-pelayanan/:id` menampilkan detail kegiatan.

**Detail page wajib menampilkan:**

- Nama kegiatan.
- Gambar utama.
- Caption/deskripsi lengkap.
- Tanggal dibuat atau tanggal kegiatan jika tersedia.
- Tombol kembali ke `/kegiatan-pelayanan`.

**Schema enhancement recommended:**

Tambahkan field optional pada tabel `ministry_activities`:

- `content TEXT NULL` untuk detail yang lebih panjang.
- `activity_date DATE NULL` untuk tanggal aktual kegiatan.

Jika `content` kosong, frontend menggunakan `short_caption` sebagai konten detail.

---

## 7.5 Header & Footer Cleanup

### FR-16 — Hapus Search icon di header

Search icon/logo pada header harus dihapus karena fitur search belum tersedia.

**Rules:**

- Jangan sisakan placeholder search.
- Jangan tambahkan input search dummy.
- Layout header harus tetap rapi setelah search dihapus.

---

### FR-17 — Hapus footer links yang belum digunakan

Hapus link footer berikut:

- Privacy Policy
- Church Locations
- Ministries
- Archive

**Allowed footer content after cleanup:**

- Nama gereja.
- Logo gereja jika sudah tersedia.
- Copyright.
- Kontak/alamat jika sudah ada dan valid.

Jika data kontak/alamat belum tersedia, cukup tampilkan copyright minimal.

---

## 7.6 Configurable Home & Church Config

### FR-18 — Buat tabel `church_config`

Buat tabel baru `church_config` di database aplikasi existing.

> Catatan implementasi: walaupun requirement menyebut “database baru”, untuk menjaga deployment tetap sederhana, implementasikan sebagai tabel baru `church_config` di database MySQL existing. Nama tabel wajib `church_config`.

Tabel ini menggantikan fungsi tabel `churches` untuk identitas gereja dan menjadi tempat konfigurasi konten Home.

---

### FR-19 — Migrasi data dari `churches` ke `church_config`

Data dari tabel `churches` harus dipindahkan ke `church_config`:

- `churches.name` → config key `church_name`
- `churches.logo_url` → config key `church_logo`

Setelah migrasi berhasil:

- Update backend agar tidak lagi membaca tabel `churches`.
- Drop tabel `churches`.

---

### FR-20 — Hero Home configurable

Konten Hero Home yang saat ini hardcoded harus disimpan di `church_config`.

Minimal config keys:

| Config Key | Type | Public | Description |
|---|---|---:|---|
| `church_name` | text | yes | Nama gereja |
| `church_logo` | image | yes | Logo gereja |
| `home_hero_title` | text | yes | Judul Hero, contoh: Selamat Datang di HKBP Kernolong |
| `home_hero_subtitle` | textarea | yes | Subjudul Hero |
| `home_hero_image` | image | yes | Gambar/foto utama bagian atas Home |

Optional config keys jika sudah ada button text hardcoded:

| Config Key | Type | Public | Description |
|---|---|---:|---|
| `home_hero_primary_button_text` | text | yes | Contoh: Jadwal Ibadah |
| `home_hero_secondary_button_text` | text | yes | Contoh: Download Warta Minggu Ini |

---

### FR-21 — File config disimpan di OSS/R2

Jika config membutuhkan file/gambar:

- File harus diupload ke Cloudflare R2/OSS existing.
- Database menyimpan public URL dan metadata file.
- Saat file diganti, file lama harus dihapus dari R2/OSS.

**Recommended object path:**

```text
configs/YYYY/MM/{config_key}_{uuid}.{ext}
```

---

### FR-22 — Admin menu Konfigurasi Website

Tambahkan menu pada Admin Sidebar:

```text
Konfigurasi Website
```

**Route:**

```text
/admin/church-config
```

Admin page terdiri dari dua section:

1. **Identitas Gereja**
   - Nama gereja
   - Logo gereja upload
2. **Hero Home**
   - Judul Hero
   - Subjudul Hero
   - Gambar Hero upload

**UX rules:**

- Tampilkan preview gambar saat memilih file.
- Tampilkan preview gambar existing dari database.
- Submit button disabled saat loading.
- Tampilkan toast sukses/gagal.
- Setelah update sukses, Home Page harus menampilkan data terbaru setelah reload/refetch.

---

### FR-23 — Public Home mengambil config dari database

Home Page tidak boleh lagi menggunakan hardcoded text/image untuk:

- Nama gereja.
- Logo gereja.
- Hero title.
- Hero subtitle.
- Hero image.

Semua data harus berasal dari endpoint public backend.

---

## 8. Database Design

## 8.1 New Table: `church_config`

```sql
CREATE TABLE church_config (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  config_key VARCHAR(100) NOT NULL UNIQUE,
  config_value TEXT NULL,
  value_type VARCHAR(30) NOT NULL DEFAULT 'text',
  group_name VARCHAR(50) NOT NULL DEFAULT 'general',
  display_label VARCHAR(150) NULL,
  description TEXT NULL,
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,

  file_name VARCHAR(255) NULL,
  file_url VARCHAR(500) NULL,
  file_object_key VARCHAR(500) NULL,
  file_mime_type VARCHAR(100) NULL,
  file_size_bytes BIGINT NULL,
  file_alt_text VARCHAR(255) NULL,

  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Column Notes

- `config_key`: unique identifier, contoh `home_hero_title`.
- `config_value`: text value untuk type text/textarea/url/json. Untuk image, boleh berisi URL utama sebagai fallback.
- `value_type`: `text`, `textarea`, `image`, `url`, `json`, `boolean`, `number`.
- `group_name`: contoh `identity`, `home_hero`.
- `is_public`: hanya config public yang boleh dikembalikan ke endpoint public.
- `file_object_key`: path object di R2 untuk delete/replace.
- `file_url`: public URL yang digunakan frontend untuk render gambar.

---

## 8.2 Migration from `churches`

Migration harus melakukan langkah berikut secara aman:

1. Create table `church_config` jika belum ada.
2. Insert config default Home Hero jika belum ada.
3. Jika table `churches` ada, migrasikan data pertama dari `churches` ke `church_config`.
4. Update backend repository agar tidak membaca `churches`.
5. Drop table `churches` setelah aplikasi sudah menggunakan `church_config`.

**Pseudo SQL:**

```sql
INSERT INTO church_config (config_key, config_value, value_type, group_name, display_label, is_public, sort_order)
SELECT 'church_name', name, 'text', 'identity', 'Nama Gereja', TRUE, 1
FROM churches
LIMIT 1
ON DUPLICATE KEY UPDATE config_value = VALUES(config_value);

INSERT INTO church_config (config_key, config_value, value_type, group_name, display_label, is_public, sort_order)
SELECT 'church_logo', logo_url, 'image', 'identity', 'Logo Gereja', TRUE, 2
FROM churches
WHERE logo_url IS NOT NULL
LIMIT 1
ON DUPLICATE KEY UPDATE config_value = VALUES(config_value), file_url = VALUES(config_value);
```

**Default seed:**

```sql
INSERT INTO church_config (config_key, config_value, value_type, group_name, display_label, is_public, sort_order)
VALUES
('home_hero_title', 'Selamat Datang di HKBP Kernolong', 'text', 'home_hero', 'Judul Hero Home', TRUE, 10),
('home_hero_subtitle', 'Membangun iman, harapan, dan kasih dalam persekutuan yang hidup. Bergabunglah bersama kami dalam perjalanan rohani yang mendalam.', 'textarea', 'home_hero', 'Subjudul Hero Home', TRUE, 11)
ON DUPLICATE KEY UPDATE config_value = VALUES(config_value);
```

---

## 8.3 Existing Table Updates

### `upcoming_activities`

No mandatory schema change if current table already has:

- `id`
- `title`
- `date`
- `time_string`
- `location`
- `created_at`
- `updated_at`

Recommended index:

```sql
CREATE INDEX idx_upcoming_activities_date ON upcoming_activities(date);
```

---

### `announcements`

Ensure table supports:

- `id`
- `title`
- `content TEXT NULL`
- `target_audience`
- `attachments JSON NULL` or related attachment table
- `created_at`
- `updated_at`

Recommended index:

```sql
CREATE INDEX idx_announcements_created_at ON announcements(created_at);
```

---

### `ministry_activities`

Recommended schema enhancement:

```sql
ALTER TABLE ministry_activities
ADD COLUMN content TEXT NULL AFTER short_caption,
ADD COLUMN activity_date DATE NULL AFTER image_url;

CREATE INDEX idx_ministry_activities_created_at ON ministry_activities(created_at);
CREATE INDEX idx_ministry_activities_activity_date ON ministry_activities(activity_date);
```

If agent wants minimal scope, `content` and `activity_date` may be nullable and existing records remain valid.

---

## 9. API Contract

All public endpoints use prefix:

```text
/api/v1/public
```

All admin endpoints use prefix:

```text
/api/v1/admin
```

Standard success response:

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

Standard error response:

```json
{
  "success": false,
  "error_code": "ERROR_CODE",
  "message": "Error message",
  "errors": null
}
```

---

## 9.1 Public API — Site Config

### GET `/api/v1/public/site-config`

Update existing endpoint to read identity and Home Hero from `church_config`.

**Response:**

```json
{
  "success": true,
  "message": "Site config fetched successfully",
  "data": {
    "churchName": "HKBP Kernolong",
    "churchLogoUrl": "https://public-r2-url/logo.png",
    "homeHero": {
      "title": "Selamat Datang di HKBP Kernolong",
      "subtitle": "Membangun iman, harapan, dan kasih dalam persekutuan yang hidup.",
      "imageUrl": "https://public-r2-url/hero.jpg",
      "primaryButtonText": "Jadwal Ibadah",
      "secondaryButtonText": "Download Warta Minggu Ini"
    },
    "menus": [
      {
        "id": 1,
        "name": "Home",
        "slug": "home",
        "path": "/",
        "order": 1,
        "isActive": true
      }
    ]
  }
}
```

**Rules:**

- Only return configs where `is_public = true`.
- If a config is missing, return safe fallback, not 500.
- Backend must not query table `churches` anymore.

---

## 9.2 Public API — Upcoming Activities

### GET `/api/v1/public/upcoming-activities`

Returns only activities today or in the future.

**Query params:**

| Param | Type | Default | Description |
|---|---|---:|---|
| `limit` | int | 3 | Max items returned |

**Query rule:**

```sql
WHERE date >= CURRENT_DATE
ORDER BY date ASC, time_string ASC
LIMIT :limit
```

**Response:**

```json
{
  "success": true,
  "message": "Upcoming activities fetched successfully",
  "data": [
    {
      "id": 1,
      "title": "Ibadah Padang Pemuda",
      "date": "2026-05-15",
      "day": "15",
      "month": "MEI",
      "time_string": "08.00 - Selesai",
      "location": "Taman Wisata Cibubur",
      "days_until": 12,
      "relative_date_label": "12 hari lagi"
    }
  ]
}
```

---

### GET `/api/v1/public/calendar/activities`

Returns activities for a selected date.

**Query params:**

| Param | Required | Example |
|---|---:|---|
| `date` | yes | `2026-05-15` |

**Response:**

```json
{
  "success": true,
  "message": "Activities by date fetched successfully",
  "data": {
    "date": "2026-05-15",
    "is_past": false,
    "date_status_label": "Akan datang",
    "activities": [
      {
        "id": 1,
        "title": "Ibadah Padang Pemuda",
        "date": "2026-05-15",
        "time_string": "08.00 - Selesai",
        "location": "Taman Wisata Cibubur",
        "days_until": 12,
        "relative_date_label": "12 hari lagi",
        "status_label": "Akan datang"
      }
    ]
  }
}
```

For past selected date:

```json
{
  "success": true,
  "message": "Activities by date fetched successfully",
  "data": {
    "date": "2026-04-20",
    "is_past": true,
    "date_status_label": "Sudah selesai",
    "activities": [
      {
        "id": 2,
        "title": "Rapat Panitia",
        "date": "2026-04-20",
        "time_string": "14.00 WIB",
        "location": "Ruang Rapat",
        "days_until": -13,
        "relative_date_label": "Sudah selesai",
        "status_label": "Sudah selesai"
      }
    ]
  }
}
```

---

### GET `/api/v1/public/calendar/month`

Returns dates that have activities in a month, used to render dot markers on calendar.

**Query params:**

| Param | Required | Example |
|---|---:|---|
| `month` | yes | `2026-05` |

**Response:**

```json
{
  "success": true,
  "message": "Calendar month fetched successfully",
  "data": {
    "month": "2026-05",
    "dates": [
      {
        "date": "2026-05-03",
        "activity_count": 1,
        "is_past": false
      },
      {
        "date": "2026-05-10",
        "activity_count": 2,
        "is_past": false
      }
    ]
  }
}
```

---

## 9.3 Public API — Announcements

### GET `/api/v1/public/announcements/latest`

Returns latest 3 announcements for Home Page.

**Query params:**

| Param | Type | Default |
|---|---|---:|
| `limit` | int | 3 |

**Response:**

```json
{
  "success": true,
  "message": "Latest announcements fetched",
  "data": [
    {
      "id": 1,
      "title": "Latihan Paduan Suara Gabungan",
      "target_audience": "Semua",
      "content_preview": "Latihan paduan suara gabungan akan dilaksanakan...",
      "created_at": "2026-05-01T10:00:00Z"
    }
  ]
}
```

---

### GET `/api/v1/public/announcements`

Returns paginated announcement list.

**Query params:**

| Param | Type | Default | Max |
|---|---|---:|---:|
| `page` | int | 1 | - |
| `page_size` | int | 10 | 50 |

**Response:**

```json
{
  "success": true,
  "message": "Announcements fetched successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "title": "Latihan Paduan Suara Gabungan",
        "target_audience": "Semua",
        "content_preview": "Latihan paduan suara gabungan akan dilaksanakan...",
        "created_at": "2026-05-01T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "page_size": 10,
      "total_items": 32,
      "total_pages": 4,
      "has_next": true,
      "has_previous": false
    }
  }
}
```

---

### GET `/api/v1/public/announcements/:id`

Returns detail announcement.

**Response:**

```json
{
  "success": true,
  "message": "Announcement fetched successfully",
  "data": {
    "id": 1,
    "title": "Latihan Paduan Suara Gabungan",
    "content": "Isi lengkap pengumuman...",
    "target_audience": "Semua",
    "attachments": [
      {
        "file_name": "jadwal-latihan.pdf",
        "file_url": "https://public-r2-url/jadwal-latihan.pdf"
      }
    ],
    "created_at": "2026-05-01T10:00:00Z",
    "updated_at": "2026-05-01T10:00:00Z"
  }
}
```

---

## 9.4 Public API — Ministry Activities

### GET `/api/v1/public/ministry-activities/latest`

Returns latest 3 activities for Home Page.

**Query params:**

| Param | Type | Default |
|---|---|---:|
| `limit` | int | 3 |

**Response:**

```json
{
  "success": true,
  "message": "Latest ministry activities fetched",
  "data": [
    {
      "id": 1,
      "name": "Bhakti Sosial Panti Asuhan",
      "image_url": "https://public-r2-url/bhakti.jpg",
      "short_caption": "Kunjungan kasih bersama majelis dan jemaat...",
      "activity_date": "2026-05-01",
      "created_at": "2026-05-01T10:00:00Z"
    }
  ]
}
```

---

### GET `/api/v1/public/ministry-activities`

Returns paginated ministry activities for documentation feed.

**Query params:**

| Param | Type | Default | Max |
|---|---|---:|---:|
| `page` | int | 1 | - |
| `page_size` | int | 6 | 30 |

**Response:**

```json
{
  "success": true,
  "message": "Ministry activities fetched successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "name": "Bhakti Sosial Panti Asuhan",
        "image_url": "https://public-r2-url/bhakti.jpg",
        "short_caption": "Kunjungan kasih bersama majelis dan jemaat...",
        "activity_date": "2026-05-01",
        "created_at": "2026-05-01T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "page_size": 6,
      "total_items": 18,
      "total_pages": 3,
      "has_next": true,
      "has_previous": false
    }
  }
}
```

---

### GET `/api/v1/public/ministry-activities/:id`

Returns detail ministry activity.

**Response:**

```json
{
  "success": true,
  "message": "Ministry activity fetched successfully",
  "data": {
    "id": 1,
    "name": "Bhakti Sosial Panti Asuhan",
    "image_url": "https://public-r2-url/bhakti.jpg",
    "short_caption": "Kunjungan kasih bersama majelis dan jemaat...",
    "content": "Cerita lengkap kegiatan pelayanan...",
    "activity_date": "2026-05-01",
    "created_at": "2026-05-01T10:00:00Z",
    "updated_at": "2026-05-01T10:00:00Z"
  }
}
```

---

## 9.5 Admin API — Church Config

### GET `/api/v1/admin/church-config`

Returns config for Admin form.

**Response:**

```json
{
  "success": true,
  "message": "Church config fetched successfully",
  "data": {
    "identity": {
      "church_name": "HKBP Kernolong",
      "church_logo": {
        "file_url": "https://public-r2-url/logo.png",
        "file_name": "logo.png"
      }
    },
    "home_hero": {
      "home_hero_title": "Selamat Datang di HKBP Kernolong",
      "home_hero_subtitle": "Membangun iman, harapan, dan kasih dalam persekutuan yang hidup.",
      "home_hero_image": {
        "file_url": "https://public-r2-url/hero.jpg",
        "file_name": "hero.jpg"
      }
    }
  }
}
```

---

### PUT `/api/v1/admin/church-config`

Updates config. Use multipart/form-data because images may be included.

**Content-Type:**

```text
multipart/form-data
```

**Fields:**

| Field | Type | Required | Description |
|---|---|---:|---|
| `church_name` | text | yes | Nama gereja |
| `home_hero_title` | text | yes | Judul Hero Home |
| `home_hero_subtitle` | text | yes | Subjudul Hero Home |
| `church_logo` | file | no | Logo gereja baru |
| `home_hero_image` | file | no | Gambar Hero baru |

**Validation:**

- `church_name`: required, max 255.
- `home_hero_title`: required, max 255.
- `home_hero_subtitle`: required, max 1000.
- Image file type: `image/jpeg`, `image/png`, `image/webp`.
- Max image size: 5 MB per file.

**Response:**

```json
{
  "success": true,
  "message": "Church config updated successfully",
  "data": {
    "church_name": "HKBP Kernolong",
    "church_logo_url": "https://public-r2-url/logo.png",
    "home_hero_title": "Selamat Datang di HKBP Kernolong",
    "home_hero_subtitle": "Membangun iman, harapan, dan kasih dalam persekutuan yang hidup.",
    "home_hero_image_url": "https://public-r2-url/hero.jpg"
  }
}
```

**File lifecycle rule:**

- If a new file is uploaded for a config key, upload new file to R2 first.
- If upload succeeds and database update succeeds, delete old file from R2.
- If database update fails, delete newly uploaded file to avoid orphan.
- Log each storage operation using existing logging system.

---

## 10. Frontend Routing

Add/update public routes:

```text
/                              Home
/pengumuman                    Announcement list
/pengumuman/:id                Announcement detail
/kegiatan-pelayanan            Ministry activities documentation feed
/kegiatan-pelayanan/:id        Ministry activity detail
```

Add/update admin routes:

```text
/admin/church-config           Church/Home configuration
```

---

## 11. Frontend Components

Recommended structure:

```text
src/
  api/
    publicApi.js
    announcementApi.js
    ministryActivityApi.js
    calendarApi.js
    churchConfigApi.js
  components/
    Calendar/
      CalendarModal.jsx
      CalendarGrid.jsx
      CalendarDateDetails.jsx
    UpcomingEvents/
      UpcomingEvents.jsx
      UpcomingEventCard.jsx
    Announcements/
      AnnouncementCard.jsx
      AnnouncementListItem.jsx
    MinistryActivities/
      MinistryActivityCard.jsx
      MinistryFeedCard.jsx
    Header/
      Header.jsx
    Footer/
      Footer.jsx
  pages/
    Home/
      HomePage.jsx
    Announcements/
      AnnouncementListPage.jsx
      AnnouncementDetailPage.jsx
    MinistryActivities/
      MinistryActivityFeedPage.jsx
      MinistryActivityDetailPage.jsx
    admin/
      ChurchConfigPage.jsx
```

---

## 12. UI/UX Requirements

## 12.1 Global Design Principles

- Clean, formal, and warm.
- Suitable for church audience, including older users.
- Large enough text for readability.
- Low cognitive load.
- Avoid visual clutter.
- Maintain existing design language: navy primary color, soft surfaces, rounded cards, subtle shadows.
- Avoid hard border-heavy design.

---

## 12.2 Calendar Modal Design

Desktop:

- Modal width: 900–1040px.
- Two-column layout:
  - Left: calendar grid.
  - Right: selected date details.
- Header: `Kalender Kegiatan Gereja`.
- Close button top-right.

Mobile:

- Full-screen modal or bottom sheet.
- Calendar grid on top.
- Selected date details below.
- Large touch targets minimum 44px.

Calendar date states:

- Today: visually highlighted.
- Selected date: primary background.
- Dates with activities: small dot marker.
- Past selected date: neutral tone with `Sudah selesai` badge in details panel.

---

## 12.3 Announcement List Design

- Page title: `Pengumuman Gereja`.
- Subtitle: `Informasi terbaru seputar pelayanan dan kegiatan jemaat.`
- Use vertical list cards.
- Each card should have:
  - Title.
  - Badge target audience.
  - Date.
  - Preview content.
  - `Lihat Detail` CTA.
- Pagination placed at bottom.
- Empty state: `Belum ada pengumuman.`

---

## 12.4 Announcement Detail Design

- Max content width: 760px.
- Title prominent.
- Metadata below title.
- Content uses comfortable line height.
- Attachment list styled as cards or rows.
- Back link at top or bottom.

---

## 12.5 Ministry Documentation Feed Design

- Page title: `Dokumentasi Kegiatan Pelayanan`.
- Subtitle: `Melihat kembali momen pelayanan dan kebersamaan jemaat.`
- Feed card:
  - Image top, aspect ratio 16:9 or 4:3.
  - Name/title below image.
  - Date metadata.
  - Caption below.
  - `Lihat Detail` button.
- Desktop max width: 720–800px.
- Mobile: one column.
- Use `Muat Lebih Banyak` button at bottom.
- Empty state: `Belum ada dokumentasi kegiatan.`

---

## 12.6 Admin Church Config Design

- Page title: `Konfigurasi Website`.
- Section cards:
  - Identitas Gereja.
  - Hero Home.
- Use image preview.
- Use file upload component consistent with existing admin upload UI.
- Save button sticky at bottom or below form.
- Success toast: `Konfigurasi berhasil disimpan`.
- Error toast: `Gagal menyimpan konfigurasi`.

---

## 13. Backend Implementation Requirements

Backend agent must:

1. Create migration for `church_config`.
2. Migrate `churches` data to `church_config`.
3. Remove all repository/service dependency on `churches`.
4. Drop `churches` table after migration.
5. Update `GET /api/v1/public/site-config`.
6. Update `GET /api/v1/public/upcoming-activities` to filter only today/future.
7. Add relative date calculation using timezone `Asia/Jakarta`.
8. Add calendar endpoints.
9. Add paginated announcement endpoint and announcement detail endpoint.
10. Add paginated ministry activities endpoint and detail endpoint.
11. Add admin church config GET/PUT endpoints.
12. Use existing R2/OSS storage service for config image upload.
13. Use existing logging pattern with trace ID for all new endpoints.
14. Return graceful success with empty arrays when no list data found.
15. Return 404-style error only for detail endpoint when ID does not exist.

---

## 14. Frontend Implementation Requirements

Frontend agent must:

1. Remove hardcoded Hero title/subtitle/image from Home.
2. Consume updated `site-config` endpoint.
3. Remove Search icon from Header.
4. Remove unused footer links.
5. Update UpcomingEvents component:
   - show only returned upcoming data.
   - display relative date label.
   - implement improved visual hierarchy.
6. Implement Calendar Modal:
   - open from `Lihat Semua Kalender`.
   - fetch month markers.
   - fetch activities by selected date.
   - handle back-dated selected date.
7. Update Announcement section on Home:
   - add `Lihat Detail` per card.
   - `Lihat Semua` redirects to `/pengumuman`.
8. Build Announcement List and Detail pages.
9. Update Ministry Activities Home section:
   - add `Lihat Detail` per card.
   - `Lihat Dokumentasi` redirects to `/kegiatan-pelayanan`.
10. Build Ministry Activity Feed and Detail pages.
11. Build Admin Church Config page.
12. Ensure loading, error, empty states exist for every page.
13. Ensure responsive behavior for desktop and mobile.

---

## 15. Validation Rules

### Church Config

- `church_name`: required, max 255.
- `home_hero_title`: required, max 255.
- `home_hero_subtitle`: required, max 1000.
- Image file types: JPEG, PNG, WebP.
- Max image size: 5 MB.

### Pagination

- `page` minimum: 1.
- `page_size` minimum: 1.
- Announcement max page_size: 50.
- Ministry max page_size: 30.

### Date Query

- `date`: required format `YYYY-MM-DD`.
- `month`: required format `YYYY-MM`.
- Invalid date/month returns validation error 400.

---

## 16. Empty, Loading & Error States

### Home Upcoming Events Empty

If no upcoming event:

> Belum ada kegiatan mendatang.

Still show **Lihat Semua Kalender** button.

### Calendar Selected Date Empty

Future/today:

> Belum ada kegiatan pada tanggal ini.

Past:

> Tidak ada kegiatan pada tanggal ini. Tanggal ini sudah berlalu.

### Announcement List Empty

> Belum ada pengumuman.

### Ministry Feed Empty

> Belum ada dokumentasi kegiatan.

### Detail Not Found

Use friendly message:

> Data tidak ditemukan atau sudah tidak tersedia.

---

## 17. Acceptance Criteria

### Kegiatan Mendatang & Kalender

- **AC-1:** Home Page tidak menampilkan kegiatan dengan tanggal sebelum hari ini.
- **AC-2:** Kegiatan hari ini tetap tampil di Home Page.
- **AC-3:** Setiap kegiatan mendatang menampilkan label `Hari ini`, `Besok`, atau `{X} hari lagi`.
- **AC-4:** Card Kegiatan Mendatang memiliki visual hierarchy lebih baik: judul dominan, metadata soft, date box kontras.
- **AC-5:** Klik **Lihat Semua Kalender** membuka Calendar View.
- **AC-6:** User dapat memilih tanggal pada kalender.
- **AC-7:** Kegiatan pada tanggal yang dipilih tampil di panel detail.
- **AC-8:** Jika tanggal yang dipilih adalah tanggal lampau, UI menampilkan status `Sudah selesai`.
- **AC-9:** Calendar View responsive di desktop dan mobile.

### Pengumuman

- **AC-10:** Klik **Lihat Semua** pada Home Pengumuman redirect ke `/pengumuman`.
- **AC-11:** Halaman `/pengumuman` menampilkan list pengumuman sort `created_at DESC`.
- **AC-12:** Halaman `/pengumuman` memiliki pagination 10 item per page.
- **AC-13:** Konten panjang di list dipotong menjadi preview maksimal 180 karakter.
- **AC-14:** Setiap pengumuman di list memiliki tombol `Lihat Detail`.
- **AC-15:** Setiap pengumuman di Home memiliki tombol `Lihat Detail`.
- **AC-16:** Halaman `/pengumuman/:id` menampilkan detail lengkap dan attachment jika ada.

### Kegiatan Pelayanan

- **AC-17:** Setiap Kegiatan Pelayanan di Home memiliki tombol `Lihat Detail`.
- **AC-18:** Klik `Lihat Detail` redirect ke `/kegiatan-pelayanan/:id`.
- **AC-19:** Klik **Lihat Dokumentasi** redirect ke `/kegiatan-pelayanan`.
- **AC-20:** Halaman `/kegiatan-pelayanan` menampilkan feed/timeline dokumentasi dengan foto di atas dan caption di bawah.
- **AC-21:** Feed dokumentasi diurutkan dari kegiatan terbaru.
- **AC-22:** Feed dokumentasi menggunakan pagination/load more dengan page size 6.
- **AC-23:** Detail kegiatan menampilkan gambar, nama kegiatan, dan caption/content lengkap.

### Header & Footer

- **AC-24:** Search icon di header sudah dihapus.
- **AC-25:** Link footer Privacy Policy, Church Locations, Ministries, dan Archive sudah dihapus.
- **AC-26:** Header dan footer tetap rapi setelah elemen dihapus.

### Configurable Home

- **AC-27:** Tabel `church_config` tersedia.
- **AC-28:** Data dari `churches` berhasil dimigrasikan ke `church_config`.
- **AC-29:** Backend tidak lagi membaca table `churches`.
- **AC-30:** Table `churches` dihapus setelah migration.
- **AC-31:** Home Hero title, subtitle, dan image berasal dari backend/database, bukan hardcoded.
- **AC-32:** Nama gereja dan logo gereja berasal dari `church_config`.
- **AC-33:** Admin dapat membuka `/admin/church-config`.
- **AC-34:** Admin dapat mengubah nama gereja, logo, Hero title, Hero subtitle, dan Hero image.
- **AC-35:** Upload gambar config tersimpan ke R2/OSS dan URL tersimpan di database.
- **AC-36:** Saat gambar config diganti, file lama di R2/OSS dihapus.

---

## 18. Testing Scope

### Backend Tests

- Test migration `church_config`.
- Test site-config reads from `church_config`.
- Test upcoming activities filter excludes past dates.
- Test relative date label calculation.
- Test calendar by date for past, today, and future.
- Test calendar month markers.
- Test paginated announcements.
- Test announcement detail found/not found.
- Test paginated ministry activities.
- Test ministry activity detail found/not found.
- Test admin church config update with text only.
- Test admin church config update with image upload.
- Test old image cleanup after replacement.

### Frontend Tests

- Home renders configurable Hero.
- Home renders upcoming activities with relative date labels.
- Calendar modal opens and closes.
- Calendar selected date fetches correct activities.
- Announcement list pagination works.
- Announcement detail page renders full content.
- Ministry feed load more works.
- Ministry detail page renders image and content.
- Header no longer shows search.
- Footer no longer shows removed links.
- Admin church config form loads existing values and saves updates.

### Integration Tests

- Update config in Admin, reload Home, verify new data appears.
- Upload new Hero image, verify image appears on Home.
- Replace Hero image, verify old object removed from R2/OSS.
- Create past/future upcoming activities, verify Home only shows future/today.
- Select past date in calendar, verify `Sudah selesai` status.

---

## 19. Risks & Mitigation

### Risk 1 — Breaking existing site-config consumers

**Mitigation:** Keep old response fields `churchName`, `churchLogoUrl`, and `menus`. Add `homeHero` as new field, do not rename existing fields.

### Risk 2 — Dropping `churches` too early

**Mitigation:** Migration must insert data into `church_config` first. Repository must be updated and tested before `DROP TABLE churches` is executed.

### Risk 3 — Orphan files in R2/OSS

**Mitigation:** Follow file lifecycle rule. Log upload/update/delete operations.

### Risk 4 — Date mismatch because timezone

**Mitigation:** Use `Asia/Jakarta` consistently in backend date calculation and document it clearly.

### Risk 5 — Feed page becomes heavy because images

**Mitigation:** Use page size 6, lazy loading images, and optimized image dimensions if available.

---

## 20. Definition of Done

Sprint 6 is done when:

- Home Page no longer shows past activities.
- Upcoming events show relative date labels.
- Calendar View works for future, today, and past selected dates.
- Announcement list and detail pages are completed.
- Announcement Home cards have detail buttons.
- Ministry documentation feed and detail pages are completed.
- Ministry Home cards have detail buttons.
- Header Search icon is removed.
- Unused footer links are removed.
- `church_config` table exists and replaces `churches`.
- Home Hero and church identity are configurable from Admin.
- Config image upload uses R2/OSS and old files are cleaned up.
- All new public/admin APIs are integrated with FE.
- Loading, empty, error states are implemented.
- Desktop and mobile responsiveness verified.

---

## 21. Implementation Notes for AI Agents

### Backend Agent Priority Order

1. Implement migration `church_config` and site-config update.
2. Implement upcoming activities filter + relative labels.
3. Implement calendar endpoints.
4. Implement announcement list/detail endpoints.
5. Implement ministry list/detail endpoints.
6. Implement admin church config endpoint with R2 upload.
7. Add tests and logging.

### Frontend Agent Priority Order

1. Update Home to use configurable Hero from `site-config`.
2. Remove Search icon and unused footer links.
3. Improve Upcoming Events card and calendar modal.
4. Implement Announcement list/detail pages.
5. Implement Ministry feed/detail pages.
6. Implement Admin Church Config page.
7. Add loading/empty/error states.

### UI Designer Agent Priority Order

1. Redesign Upcoming Events card.
2. Design Calendar Modal desktop/mobile.
3. Design Announcement list/detail.
4. Design Ministry feed/detail.
5. Design Admin Config form.

---

## 22. Final Notes

This PRD is intended to be directly executable by lower-cost AI Agents. Agents should avoid introducing unrelated features. The priority is functional completeness, stable integration, and clean UX improvements based on the current Church Website roadmap.
