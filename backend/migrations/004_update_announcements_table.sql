-- backend/migrations/004_update_announcements_table.sql

-- Add content column to announcements
ALTER TABLE announcements ADD COLUMN content TEXT NOT NULL DEFAULT '';

-- Create announcement_attachments table
CREATE TABLE IF NOT EXISTS announcement_attachments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    announcement_id BIGINT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (announcement_id) REFERENCES announcements(id) ON DELETE CASCADE
);
