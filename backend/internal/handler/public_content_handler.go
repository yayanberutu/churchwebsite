package handler

import (
	"net/http"
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
	announcements, err := h.service.GetLatestAnnouncements(c.Request.Context())
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
	activities, err := h.service.GetLatestMinistryActivities(c.Request.Context())
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


