-- backend/migrations/003_create_sprint3_tables.sql

CREATE TABLE IF NOT EXISTS worship_schedules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    schedule_time VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS daily_verses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS upcoming_activities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time_string VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS daily_devotionals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    youtube_url VARCHAR(500) NOT NULL,
    date DATE NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed data for testing
REPLACE INTO worship_schedules (id, name, schedule_time, location) VALUES 
(1, 'Ibadah Minggu Pagi (Sekolah Minggu)', 'Minggu, 07:00 WIB', 'Gedung Sekolah Minggu'),
(2, 'Ibadah Minggu Umum I', 'Minggu, 09:00 WIB', 'Gedung Gereja Utama'),
(3, 'Ibadah Minggu Umum II', 'Minggu, 11:00 WIB', 'Gedung Gereja Utama'),
(4, 'Ibadah Minggu Sore', 'Minggu, 17:00 WIB', 'Gedung Gereja Utama');

REPLACE INTO daily_verses (id, reference, content, date) VALUES 
(1, 'Yohanes 3:16', 'Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.', '2026-05-01');

REPLACE INTO upcoming_activities (id, title, date, time_string, location) VALUES 
(1, 'Ibadah Padang Pemuda', '2026-05-15', '08.00 - Selesai', 'Taman Wisata Cibubur'),
(2, 'Latihan Paduan Suara Gabungan', '2026-05-03', '19.00 WIB', 'Ruang Konsistori'),
(3, 'Rapat Panitia Natal 2026', '2026-05-10', '14.00 WIB', 'Ruang Rapat Lantai 2');

REPLACE INTO daily_devotionals (id, title, youtube_url, date) VALUES 
(1, 'Renungan Pagi: Kasih Karunia yang Melimpah', 'https://youtu.be/fIRmFRj7frc?si=f1TmOZ2ibSTHPoEl', '2026-05-01');
