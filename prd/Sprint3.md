# Product Requirements Document (PRD) - Sprint 3
**Project:** Church Website (HKBP Kernolong)
**Document Status:** Draft / Review
**Sprint Goal:** Menghidupkan fitur-fitur statis menjadi dinamis terhubung dengan API Backend, serta menambahkan interaktivitas Jadwal Ibadah dan konten multimedia (Video Renungan).

---

## 1. Overview
Sprint 3 merupakan kelanjutan dari pengembangan Home Page. Fokus utama pada sprint ini adalah mengganti beberapa komponen Frontend yang masih menggunakan data *hardcoded* (seperti Ayat Harian dan Kegiatan Mendatang) agar mengambil data dari Backend (dinamis). Selain itu, Sprint 3 memperkenalkan fitur UI baru berupa Modal (Pop-up) untuk Jadwal Ibadah dan seksi baru untuk Video Renungan Harian.

## 2. Scope of Work
Berikut adalah batasan ruang lingkup pengembangan pada Sprint 3:
1. **Jadwal Ibadah:** Pembuatan UI *Pop-up/Modal* Jadwal Ibadah dan integrasi API.
2. **Ayat Harian Dinamis:** Integrasi UI `DailyVerse` dengan API berdasarkan tanggal hari ini.
3. **Kegiatan Mendatang Dinamis:** Integrasi UI `UpcomingEvents` dengan API.
4. **Video Renungan Harian:** Pembuatan seksi UI baru dan integrasi API untuk memutar video YouTube renungan harian.

---

## 3. User Stories
- Sebagai pengunjung *website*, saya ingin mengklik tombol "Jadwal Ibadah" dan melihat daftar jadwal ibadah dalam sebuah *pop-up* tanpa harus berpindah halaman.
- Sebagai pengunjung *website*, saya ingin membaca Ayat Harian yang berganti secara otomatis setiap harinya sesuai dengan tanggal aktual.
- Sebagai pengunjung *website*, saya ingin melihat daftar Kegiatan Mendatang yang aktual bersumber dari *database* gereja.
- Sebagai pengunjung *website*, saya ingin dapat menonton video renungan harian tepat di bawah seksi Ayat Harian untuk menguatkan iman saya.

---

## 4. Functional Requirements (FR)

### FR-1: Fitur Pop-up Jadwal Ibadah
- **Frontend:** Ketika *user* mengklik tombol "Jadwal Ibadah" di Hero Section, sistem harus menampilkan sebuah *Modal/Pop-up* di tengah layar.
- **Data UI:** *Pop-up* akan menampilkan daftar (list) ibadah. Setiap item ibadah harus memuat informasi:
  - Nama Ibadah (contoh: Ibadah Minggu Pagi)
  - Jadwal Ibadah (contoh: Minggu, 09.00 WIB)
  - Lokasi Ibadah (contoh: Gedung Gereja Utama)
- **Backend:** Menyediakan API *endpoint* untuk mengambil daftar jadwal ibadah aktif.

### FR-2: Dinamisasi Ayat Harian
- **Frontend:** Komponen `DailyVerse` yang sebelumnya statis harus diubah untuk melakukan *fetch data* ke backend saat halaman dimuat.
- **Backend:** Menyediakan API *endpoint* untuk mengambil satu data Ayat Harian. Request dikirimkan dengan menyertakan parameter tanggal (atau sistem backend secara *default* menggunakan tanggal hari ini). Response harus berupa teks ayat dan referensi kitabnya.

### FR-3: API & Integrasi Kegiatan Mendatang
- **Frontend:** Komponen `UpcomingEvents` harus mengambil data dari API, menggantikan data *mock* yang ada saat ini.
- **Backend:** Menyediakan API *endpoint* yang mereturn daftar kegiatan mendatang. Response *schema* harus disesuaikan dengan kebutuhan UI (tanggal, bulan, judul kegiatan, waktu, dan lokasi).

### FR-4: Seksi Baru - Video Renungan Harian
- **Frontend:** 
  - Buat komponen UI baru yang diletakkan persis di bawah seksi "Ayat Harian".
  - Desain harus senada dengan "The Reverent Echo" (menggunakan komponen *glassmorphism* atau *card* dengan *soft shadow*).
  - Terdapat *embed iframe* YouTube player.
- **Backend:** Menyediakan API *endpoint* yang mengembalikan *link* atau *ID video* YouTube untuk renungan hari ini.

---

## 5. API Specifications (Backend Contract)

Semua endpoint berada di bawah prefix: `/api/v1/public`

### 5.1. Get Worship Schedules
- **Endpoint:** `GET /worship-schedules`
- **Response Success (200 OK):**
```json
{
  "success": true,
  "message": "Success fetching worship schedules",
  "data": [
    {
      "id": 1,
      "name": "Ibadah Minggu Pagi",
      "schedule_time": "Minggu, 09:00 WIB",
      "location": "Gedung Gereja Utama"
    }
  ]
}
```

### 5.2. Get Daily Verse
- **Endpoint:** `GET /daily-verses/today` (Atau menggunakan query `?date=YYYY-MM-DD`)
- **Response Success (200 OK):**
```json
{
  "success": true,
  "message": "Success fetching daily verse",
  "data": {
    "id": 1,
    "reference": "Yohanes 3:16",
    "content": "Karena begitu besar kasih Allah akan dunia ini...",
    "date": "2026-05-01"
  }
}
```

### 5.3. Get Upcoming Activities
- **Endpoint:** `GET /upcoming-activities`
- **Response Success (200 OK):**
```json
{
  "success": true,
  "message": "Success fetching upcoming activities",
  "data": [
    {
      "id": 1,
      "title": "Ibadah Padang Pemuda",
      "date": "2026-05-15",
      "time_string": "08.00 - Selesai",
      "location": "Taman Wisata Cibubur"
    }
  ]
}
```

### 5.4. Get Daily Devotional Video
- **Endpoint:** `GET /daily-devotionals/today`
- **Response Success (200 OK):**
```json
{
  "success": true,
  "message": "Success fetching daily devotional",
  "data": {
    "id": 1,
    "title": "Renungan Pagi: Kasih Karunia",
    "youtube_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "date": "2026-05-01"
  }
}
```

---

## 6. Database Schema Updates
Sprint 3 akan membutuhkan penambahan tabel baru pada database MySQL (`church_db`):

1. **`worship_schedules`**: Menyimpan daftar layanan ibadah rutin.
2. **`daily_verses`**: Menyimpan koleksi ayat harian beserta tanggal tayangnya.
3. **`upcoming_activities`**: Menyimpan daftar event/kegiatan gereja yang akan datang.
4. **`daily_devotionals`**: Menyimpan referensi tautan video renungan harian berdasarkan tanggal.

---

## 7. Desain & Panduan UI

1. **Modal Jadwal Ibadah:**
   - Gunakan latar belakang *overlay* hitam transparan (`bg-black/50` dengan efek *backdrop-blur*).
   - Modal box berwarna terang (`bg-surface-container-lowest`) dengan sudut melengkung (`rounded-xl`).
   - Tampilkan list menggunakan desain yang rapi (misal: *icon* jam dan lokasi di sebelah teks).

2. **Seksi Video Renungan:**
   - Posisi: Antara "Ayat Harian" dan "Kegiatan Mendatang".
   - Harus responsif: Video `iframe` memiliki *aspect ratio* 16:9 (`aspect-video`).
   - Berikan judul yang jelas, contoh: "Renungan Hari Ini".

---
*Dokumen ini merupakan sumber kebenaran (Source of Truth) untuk fase pengembangan Sprint 3.*
