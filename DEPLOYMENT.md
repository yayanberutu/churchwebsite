# HKBP Church Website Deployment (Docker + Main Caddy VPS)

## 1. Prerequisites
- VPS Hetzner aktif dengan Docker + Docker Compose.
- Main reverse proxy Caddy sudah berjalan (container terpisah di level VPS).
- Akses SSH ke server (`admin`).
- Domain `berutu.dev` aktif di Cloudflare.

## 2. DNS setup
Tambahkan record berikut di Cloudflare:

| Type | Name | Content |
|---|---|---|
| A | hkbp | 5.223.79.193 |
| A | api-hkbp | 5.223.79.193 |

Gunakan mode awal `DNS only` sampai verifikasi selesai.

## 3. Clone repository
```bash
ssh admin@5.223.79.193
cd ~/apps
mkdir -p hkbp
cd hkbp
git clone https://github.com/yayanberutu/churchwebsite.git .
```

## 4. Prepare `.env`
```bash
cp .env.example .env
nano .env
```

Minimal variabel yang wajib diisi:
- `MYSQL_ROOT_PASSWORD`
- `MYSQL_DATABASE`
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `DB_DSN` (harus mengarah ke `hkbp-db:3306`)
- `CORS_ALLOWED_ORIGINS` (contoh: `https://hkbp.berutu.dev`)
- `VITE_API_BASE_URL` (isi `https://api-hkbp.berutu.dev`)

## 5. Create Docker network if missing
```bash
docker network create web || true
```

## 6. Build and run production compose
```bash
docker compose -f docker-compose.prod.yml up -d --build
```

## 7. Update main Caddyfile
Masuk ke folder proxy utama (di luar repository ini), lalu tambahkan route:
```caddy
hkbp.berutu.dev {
    reverse_proxy hkbp-frontend:80
}

api-hkbp.berutu.dev {
    reverse_proxy hkbp-backend:8080
}
```

Referensi siap pakai tersedia di `deploy/Caddyfile.example`.

## 8. Restart main Caddy
```bash
cd ~/apps/proxy
docker compose restart caddy
```

## 9. Verify deployment
Verifikasi internal dari container Caddy utama:
```bash
docker exec caddy wget -qO- http://hkbp-frontend:80 | head
docker exec caddy wget -qO- http://hkbp-backend:8080/health | head
docker exec caddy wget -qO- http://hkbp-backend:8080/api/v1/public/site-config | head
```

Verifikasi dari public internet:
```bash
curl -I https://hkbp.berutu.dev
curl -I https://api-hkbp.berutu.dev/api/v1/public/site-config
```

## 10. Common troubleshooting
- Container backend gagal start: cek `DB_DSN` dan kredensial DB pada `.env`.
- Frontend tidak bisa call API: cek `VITE_API_BASE_URL` dan rebuild compose.
- CORS error di browser: pastikan `CORS_ALLOWED_ORIGINS` berisi origin frontend production.
- Route domain tidak aktif: cek DNS record Cloudflare + route pada Caddy utama.
- Service tidak saling terhubung: pastikan semua container terkait join network `web`.

## 11. Redeploy after changes
```bash
cd ~/apps/hkbp
git pull origin main
docker compose -f docker-compose.prod.yml up -d --build
```

## Migration notes
- Folder `backend/migrations` dimount ke `/docker-entrypoint-initdb.d` pada MySQL.
- Script di folder ini **hanya dijalankan saat volume MySQL pertama kali dibuat**.
- Jika volume sudah ada, migration baru tidak otomatis dijalankan; jalankan manual sesuai prosedur operasional.

