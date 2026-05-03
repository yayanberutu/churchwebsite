package repository

import (
	"database/sql"
	"github.com/yayanberutu/churchwebsite/backend/internal/entity"
)

type AdminRepository interface {
	// Worship Schedules
	GetAllWorshipSchedules() ([]entity.WorshipSchedule, error)
	CreateWorshipSchedule(s *entity.WorshipSchedule) error
	UpdateWorshipSchedule(s *entity.WorshipSchedule) error
	DeleteWorshipSchedule(id int64) error

	// Daily Verses
	GetAllDailyVerses() ([]entity.DailyVerse, error)
	CreateDailyVerse(v *entity.DailyVerse) error
	UpdateDailyVerse(v *entity.DailyVerse) error
	DeleteDailyVerse(id int64) error

	// Announcements
	GetAllAnnouncements() ([]entity.Announcement, error)
	CreateAnnouncement(a *entity.Announcement) error
	UpdateAnnouncement(a *entity.Announcement) error
	DeleteAnnouncement(id int64) error

	// Wartas
	GetAllWartas() ([]entity.Warta, error)
	GetWartaByID(id int64) (*entity.Warta, error)
	CreateWarta(w *entity.Warta) error
	UpdateWarta(w *entity.Warta) error
	DeleteWarta(id int64) error

	// Announcement helpers for R2 cleanup
	GetAnnouncementAttachmentURLs(announcementID int64) ([]string, error)

	// Ministry Activity helper for R2 cleanup
	GetMinistryActivityImageURL(id int64) (string, error)

	// Ministry Activities
	GetAllMinistryActivities() ([]entity.MinistryActivity, error)
	CreateMinistryActivity(a *entity.MinistryActivity) error
	UpdateMinistryActivity(a *entity.MinistryActivity) error
	DeleteMinistryActivity(id int64) error

	// Upcoming Activities
	GetAllUpcomingActivities() ([]entity.UpcomingActivity, error)
	CreateUpcomingActivity(a *entity.UpcomingActivity) error
	UpdateUpcomingActivity(a *entity.UpcomingActivity) error
	DeleteUpcomingActivity(id int64) error
}

type mysqlAdminRepository struct {
	db *sql.DB
}

func NewAdminRepository(db *sql.DB) AdminRepository {
	return &mysqlAdminRepository{db: db}
}

// Worship Schedules
func (r *mysqlAdminRepository) GetAllWorshipSchedules() ([]entity.WorshipSchedule, error) {
	rows, err := r.db.Query("SELECT id, name, schedule_time, location, created_at, updated_at FROM worship_schedules ORDER BY created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var schedules []entity.WorshipSchedule
	for rows.Next() {
		var s entity.WorshipSchedule
		if err := rows.Scan(&s.ID, &s.Name, &s.ScheduleTime, &s.Location, &s.CreatedAt, &s.UpdatedAt); err != nil {
			return nil, err
		}
		schedules = append(schedules, s)
	}
	return schedules, nil
}

func (r *mysqlAdminRepository) CreateWorshipSchedule(s *entity.WorshipSchedule) error {
	res, err := r.db.Exec("INSERT INTO worship_schedules (name, schedule_time, location) VALUES (?, ?, ?)",
		s.Name, s.ScheduleTime, s.Location)
	if err != nil {
		return err
	}
	s.ID, _ = res.LastInsertId()
	return nil
}

func (r *mysqlAdminRepository) UpdateWorshipSchedule(s *entity.WorshipSchedule) error {
	_, err := r.db.Exec("UPDATE worship_schedules SET name = ?, schedule_time = ?, location = ? WHERE id = ?",
		s.Name, s.ScheduleTime, s.Location, s.ID)
	return err
}

func (r *mysqlAdminRepository) DeleteWorshipSchedule(id int64) error {
	_, err := r.db.Exec("DELETE FROM worship_schedules WHERE id = ?", id)
	return err
}

// Daily Verses
func (r *mysqlAdminRepository) GetAllDailyVerses() ([]entity.DailyVerse, error) {
	rows, err := r.db.Query("SELECT id, reference, content, devotional_title, devotional_url, date, created_at, updated_at FROM daily_verses ORDER BY date DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var verses []entity.DailyVerse
	for rows.Next() {
		var v entity.DailyVerse
		if err := rows.Scan(&v.ID, &v.Reference, &v.Content, &v.DevotionalTitle, &v.DevotionalURL, &v.Date, &v.CreatedAt, &v.UpdatedAt); err != nil {
			return nil, err
		}
		verses = append(verses, v)
	}
	return verses, nil
}

func (r *mysqlAdminRepository) CreateDailyVerse(v *entity.DailyVerse) error {
	res, err := r.db.Exec("INSERT INTO daily_verses (reference, content, devotional_title, devotional_url, date) VALUES (?, ?, ?, ?, ?)",
		v.Reference, v.Content, v.DevotionalTitle, v.DevotionalURL, v.Date)
	if err != nil {
		return err
	}
	v.ID, _ = res.LastInsertId()
	return nil
}

func (r *mysqlAdminRepository) UpdateDailyVerse(v *entity.DailyVerse) error {
	_, err := r.db.Exec("UPDATE daily_verses SET reference = ?, content = ?, devotional_title = ?, devotional_url = ?, date = ? WHERE id = ?",
		v.Reference, v.Content, v.DevotionalTitle, v.DevotionalURL, v.Date, v.ID)
	return err
}

func (r *mysqlAdminRepository) DeleteDailyVerse(id int64) error {
	_, err := r.db.Exec("DELETE FROM daily_verses WHERE id = ?", id)
	return err
}

// Announcements
func (r *mysqlAdminRepository) GetAllAnnouncements() ([]entity.Announcement, error) {
	rows, err := r.db.Query("SELECT id, title, content, target_audience, created_at, updated_at FROM announcements ORDER BY created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var announcements []entity.Announcement
	for rows.Next() {
		var a entity.Announcement
		if err := rows.Scan(&a.ID, &a.Title, &a.Content, &a.TargetAudience, &a.CreatedAt, &a.UpdatedAt); err != nil {
			return nil, err
		}

		// Fetch attachments for each announcement
		attRows, err := r.db.Query("SELECT id, announcement_id, file_name, file_url, created_at FROM announcement_attachments WHERE announcement_id = ?", a.ID)
		if err == nil {
			for attRows.Next() {
				var att entity.AnnouncementAttachment
				if err := attRows.Scan(&att.ID, &att.AnnouncementID, &att.FileName, &att.FileURL, &att.CreatedAt); err == nil {
					a.Attachments = append(a.Attachments, att)
				}
			}
			attRows.Close()
		}

		announcements = append(announcements, a)
	}
	return announcements, nil
}

func (r *mysqlAdminRepository) CreateAnnouncement(a *entity.Announcement) error {
	tx, err := r.db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	res, err := tx.Exec("INSERT INTO announcements (title, content, target_audience) VALUES (?, ?, ?)",
		a.Title, a.Content, a.TargetAudience)
	if err != nil {
		return err
	}
	a.ID, _ = res.LastInsertId()

	// Insert attachments
	for _, att := range a.Attachments {
		_, err := tx.Exec("INSERT INTO announcement_attachments (announcement_id, file_name, file_url) VALUES (?, ?, ?)",
			a.ID, att.FileName, att.FileURL)
		if err != nil {
			return err
		}
	}

	return tx.Commit()
}

func (r *mysqlAdminRepository) UpdateAnnouncement(a *entity.Announcement) error {
	tx, err := r.db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	_, err = tx.Exec("UPDATE announcements SET title = ?, content = ?, target_audience = ? WHERE id = ?",
		a.Title, a.Content, a.TargetAudience, a.ID)
	if err != nil {
		return err
	}

	// Update attachments: Replace only if new attachments are provided
	if len(a.Attachments) > 0 {
		_, err = tx.Exec("DELETE FROM announcement_attachments WHERE announcement_id = ?", a.ID)
		if err != nil {
			return err
		}

		for _, att := range a.Attachments {
			_, err := tx.Exec("INSERT INTO announcement_attachments (announcement_id, file_name, file_url) VALUES (?, ?, ?)",
				a.ID, att.FileName, att.FileURL)
			if err != nil {
				return err
			}
		}
	}

	return tx.Commit()
}

func (r *mysqlAdminRepository) DeleteAnnouncement(id int64) error {
	_, err := r.db.Exec("DELETE FROM announcements WHERE id = ?", id)
	return err
}

// Wartas
func (r *mysqlAdminRepository) GetAllWartas() ([]entity.Warta, error) {
	rows, err := r.db.Query("SELECT id, title, file_url, date, created_at, updated_at FROM wartas ORDER BY date DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var wartas []entity.Warta
	for rows.Next() {
		var w entity.Warta
		if err := rows.Scan(&w.ID, &w.Title, &w.FileURL, &w.Date, &w.CreatedAt, &w.UpdatedAt); err != nil {
			return nil, err
		}
		wartas = append(wartas, w)
	}
	return wartas, nil
}

func (r *mysqlAdminRepository) GetWartaByID(id int64) (*entity.Warta, error) {
	var w entity.Warta
	err := r.db.QueryRow("SELECT id, title, file_url, date FROM wartas WHERE id = ?", id).
		Scan(&w.ID, &w.Title, &w.FileURL, &w.Date)
	if err != nil {
		return nil, err
	}
	return &w, nil
}

func (r *mysqlAdminRepository) CreateWarta(w *entity.Warta) error {
	res, err := r.db.Exec("INSERT INTO wartas (title, file_url, date) VALUES (?, ?, ?)",
		w.Title, w.FileURL, w.Date)
	if err != nil {
		return err
	}
	w.ID, _ = res.LastInsertId()
	return nil
}

func (r *mysqlAdminRepository) UpdateWarta(w *entity.Warta) error {
	_, err := r.db.Exec("UPDATE wartas SET title = ?, file_url = ?, date = ? WHERE id = ?",
		w.Title, w.FileURL, w.Date, w.ID)
	return err
}

func (r *mysqlAdminRepository) DeleteWarta(id int64) error {
	_, err := r.db.Exec("DELETE FROM wartas WHERE id = ?", id)
	return err
}

func (r *mysqlAdminRepository) GetAnnouncementAttachmentURLs(announcementID int64) ([]string, error) {
	rows, err := r.db.Query("SELECT file_url FROM announcement_attachments WHERE announcement_id = ?", announcementID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var urls []string
	for rows.Next() {
		var url string
		if err := rows.Scan(&url); err == nil {
			urls = append(urls, url)
		}
	}
	return urls, nil
}

func (r *mysqlAdminRepository) GetMinistryActivityImageURL(id int64) (string, error) {
	var url string
	err := r.db.QueryRow("SELECT image_url FROM ministry_activities WHERE id = ?", id).Scan(&url)
	return url, err
}

// Ministry Activities
func (r *mysqlAdminRepository) GetAllMinistryActivities() ([]entity.MinistryActivity, error) {
	rows, err := r.db.Query("SELECT id, name, image_url, short_caption, created_at, updated_at FROM ministry_activities ORDER BY created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var activities []entity.MinistryActivity
	for rows.Next() {
		var a entity.MinistryActivity
		if err := rows.Scan(&a.ID, &a.Name, &a.ImageURL, &a.ShortCaption, &a.CreatedAt, &a.UpdatedAt); err != nil {
			return nil, err
		}
		activities = append(activities, a)
	}
	return activities, nil
}

func (r *mysqlAdminRepository) CreateMinistryActivity(a *entity.MinistryActivity) error {
	res, err := r.db.Exec("INSERT INTO ministry_activities (name, image_url, short_caption) VALUES (?, ?, ?)",
		a.Name, a.ImageURL, a.ShortCaption)
	if err != nil {
		return err
	}
	a.ID, _ = res.LastInsertId()
	return nil
}

func (r *mysqlAdminRepository) UpdateMinistryActivity(a *entity.MinistryActivity) error {
	_, err := r.db.Exec("UPDATE ministry_activities SET name = ?, image_url = ?, short_caption = ? WHERE id = ?",
		a.Name, a.ImageURL, a.ShortCaption, a.ID)
	return err
}

func (r *mysqlAdminRepository) DeleteMinistryActivity(id int64) error {
	_, err := r.db.Exec("DELETE FROM ministry_activities WHERE id = ?", id)
	return err
}

// Upcoming Activities
func (r *mysqlAdminRepository) GetAllUpcomingActivities() ([]entity.UpcomingActivity, error) {
	rows, err := r.db.Query("SELECT id, title, date, time_string, location, created_at, updated_at FROM upcoming_activities ORDER BY date ASC, id ASC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var activities []entity.UpcomingActivity
	for rows.Next() {
		var a entity.UpcomingActivity
		if err := rows.Scan(&a.ID, &a.Title, &a.Date, &a.TimeString, &a.Location, &a.CreatedAt, &a.UpdatedAt); err != nil {
			return nil, err
		}
		activities = append(activities, a)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return activities, nil
}

func (r *mysqlAdminRepository) CreateUpcomingActivity(a *entity.UpcomingActivity) error {
	res, err := r.db.Exec("INSERT INTO upcoming_activities (title, date, time_string, location) VALUES (?, ?, ?, ?)",
		a.Title, a.Date, a.TimeString, a.Location)
	if err != nil {
		return err
	}
	a.ID, _ = res.LastInsertId()
	return nil
}

func (r *mysqlAdminRepository) UpdateUpcomingActivity(a *entity.UpcomingActivity) error {
	_, err := r.db.Exec("UPDATE upcoming_activities SET title = ?, date = ?, time_string = ?, location = ? WHERE id = ?",
		a.Title, a.Date, a.TimeString, a.Location, a.ID)
	return err
}

func (r *mysqlAdminRepository) DeleteUpcomingActivity(id int64) error {
	_, err := r.db.Exec("DELETE FROM upcoming_activities WHERE id = ?", id)
	return err
}
