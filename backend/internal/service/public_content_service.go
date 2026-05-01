package service

import (
	"context"
	"time"

	"github.com/yayanberutu/churchwebsite/backend/internal/entity"
	"github.com/yayanberutu/churchwebsite/backend/internal/repository"
)

type PublicContentService interface {
	GetLatestWarta(ctx context.Context) (*entity.Warta, error)
	GetLatestAnnouncements(ctx context.Context) ([]entity.Announcement, error)
	GetLatestMinistryActivities(ctx context.Context) ([]entity.MinistryActivity, error)
	GetWorshipSchedules(ctx context.Context) ([]entity.WorshipSchedule, error)
	GetDailyVerse(ctx context.Context, date string) (*entity.DailyVerse, error)
	GetUpcomingActivities(ctx context.Context) ([]entity.UpcomingActivity, error)
}

type publicContentService struct {
	repo repository.PublicContentRepository
}

func NewPublicContentService(repo repository.PublicContentRepository) PublicContentService {
	return &publicContentService{repo: repo}
}

func (s *publicContentService) GetLatestWarta(ctx context.Context) (*entity.Warta, error) {
	return s.repo.GetLatestWarta()
}

func (s *publicContentService) GetLatestAnnouncements(ctx context.Context) ([]entity.Announcement, error) {
	return s.repo.GetLatestAnnouncements()
}

func (s *publicContentService) GetLatestMinistryActivities(ctx context.Context) ([]entity.MinistryActivity, error) {
	return s.repo.GetLatestMinistryActivities()
}

func (s *publicContentService) GetWorshipSchedules(ctx context.Context) ([]entity.WorshipSchedule, error) {
	return s.repo.GetWorshipSchedules()
}

func (s *publicContentService) GetDailyVerse(ctx context.Context, date string) (*entity.DailyVerse, error) {
	if date == "" {
		date = time.Now().Format("2006-01-02")
	}
	return s.repo.GetDailyVerseByDate(date)
}

func (s *publicContentService) GetUpcomingActivities(ctx context.Context) ([]entity.UpcomingActivity, error) {
	return s.repo.GetUpcomingActivities()
}

