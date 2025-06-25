package users

import (
	"github.com/gin-gonic/gin"
	"github.com/kenkonno/sf6-x-media-planner/backend/api/openapi_models"
	"github.com/kenkonno/sf6-x-media-planner/backend/repository"
)

func GetUsersIdInvoke(c *gin.Context) (openapi_models.GetUsersIdResponse, error) {
	userRep := repository.NewUserRepository()

	var req openapi_models.GetUsersIdRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		return openapi_models.GetUsersIdResponse{}, err
	}

	user := userRep.Find(int32(req.Id))

	return openapi_models.GetUsersIdResponse{
		User: openapi_models.User{
			Id:        user.Id,
			Nickname:  user.Nickname,
			Email:     user.Email,
			Password:  user.Password,
			Status:    user.Status,
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
		},
	}, nil
}
