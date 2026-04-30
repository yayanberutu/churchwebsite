package handler

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/yayanberutu/churchwebsite/backend/internal/service"
)

type Sprint2Handler struct {
	service service.Sprint2Service
}

func NewSprint2Handler(s service.Sprint2Service) *Sprint2Handler {
	return &Sprint2Handler{service: s}
}

func (h *Sprint2Handler) GetLatestWarta(c *gin.Context) {
	warta, err := h.service.GetLatestWarta()
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

func (h *Sprint2Handler) GetLatestAnnouncements(c *gin.Context) {
	announcements, err := h.service.GetLatestAnnouncements()
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

func (h *Sprint2Handler) GetLatestMinistryActivities(c *gin.Context) {
	activities, err := h.service.GetLatestMinistryActivities()
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
