package repository

import (
	"database/sql"
	"github.com/yayanberutu/churchwebsite/backend/internal/entity"
)

type SiteConfigRepository interface {
	GetPublicConfig() (map[string]entity.ChurchConfig, error)
	GetActiveMenus() ([]entity.Menu, error)
}

type mysqlSiteConfigRepository struct {
	db *sql.DB
}

func NewSiteConfigRepository(db *sql.DB) SiteConfigRepository {
	return &mysqlSiteConfigRepository{db: db}
}

func (r *mysqlSiteConfigRepository) GetPublicConfig() (map[string]entity.ChurchConfig, error) {
	rows, err := r.db.Query("SELECT id, config_key, COALESCE(config_value, ''), value_type, group_name, COALESCE(file_name, ''), COALESCE(file_url, '') FROM church_config WHERE is_public = true")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	configs := make(map[string]entity.ChurchConfig)
	for rows.Next() {
		var cfg entity.ChurchConfig
		if err := rows.Scan(&cfg.ID, &cfg.ConfigKey, &cfg.ConfigValue, &cfg.ValueType, &cfg.GroupName, &cfg.FileName, &cfg.FileURL); err != nil {
			return nil, err
		}
		configs[cfg.ConfigKey] = cfg
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return configs, nil
}

func (r *mysqlSiteConfigRepository) GetActiveMenus() ([]entity.Menu, error) {
	rows, err := r.db.Query("SELECT id, name, slug, path, menu_order, is_active FROM menus WHERE is_active = true ORDER BY menu_order ASC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var menus []entity.Menu
	for rows.Next() {
		var menu entity.Menu
		if err := rows.Scan(&menu.ID, &menu.Name, &menu.Slug, &menu.Path, &menu.Order, &menu.IsActive); err != nil {
			return nil, err
		}
		menus = append(menus, menu)
	}
	return menus, nil
}
