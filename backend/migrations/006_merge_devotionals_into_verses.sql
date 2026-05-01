-- Add devotional fields to daily_verses
ALTER TABLE daily_verses 
ADD COLUMN devotional_title VARCHAR(255) AFTER content,
ADD COLUMN devotional_url VARCHAR(500) AFTER devotional_title;

-- Note: We assume the user wants to keep the data or start fresh.
-- Since there was data in daily_devotionals, we could migrate it, 
-- but the user said "Hapus saja table daily_devotionals". 
-- To be safe, I'll migrate existing data first where dates match.
UPDATE daily_verses v
JOIN daily_devotionals d ON v.date = d.date
SET v.devotional_title = d.title,
    v.devotional_url = d.youtube_url;

-- Drop daily_devotionals table
DROP TABLE IF EXISTS daily_devotionals;
