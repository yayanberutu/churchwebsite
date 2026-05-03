package main

import (
	"database/sql"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"github.com/yayanberutu/churchwebsite/backend/internal/handler"
	"github.com/yayanberutu/churchwebsite/backend/internal/middleware"
	"github.com/yayanberutu/churchwebsite/backend/internal/repository"
	"github.com/yayanberutu/churchwebsite/backend/internal/service"
)

func main() {
	// Setup log file
	if err := os.MkdirAll("logs", 0755); err != nil {
		log.Fatalf("Error creating log directory: %v", err)
	}

	logFile, err := os.OpenFile("logs/app.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("Error opening log file: %v", err)
	}
	defer logFile.Close()

	// Set log output to both console and file
	multiWriter := io.MultiWriter(os.Stdout, logFile)
	log.SetOutput(multiWriter)

	// Also set Gin to write to the same multiWriter
	gin.DefaultWriter = multiWriter

	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		log.Println("[WARNING] No .env file found or error reading it")
	}

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

	// Initialize Storage Service (Cloudflare R2)
	// Reads R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL from env
	storageSvc, storageErr := service.NewStorageService()
	if storageErr != nil {
		log.Printf("[WARNING] StorageService not initialized: %v. File uploads will use local mock URLs.", storageErr)
		storageSvc = nil
	}

	// Initialize Public Content layers (Warta, Announcements, Activities)
	pcRepo := repository.NewPublicContentRepository(db)
	pcSvc := service.NewPublicContentService(pcRepo, storageSvc)
	pcHdl := handler.NewPublicContentHandler(pcSvc)

	// Initialize Admin layers
	adminRepo := repository.NewAdminRepository(db)
	adminSvc := service.NewAdminService(adminRepo, storageSvc)
	adminHdl := handler.NewAdminHandler(adminSvc, storageSvc)

	// Setup router
	r := gin.New()
	r.Use(middleware.Logger())
	r.Use(gin.Recovery())

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
			public.GET("/assets/*path", pcHdl.ProxyAsset)
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
			admin.PUT("/wartas/:id", adminHdl.UpdateWarta)
			admin.DELETE("/wartas/:id", adminHdl.DeleteWarta)

			// Ministry Activities
			admin.GET("/ministry-activities", adminHdl.GetAllMinistryActivities)
			admin.POST("/ministry-activities", adminHdl.CreateMinistryActivity)
			admin.PUT("/ministry-activities/:id", adminHdl.UpdateMinistryActivity)
			admin.DELETE("/ministry-activities/:id", adminHdl.DeleteMinistryActivity)

			// Upcoming Activities
			admin.GET("/upcoming-activities", adminHdl.GetAllUpcomingActivities)
			admin.POST("/upcoming-activities", adminHdl.CreateUpcomingActivity)
			admin.PUT("/upcoming-activities/:id", adminHdl.UpdateUpcomingActivity)
			admin.DELETE("/upcoming-activities/:id", adminHdl.DeleteUpcomingActivity)
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
