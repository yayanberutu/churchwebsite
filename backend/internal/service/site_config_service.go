package service

import (
	"context"
	"github.com/yayanberutu/churchwebsite/backend/internal/entity"
	"github.com/yayanberutu/churchwebsite/backend/internal/repository"
)

type SiteConfigService interface {
	GetSiteConfig(ctx context.Context) (*entity.SiteConfig, error)
}

type siteConfigService struct {
	repo repository.SiteConfigRepository
}

func NewSiteConfigService(repo repository.SiteConfigRepository) SiteConfigService {
	return &siteConfigService{repo: repo}
}

func (s *siteConfigService) GetSiteConfig(ctx context.Context) (*entity.SiteConfig, error) {
	church, err := s.repo.GetChurch()
	if err != nil {
		return nil, err
	}

	menus, err := s.repo.GetActiveMenus()
	if err != nil {
		return nil, err
	}

	return &entity.SiteConfig{
		ChurchName:    church.Name,
		ChurchLogoURL: church.LogoURL,
		Menus:         menus,
	}, nil
}
