package entity

type Church struct {
	ID      int64  `json:"id" db:"id"`
	Name    string `json:"name" db:"name"`
	LogoURL string `json:"logo_url" db:"logo_url"`
}

type Menu struct {
	ID        int64  `json:"id" db:"id"`
	Name      string `json:"name" db:"name"`
	Slug      string `json:"slug" db:"slug"`
	Path      string `json:"path" db:"path"`
	Order     int    `json:"order" db:"menu_order"`
	IsActive  bool   `json:"isActive" db:"is_active"`
}

type SiteConfig struct {
	ChurchName    string `json:"churchName"`
	ChurchLogoURL string `json:"churchLogoUrl"`
	Menus         []Menu `json:"menus"`
}
