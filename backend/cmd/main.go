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

	// Initialize Admin layers
	adminRepo := repository.NewAdminRepository(db)
	adminSvc := service.NewAdminService(adminRepo)
	adminHdl := handler.NewAdminHandler(adminSvc)

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
			public.GET("/worship-schedules", pcHdl.GetWorshipSchedules)
			public.GET("/daily-verses/today", pcHdl.GetDailyVerse)
			public.GET("/upcoming-activities", pcHdl.GetUpcomingActivities)
			public.GET("/daily-devotionals/today", pcHdl.GetDailyDevotional)
		}

		// Admin Routes
		admin := v1.Group("/admin")
		{
			// Worship Schedules
			admin.GET("/worship-schedules", adminHdl.GetAllWorshipSchedules)
			admin.POST("/worship-schedules", adminHdl.CreateWorshipSchedule)
			admin.PUT("/worship-schedules/:id", adminHdl.UpdateWorshipSchedule)
			admin.DELETE("/worship-schedules/:id", adminHdl.DeleteWorshipSchedule)

			// Daily Verses
			admin.GET("/daily-verses", adminHdl.GetAllDailyVerses)
			admin.POST("/daily-verses", adminHdl.CreateDailyVerse)
			admin.PUT("/daily-verses/:id", adminHdl.UpdateDailyVerse)
			admin.DELETE("/daily-verses/:id", adminHdl.DeleteDailyVerse)

			// Announcements
			admin.GET("/announcements", adminHdl.GetAllAnnouncements)
			admin.POST("/announcements", adminHdl.CreateAnnouncement)
			admin.PUT("/announcements/:id", adminHdl.UpdateAnnouncement)
			admin.DELETE("/announcements/:id", adminHdl.DeleteAnnouncement)

			// Warta
			admin.GET("/wartas", adminHdl.GetAllWartas)
			admin.POST("/wartas", adminHdl.CreateWarta)
			admin.DELETE("/wartas/:id", adminHdl.DeleteWarta)

			// Ministry Activities
			admin.GET("/ministry-activities", adminHdl.GetAllMinistryActivities)
			admin.POST("/ministry-activities", adminHdl.CreateMinistryActivity)
			admin.PUT("/ministry-activities/:id", adminHdl.UpdateMinistryActivity)
			admin.DELETE("/ministry-activities/:id", adminHdl.DeleteMinistryActivity)
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
