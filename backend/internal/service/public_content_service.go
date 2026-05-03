package service

import (
	"context"
	"errors"
	"io"
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
	ProxyAsset(ctx context.Context, key string) (io.ReadCloser, string, error)
}

type publicContentService struct {
	repo           repository.PublicContentRepository
	storageService StorageService
}

func NewPublicContentService(repo repository.PublicContentRepository, ss StorageService) PublicContentService {
	return &publicContentService{repo: repo, storageService: ss}
}

func (s *publicContentService) GetLatestWarta(ctx context.Context) (*entity.Warta, error) {
	warta, err := s.repo.GetLatestWarta()
	if err == nil && warta != nil && s.storageService != nil {
		warta.FileURL = s.storageService.RewriteURL(warta.FileURL)
	}
	return warta, err
}

func (s *publicContentService) GetLatestAnnouncements(ctx context.Context) ([]entity.Announcement, error) {
	announcements, err := s.repo.GetLatestAnnouncements()
	if err == nil && s.storageService != nil {
		for i := range announcements {
			for j := range announcements[i].Attachments {
				if announcements[i].Attachments[j].FileURL != "" {
					announcements[i].Attachments[j].FileURL = s.storageService.RewriteURL(announcements[i].Attachments[j].FileURL)
				}
			}
		}
	}
	return announcements, err
}

func (s *publicContentService) GetLatestMinistryActivities(ctx context.Context) ([]entity.MinistryActivity, error) {
	activities, err := s.repo.GetLatestMinistryActivities()
	if err == nil && s.storageService != nil {
		for i := range activities {
			if activities[i].ImageURL != "" {
				activities[i].ImageURL = s.storageService.RewriteURL(activities[i].ImageURL)
			}
		}
	}
	return activities, err
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

func (s *publicContentService) ProxyAsset(ctx context.Context, key string) (io.ReadCloser, string, error) {
	if s.storageService == nil {
		return nil, "", errors.New("storage service is not configured")
	}
	return s.storageService.GetFile(ctx, key)
}
