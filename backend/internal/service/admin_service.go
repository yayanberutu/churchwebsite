package service

import (
	"context"

	"github.com/yayanberutu/churchwebsite/backend/internal/entity"
	"github.com/yayanberutu/churchwebsite/backend/internal/repository"
)

type AdminService interface {
	// Worship Schedules
	GetAllWorshipSchedules(ctx context.Context) ([]entity.WorshipSchedule, error)
	CreateWorshipSchedule(ctx context.Context, s *entity.WorshipSchedule) error
	UpdateWorshipSchedule(ctx context.Context, id int64, s *entity.WorshipSchedule) error
	DeleteWorshipSchedule(ctx context.Context, id int64) error

	// Daily Verses
	GetAllDailyVerses(ctx context.Context) ([]entity.DailyVerse, error)
	CreateDailyVerse(ctx context.Context, v *entity.DailyVerse) error
	UpdateDailyVerse(ctx context.Context, id int64, v *entity.DailyVerse) error
	DeleteDailyVerse(ctx context.Context, id int64) error

	// Announcements
	GetAllAnnouncements(ctx context.Context) ([]entity.Announcement, error)
	CreateAnnouncement(ctx context.Context, a *entity.Announcement) error
	UpdateAnnouncement(ctx context.Context, id int64, a *entity.Announcement) error
	DeleteAnnouncement(ctx context.Context, id int64) error

	// Wartas
	GetAllWartas(ctx context.Context) ([]entity.Warta, error)
	CreateWarta(ctx context.Context, w *entity.Warta) error
	UpdateWarta(ctx context.Context, id int64, w *entity.Warta) error
	DeleteWarta(ctx context.Context, id int64) error

	// Ministry Activities
	GetAllMinistryActivities(ctx context.Context) ([]entity.MinistryActivity, error)
	CreateMinistryActivity(ctx context.Context, a *entity.MinistryActivity) error
	UpdateMinistryActivity(ctx context.Context, id int64, a *entity.MinistryActivity) error
	DeleteMinistryActivity(ctx context.Context, id int64) error

	// Upcoming Activities
	GetAllUpcomingActivities(ctx context.Context) ([]entity.UpcomingActivity, error)
	CreateUpcomingActivity(ctx context.Context, a *entity.UpcomingActivity) error
	UpdateUpcomingActivity(ctx context.Context, id int64, a *entity.UpcomingActivity) error
	DeleteUpcomingActivity(ctx context.Context, id int64) error
}

type adminService struct {
	repo    repository.AdminRepository
	storage StorageService
}

func NewAdminService(repo repository.AdminRepository, storage StorageService) AdminService {
	return &adminService{repo: repo, storage: storage}
}

// Worship Schedules
func (s *adminService) GetAllWorshipSchedules(ctx context.Context) ([]entity.WorshipSchedule, error) {
	return s.repo.GetAllWorshipSchedules()
}

func (s *adminService) CreateWorshipSchedule(ctx context.Context, ws *entity.WorshipSchedule) error {
	return s.repo.CreateWorshipSchedule(ws)
}

func (s *adminService) UpdateWorshipSchedule(ctx context.Context, id int64, ws *entity.WorshipSchedule) error {
	ws.ID = id
	return s.repo.UpdateWorshipSchedule(ws)
}

func (s *adminService) DeleteWorshipSchedule(ctx context.Context, id int64) error {
	return s.repo.DeleteWorshipSchedule(id)
}

// Daily Verses
func (s *adminService) GetAllDailyVerses(ctx context.Context) ([]entity.DailyVerse, error) {
	return s.repo.GetAllDailyVerses()
}

func (s *adminService) CreateDailyVerse(ctx context.Context, v *entity.DailyVerse) error {
	return s.repo.CreateDailyVerse(v)
}

func (s *adminService) UpdateDailyVerse(ctx context.Context, id int64, v *entity.DailyVerse) error {
	v.ID = id
	return s.repo.UpdateDailyVerse(v)
}

func (s *adminService) DeleteDailyVerse(ctx context.Context, id int64) error {
	return s.repo.DeleteDailyVerse(id)
}

// Announcements
func (s *adminService) GetAllAnnouncements(ctx context.Context) ([]entity.Announcement, error) {
	return s.repo.GetAllAnnouncements()
}

func (s *adminService) CreateAnnouncement(ctx context.Context, a *entity.Announcement) error {
	return s.repo.CreateAnnouncement(a)
}

func (s *adminService) UpdateAnnouncement(ctx context.Context, id int64, a *entity.Announcement) error {
	if len(a.Attachments) > 0 && s.storage != nil {
		oldURLs, _ := s.repo.GetAnnouncementAttachmentURLs(id)
		for _, url := range oldURLs {
			_ = s.storage.DeleteFile(ctx, url)
		}
	}
	a.ID = id
	return s.repo.UpdateAnnouncement(a)
}

func (s *adminService) DeleteAnnouncement(ctx context.Context, id int64) error {
	if s.storage != nil {
		oldURLs, _ := s.repo.GetAnnouncementAttachmentURLs(id)
		for _, url := range oldURLs {
			_ = s.storage.DeleteFile(ctx, url)
		}
	}
	return s.repo.DeleteAnnouncement(id)
}

// Wartas
func (s *adminService) GetAllWartas(ctx context.Context) ([]entity.Warta, error) {
	return s.repo.GetAllWartas()
}

func (s *adminService) CreateWarta(ctx context.Context, w *entity.Warta) error {
	return s.repo.CreateWarta(w)
}

func (s *adminService) UpdateWarta(ctx context.Context, id int64, w *entity.Warta) error {
	if w.FileURL != "" && s.storage != nil {
		old, err := s.repo.GetWartaByID(id)
		if err == nil && old.FileURL != w.FileURL {
			_ = s.storage.DeleteFile(ctx, old.FileURL)
		}
	}
	w.ID = id
	return s.repo.UpdateWarta(w)
}

func (s *adminService) DeleteWarta(ctx context.Context, id int64) error {
	if s.storage != nil {
		old, err := s.repo.GetWartaByID(id)
		if err == nil {
			_ = s.storage.DeleteFile(ctx, old.FileURL)
		}
	}
	return s.repo.DeleteWarta(id)
}

// Ministry Activities
func (s *adminService) GetAllMinistryActivities(ctx context.Context) ([]entity.MinistryActivity, error) {
	return s.repo.GetAllMinistryActivities()
}

func (s *adminService) CreateMinistryActivity(ctx context.Context, a *entity.MinistryActivity) error {
	return s.repo.CreateMinistryActivity(a)
}

func (s *adminService) UpdateMinistryActivity(ctx context.Context, id int64, a *entity.MinistryActivity) error {
	if a.ImageURL != "" && s.storage != nil {
		oldURL, err := s.repo.GetMinistryActivityImageURL(id)
		if err == nil && oldURL != a.ImageURL {
			_ = s.storage.DeleteFile(ctx, oldURL)
		}
	}
	a.ID = id
	return s.repo.UpdateMinistryActivity(a)
}

func (s *adminService) DeleteMinistryActivity(ctx context.Context, id int64) error {
	if s.storage != nil {
		oldURL, err := s.repo.GetMinistryActivityImageURL(id)
		if err == nil {
			_ = s.storage.DeleteFile(ctx, oldURL)
		}
	}
	return s.repo.DeleteMinistryActivity(id)
}

// Upcoming Activities
func (s *adminService) GetAllUpcomingActivities(ctx context.Context) ([]entity.UpcomingActivity, error) {
	return s.repo.GetAllUpcomingActivities()
}

func (s *adminService) CreateUpcomingActivity(ctx context.Context, a *entity.UpcomingActivity) error {
	return s.repo.CreateUpcomingActivity(a)
}

func (s *adminService) UpdateUpcomingActivity(ctx context.Context, id int64, a *entity.UpcomingActivity) error {
	a.ID = id
	return s.repo.UpdateUpcomingActivity(a)
}

func (s *adminService) DeleteUpcomingActivity(ctx context.Context, id int64) error {
	return s.repo.DeleteUpcomingActivity(id)
}
