package repository

import (
	"database/sql"
	"regexp"
	"strings"
	"unicode/utf8"

	"github.com/yayanberutu/churchwebsite/backend/internal/entity"
)

var htmlTagPattern = regexp.MustCompile(`<[^>]*>`)

type PublicContentRepository interface {
	GetLatestWarta() (*entity.Warta, error)
	GetLatestAnnouncements(limit int) ([]entity.Announcement, error)
	GetAnnouncements(page, pageSize int) (*entity.PaginatedAnnouncements, error)
	GetAnnouncementByID(id int64) (*entity.Announcement, error)
	GetLatestMinistryActivities(limit int) ([]entity.MinistryActivity, error)
	GetMinistryActivities(page, pageSize int) (*entity.PaginatedMinistryActivities, error)
	GetMinistryActivityByID(id int64) (*entity.MinistryActivity, error)
	GetWorshipSchedules() ([]entity.WorshipSchedule, error)
	GetDailyVerseByDate(date string) (*entity.DailyVerse, error)
	GetUpcomingActivities(currentDate string, limit int) ([]entity.UpcomingActivity, error)
	GetCalendarActivitiesByDate(date string) ([]entity.UpcomingActivity, error)
	GetCalendarActivityDates(monthStart, monthEnd string) ([]string, error)
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

func (r *mysqlPublicContentRepository) GetLatestAnnouncements(limit int) ([]entity.Announcement, error) {
	rows, err := r.db.Query("SELECT id, title, content, target_audience, created_at FROM announcements ORDER BY created_at DESC LIMIT ?", limit)
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
		a.ContentPreview = BuildContentPreview(a.Content, 180)
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

func (r *mysqlPublicContentRepository) GetAnnouncements(page, pageSize int) (*entity.PaginatedAnnouncements, error) {
	offset := (page - 1) * pageSize
	var total int
	if err := r.db.QueryRow("SELECT COUNT(*) FROM announcements").Scan(&total); err != nil {
		return nil, err
	}

	rows, err := r.db.Query("SELECT id, title, content, target_audience, created_at, updated_at FROM announcements ORDER BY created_at DESC LIMIT ? OFFSET ?", pageSize, offset)
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
		a.ContentPreview = BuildContentPreview(a.Content, 180)
		announcements = append(announcements, a)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return &entity.PaginatedAnnouncements{Items: announcements, Pagination: buildPagination(page, pageSize, total)}, nil
}

func (r *mysqlPublicContentRepository) GetAnnouncementByID(id int64) (*entity.Announcement, error) {
	var a entity.Announcement
	err := r.db.QueryRow("SELECT id, title, content, target_audience, created_at, updated_at FROM announcements WHERE id = ?", id).Scan(
		&a.ID, &a.Title, &a.Content, &a.TargetAudience, &a.CreatedAt, &a.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	attachments, err := r.getAnnouncementAttachments(a.ID)
	if err != nil {
		return nil, err
	}
	a.Attachments = attachments
	return &a, nil
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

func (r *mysqlPublicContentRepository) GetLatestMinistryActivities(limit int) ([]entity.MinistryActivity, error) {
	rows, err := r.db.Query("SELECT id, name, image_url, short_caption, COALESCE(content, ''), activity_date, created_at FROM ministry_activities ORDER BY COALESCE(activity_date, DATE(created_at)) DESC, created_at DESC LIMIT ?", limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var activities []entity.MinistryActivity
	for rows.Next() {
		var a entity.MinistryActivity
		if err := rows.Scan(&a.ID, &a.Name, &a.ImageURL, &a.ShortCaption, &a.Content, &a.ActivityDate, &a.CreatedAt); err != nil {
			return nil, err
		}
		activities = append(activities, a)
	}
	return activities, nil
}

func (r *mysqlPublicContentRepository) GetMinistryActivities(page, pageSize int) (*entity.PaginatedMinistryActivities, error) {
	offset := (page - 1) * pageSize
	var total int
	if err := r.db.QueryRow("SELECT COUNT(*) FROM ministry_activities").Scan(&total); err != nil {
		return nil, err
	}

	rows, err := r.db.Query("SELECT id, name, image_url, short_caption, COALESCE(content, ''), activity_date, created_at, updated_at FROM ministry_activities ORDER BY COALESCE(activity_date, DATE(created_at)) DESC, created_at DESC LIMIT ? OFFSET ?", pageSize, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var activities []entity.MinistryActivity
	for rows.Next() {
		var a entity.MinistryActivity
		if err := rows.Scan(&a.ID, &a.Name, &a.ImageURL, &a.ShortCaption, &a.Content, &a.ActivityDate, &a.CreatedAt, &a.UpdatedAt); err != nil {
			return nil, err
		}
		activities = append(activities, a)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return &entity.PaginatedMinistryActivities{Items: activities, Pagination: buildPagination(page, pageSize, total)}, nil
}

func (r *mysqlPublicContentRepository) GetMinistryActivityByID(id int64) (*entity.MinistryActivity, error) {
	var a entity.MinistryActivity
	err := r.db.QueryRow("SELECT id, name, image_url, short_caption, COALESCE(content, ''), activity_date, created_at, updated_at FROM ministry_activities WHERE id = ?", id).Scan(
		&a.ID, &a.Name, &a.ImageURL, &a.ShortCaption, &a.Content, &a.ActivityDate, &a.CreatedAt, &a.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &a, nil
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

func (r *mysqlPublicContentRepository) GetUpcomingActivities(currentDate string, limit int) ([]entity.UpcomingActivity, error) {
	rows, err := r.db.Query("SELECT id, title, date, time_string, location, created_at FROM upcoming_activities WHERE date >= ? ORDER BY date ASC, time_string ASC LIMIT ?", currentDate, limit)
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

func (r *mysqlPublicContentRepository) GetCalendarActivitiesByDate(date string) ([]entity.UpcomingActivity, error) {
	rows, err := r.db.Query("SELECT id, title, date, time_string, location, created_at, updated_at FROM upcoming_activities WHERE date = ? ORDER BY time_string ASC, id ASC", date)
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

func (r *mysqlPublicContentRepository) GetCalendarActivityDates(monthStart, monthEnd string) ([]string, error) {
	rows, err := r.db.Query("SELECT DISTINCT DATE_FORMAT(date, '%Y-%m-%d') FROM upcoming_activities WHERE date >= ? AND date < ? ORDER BY date ASC", monthStart, monthEnd)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var dates []string
	for rows.Next() {
		var date string
		if err := rows.Scan(&date); err != nil {
			return nil, err
		}
		dates = append(dates, date)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return dates, nil
}

func buildPagination(page, pageSize, total int) entity.Pagination {
	totalPages := 0
	if total > 0 {
		totalPages = (total + pageSize - 1) / pageSize
	}
	return entity.Pagination{
		Page:        page,
		PageSize:    pageSize,
		TotalItems:  total,
		TotalPages:  totalPages,
		HasNext:     page < totalPages,
		HasPrevious: page > 1,
	}
}

func BuildContentPreview(content string, maxChars int) string {
	plain := strings.TrimSpace(htmlTagPattern.ReplaceAllString(content, ""))
	plain = strings.Join(strings.Fields(plain), " ")
	if utf8.RuneCountInString(plain) <= maxChars {
		return plain
	}

	runes := []rune(plain)
	return strings.TrimSpace(string(runes[:maxChars])) + "..."
}
