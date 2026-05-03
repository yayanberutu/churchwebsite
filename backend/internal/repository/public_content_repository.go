package repository

import (
	"database/sql"
	"github.com/yayanberutu/churchwebsite/backend/internal/entity"
)

type PublicContentRepository interface {
	GetLatestWarta() (*entity.Warta, error)
	GetLatestAnnouncements() ([]entity.Announcement, error)
	GetLatestMinistryActivities() ([]entity.MinistryActivity, error)
	GetWorshipSchedules() ([]entity.WorshipSchedule, error)
	GetDailyVerseByDate(date string) (*entity.DailyVerse, error)
	GetUpcomingActivities() ([]entity.UpcomingActivity, error)
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
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &warta, nil
}

func (r *mysqlPublicContentRepository) GetLatestAnnouncements() ([]entity.Announcement, error) {
	rows, err := r.db.Query("SELECT id, title, content, target_audience, created_at FROM announcements ORDER BY created_at DESC LIMIT 3")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var announcements []entity.Announcement
	for rows.Next() {
		var a entity.Announcement
		if err := rows.Scan(&a.ID, &a.Title, &a.Content, &a.TargetAudience, &a.CreatedAt); err != nil {
			return nil, err
		}
		attachments, err := r.getAnnouncementAttachments(a.ID)
		if err != nil {
			return nil, err
		}
		a.Attachments = attachments
		announcements = append(announcements, a)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return announcements, nil
}

func (r *mysqlPublicContentRepository) getAnnouncementAttachments(announcementID int64) ([]entity.AnnouncementAttachment, error) {
	rows, err := r.db.Query("SELECT id, announcement_id, file_name, file_url, created_at FROM announcement_attachments WHERE announcement_id = ?", announcementID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var attachments []entity.AnnouncementAttachment
	for rows.Next() {
		var attachment entity.AnnouncementAttachment
		if err := rows.Scan(&attachment.ID, &attachment.AnnouncementID, &attachment.FileName, &attachment.FileURL, &attachment.CreatedAt); err != nil {
			return nil, err
		}
		attachments = append(attachments, attachment)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return attachments, nil
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

func (r *mysqlPublicContentRepository) GetWorshipSchedules() ([]entity.WorshipSchedule, error) {
	rows, err := r.db.Query("SELECT id, name, schedule_time, location, created_at FROM worship_schedules")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var schedules []entity.WorshipSchedule
	for rows.Next() {
		var s entity.WorshipSchedule
		if err := rows.Scan(&s.ID, &s.Name, &s.ScheduleTime, &s.Location, &s.CreatedAt); err != nil {
			return nil, err
		}
		schedules = append(schedules, s)
	}
	return schedules, nil
}

func (r *mysqlPublicContentRepository) GetDailyVerseByDate(date string) (*entity.DailyVerse, error) {
	var v entity.DailyVerse
	err := r.db.QueryRow("SELECT id, reference, content, devotional_title, devotional_url, date, created_at FROM daily_verses WHERE date = ?", date).Scan(
		&v.ID, &v.Reference, &v.Content, &v.DevotionalTitle, &v.DevotionalURL, &v.Date, &v.CreatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &v, nil
}

func (r *mysqlPublicContentRepository) GetUpcomingActivities() ([]entity.UpcomingActivity, error) {
	rows, err := r.db.Query("SELECT id, title, date, time_string, location, created_at FROM upcoming_activities ORDER BY date ASC LIMIT 3")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var activities []entity.UpcomingActivity
	for rows.Next() {
		var a entity.UpcomingActivity
		if err := rows.Scan(&a.ID, &a.Title, &a.Date, &a.TimeString, &a.Location, &a.CreatedAt); err != nil {
			return nil, err
		}
		activities = append(activities, a)
	}
	return activities, nil
}
