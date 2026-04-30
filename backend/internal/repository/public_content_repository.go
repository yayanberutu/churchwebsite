package repository

import (
	"database/sql"
	"github.com/yayanberutu/churchwebsite/backend/internal/entity"
)

type PublicContentRepository interface {
	GetLatestWarta() (*entity.Warta, error)
	GetLatestAnnouncements() ([]entity.Announcement, error)
	GetLatestMinistryActivities() ([]entity.MinistryActivity, error)
}

type mysqlPublicContentRepository struct {
	db *sql.DB
}

func NewPublicContentRepository(db *sql.DB) PublicContentRepository {
	return &mysqlPublicContentRepository{db: db}
}

func (r *mysqlPublicContentRepository) GetLatestWarta() (*entity.Warta, error) {
	var warta entity.Warta
	err := r.db.QueryRow("SELECT id, title, file_url, created_at FROM wartas ORDER BY created_at DESC LIMIT 1").Scan(
		&warta.ID, &warta.Title, &warta.FileURL, &warta.CreatedAt,
	)
	if err != nil {
		return nil, err
	}
	return &warta, nil
}

func (r *mysqlPublicContentRepository) GetLatestAnnouncements() ([]entity.Announcement, error) {
	rows, err := r.db.Query("SELECT id, title, target_audience, created_at FROM announcements ORDER BY created_at DESC LIMIT 3")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var announcements []entity.Announcement
	for rows.Next() {
		var a entity.Announcement
		if err := rows.Scan(&a.ID, &a.Title, &a.TargetAudience, &a.CreatedAt); err != nil {
			return nil, err
		}
		announcements = append(announcements, a)
	}
	return announcements, nil
}

func (r *mysqlPublicContentRepository) GetLatestMinistryActivities() ([]entity.MinistryActivity, error) {
	rows, err := r.db.Query("SELECT id, name, image_url, short_caption, created_at FROM ministry_activities ORDER BY created_at DESC LIMIT 3")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var activities []entity.MinistryActivity
	for rows.Next() {
		var a entity.MinistryActivity
		if err := rows.Scan(&a.ID, &a.Name, &a.ImageURL, &a.ShortCaption, &a.CreatedAt); err != nil {
			return nil, err
		}
		activities = append(activities, a)
	}
	return activities, nil
}
