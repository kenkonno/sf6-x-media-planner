package users

import (
	"github.com/gin-gonic/gin"
	"github.com/kenkonno/sf6-x-media-planner/backend/api/openapi_models"
	"github.com/kenkonno/sf6-x-media-planner/backend/models/db"
	"github.com/kenkonno/sf6-x-media-planner/backend/repository"
	"time"
)

func PostUsersInvoke(c *gin.Context) (openapi_models.PostUsersResponse, error) {

	userRep := repository.NewUserRepository()

	var userReq openapi_models.PostUsersRequest
	if err := c.ShouldBindJSON(&userReq); err != nil {
		return openapi_models.PostUsersResponse{}, err
	}
	userRep.Upsert(db.User{
		Nickname:  userReq.User.Nickname,
		Email:     userReq.User.Email,
		Password:  userReq.User.Password,
		Status:    userReq.User.Status,
		CreatedAt: time.Time{},
		UpdatedAt: 0,
	})

	return openapi_models.PostUsersResponse{}, nil

}
