package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/yayanberutu/churchwebsite/backend/internal/handler"
	"github.com/yayanberutu/churchwebsite/backend/internal/repository"
	"github.com/yayanberutu/churchwebsite/backend/internal/service"
)

func main() {
	// Database connection
	dsn := os.Getenv("DB_DSN")
	if dsn == "" {
		// Default for local development (adjust as needed)
		dsn = "root:root1234@tcp(127.0.0.1:3306)/church_db?parseTime=true"
	}

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}
	defer db.Close()

	// Initialize Sprint 1 layers
	repo := repository.NewSiteConfigRepository(db)
	svc := service.NewSiteConfigService(repo)
	hdl := handler.NewSiteConfigHandler(svc)

	// Initialize Public Content layers (Warta, Announcements, Activities)
	pcRepo := repository.NewPublicContentRepository(db)
	pcSvc := service.NewPublicContentService(pcRepo)
	pcHdl := handler.NewPublicContentHandler(pcSvc)

	// Setup router
	r := gin.Default()

	// CORS configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Adjust for production
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Routes
	v1 := r.Group("/api/v1")
	{
		public := v1.Group("/public")
		{
			public.GET("/site-config", hdl.GetSiteConfig)
			
			// Public Content Routes
			public.GET("/warta/latest/download", pcHdl.GetLatestWarta)
			public.GET("/announcements/latest", pcHdl.GetLatestAnnouncements)
			public.GET("/ministry-activities/latest", pcHdl.GetLatestMinistryActivities)
		}
	}

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "UP"})
	})

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server starting on port %s", port)
	r.Run(":" + port)
}
