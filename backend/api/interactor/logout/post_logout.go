package logout

import (
	"github.com/gin-gonic/gin"
	"github.com/kenkonno/sf6-x-media-planner/backend/api/middleware"
	"github.com/kenkonno/sf6-x-media-planner/backend/api/openapi_models"
)

func PostLogoutInvoke(c *gin.Context) (openapi_models.PostLogoutResponse, error) {

	// セッションとクッキーをクリアする
	sessionId, _ := c.Cookie("session_id")
	if sessionId == "" {
		return openapi_models.PostLogoutResponse{}, nil
	}
	middleware.ClearSession(sessionId)
	return openapi_models.PostLogoutResponse{}, nil

}
