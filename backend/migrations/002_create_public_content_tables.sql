-- backend/migrations/002_create_public_content_tables.sql

CREATE TABLE IF NOT EXISTS wartas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS announcements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    target_audience VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ministry_activities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    short_caption TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed data for testing
INSERT INTO wartas (title, file_url) VALUES ('Warta Minggu 12 Nov 2023', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');

INSERT INTO announcements (title, target_audience) VALUES 
('Pendaftaran Baptisan Kudus Anak Gelombang II', 'Semua'),
('Latihan Paduan Suara Gabungan Ina', 'Kaum Ibu'),
('Gathering Akhir Tahun NHKBP Kernolong', 'Pemuda');

INSERT INTO ministry_activities (name, image_url, short_caption) VALUES 
('Kunjungan Kasih Diakonia', '/images/ministry1.png', 'Berbagi berkat dan doa bersama jemaat yang sedang sakit di wilayah lingkungan II.'),
('Sekolah Minggu Ceria', '/images/ministry2.png', 'Kegiatan belajar Alkitab yang interaktif untuk anak-anak melalui permainan dan pujian.'),
('Bakti Sosial Masyarakat', '/images/ministry3.png', 'Aksi nyata kepedulian gereja terhadap warga sekitar melalui pembagian sembako murah.');
