package handler

import (
	"io"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/yayanberutu/churchwebsite/backend/internal/service"
)

type PublicContentHandler struct {
	service service.PublicContentService
}

func NewPublicContentHandler(s service.PublicContentService) *PublicContentHandler {
	return &PublicContentHandler{service: s}
}

func (h *PublicContentHandler) GetLatestWarta(c *gin.Context) {
	warta, err := h.service.GetLatestWarta(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch latest warta",
			"data":    nil,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Latest warta fetched successfully",
		"data":    warta,
	})
}

func (h *PublicContentHandler) GetLatestAnnouncements(c *gin.Context) {
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "3"))
	announcements, err := h.service.GetLatestAnnouncements(c.Request.Context(), limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch latest announcements",
			"data":    nil,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Latest announcements fetched successfully",
		"data":    announcements,
	})
}

func (h *PublicContentHandler) GetLatestMinistryActivities(c *gin.Context) {
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "3"))
	activities, err := h.service.GetLatestMinistryActivities(c.Request.Context(), limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch latest ministry activities",
			"data":    nil,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Latest ministry activities fetched successfully",
		"data":    activities,
	})
}

func (h *PublicContentHandler) GetAnnouncements(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("page_size", "10"))
	announcements, err := h.service.GetAnnouncements(c.Request.Context(), page, pageSize)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Failed to fetch announcements", "data": nil})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Announcements fetched successfully", "data": announcements})
}

func (h *PublicContentHandler) GetAnnouncementDetail(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	announcement, err := h.service.GetAnnouncementByID(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Failed to fetch announcement", "data": nil})
		return
	}
	if announcement == nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false, "message": "Data tidak ditemukan atau sudah tidak tersedia.", "data": nil})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Announcement fetched successfully", "data": announcement})
}

func (h *PublicContentHandler) GetMinistryActivities(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("page_size", "6"))
	activities, err := h.service.GetMinistryActivities(c.Request.Context(), page, pageSize)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Failed to fetch ministry activities", "data": nil})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Ministry activities fetched successfully", "data": activities})
}

func (h *PublicContentHandler) GetMinistryActivityDetail(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	activity, err := h.service.GetMinistryActivityByID(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Failed to fetch ministry activity", "data": nil})
		return
	}
	if activity == nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false, "message": "Data tidak ditemukan atau sudah tidak tersedia.", "data": nil})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Ministry activity fetched successfully", "data": activity})
}

func (h *PublicContentHandler) GetCalendarActivitiesByDate(c *gin.Context) {
	date := c.Query("date")
	if date == "" {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "date is required", "data": nil})
		return
	}
	activities, err := h.service.GetCalendarActivitiesByDate(c.Request.Context(), date)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid date format, use YYYY-MM-DD", "data": nil})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Calendar activities fetched successfully", "data": activities})
}

func (h *PublicContentHandler) GetCalendarActivityDates(c *gin.Context) {
	month := c.Query("month")
	if month == "" {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "month is required", "data": nil})
		return
	}
	dates, err := h.service.GetCalendarActivityDates(c.Request.Context(), month)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid month format, use YYYY-MM", "data": nil})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Calendar dates fetched successfully", "data": dates})
}

func (h *PublicContentHandler) GetWorshipSchedules(c *gin.Context) {
	schedules, err := h.service.GetWorshipSchedules(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch worship schedules",
			"data":    nil,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Worship schedules fetched successfully",
		"data":    schedules,
	})
}

func (h *PublicContentHandler) GetDailyVerse(c *gin.Context) {
	date := c.Query("date")
	verse, err := h.service.GetDailyVerse(c.Request.Context(), date)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch daily verse",
			"data":    nil,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Daily verse fetched successfully",
		"data":    verse,
	})
}

func (h *PublicContentHandler) GetUpcomingActivities(c *gin.Context) {
	activities, err := h.service.GetUpcomingActivities(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch upcoming activities",
			"data":    nil,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Upcoming activities fetched successfully",
		"data":    activities,
	})
}

func (h *PublicContentHandler) ProxyAsset(c *gin.Context) {
	// key is the path after /assets/
	key := c.Param("path")
	if key == "" {
		c.Status(http.StatusNotFound)
		return
	}
	// Trim leading slash if any
	if key[0] == '/' {
		key = key[1:]
	}

	body, contentType, err := h.service.ProxyAsset(c.Request.Context(), key)
	if err != nil {
		c.Status(http.StatusNotFound)
		return
	}
	defer body.Close()

	c.Header("Content-Type", contentType)
	c.Header("Cache-Control", "public, max-age=31536000") // Cache for 1 year
	io.Copy(c.Writer, body)
}
