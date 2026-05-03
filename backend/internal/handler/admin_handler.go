package handler

import (
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/yayanberutu/churchwebsite/backend/internal/entity"
	"github.com/yayanberutu/churchwebsite/backend/internal/service"
)

type AdminHandler struct {
	svc     service.AdminService
	storage service.StorageService
}

func NewAdminHandler(svc service.AdminService, storage service.StorageService) *AdminHandler {
	return &AdminHandler{svc: svc, storage: storage}
}

// ==================== Worship Schedules ====================
func (h *AdminHandler) GetAllWorshipSchedules(c *gin.Context) {
	schedules, err := h.svc.GetAllWorshipSchedules(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": schedules})
}

func (h *AdminHandler) CreateWorshipSchedule(c *gin.Context) {
	var s entity.WorshipSchedule
	if err := c.ShouldBindJSON(&s); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": err.Error()})
		return
	}
	if err := h.svc.CreateWorshipSchedule(c.Request.Context(), &s); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": s})
}

func (h *AdminHandler) UpdateWorshipSchedule(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	var s entity.WorshipSchedule
	if err := c.ShouldBindJSON(&s); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": err.Error()})
		return
	}
	if err := h.svc.UpdateWorshipSchedule(c.Request.Context(), id, &s); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": s})
}

func (h *AdminHandler) DeleteWorshipSchedule(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	if err := h.svc.DeleteWorshipSchedule(c.Request.Context(), id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Deleted successfully"})
}

// ==================== Daily Verses ====================
func (h *AdminHandler) GetAllDailyVerses(c *gin.Context) {
	verses, err := h.svc.GetAllDailyVerses(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": verses})
}

func (h *AdminHandler) CreateDailyVerse(c *gin.Context) {
	var input struct {
		Reference       string `json:"reference" binding:"required"`
		Content         string `json:"content" binding:"required"`
		DevotionalTitle string `json:"devotional_title"`
		DevotionalURL   string `json:"devotional_url"`
		Date            string `json:"date" binding:"required"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": err.Error()})
		return
	}
	date, err := time.Parse("2006-01-02", input.Date)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid date format, use YYYY-MM-DD"})
		return
	}
	v := entity.DailyVerse{
		Reference:       input.Reference,
		Content:         input.Content,
		DevotionalTitle: input.DevotionalTitle,
		DevotionalURL:   input.DevotionalURL,
		Date:            date,
	}
	if err := h.svc.CreateDailyVerse(c.Request.Context(), &v); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": v})
}

func (h *AdminHandler) UpdateDailyVerse(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	var input struct {
		Reference       string `json:"reference" binding:"required"`
		Content         string `json:"content" binding:"required"`
		DevotionalTitle string `json:"devotional_title"`
		DevotionalURL   string `json:"devotional_url"`
		Date            string `json:"date" binding:"required"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": err.Error()})
		return
	}
	date, err := time.Parse("2006-01-02", input.Date)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid date format, use YYYY-MM-DD"})
		return
	}
	v := entity.DailyVerse{
		Reference:       input.Reference,
		Content:         input.Content,
		DevotionalTitle: input.DevotionalTitle,
		DevotionalURL:   input.DevotionalURL,
		Date:            date,
	}
	if err := h.svc.UpdateDailyVerse(c.Request.Context(), id, &v); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": v})
}

func (h *AdminHandler) DeleteDailyVerse(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	if err := h.svc.DeleteDailyVerse(c.Request.Context(), id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Deleted successfully"})
}

// ==================== Announcements ====================
func (h *AdminHandler) GetAllAnnouncements(c *gin.Context) {
	announcements, err := h.svc.GetAllAnnouncements(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": announcements})
}

func (h *AdminHandler) CreateAnnouncement(c *gin.Context) {
	title := c.PostForm("title")
	content := c.PostForm("content")
	targetAudience := c.PostForm("target_audience")

	var attachments []entity.AnnouncementAttachment
	form, err := c.MultipartForm()
	if err == nil && form != nil {
		for _, file := range form.File["attachments"] {
			fileURL := "/uploads/announcements/" + file.Filename // fallback
			if h.storage != nil {
				openedFile, ferr := file.Open()
				if ferr == nil {
					url, uerr := h.storage.UploadFile(c.Request.Context(), openedFile, file, "announcements")
					openedFile.Close()
					if uerr == nil {
						fileURL = url
					}
				}
			}
			attachments = append(attachments, entity.AnnouncementAttachment{
				FileName: file.Filename,
				FileURL:  fileURL,
			})
		}
	}

	a := entity.Announcement{
		Title:          title,
		Content:        content,
		TargetAudience: targetAudience,
		Attachments:    attachments,
	}
	if err := h.svc.CreateAnnouncement(c.Request.Context(), &a); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": a})
}

func (h *AdminHandler) UpdateAnnouncement(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	title := c.PostForm("title")
	content := c.PostForm("content")
	targetAudience := c.PostForm("target_audience")

	var attachments []entity.AnnouncementAttachment
	form, err := c.MultipartForm()
	if err == nil && form != nil {
		for _, file := range form.File["attachments"] {
			fileURL := "/uploads/announcements/" + file.Filename
			if h.storage != nil {
				openedFile, ferr := file.Open()
				if ferr == nil {
					url, uerr := h.storage.UploadFile(c.Request.Context(), openedFile, file, "announcements")
					openedFile.Close()
					if uerr == nil {
						fileURL = url
					}
				}
			}
			attachments = append(attachments, entity.AnnouncementAttachment{
				FileName: file.Filename,
				FileURL:  fileURL,
			})
		}
	}

	a := entity.Announcement{
		Title:          title,
		Content:        content,
		TargetAudience: targetAudience,
		Attachments:    attachments,
	}
	if err := h.svc.UpdateAnnouncement(c.Request.Context(), id, &a); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": a})
}

func (h *AdminHandler) DeleteAnnouncement(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	if err := h.svc.DeleteAnnouncement(c.Request.Context(), id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Deleted successfully"})
}

// ==================== Wartas ====================
func (h *AdminHandler) GetAllWartas(c *gin.Context) {
	wartas, err := h.svc.GetAllWartas(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": wartas})
}

func (h *AdminHandler) CreateWarta(c *gin.Context) {
	title := c.PostForm("title")
	dateStr := c.PostForm("date")

	date, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid date format, use YYYY-MM-DD"})
		return
	}

	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "PDF file is required"})
		return
	}

	fileURL := "/uploads/" + file.Filename // fallback
	if h.storage != nil {
		openedFile, ferr := file.Open()
		if ferr == nil {
			url, uerr := h.storage.UploadFile(c.Request.Context(), openedFile, file, "wartas")
			openedFile.Close()
			if uerr == nil {
				fileURL = url
			} else {
				log.Printf("[ERROR] Failed to upload Warta to R2: %v", uerr)
			}
		} else {
			log.Printf("[ERROR] Failed to open Warta file: %v", ferr)
		}
	}

	w := entity.Warta{Title: title, FileURL: fileURL, Date: date}
	if err := h.svc.CreateWarta(c.Request.Context(), &w); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": w})
}

func (h *AdminHandler) UpdateWarta(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	title := c.PostForm("title")
	dateStr := c.PostForm("date")

	date, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid date format, use YYYY-MM-DD"})
		return
	}

	// Use existing file URL by default
	existingFileURL := c.PostForm("existing_file_url")
	fileURL := existingFileURL

	// Upload new file if provided
	file, ferr := c.FormFile("file")
	if ferr == nil && file != nil && h.storage != nil {
		openedFile, foerr := file.Open()
		if foerr == nil {
			url, uerr := h.storage.UploadFile(c.Request.Context(), openedFile, file, "wartas")
			openedFile.Close()
			if uerr == nil {
				fileURL = url
			} else {
				log.Printf("[ERROR] Failed to upload new Warta to R2: %v", uerr)
			}
		} else {
			log.Printf("[ERROR] Failed to open new Warta file: %v", foerr)
		}
	}

	w := entity.Warta{Title: title, FileURL: fileURL, Date: date}
	if err := h.svc.UpdateWarta(c.Request.Context(), id, &w); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": w})
}

func (h *AdminHandler) DeleteWarta(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	if err := h.svc.DeleteWarta(c.Request.Context(), id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Deleted successfully"})
}

// ==================== Ministry Activities ====================
func (h *AdminHandler) GetAllMinistryActivities(c *gin.Context) {
	activities, err := h.svc.GetAllMinistryActivities(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": activities})
}

func (h *AdminHandler) CreateMinistryActivity(c *gin.Context) {
	name := c.PostForm("name")
	shortCaption := c.PostForm("short_caption")

	imageURL := ""
	file, err := c.FormFile("image")
	if err == nil && file != nil {
		if h.storage != nil {
			openedFile, ferr := file.Open()
			if ferr == nil {
				url, uerr := h.storage.UploadFile(c.Request.Context(), openedFile, file, "ministry_activities")
				openedFile.Close()
				if uerr == nil {
					imageURL = url
				}
			}
		} else {
			imageURL = "/uploads/activities/" + file.Filename
		}
	}

	a := entity.MinistryActivity{Name: name, ShortCaption: shortCaption, ImageURL: imageURL}
	if err := h.svc.CreateMinistryActivity(c.Request.Context(), &a); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": a})
}

func (h *AdminHandler) UpdateMinistryActivity(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	name := c.PostForm("name")
	shortCaption := c.PostForm("short_caption")

	imageURL := c.PostForm("existing_image_url") // keep existing by default

	file, ferr := c.FormFile("image")
	if ferr == nil && file != nil {
		if h.storage != nil {
			openedFile, foerr := file.Open()
			if foerr == nil {
				url, uerr := h.storage.UploadFile(c.Request.Context(), openedFile, file, "ministry_activities")
				openedFile.Close()
				if uerr == nil {
					imageURL = url
				}
			}
		} else {
			imageURL = "/uploads/activities/" + file.Filename
		}
	}

	a := entity.MinistryActivity{ID: id, Name: name, ShortCaption: shortCaption, ImageURL: imageURL}
	if err := h.svc.UpdateMinistryActivity(c.Request.Context(), id, &a); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": a})
}

func (h *AdminHandler) DeleteMinistryActivity(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	if err := h.svc.DeleteMinistryActivity(c.Request.Context(), id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Deleted successfully"})
}

// ==================== Upcoming Activities ====================
func (h *AdminHandler) GetAllUpcomingActivities(c *gin.Context) {
	activities, err := h.svc.GetAllUpcomingActivities(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": activities})
}

func (h *AdminHandler) CreateUpcomingActivity(c *gin.Context) {
	activity, ok := bindUpcomingActivity(c)
	if !ok {
		return
	}
	if err := h.svc.CreateUpcomingActivity(c.Request.Context(), activity); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": activity})
}

func (h *AdminHandler) UpdateUpcomingActivity(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	activity, ok := bindUpcomingActivity(c)
	if !ok {
		return
	}
	if err := h.svc.UpdateUpcomingActivity(c.Request.Context(), id, activity); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": activity})
}

func (h *AdminHandler) DeleteUpcomingActivity(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	if err := h.svc.DeleteUpcomingActivity(c.Request.Context(), id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Deleted successfully"})
}

func bindUpcomingActivity(c *gin.Context) (*entity.UpcomingActivity, bool) {
	var input struct {
		Title      string `json:"title" binding:"required"`
		Date       string `json:"date" binding:"required"`
		TimeString string `json:"time_string" binding:"required"`
		Location   string `json:"location" binding:"required"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": err.Error()})
		return nil, false
	}

	date, err := time.Parse("2006-01-02", input.Date)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid date format, use YYYY-MM-DD"})
		return nil, false
	}

	return &entity.UpcomingActivity{
		Title:      input.Title,
		Date:       date,
		TimeString: input.TimeString,
		Location:   input.Location,
	}, true
}
