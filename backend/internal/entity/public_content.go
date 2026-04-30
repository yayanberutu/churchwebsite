package entity

import "time"

type Warta struct {
	ID        int64     `json:"id" db:"id"`
	Title     string    `json:"title" db:"title"`
	FileURL   string    `json:"file_url" db:"file_url"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

type Announcement struct {
	ID             int64     `json:"id" db:"id"`
	Title          string    `json:"title" db:"title"`
	TargetAudience string    `json:"target_audience" db:"target_audience"`
	CreatedAt      time.Time `json:"created_at" db:"created_at"`
	UpdatedAt      time.Time `json:"updated_at" db:"updated_at"`
}

type MinistryActivity struct {
	ID           int64     `json:"id" db:"id"`
	Name         string    `json:"name" db:"name"`
	ImageURL     string    `json:"image_url" db:"image_url"`
	ShortCaption string    `json:"short_caption" db:"short_caption"`
	CreatedAt    time.Time `json:"created_at" db:"created_at"`
	UpdatedAt    time.Time `json:"updated_at" db:"updated_at"`
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
	ID        int64     `json:"id" db:"id"`
	Reference string    `json:"reference" db:"reference"`
	Content   string    `json:"content" db:"content"`
	Date      time.Time `json:"date" db:"date"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

type UpcomingActivity struct {
	ID         int64     `json:"id" db:"id"`
	Title      string    `json:"title" db:"title"`
	Date       time.Time `json:"date" db:"date"`
	TimeString string    `json:"time_string" db:"time_string"`
	Location   string    `json:"location" db:"location"`
	CreatedAt  time.Time `json:"created_at" db:"created_at"`
	UpdatedAt  time.Time `json:"updated_at" db:"updated_at"`
}

type DailyDevotional struct {
	ID         int64     `json:"id" db:"id"`
	Title      string    `json:"title" db:"title"`
	YoutubeURL string    `json:"youtube_url" db:"youtube_url"`
	Date       time.Time `json:"date" db:"date"`
	CreatedAt  time.Time `json:"created_at" db:"created_at"`
	UpdatedAt  time.Time `json:"updated_at" db:"updated_at"`
}

