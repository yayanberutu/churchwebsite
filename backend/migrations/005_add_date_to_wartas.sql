-- Sprint 5: Add date field to wartas table
ALTER TABLE wartas ADD COLUMN date DATE NOT NULL DEFAULT (CURRENT_DATE);
