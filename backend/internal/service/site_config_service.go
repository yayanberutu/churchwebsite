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
	configs, err := s.repo.GetPublicConfig()
	if err != nil {
		return nil, err
	}

	menus, err := s.repo.GetActiveMenus()
	if err != nil {
		return nil, err
	}

	return &entity.SiteConfig{
		ChurchName:    configValue(configs, "church_name", "HKBP Kernolong"),
		ChurchLogoURL: configImageURL(configs, "church_logo"),
		Menus:         menus,
		HomeHero: entity.HomeHeroConfig{
			Title:               configValue(configs, "home_hero_title", "Selamat Datang di HKBP Kernolong"),
			Subtitle:            configValue(configs, "home_hero_subtitle", "Membangun iman, harapan, dan kasih dalam persekutuan yang hidup."),
			ImageURL:            configImageURLWithFallback(configs, "home_hero_image", "/images/hkbpkernolong.jpg"),
			PrimaryButtonText:   configValue(configs, "home_hero_primary_button_text", "Jadwal Ibadah"),
			SecondaryButtonText: configValue(configs, "home_hero_secondary_button_text", "Download Warta Minggu Ini"),
		},
	}, nil
}

func configValue(configs map[string]entity.ChurchConfig, key string, fallback string) string {
	if cfg, ok := configs[key]; ok && cfg.ConfigValue != "" {
		return cfg.ConfigValue
	}
	return fallback
}

func configImageURL(configs map[string]entity.ChurchConfig, key string) string {
	return configImageURLWithFallback(configs, key, "")
}

func configImageURLWithFallback(configs map[string]entity.ChurchConfig, key string, fallback string) string {
	if cfg, ok := configs[key]; ok {
		if cfg.FileURL != "" {
			return cfg.FileURL
		}
		if cfg.ConfigValue != "" {
			return cfg.ConfigValue
		}
	}
	return fallback
}
