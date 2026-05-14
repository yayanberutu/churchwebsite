package entity

import "time"

type Warta struct {
	ID        int64     `json:"id" db:"id"`
	Title     string    `json:"title" db:"title"`
	FileURL   string    `json:"file_url" db:"file_url"`
	Date      time.Time `json:"date" db:"date"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

type Announcement struct {
	ID             int64                    `json:"id" db:"id"`
	Title          string                   `json:"title" db:"title"`
	Content        string                   `json:"content,omitempty" db:"content"`
	ContentPreview string                   `json:"content_preview,omitempty"`
	TargetAudience string                   `json:"target_audience" db:"target_audience"`
	Attachments    []AnnouncementAttachment `json:"attachments,omitempty"`
	CreatedAt      time.Time                `json:"created_at" db:"created_at"`
	UpdatedAt      time.Time                `json:"updated_at" db:"updated_at"`
}

type AnnouncementAttachment struct {
	ID             int64     `json:"id" db:"id"`
	AnnouncementID int64     `json:"announcement_id" db:"announcement_id"`
	FileName       string    `json:"file_name" db:"file_name"`
	FileURL        string    `json:"file_url" db:"file_url"`
	CreatedAt      time.Time `json:"created_at" db:"created_at"`
}

type MinistryActivity struct {
	ID           int64      `json:"id" db:"id"`
	Name         string     `json:"name" db:"name"`
	ImageURL     string     `json:"image_url" db:"image_url"`
	ShortCaption string     `json:"short_caption" db:"short_caption"`
	Content      string     `json:"content,omitempty" db:"content"`
	ActivityDate *time.Time `json:"activity_date,omitempty" db:"activity_date"`
	CreatedAt    time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at" db:"updated_at"`
}

type WorshipSchedule struct {
	ID           int64     `json:"id" db:"id"`
	Name         string    `json:"name" db:"name"`
	ScheduleTime string    `json:"schedule_time" db:"schedule_time"`
	Location     string    `json:"location" db:"location"`
	CreatedAt    time.Time `json:"created_at" db:"created_at"`
	UpdatedAt    time.Time `json:"updated_at" db:"updated_at"`
}

type DailyVerse struct {
	ID              int64     `json:"id" db:"id"`
	Reference       string    `json:"reference" db:"reference"`
	Content         string    `json:"content" db:"content"`
	DevotionalTitle string    `json:"devotional_title" db:"devotional_title"`
	DevotionalURL   string    `json:"devotional_url" db:"devotional_url"`
	Date            time.Time `json:"date" db:"date"`
	CreatedAt       time.Time `json:"created_at" db:"created_at"`
	UpdatedAt       time.Time `json:"updated_at" db:"updated_at"`
}

type UpcomingActivity struct {
	ID                int64     `json:"id" db:"id"`
	Title             string    `json:"title" db:"title"`
	Date              time.Time `json:"date" db:"date"`
	TimeString        string    `json:"time_string" db:"time_string"`
	Location          string    `json:"location" db:"location"`
	DaysUntil         int       `json:"days_until"`
	RelativeDateLabel string    `json:"relative_date_label"`
	IsPast            bool      `json:"is_past"`
	StatusLabel       string    `json:"status_label,omitempty"`
	CreatedAt         time.Time `json:"created_at" db:"created_at"`
	UpdatedAt         time.Time `json:"updated_at" db:"updated_at"`
}

type Pagination struct {
	Page        int  `json:"page"`
	PageSize    int  `json:"page_size"`
	TotalItems  int  `json:"total_items"`
	TotalPages  int  `json:"total_pages"`
	HasNext     bool `json:"has_next"`
	HasPrevious bool `json:"has_previous"`
}

type PaginatedAnnouncements struct {
	Items      []Announcement `json:"items"`
	Pagination Pagination     `json:"pagination"`
}

type PaginatedMinistryActivities struct {
	Items      []MinistryActivity `json:"items"`
	Pagination Pagination         `json:"pagination"`
}
