package repository

import (
	"database/sql"
	"github.com/yayanberutu/churchwebsite/backend/internal/entity"
)

type SiteConfigRepository interface {
	GetChurch() (*entity.Church, error)
	GetActiveMenus() ([]entity.Menu, error)
}

type mysqlSiteConfigRepository struct {
	db *sql.DB
}

func NewSiteConfigRepository(db *sql.DB) SiteConfigRepository {
	return &mysqlSiteConfigRepository{db: db}
}

func (r *mysqlSiteConfigRepository) GetChurch() (*entity.Church, error) {
	var church entity.Church
	err := r.db.QueryRow("SELECT id, name, logo_url FROM churches LIMIT 1").Scan(&church.ID, &church.Name, &church.LogoURL)
	if err != nil {
		return nil, err
	}
	return &church, nil
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
