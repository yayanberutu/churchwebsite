# HKBP Kernolong App

# PRD — Sprint 1 Website Gereja

## Document Information

- **Product Name:** Website Gereja
- **Sprint:** Sprint 1
- **Document Type:** Product Requirements Document (PRD)
- **Primary Focus:** Home Page
- **Frontend Stack:** React JS
- **Backend Stack:** Golang
- **Database:** MySQL
- **Primary Consumers of This PRD:**
    - AI Agent UI Designer
    - AI Agent Frontend Developer
    - AI Agent Backend Developer

---

## 1. Product Overview

Website yang akan dikembangkan adalah **Website Gereja** dengan dua jenis role utama:

- **Admin**
- **User biasa**

Pada **Sprint 1**, fokus pengembangan dibatasi hanya pada **1 halaman**, yaitu **Home Page**.

Halaman Home harus menampilkan:

1. **Nama gereja**
2. **Logo gereja**
3. **Header / navigation menu yang bersifat dinamis**

Semua data yang tampil pada Home Page harus berasal dari **backend API**, bukan hardcoded di frontend.

Aplikasi ini dirancang untuk **satu gereja per instance aplikasi**, namun data identitas gereja tetap disimpan di database agar aplikasi bersifat **configurable** dan dapat digunakan kembali untuk gereja lain pada deployment yang berbeda tanpa perlu mengubah source code.

Dengan pendekatan ini, sistem pada tahap awal **bukan multi-tenant**, tetapi **single-tenant configurable**.

---

## 2. Background

Website Gereja ini dirancang sebagai fondasi awal untuk platform digital gereja yang nantinya dapat berkembang menjadi website informasi, media pelayanan, dan kanal komunikasi jemaat.

Sprint pertama difokuskan pada pembangunan halaman Home sebagai fondasi utama sistem, dengan penekanan pada:

- integrasi frontend dan backend
- penyediaan data dinamis dari server
- struktur aplikasi yang scalable untuk sprint selanjutnya
- konfigurasi branding gereja melalui database

Home Page menjadi entry point awal yang merepresentasikan identitas gereja dan menyediakan navigation menu yang nantinya akan berkembang menjadi beberapa halaman atau modul lain.

Pendekatan ini dipilih agar:

- aplikasi lebih fleksibel
- branding gereja dapat dikonfigurasi
- aplikasi dapat digunakan kembali untuk gereja lain
- pengembangan tetap sederhana karena belum perlu mendukung multi-tenant

---

## 3. Goals

Tujuan Sprint 1 adalah:

- membangun **Home Page** yang bisa diakses dengan baik
- menampilkan **nama gereja** dari backend
- menampilkan **logo gereja** dari backend
- menampilkan **header menu yang dinamis** dari backend
- membuat fondasi struktur frontend, backend, dan database yang siap dikembangkan pada sprint berikutnya
- memastikan identitas gereja dapat diubah melalui data, bukan perubahan source code

---

## 4. Objectives

Pada akhir Sprint 1, sistem harus menghasilkan:

- Home Page yang dapat di-render dengan benar
- API backend untuk menyediakan data site configuration
- integrasi frontend ke backend
- struktur database awal untuk identitas gereja dan menu
- UI dasar yang responsive dan bersih
- error handling dan loading state minimum
- fondasi aplikasi **single-tenant configurable**

---

## 5. Sprint Scope

### In Scope

- Pembuatan **Home Page**
- Menampilkan **nama gereja**
- Menampilkan **logo gereja**
- Menampilkan **header/navigation menu dinamis**
- Pembuatan API backend untuk kebutuhan Home Page
- Penyimpanan data di MySQL
- Handling untuk state:
    - loading
    - success
    - error
- Responsive layout dasar untuk desktop dan mobile

### Out of Scope

- Login
- Register
- Authorization berbasis role
- Dashboard admin
- CRUD data oleh admin
- Halaman Profile
- Halaman Marturia
- Halaman Diakonia
- Halaman Koinonia
- CMS
- SEO advanced
- Multi-language
- Analytics
- Search
- Footer dinamis
- Hero banner kompleks

---

## 6. Product Positioning

Aplikasi ini dirancang untuk melayani **satu gereja per instance aplikasi**.

Namun, identitas dan konfigurasi gereja tetap disimpan di database agar aplikasi bersifat **configurable** dan dapat digunakan ulang untuk gereja lain pada deployment yang berbeda tanpa perlu mengubah source code.

Artinya:

- **1 app / 1 deployment = 1 gereja**
- **branding dan konfigurasi gereja tetap disimpan di database**
- **aplikasi dapat direuse untuk gereja lain dengan mengganti data konfigurasi**
- **belum mendukung multi-tenant dalam satu instance**

---

## 7. Assumptions

Untuk Sprint 1, digunakan asumsi berikut:

1. **Home Page bersifat public** dan dapat diakses tanpa login.
2. Role **admin** dan **user biasa** belum memiliki pengaruh terhadap perilaku sistem pada Sprint 1.
3. Satu instance aplikasi hanya digunakan untuk **satu gereja**.
4. Identitas gereja tetap disimpan di database agar dapat dikonfigurasi.
5. Aplikasi harus dapat digunakan ulang untuk gereja lain dengan mengganti data konfigurasi pada database, bukan dengan mengubah source code.
6. Backend menyediakan endpoint public untuk mengembalikan konfigurasi Home Page.
7. Header menu yang ditampilkan frontend sepenuhnya mengikuti data dari backend.
8. Item menu selain Home hanya perlu tampil sebagai navigation item, meskipun halaman tujuannya belum dikembangkan pada Sprint 1.

---

## 8. User Persona

### 8.1 User Biasa

Pengunjung website yang membuka situs gereja untuk melihat identitas gereja dan menu navigasi utama.

### 8.2 Admin

Pengelola internal gereja yang nantinya akan mengelola data dan konten website, namun pada Sprint 1 belum memiliki fitur khusus.

---

## 9. User Stories

### User Story 1

Sebagai pengunjung website, saya ingin melihat **nama gereja** agar saya tahu identitas website yang sedang saya buka.

### User Story 2

Sebagai pengunjung website, saya ingin melihat **logo gereja** agar branding gereja terlihat jelas.

### User Story 3

Sebagai pengunjung website, saya ingin melihat **header menu yang dinamis** agar saya mengetahui navigasi utama website.

### User Story 4

Sebagai frontend application, saya ingin mengambil data dari backend agar informasi pada Home Page tidak hardcoded.

### User Story 5

Sebagai developer, saya ingin struktur data dan API dibuat dengan rapi agar mudah dikembangkan di sprint berikutnya.

### User Story 6

Sebagai product owner, saya ingin identitas gereja tersimpan di database agar aplikasi dapat dikonfigurasi ulang untuk gereja lain tanpa perlu mengubah source code.

---

## 10. Functional Requirements

### FR-1 — Home Page sebagai halaman utama

Sistem harus menampilkan Home Page saat website pertama kali dibuka.

### FR-2 — Nama gereja berasal dari backend

Frontend harus mengambil dan menampilkan nama gereja dari API backend.

### FR-3 — Logo gereja berasal dari backend

Frontend harus mengambil dan menampilkan logo gereja dari API backend.

### FR-4 — Header navigation bersifat dinamis

Frontend harus merender daftar menu header berdasarkan data yang dikembalikan backend.

### FR-5 — Menu ditampilkan berdasarkan status aktif

Frontend hanya boleh menampilkan menu yang berstatus aktif dari backend.

### FR-6 — Menu ditampilkan sesuai urutan

Frontend harus menampilkan menu sesuai urutan yang ditentukan backend.

### FR-7 — Tersedia loading state

Saat API masih dipanggil, frontend harus menampilkan loading state yang layak.

### FR-8 — Tersedia error state

Jika API gagal, frontend harus menampilkan error state yang informatif dan tidak menyebabkan aplikasi crash.

### FR-9 — Aman terhadap data kosong

Jika data menu kosong atau logo tidak tersedia, aplikasi tetap harus stabil dengan fallback yang aman.

### FR-10 — Home tetap tersedia sebagai entry point

Sistem harus memastikan Home tetap menjadi navigation utama, baik sebagai data dari backend maupun fallback minimal.

### FR-11 — Konfigurasi gereja disimpan di database

Nama gereja dan logo gereja harus disimpan di database, bukan di-hardcode pada backend maupun frontend.

### FR-12 — Konfigurasi dapat diubah tanpa perubahan kode

Perubahan identitas gereja harus dapat dilakukan melalui perubahan data/configuration di database tanpa perlu memodifikasi source code aplikasi.

---

## 11. Non-Functional Requirements

### NFR-1 — Performance

Home Page harus dapat dimuat dengan cepat pada kondisi koneksi normal.

### NFR-2 — Maintainability

Kode frontend, backend, dan query database harus mudah dipahami dan mudah dikembangkan.

### NFR-3 — Scalability

Struktur project harus mendukung penambahan halaman dan fitur pada sprint berikutnya.

### NFR-4 — Reliability

Aplikasi tidak boleh crash saat terjadi error API, data kosong, atau data tidak lengkap.

### NFR-5 — Responsiveness

UI minimal harus berjalan dengan baik pada:

- desktop
- mobile

### NFR-6 — Clean Architecture

- Frontend harus modular
- Backend harus memiliki separation of concerns
- Database schema harus rapi dan extensible

### NFR-7 — Configurability

Identitas gereja dan navigation menu harus dapat diubah melalui data yang tersimpan di database.

---

## 12. User Flow

### Main Flow

1. User membuka website
2. Frontend memanggil API public untuk mengambil site configuration
3. Backend menerima request
4. Backend mengambil data dari database
5. Backend mengembalikan data:
    - nama gereja
    - logo gereja
    - menu navigation aktif
6. Frontend menampilkan data pada Home Page

### Error Flow

1. User membuka website
2. Frontend memanggil API
3. Terjadi error dari backend / jaringan / timeout
4. Frontend menampilkan error state
5. Aplikasi tetap stabil dan tidak blank/crash

---

## 13. UI / UX Requirements

### UI Components Minimum

### Header / Navbar

Harus menampilkan:

- logo gereja
- nama gereja
- menu navigasi dinamis

### Main Content Area

Pada Sprint 1, area utama Home Page boleh berupa section sederhana atau placeholder, karena fokus utama sprint ada pada header dan identitas gereja.

### UI Principles

- bersih
- modern
- formal
- mudah dibaca
- cocok untuk konteks website gereja
- tidak terlalu ramai
- responsive
- mudah diimplementasikan

### UX Notes

- Nama gereja harus mudah dikenali
- Logo harus proporsional dan tidak pecah
- Menu harus tetap usable saat jumlah item bertambah
- Mobile navigation harus dipertimbangkan sejak awal

---

## 14. Requirements for UI Design Agent

UI Design Agent harus menghasilkan:

### Deliverables

- desain Home Page versi desktop
- desain Home Page versi mobile
- desain Header / Navbar
- desain loading state
- desain error state
- style guideline dasar

### Design Focus

- branding gereja
- clarity
- responsive header
- clean visual hierarchy
- implementable di React

### Constraints

- tidak mendesain dashboard admin
- tidak mendesain login/register
- tidak mendesain halaman Profile/Marturia/Diakonia/Koinonia secara detail
- tidak menambahkan fitur di luar sprint scope

---

## 15. Requirements for Frontend Agent

Frontend Agent harus menghasilkan:

### FE Scope

- membuat halaman Home
- membuat komponen Header / Navbar dinamis
- memanggil API backend
- menampilkan nama gereja
- menampilkan logo gereja
- menampilkan menu dinamis
- meng-handle loading, error, dan fallback state
- membuat layout responsive

### FE Implementation Rules

- data tidak boleh hardcoded
- backend menjadi single source of truth
- komponen harus modular
- struktur folder harus rapi
- harus siap untuk penambahan route/halaman lain di sprint selanjutnya

### Recommended Frontend Structure

```
src/
  api/
    siteConfigApi.js
  components/
    Header/
      Header.jsx
      Header.css
    ChurchLogo/
      ChurchLogo.jsx
    NavigationMenu/
      NavigationMenu.jsx
  pages/
    Home/
      HomePage.jsx
      HomePage.css
  hooks/
  utils/
  routes/
  App.jsx
  main.jsx
```

### FE State Minimum

- `loading`
- `error`
- `data`

---

## 16. Requirements for Backend Agent

Backend Agent harus menghasilkan:

### BE Scope

- membuat endpoint public untuk Home Page / site configuration
- mengambil data nama gereja dari database
- mengambil data logo gereja dari database
- mengambil data menu aktif dari database
- mengurutkan menu sesuai order
- mengembalikan response JSON yang konsisten
- menyediakan basic error handling

### BE Implementation Rules

- gunakan separation of concerns
- pisahkan handler, service, repository
- endpoint harus mudah dikembangkan
- query harus hanya mengambil menu aktif
- menu harus diurutkan ascending berdasarkan order
- data gereja harus dibaca dari database sebagai konfigurasi aplikasi

### Recommended Backend Structure

```
cmd/
internal/
  handler/
  service/
  repository/
  dto/
  entity/
  model/
config/
migrations/
```

### Recommended Endpoint

**GET** `/api/v1/public/site-config`

Alasan:

- fleksibel
- sesuai untuk kebutuhan Home Page
- mudah diperluas di sprint berikutnya

---

## 17. API Contract

### Endpoint

`GET /api/v1/public/site-config`

### Success Response

```
{
  "success":true,
  "message":"Site config fetched successfully",
  "data": {
    "churchName":"Gereja ABC",
    "churchLogoUrl":"https://domain.com/assets/logo-gereja.png",
    "menus": [
      {
        "id":1,
        "name":"Home",
        "slug":"home",
        "path":"/",
        "order":1,
        "isActive":true
      },
      {
        "id":2,
        "name":"Profile",
        "slug":"profile",
        "path":"/profile",
        "order":2,
        "isActive":true
      },
      {
        "id":3,
        "name":"Marturia",
        "slug":"marturia",
        "path":"/marturia",
        "order":3,
        "isActive":true
      },
      {
        "id":4,
        "name":"Diakonia",
        "slug":"diakonia",
        "path":"/diakonia",
        "order":4,
        "isActive":true
      },
      {
        "id":5,
        "name":"Koinonia",
        "slug":"koinonia",
        "path":"/koinonia",
        "order":5,
        "isActive":true
      }
    ]
  }
}
```

### Error Response

```
{
  "success":false,
  "message":"Failed to fetch site config",
  "data":null
}
```

### Notes

- `menus` wajib berupa array
- `order` digunakan frontend untuk memastikan urutan
- `path` disiapkan untuk kebutuhan routing sprint berikutnya
- `slug` disiapkan untuk extensibility
- `churchLogoUrl` harus bisa langsung dipakai frontend

---

## 18. Database Design

### Design Principle

Database harus mendukung model **single-tenant configurable**, yaitu satu instance aplikasi hanya memiliki satu gereja aktif, tetapi identitas gereja tetap disimpan sebagai data konfigurasi agar dapat diganti untuk deployment lain.

### Table: `churches`

Digunakan untuk menyimpan identitas utama gereja.

| Column Name | Type | Constraint | Description |
| --- | --- | --- | --- |
| id | bigint | PK | primary key |
| name | varchar(255) | not null | nama gereja |
| logo_url | varchar(500) | null | URL logo gereja |
| created_at | datetime | not null | timestamp create |
| updated_at | datetime | not null | timestamp update |

### Table: `menus`

Digunakan untuk menyimpan navigation menu.

| Column Name | Type | Constraint | Description |
| --- | --- | --- | --- |
| id | bigint | PK | primary key |
| name | varchar(100) | not null | nama menu |
| slug | varchar(100) | not null | identifier menu |
| path | varchar(255) | not null | route path |
| menu_order | int | not null | urutan menu |
| is_active | boolean | not null default true | status aktif |
| created_at | datetime | not null | timestamp create |
| updated_at | datetime | not null | timestamp update |

### Database Notes

- Sistem hanya menyimpan **satu data gereja aktif per instance aplikasi**
- Data gereja tetap disimpan di database agar dapat diubah tanpa modifikasi source code
- Pendekatan ini memungkinkan aplikasi digunakan kembali untuk gereja lain pada deployment lain
- Sprint 1 belum membutuhkan dukungan multi-tenant
- `menu_order` harus unik secara logis agar urutan jelas

---

## 19. Business Rules

1. Satu instance aplikasi hanya mewakili satu gereja.
2. Nama gereja wajib berasal dari database.
3. Logo gereja wajib berasal dari database.
4. Menu header hanya menampilkan item dengan `is_active = true`.
5. Menu header harus diurutkan berdasarkan `menu_order ASC`.
6. Frontend tidak boleh hardcode identitas gereja maupun item navigation.
7. Konfigurasi gereja harus dapat diubah melalui data tanpa perlu mengubah kode aplikasi.
8. Data backend menjadi source of truth untuk branding dan navigation.

---

## 20. Acceptance Criteria

### AC-1

Saat website dibuka, Home Page berhasil ditampilkan.

### AC-2

Jika backend mengembalikan nama gereja, maka nama gereja tampil pada UI.

### AC-3

Jika backend mengembalikan logo gereja, maka logo tampil pada UI.

### AC-4

Jika backend mengembalikan menu dinamis, maka frontend menampilkan semua menu aktif tersebut.

### AC-5

Jika backend mengembalikan 5 menu tambahan selain Home, maka frontend menampilkan 5 menu tersebut pada header.

### AC-6

Menu tampil sesuai urutan `order` dari backend.

### AC-7

Saat data sedang diambil, loading state tampil dengan benar.

### AC-8

Saat API gagal, error state tampil dan aplikasi tidak crash.

### AC-9

UI tetap usable pada desktop dan mobile.

### AC-10

Frontend tidak menggunakan data hardcoded untuk nama gereja, logo gereja, dan header menu.

### AC-11

Perubahan nama gereja atau logo gereja dapat dilakukan melalui perubahan data di database tanpa perubahan source code.

---

## 21. Definition of Done

Sprint 1 dianggap selesai apabila:

- Home Page selesai dibuat
- Header dinamis selesai dibuat
- Nama gereja tampil dari API backend
- Logo gereja tampil dari API backend
- Menu header tampil dari API backend
- Loading state tersedia
- Error state tersedia
- Database schema awal tersedia
- Endpoint backend tersedia dan dapat digunakan
- FE dan BE berhasil terintegrasi
- Struktur codebase rapi
- Testing dasar minimum dilakukan

---

## 22. Testing Scope

### Frontend Testing

- render nama gereja
- render logo gereja
- render dynamic menu
- loading state
- error state
- fallback saat data kosong
- responsive behavior dasar

### Backend Testing

- endpoint success response
- endpoint error response
- pengambilan data gereja
- pengambilan menu aktif
- pengurutan menu
- JSON response mapping

### Integration Testing

- frontend berhasil consume endpoint backend
- response sesuai kontrak
- tampilan UI mengikuti data backend

---

## 23. Risks

### Technical Risks

- response backend tidak konsisten
- logo URL invalid atau tidak accessible
- FE secara tidak sengaja hardcode menu
- navbar mobile tidak scalable saat menu bertambah
- struktur API terlalu sempit sehingga sulit diperluas

### Delivery Risks

- UI design tidak mempertimbangkan data dinamis
- FE dan BE tidak sepakat pada contract response
- database schema terlalu sederhana dan sulit di-scale

---

## 24. Recommended Technical Decisions

1. Gunakan **1 public endpoint** untuk mengambil site configuration.
2. Gunakan response schema yang konsisten.
3. Pisahkan layer backend:
    - handler
    - service
    - repository
4. Gunakan migration untuk membuat schema database.
5. Buat komponen FE modular sejak awal.
6. Siapkan struktur routing walaupun halaman lain belum dibuat.
7. Pastikan menu ordering menjadi tanggung jawab backend.
8. Perlakukan data gereja sebagai **app configuration data** yang disimpan di database.

---

## 25. Dependencies

Sprint 1 bergantung pada:

- desain UI Home Page
- keputusan final contract API
- ketersediaan asset logo gereja
- data seed awal untuk church dan menu
- setup environment React, Go, dan MySQL

---

## 26. Open Questions for Future Sprints

1. Apakah admin nantinya dapat mengubah nama gereja, logo gereja, dan menu melalui dashboard admin?
2. Apakah konfigurasi gereja akan memiliki halaman khusus **site settings**?
3. Apakah di masa depan aplikasi tetap single-tenant per deployment, atau akan dikembangkan menjadi multi-tenant?
4. Apakah menu pada Sprint 1 perlu diarahkan ke placeholder page?
5. Apakah Home Page nantinya akan memiliki hero section, welcome text, atau announcement?

---

## 27. Summary for AI Agents

### For UI Design Agent

Rancang Home Page yang bersih, formal, responsive, dan fokus pada identitas gereja serta dynamic navigation.

### For Frontend Agent

Bangun Home Page React yang consume API backend dan menampilkan:

- church name
- church logo
- dynamic header menu
- loading state
- error state

### For Backend Agent

Bangun endpoint public `GET /api/v1/public/site-config` yang mengambil data dari MySQL dan mengembalikan response stabil untuk frontend.

---

## 28. Implementation Note

Sprint 1 bukan sprint untuk menyelesaikan keseluruhan website gereja, melainkan sprint fondasi yang memastikan arsitektur awal, integrasi lintas layer, dan mekanisme data dinamis sudah berjalan dengan benar.