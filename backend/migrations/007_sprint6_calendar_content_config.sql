-- Sprint 6: Configurable Home, content details, and calendar support

CREATE TABLE IF NOT EXISTS church_config (
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

INSERT INTO church_config (config_key, config_value, value_type, group_name, display_label, is_public, sort_order)
VALUES
('church_name', 'HKBP Kernolong', 'text', 'identity', 'Nama Gereja', TRUE, 1),
('church_logo', '', 'image', 'identity', 'Logo Gereja', TRUE, 2),
('home_hero_title', 'Selamat Datang di HKBP Kernolong', 'text', 'home_hero', 'Judul Hero Home', TRUE, 10),
('home_hero_subtitle', 'Membangun iman, harapan, dan kasih dalam persekutuan yang hidup. Bergabunglah bersama kami dalam perjalanan rohani yang mendalam.', 'textarea', 'home_hero', 'Subjudul Hero Home', TRUE, 11),
('home_hero_image', '/images/hkbpkernolong.jpg', 'image', 'home_hero', 'Gambar Hero Home', TRUE, 12),
('home_hero_primary_button_text', 'Jadwal Ibadah', 'text', 'home_hero', 'Teks Tombol Utama Hero', TRUE, 13),
('home_hero_secondary_button_text', 'Download Warta Minggu Ini', 'text', 'home_hero', 'Teks Tombol Kedua Hero', TRUE, 14)
ON DUPLICATE KEY UPDATE config_key = VALUES(config_key);

INSERT INTO church_config (config_key, config_value, value_type, group_name, display_label, is_public, sort_order)
SELECT 'church_name', name, 'text', 'identity', 'Nama Gereja', TRUE, 1
FROM churches
LIMIT 1
ON DUPLICATE KEY UPDATE config_value = VALUES(config_value);

INSERT INTO church_config (config_key, config_value, value_type, group_name, display_label, is_public, sort_order, file_url)
SELECT 'church_logo', logo_url, 'image', 'identity', 'Logo Gereja', TRUE, 2, logo_url
FROM churches
WHERE logo_url IS NOT NULL AND logo_url <> ''
LIMIT 1
ON DUPLICATE KEY UPDATE config_value = VALUES(config_value), file_url = VALUES(file_url);

ALTER TABLE ministry_activities
ADD COLUMN content TEXT NULL AFTER short_caption,
ADD COLUMN activity_date DATE NULL AFTER content;

DROP TABLE IF EXISTS churches;
