# Sprint4

# PRD — Sprint 4: Admin Dashboard (Production-Grade)

## 1. Document Info

- Product: Website Gereja
- Sprint: Sprint 4
- Type: PRD (AI-Ready)
- Focus: Admin Panel (Full CRUD CMS Lite)
- Entry Point: /admin
- Consumers:
    - AI Designer (Stitch)
    - AI Frontend Agent
    - AI Backend Agent

---

## 2. Product Overview

Admin Panel digunakan oleh sekretaris gereja untuk mengelola seluruh konten website secara mandiri tanpa akses database langsung.

Panel ini berada dalam aplikasi yang sama dengan website jemaat, namun menggunakan routing terpisah.

---

## 3. Design System (FOR STITCH)

### 3.1 Design Principle

- Modern Minimalist
- High readability (age-friendly)
- Low cognitive load
- Consistent spacing

### 3.2 Layout

Sidebar (240px) | Main Content

### Sidebar

- Logo
- Menu:
    - Dashboard
    - Jadwal Ibadah
    - Ayat Harian
    - Kegiatan
    - Pengumuman
    - Menu Header
    - Warta

### Topbar

- Page Title
- Optional: Logout

### 3.3 Components (MANDATORY)

### Table

- Row height: 56px
- Columns dynamic
- Actions:
    - Edit
    - Delete
    - Toggle Status (if applicable)

### Modal Form

- Width: 480px
- Padding: 24px
- Buttons:
    - Primary: Save
    - Secondary: Cancel

### Form Inputs

- Text Input
- Textarea
- Date Picker
- Dropdown
- Toggle Switch
- File Upload (Drag & Drop)

### 3.4 States

- Loading → Skeleton rows
- Empty → “Belum ada data”
- Error → Inline error + retry

### 3.5 Feedback

- Success → Toast: “Data berhasil disimpan”
- Error → Toast: “Terjadi kesalahan”

---

## 4. UX Behavior Rules

- Confirm delete (modal)
- Disable submit saat loading
- Auto close modal setelah success
- Refresh table setelah CRUD
- Form reset setelah submit

---

## 5. Routing (Frontend)

/admin

/admin/worship-schedules

/admin/daily-verses

/admin/upcoming-activities

/admin/announcements

/admin/menus

/admin/wartas

---

## 6. Data Validation Rules

### General

- Semua field required kecuali disebut optional

### Worship Schedule

- name: max 255
- schedule_time: max 100
- location: max 255

### Daily Verse

- reference: max 100
- content: max 1000
- date: YYYY-MM-DD

### Menu

- order: integer > 0
- is_active: boolean

---

## 7. API STANDARD

### Base URL

/api/v1/admin

### Success Response

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "error_code": "VALIDATION_ERROR",
  "message": "Field required",
  "errors": {
    "field": "error message"
  }
}
```

---

## 8. API CONTRACT

### 8.1 Worship Schedules

GET /worship-schedules

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Ibadah Minggu",
      "schedule_time": "Minggu 09:00",
      "location": "Gereja"
    }
  ]
}
```

POST /worship-schedules

```json
{
  "name": "string",
  "schedule_time": "string",
  "location": "string"
}
```

PUT /worship-schedules/:id

DELETE /worship-schedules/:id

---

### 8.2 Daily Verses

GET /daily-verses

POST /daily-verses

```json
{
  "reference": "string",
  "content": "string",
  "date": "YYYY-MM-DD"
}
```

---

### 8.3 Upcoming Activities

POST /upcoming-activities

```json
{
  "title": "string",
  "date": "YYYY-MM-DD",
  "time": "string",
  "location": "string"
}
```

---

### 8.4 Announcements

GET /announcements

POST /announcements (Multipart/Form-Data)

```json
{
  "title": "string",
  "content": "string (optional)",
  "target_audience": "Semua|Pemuda|Kaum Ibu|Kaum Bapak|Remaja",
  "attachments": "File[] (optional, multiple)"
}
```

PUT /announcements/:id (Multipart/Form-Data)

DELETE /announcements/:id

**Entity Schema Update:**
- `content`: TEXT, stores the full announcement body.
- `attachments`: Array of objects `[{ file_name: string, file_url: string }]`.

---

### 8.5 Menus

POST /menus

```json
{
  "name": "string",
  "path": "string",
  "order": 1,
  "is_active": true
}
```

PATCH /menus/:id/status

```json
{
  "is_active": true
}
```

---

### 8.6 Warta

POST /wartas (multipart)
Fields:
- title
- file (PDF)

Response:

```json
{
  "success": true,
  "data": {
    "file_url": "https://..."
  }
}
```

---

### 8.7 Ministry Activities

GET /ministry-activities

POST /ministry-activities (Multipart/Form-Data)

```json
{
  "name": "string",
  "short_caption": "string",
  "image": "File (Binary Image)"
}
```

PUT /ministry-activities/:id (Multipart/Form-Data)

```json
{
  "name": "string",
  "short_caption": "string",
  "image": "File (Optional Binary)",
  "existing_image_url": "string (used if no new image)"
}
```

DELETE /ministry-activities/:id

---

## 9. Table Behavior

- Sorting: created_at DESC
- Limit: 10 (default)
- Pagination: future

---

## 10. Frontend Architecture

src/
pages/admin/
components/admin/
api/adminApi.js
layouts/AdminLayout.jsx

---

## 11. State Management

- loading
- error
- data

---

## 12. Acceptance Criteria

- CRUD berjalan
- Upload berhasil
- UI responsive
- Tidak crash

---

## 13. Definition of Done

- Semua halaman admin selesai
- API terintegrasi
- Validasi berjalan
- UX smooth

---

## 14. Future Improvements

- Auth (JWT)
- Role-based access
- Audit log
- Pagination advanced