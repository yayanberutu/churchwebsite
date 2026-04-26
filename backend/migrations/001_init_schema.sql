-- backend/migrations/001_init_schema.sql

CREATE TABLE IF NOT EXISTS churches (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_url VARCHAR(500),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS menus (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    path VARCHAR(255) NOT NULL,
    menu_order INT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed initial data
INSERT INTO churches (name, logo_url) VALUES ('HKBP Kernolong', '');

INSERT INTO menus (name, slug, path, menu_order, is_active) VALUES 
('Home', 'home', '/', 1, 1),
('About Us', 'about', '/about', 2, 1),
('Koinonia', 'koinonia', '/koinonia', 3, 1),
('Marturia', 'marturia', '/marturia', 4, 1),
('Diakonia', 'diakonia', '/diakonia', 5, 1);
