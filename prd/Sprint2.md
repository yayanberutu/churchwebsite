# HKBP Kernolong App

# PRD — Sprint 2 Website Gereja

## Document Information

- **Product Name:** Website Gereja
- **Sprint:** Sprint 2
- **Document Type:** Product Requirements Document (PRD)
- **Primary Focus:** Home Page Enhancements (Warta, Pengumuman, Kegiatan Pelayanan)
- **Frontend Stack:** React JS (Vite, Tailwind CSS)
- **Backend Stack:** Golang (Gin)
- **Database:** MySQL
- **Primary Consumers of This PRD:**
    - AI Agent UI Designer (Stitch)
    - Junior Frontend Software Engineer
    - Junior Backend Software Engineer

---

## 1. Product Overview

Melanjutkan pengembangan dari Sprint 1, Sprint 2 difokuskan pada pengayaan konten dinamis di **Home Page**.
Pada sprint ini, kita akan:
1. Mengubah tombol pada area Hero menjadi tombol interaktif untuk mengunduh Warta Jemaat terbaru.
2. Menambahkan seksi **Pengumuman** yang dinamis dari backend.
3. Menambahkan seksi **Kegiatan Pelayanan Gereja** yang dinamis dari backend.

Semua data untuk fitur baru ini akan dikelola melalui database dan disajikan lewat API backend agar halaman Home sepenuhnya dinamis.

---

## 2. Background

Setelah berhasil mengintegrasikan identitas dasar gereja (nama, logo, menu) di Sprint 1, pengunjung website membutuhkan informasi terkini terkait kehidupan gereja. Informasi yang paling sering dicari adalah Warta Jemaat (buletin mingguan), pengumuman-pengumuman penting, dan dokumentasi aktivitas pelayanan gereja. Dengan menambahkan fitur-fitur ini ke Home Page, website gereja akan terasa lebih hidup, relevan, dan bermanfaat bagi jemaat.

---

## 3. Goals

Tujuan Sprint 2 adalah:
- Memudahkan jemaat mengunduh Warta Minggu Ini secara langsung dari bagian paling atas website (Hero).
- Menginformasikan jemaat tentang pengumuman gereja terbaru sesuai target kelompoknya.
- Memperlihatkan dokumentasi visual dari kegiatan pelayanan yang sudah/sedang berjalan untuk membangun keterikatan jemaat.

---

## 4. Objectives

Pada akhir Sprint 2, sistem harus menghasilkan:
- Tombol "Download Warta Minggu Ini" di Hero section yang memicu proses pengunduhan file dari API.
- Seksi "Pengumuman" di bawah "Kegiatan Mendatang" yang menampilkan maksimal 3 pengumuman terbaru.
- Seksi "Kegiatan Pelayanan" di bawah "Pengumuman" yang menampilkan maksimal 3 aktivitas pelayanan terbaru beserta fotonya.
- 3 endpoint API baru di backend untuk melayani fitur-fitur tersebut.
- 3 tabel database baru untuk menampung data Warta, Pengumuman, dan Kegiatan Pelayanan.

---

## 5. Sprint Scope

### In Scope
- Modifikasi Hero section (Frontend).
- UI/UX untuk kartu (Card) Pengumuman.
- UI/UX untuk kartu (Card) Kegiatan Pelayanan.
- API Backend untuk Download Warta.
- API Backend untuk Fetch 3 Pengumuman Terbaru.
- API Backend untuk Fetch 3 Kegiatan Pelayanan Terbaru.
- Skema Database dan Migration untuk fitur di atas.

### Out of Scope
- Dashboard Admin / CMS untuk melakukan CRUD data (Asumsi: data dimasukkan langsung ke database (seed) untuk keperluan Sprint 2).
- Halaman detail untuk Pengumuman atau Kegiatan Pelayanan (Hanya menampilkan *preview* di Home Page).
- Fitur Pagination atau tombol "Lihat Semua" yang mengarah ke halaman lain (Hanya menampilkan 3 data terakhir).

---

## 6. User Persona

- **Jemaat (User Biasa):** Mengunjungi Home Page untuk mendapatkan Warta hari Minggu, membaca pengumuman singkat apakah ada kumpul kategorial (misal: Kaum Bapak, Pemuda), dan melihat foto-foto pelayanan terbaru.

---

## 7. User Stories

- **US-1:** Sebagai jemaat, saya ingin mengklik tombol "Download Warta Minggu Ini" di area atas website agar saya bisa membaca warta dalam format dokumen (PDF) di perangkat saya.
- **US-2:** Sebagai jemaat, saya ingin melihat daftar pengumuman terbaru di halaman utama agar saya tidak tertinggal informasi penting dari gereja.
- **US-3:** Sebagai jemaat, saya ingin melihat siapa target dari sebuah pengumuman (Semua, Pemuda, Kaum Ibu, dll.) agar saya tahu apakah pengumuman tersebut relevan dengan saya.
- **US-4:** Sebagai jemaat, saya ingin melihat foto dan caption singkat kegiatan pelayanan agar saya mengetahui aktivitas apa saja yang sedang dilakukan oleh gereja.

---

## 8. Functional Requirements

### FR-1 — Tombol Download Warta
Tombol "Pelayanan Kami" pada komponen HeroSection (Sprint 1) harus diubah menjadi "Download Warta Minggu Ini". Saat diklik, browser harus memanggil API backend untuk mendapatkan URL warta terbaru lalu membuka URL tersebut (download).

### FR-2 — Seksi Pengumuman
Sistem harus merender komponen baru "Pengumuman" yang berlokasi tepat di bawah komponen "Kegiatan Mendatang". Menampilkan tepat 3 (atau kurang, jika data tidak cukup) pengumuman yang paling baru diurutkan berdasarkan tanggal secara menurun (Descending).

### FR-3 — Konten Kartu Pengumuman
Setiap pengumuman harus menampilkan:
- Judul Pengumuman
- Target Pengumuman (Pilihan: `Semua`, `Kaum Bapak`, `Kaum Ibu`, `Pemuda`, `Remaja`)

### FR-4 — Seksi Kegiatan Pelayanan
Sistem harus merender komponen baru "Kegiatan Pelayanan Gereja" di bawah seksi "Pengumuman". Menampilkan tepat 3 kegiatan terbaru diurutkan berdasarkan tanggal pembuatan secara menurun.

### FR-5 — Konten Kartu Kegiatan Pelayanan
Setiap kegiatan harus menampilkan:
- Foto / Gambar Kegiatan
- Nama Kegiatan
- Caption / Deskripsi Singkat Kegiatan

### FR-6 — Backend API Download Warta
Backend harus menyediakan API yang mengembalikan JSON berisi link / URL dari warta yang paling terakhir kali di-publish.

### FR-7 — Backend API List Data
Backend harus menyediakan 2 endpoint public terpisah: satu untuk Pengumuman (limit 3, sort DESC) dan satu untuk Kegiatan Pelayanan (limit 3, sort DESC).

---

## 9. UI / UX Requirements

**Untuk AI Design Agent & Junior FE Engineer:**

### Posisi Komponen (Top to Bottom)
1. Header Navbar (Sprint 1)
2. Hero Section (Diperbarui tombolnya)
3. Daily Verse (Sprint 1)
4. Kegiatan Mendatang (Sprint 1)
5. **[BARU] Pengumuman**
6. **[BARU] Kegiatan Pelayanan Gereja**
7. Footer (Sprint 1)

### Styling Guidelines ("The Reverent Echo")
Ikuti sistem desain dari Sprint 1:
- Dilarang menggunakan border solid 1px (`No-Line Rule`).
- Gunakan *Tonal Layering* (`surface-container-low`, `surface-container-lowest`).
- *Card/Kartu* tidak boleh memiliki garis pembatas horizontal antar item.

### Spesifikasi Kartu Pengumuman
- Desain minimalis dan informatif karena tidak memiliki gambar.
- **Target Pengumuman** bisa dibuat menyerupai `Badge` atau `Pill/Chip` dengan warna yang membedakan target (misal: warna primer untuk "Semua", sekunder untuk "Pemuda", dll).

### Spesifikasi Kartu Kegiatan Pelayanan
- Harus memiliki porsi gambar yang mendominasi (Aspek rasio 16:9 sangat disarankan).
- Gunakan *hover effect* yang elegan (misalnya zoom perlahan pada gambar, atau kartu sedikit naik) serupa dengan "Kegiatan Mendatang".

---

## 10. Requirements for Development Team

### 10.1 Junior Frontend Software Engineer
- **Tugas 1:** Ubah teks dan aksi klik tombol "Pelayanan Kami" menjadi "Download Warta Minggu Ini" di `HeroSection.jsx`. Aksi klik akan nge-fetch API Warta lalu `window.open(url)`.
- **Tugas 2:** Buat service API baru di FE untuk memanggil 3 endpoint baru (Warta, Pengumuman, Kegiatan Pelayanan).
- **Tugas 3:** Buat komponen `Announcements.jsx` dengan status loading & error. Render data ke dalam bentuk grid (3 kolom di desktop, 1 kolom di mobile).
- **Tugas 4:** Buat komponen `MinistryActivities.jsx` dengan status loading & error. Pastikan penempatan gambar optimal dan rapi.
- **Tugas 5:** Integrasikan semua komponen ke `HomePage.jsx` sesuai urutan yang ditentukan (Kegiatan Mendatang -> Pengumuman -> Kegiatan Pelayanan).

### 10.2 Junior Backend Software Engineer
- **Tugas 1:** Buat file *Migration* (misal: `002_add_sprint2_tables.sql`) untuk membuat tabel `wartas`, `announcements`, dan `ministry_activities`.
- **Tugas 2:** Tambahkan data *seed* contoh di file migration tersebut agar FE bisa melakukan testing.
- **Tugas 3:** Implementasi endpoint Download Warta (ambil record `wartas` urutkan berdasarkan created_at DESC LIMIT 1).
- **Tugas 4:** Implementasi endpoint List Pengumuman (Query tabel announcements `ORDER BY created_at DESC LIMIT 3`).
- **Tugas 5:** Implementasi endpoint List Kegiatan Pelayanan (Query tabel ministry_activities `ORDER BY created_at DESC LIMIT 3`).

---

## 11. API Contract

### API 1: Download Warta Terbaru
- **Endpoint:** `GET /api/v1/public/warta/latest/download`
- **Behavior:** Mengembalikan JSON berisi `file_url` warta terbaru.
- **Success Response:**
```json
{
  "success": true,
  "message": "Warta found",
  "data": {
    "id": 1,
    "title": "Warta Minggu 12 Nov 2023",
    "file_url": "https://domain.com/files/warta-12-nov.pdf"
  }
}
```

### API 2: List Pengumuman (Latest 3)
- **Endpoint:** `GET /api/v1/public/announcements/latest`
- **Success Response:**
```json
{
  "success": true,
  "message": "Latest announcements fetched",
  "data": [
    {
      "id": 1,
      "title": "Latihan Paduan Suara Gabungan",
      "target_audience": "Semua",
      "created_at": "2023-11-10T10:00:00Z"
    },
    {
      "id": 2,
      "title": "Retreat Pemuda Akhir Tahun",
      "target_audience": "Pemuda",
      "created_at": "2023-11-09T08:00:00Z"
    }
  ]
}
```

### API 3: List Kegiatan Pelayanan (Latest 3)
- **Endpoint:** `GET /api/v1/public/ministry-activities/latest`
- **Success Response:**
```json
{
  "success": true,
  "message": "Latest ministry activities fetched",
  "data": [
    {
      "id": 1,
      "name": "Bhakti Sosial Panti Asuhan",
      "image_url": "https://domain.com/images/bhakti.jpg",
      "short_caption": "Kunjungan kasih bersama majelis dan jemaat ke Panti Asuhan Kasih Bunda.",
      "created_at": "2023-11-05T10:00:00Z"
    }
  ]
}
```

---

## 12. Database Design

### Tabel: `wartas`
| Column | Type | Constraints | Description |
|---|---|---|---|
| id | bigint | PK, Auto Increment | |
| title | varchar(255) | NOT NULL | "Warta Minggu 12 Nov" |
| file_url | varchar(500) | NOT NULL | Link file PDF |
| created_at | datetime | default NOW() | Waktu pembuatan (digunakan utk sorting latest) |
| updated_at | datetime | default NOW() | |

### Tabel: `announcements`
| Column | Type | Constraints | Description |
|---|---|---|---|
| id | bigint | PK, Auto Increment | |
| title | varchar(255) | NOT NULL | Judul pengumuman |
| target_audience | varchar(50) | NOT NULL | Semua, Kaum Bapak, Kaum Ibu, Pemuda, Remaja |
| created_at | datetime | default NOW() | Waktu pembuatan (digunakan utk sorting latest) |
| updated_at | datetime | default NOW() | |

### Tabel: `ministry_activities`
| Column | Type | Constraints | Description |
|---|---|---|---|
| id | bigint | PK, Auto Increment | |
| name | varchar(255) | NOT NULL | Nama kegiatan |
| image_url | varchar(500) | NOT NULL | Link gambar |
| short_caption | text | NOT NULL | Deskripsi singkat |
| created_at | datetime | default NOW() | Waktu pembuatan (digunakan utk sorting latest) |
| updated_at | datetime | default NOW() | |

---

## 13. Acceptance Criteria (AC)

- **AC-1:** Tombol sekunder di Hero Section berubah teks menjadi "Download Warta Minggu Ini".
- **AC-2:** Saat tombol Warta diklik, FE memanggil API dan pengguna diarahkan/mengunduh file PDF Warta tersebut.
- **AC-3:** Terdapat seksi "Pengumuman" tepat di bawah "Kegiatan Mendatang" pada Home Page yang merender maksimal 3 item pengumuman terbaru.
- **AC-4:** Setiap item Pengumuman wajib menampilkan *Judul* dan *Badge Target Audience*.
- **AC-5:** Terdapat seksi "Kegiatan Pelayanan Gereja" tepat di bawah "Pengumuman" pada Home Page yang merender maksimal 3 item kegiatan terbaru.
- **AC-6:** Setiap item Kegiatan Pelayanan wajib menampilkan *Foto*, *Nama Kegiatan*, dan *Caption Singkat*.
- **AC-7:** Backend memiliki 3 endpoint aktif untuk fitur-fitur tersebut dan *query limitasi/sorting* berjalan dengan benar.
- **AC-8:** Aplikasi frontend tetap responsif, menampilkan kartu dalam layout baris untuk desktop dan bertumpuk (kolom tunggal) untuk perangkat mobile.
