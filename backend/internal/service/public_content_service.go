package service

import (
	"time"
	"github.com/yayanberutu/churchwebsite/backend/internal/entity"
	"github.com/yayanberutu/churchwebsite/backend/internal/repository"
)

type PublicContentService interface {
	GetLatestWarta() (*entity.Warta, error)
	GetLatestAnnouncements() ([]entity.Announcement, error)
	GetLatestMinistryActivities() ([]entity.MinistryActivity, error)
	GetWorshipSchedules() ([]entity.WorshipSchedule, error)
	GetDailyVerse(date string) (*entity.DailyVerse, error)
	GetUpcomingActivities() ([]entity.UpcomingActivity, error)
	GetDailyDevotional(date string) (*entity.DailyDevotional, error)
}

type publicContentService struct {
	repo repository.PublicContentRepository
}

func NewPublicContentService(repo repository.PublicContentRepository) PublicContentService {
	return &publicContentService{repo: repo}
}

func (s *publicContentService) GetLatestWarta() (*entity.Warta, error) {
	return s.repo.GetLatestWarta()
}

func (s *publicContentService) GetLatestAnnouncements() ([]entity.Announcement, error) {
	return s.repo.GetLatestAnnouncements()
}

func (s *publicContentService) GetLatestMinistryActivities() ([]entity.MinistryActivity, error) {
	return s.repo.GetLatestMinistryActivities()
}

func (s *publicContentService) GetWorshipSchedules() ([]entity.WorshipSchedule, error) {
	return s.repo.GetWorshipSchedules()
}

func (s *publicContentService) GetDailyVerse(date string) (*entity.DailyVerse, error) {
	if date == "" {
		date = time.Now().Format("2006-01-02")
	}
	return s.repo.GetDailyVerseByDate(date)
}

func (s *publicContentService) GetUpcomingActivities() ([]entity.UpcomingActivity, error) {
	return s.repo.GetUpcomingActivities()
}

func (s *publicContentService) GetDailyDevotional(date string) (*entity.DailyDevotional, error) {
	if date == "" {
		date = time.Now().Format("2006-01-02")
	}
	return s.repo.GetDailyDevotionalByDate(date)
}
