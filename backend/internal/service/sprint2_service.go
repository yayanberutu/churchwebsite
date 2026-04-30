package service

import (
	"github.com/yayanberutu/churchwebsite/backend/internal/entity"
	"github.com/yayanberutu/churchwebsite/backend/internal/repository"
)

type Sprint2Service interface {
	GetLatestWarta() (*entity.Warta, error)
	GetLatestAnnouncements() ([]entity.Announcement, error)
	GetLatestMinistryActivities() ([]entity.MinistryActivity, error)
}

type sprint2Service struct {
	repo repository.Sprint2Repository
}

func NewSprint2Service(repo repository.Sprint2Repository) Sprint2Service {
	return &sprint2Service{repo: repo}
}

func (s *sprint2Service) GetLatestWarta() (*entity.Warta, error) {
	return s.repo.GetLatestWarta()
}

func (s *sprint2Service) GetLatestAnnouncements() ([]entity.Announcement, error) {
	return s.repo.GetLatestAnnouncements()
}

func (s *sprint2Service) GetLatestMinistryActivities() ([]entity.MinistryActivity, error) {
	return s.repo.GetLatestMinistryActivities()
}
