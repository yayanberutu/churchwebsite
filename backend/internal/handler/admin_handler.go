package handler

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/yayanberutu/churchwebsite/backend/internal/entity"
	"github.com/yayanberutu/churchwebsite/backend/internal/service"
)

type AdminHandler struct {
	svc service.AdminService
}

func NewAdminHandler(svc service.AdminService) *AdminHandler {
	return &AdminHandler{svc: svc}
}

// Worship Schedules
func (h *AdminHandler) GetAllWorshipSchedules(c *gin.Context) {
	schedules, err := h.svc.GetAllWorshipSchedules()
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
	if err := h.svc.CreateWorshipSchedule(&s); err != nil {
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
	if err := h.svc.UpdateWorshipSchedule(id, &s); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": s})
}

func (h *AdminHandler) DeleteWorshipSchedule(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	if err := h.svc.DeleteWorshipSchedule(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Deleted successfully"})
}

// Daily Verses
func (h *AdminHandler) GetAllDailyVerses(c *gin.Context) {
	verses, err := h.svc.GetAllDailyVerses()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": verses})
}

func (h *AdminHandler) CreateDailyVerse(c *gin.Context) {
	var input struct {
		Reference string `json:"reference" binding:"required"`
		Content   string `json:"content" binding:"required"`
		Date      string `json:"date" binding:"required"`
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
		Reference: input.Reference,
		Content:   input.Content,
		Date:      date,
	}

	if err := h.svc.CreateDailyVerse(&v); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": v})
}

func (h *AdminHandler) UpdateDailyVerse(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	var input struct {
		Reference string `json:"reference" binding:"required"`
		Content   string `json:"content" binding:"required"`
		Date      string `json:"date" binding:"required"`
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
		Reference: input.Reference,
		Content:   input.Content,
		Date:      date,
	}

	if err := h.svc.UpdateDailyVerse(id, &v); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": v})
}

func (h *AdminHandler) DeleteDailyVerse(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	if err := h.svc.DeleteDailyVerse(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Deleted successfully"})
}

// Announcements
func (h *AdminHandler) GetAllAnnouncements(c *gin.Context) {
	announcements, err := h.svc.GetAllAnnouncements()
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
		files := form.File["attachments"]
		for _, file := range files {
			attachments = append(attachments, entity.AnnouncementAttachment{
				FileName: file.Filename,
				FileURL:  "/uploads/announcements/" + file.Filename,
			})
		}
	}

	a := entity.Announcement{
		Title:          title,
		Content:        content,
		TargetAudience: targetAudience,
		Attachments:    attachments,
	}

	if err := h.svc.CreateAnnouncement(&a); err != nil {
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
		files := form.File["attachments"]
		for _, file := range files {
			attachments = append(attachments, entity.AnnouncementAttachment{
				FileName: file.Filename,
				FileURL:  "/uploads/announcements/" + file.Filename,
			})
		}
	}

	a := entity.Announcement{
		Title:          title,
		Content:        content,
		TargetAudience: targetAudience,
		Attachments:    attachments,
	}

	if err := h.svc.UpdateAnnouncement(id, &a); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": a})
}

func (h *AdminHandler) DeleteAnnouncement(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	if err := h.svc.DeleteAnnouncement(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Deleted successfully"})
}

// Wartas
func (h *AdminHandler) GetAllWartas(c *gin.Context) {
	wartas, err := h.svc.GetAllWartas()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": wartas})
}

func (h *AdminHandler) CreateWarta(c *gin.Context) {
	title := c.PostForm("title")
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "File is required"})
		return
	}

	// In a real app, you would upload to S3 or a local storage
	// For this demo, we'll just mock the URL
	fileURL := "/uploads/" + file.Filename
	
	w := entity.Warta{
		Title:   title,
		FileURL: fileURL,
	}

	if err := h.svc.CreateWarta(&w); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": w})
}

func (h *AdminHandler) DeleteWarta(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	if err := h.svc.DeleteWarta(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Deleted successfully"})
}

// Ministry Activities
func (h *AdminHandler) GetAllMinistryActivities(c *gin.Context) {
	activities, err := h.svc.GetAllMinistryActivities()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": activities})
}

func (h *AdminHandler) CreateMinistryActivity(c *gin.Context) {
	name := c.PostForm("name")
	shortCaption := c.PostForm("short_caption")
	file, err := c.FormFile("image")
	
	imageURL := ""
	if err == nil && file != nil {
		// Mock URL
		imageURL = "/uploads/activities/" + file.Filename
	}

	a := entity.MinistryActivity{
		Name:         name,
		ShortCaption: shortCaption,
		ImageURL:     imageURL,
	}

	if err := h.svc.CreateMinistryActivity(&a); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": a})
}

func (h *AdminHandler) UpdateMinistryActivity(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	name := c.PostForm("name")
	shortCaption := c.PostForm("short_caption")
	file, err := c.FormFile("image")
	
	a := entity.MinistryActivity{
		ID:           id,
		Name:         name,
		ShortCaption: shortCaption,
	}

	if err == nil && file != nil {
		a.ImageURL = "/uploads/activities/" + file.Filename
	} else {
		// Keep existing URL if no new image uploaded
		existingImage := c.PostForm("existing_image_url")
		a.ImageURL = existingImage
	}

	if err := h.svc.UpdateMinistryActivity(id, &a); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": a})
}

func (h *AdminHandler) DeleteMinistryActivity(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	if err := h.svc.DeleteMinistryActivity(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Deleted successfully"})
}
