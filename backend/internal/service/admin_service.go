package service

import (
	"github.com/yayanberutu/churchwebsite/backend/internal/entity"
	"github.com/yayanberutu/churchwebsite/backend/internal/repository"
)

type AdminService interface {
	// Worship Schedules
	GetAllWorshipSchedules() ([]entity.WorshipSchedule, error)
	CreateWorshipSchedule(s *entity.WorshipSchedule) error
	UpdateWorshipSchedule(id int64, s *entity.WorshipSchedule) error
	DeleteWorshipSchedule(id int64) error

	// Daily Verses
	GetAllDailyVerses() ([]entity.DailyVerse, error)
	CreateDailyVerse(v *entity.DailyVerse) error
	UpdateDailyVerse(id int64, v *entity.DailyVerse) error
	DeleteDailyVerse(id int64) error

	// Announcements
	GetAllAnnouncements() ([]entity.Announcement, error)
	CreateAnnouncement(a *entity.Announcement) error
	UpdateAnnouncement(id int64, a *entity.Announcement) error
	DeleteAnnouncement(id int64) error

	// Wartas
	GetAllWartas() ([]entity.Warta, error)
	CreateWarta(w *entity.Warta) error
	DeleteWarta(id int64) error

	// Ministry Activities
	GetAllMinistryActivities() ([]entity.MinistryActivity, error)
	CreateMinistryActivity(a *entity.MinistryActivity) error
	UpdateMinistryActivity(id int64, a *entity.MinistryActivity) error
	DeleteMinistryActivity(id int64) error
}

type adminService struct {
	repo repository.AdminRepository
}

func NewAdminService(repo repository.AdminRepository) AdminService {
	return &adminService{repo: repo}
}

// Worship Schedules
func (s *adminService) GetAllWorshipSchedules() ([]entity.WorshipSchedule, error) {
	return s.repo.GetAllWorshipSchedules()
}

func (s *adminService) CreateWorshipSchedule(ws *entity.WorshipSchedule) error {
	return s.repo.CreateWorshipSchedule(ws)
}

func (s *adminService) UpdateWorshipSchedule(id int64, ws *entity.WorshipSchedule) error {
	ws.ID = id
	return s.repo.UpdateWorshipSchedule(ws)
}

func (s *adminService) DeleteWorshipSchedule(id int64) error {
	return s.repo.DeleteWorshipSchedule(id)
}

// Daily Verses
func (s *adminService) GetAllDailyVerses() ([]entity.DailyVerse, error) {
	return s.repo.GetAllDailyVerses()
}

func (s *adminService) CreateDailyVerse(v *entity.DailyVerse) error {
	return s.repo.CreateDailyVerse(v)
}

func (s *adminService) UpdateDailyVerse(id int64, v *entity.DailyVerse) error {
	v.ID = id
	return s.repo.UpdateDailyVerse(v)
}

func (s *adminService) DeleteDailyVerse(id int64) error {
	return s.repo.DeleteDailyVerse(id)
}

// Announcements
func (s *adminService) GetAllAnnouncements() ([]entity.Announcement, error) {
	return s.repo.GetAllAnnouncements()
}

func (s *adminService) CreateAnnouncement(a *entity.Announcement) error {
	return s.repo.CreateAnnouncement(a)
}

func (s *adminService) UpdateAnnouncement(id int64, a *entity.Announcement) error {
	a.ID = id
	return s.repo.UpdateAnnouncement(a)
}

func (s *adminService) DeleteAnnouncement(id int64) error {
	return s.repo.DeleteAnnouncement(id)
}

// Wartas
func (s *adminService) GetAllWartas() ([]entity.Warta, error) {
	return s.repo.GetAllWartas()
}

func (s *adminService) CreateWarta(w *entity.Warta) error {
	return s.repo.CreateWarta(w)
}

func (s *adminService) DeleteWarta(id int64) error {
	return s.repo.DeleteWarta(id)
}

// Ministry Activities
func (s *adminService) GetAllMinistryActivities() ([]entity.MinistryActivity, error) {
	return s.repo.GetAllMinistryActivities()
}

func (s *adminService) CreateMinistryActivity(a *entity.MinistryActivity) error {
	return s.repo.CreateMinistryActivity(a)
}

func (s *adminService) UpdateMinistryActivity(id int64, a *entity.MinistryActivity) error {
	a.ID = id
	return s.repo.UpdateMinistryActivity(a)
}

func (s *adminService) DeleteMinistryActivity(id int64) error {
	return s.repo.DeleteMinistryActivity(id)
}
