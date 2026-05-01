package handler

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/yayanberutu/churchwebsite/backend/internal/service"
)

type SiteConfigHandler struct {
	service service.SiteConfigService
}

func NewSiteConfigHandler(s service.SiteConfigService) *SiteConfigHandler {
	return &SiteConfigHandler{service: s}
}

func (h *SiteConfigHandler) GetSiteConfig(c *gin.Context) {
	config, err := h.service.GetSiteConfig(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch site config",
			"data":    nil,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Site config fetched successfully",
		"data":    config,
	})
}
