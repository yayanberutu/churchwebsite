package entity

type Church struct {
	ID      int64  `json:"id" db:"id"`
	Name    string `json:"name" db:"name"`
	LogoURL string `json:"logo_url" db:"logo_url"`
}

type ChurchConfig struct {
	ID          int64  `json:"id" db:"id"`
	ConfigKey   string `json:"config_key" db:"config_key"`
	ConfigValue string `json:"config_value" db:"config_value"`
	ValueType   string `json:"value_type" db:"value_type"`
	GroupName   string `json:"group_name" db:"group_name"`
	FileName    string `json:"file_name" db:"file_name"`
	FileURL     string `json:"file_url" db:"file_url"`
}

type HomeHeroConfig struct {
	Title               string `json:"title"`
	Subtitle            string `json:"subtitle"`
	ImageURL            string `json:"imageUrl"`
	PrimaryButtonText   string `json:"primaryButtonText"`
	SecondaryButtonText string `json:"secondaryButtonText"`
}

type Menu struct {
	ID       int64  `json:"id" db:"id"`
	Name     string `json:"name" db:"name"`
	Slug     string `json:"slug" db:"slug"`
	Path     string `json:"path" db:"path"`
	Order    int    `json:"order" db:"menu_order"`
	IsActive bool   `json:"isActive" db:"is_active"`
}

type SiteConfig struct {
	ChurchName    string         `json:"churchName"`
	ChurchLogoURL string         `json:"churchLogoUrl"`
	Menus         []Menu         `json:"menus"`
	HomeHero      HomeHeroConfig `json:"homeHero"`
}
