package user_info

import (
	"github.com/gin-gonic/gin"
	"github.com/kenkonno/sf6-x-media-planner/backend/api/middleware"
	"github.com/kenkonno/sf6-x-media-planner/backend/api/openapi_models"
	"github.com/kenkonno/sf6-x-media-planner/backend/repository"
)

// Tokenからユーザー情報を返却する
func GetUserInfoInvoke(c *gin.Context) (openapi_models.GetUserInfoResponse, error) {
	userId := middleware.GetUserId(c)
	// セッション切れの場合は空で戻す
	if userId == nil {
		return openapi_models.GetUserInfoResponse{}, nil
	}

	userRep := repository.NewUserRepository()
	var userInfoResponse openapi_models.GetUserInfoResponse
	user := userRep.Find(*userId)
	userInfoResponse = openapi_models.GetUserInfoResponse{
		User: openapi_models.User{
			Id:        user.Id,
			Nickname:  user.Nickname,
			Email:     user.Email,
			Password:  user.Password,
			Status:    user.Status,
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
		},
	}
	return userInfoResponse, nil
}
