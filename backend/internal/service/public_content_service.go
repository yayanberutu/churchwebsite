package service

import (
	"github.com/yayanberutu/churchwebsite/backend/internal/entity"
	"github.com/yayanberutu/churchwebsite/backend/internal/repository"
)

type PublicContentService interface {
	GetLatestWarta() (*entity.Warta, error)
	GetLatestAnnouncements() ([]entity.Announcement, error)
	GetLatestMinistryActivities() ([]entity.MinistryActivity, error)
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
