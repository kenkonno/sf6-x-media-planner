package users

import (
	"github.com/gin-gonic/gin"
	"github.com/kenkonno/sf6-x-media-planner/backend/api/openapi_models"
	"github.com/kenkonno/sf6-x-media-planner/backend/models/db"
	"github.com/kenkonno/sf6-x-media-planner/backend/repository"
	"time"
)

func PostUsersIdInvoke(c *gin.Context) (openapi_models.PostUsersIdResponse, error) {

	userRep := repository.NewUserRepository()

	var userReq openapi_models.PostUsersRequest
	if err := c.ShouldBindJSON(&userReq); err != nil {
		return openapi_models.PostUsersIdResponse{}, err
	}

	userRep.Upsert(db.User{
		Id:        userReq.User.Id,
		Nickname:  userReq.User.Nickname,
		Email:     userReq.User.Email,
		Password:  userReq.User.Password,
		Status:    userReq.User.Status,
		CreatedAt: time.Time{},
		UpdatedAt: 0,
	})

	return openapi_models.PostUsersIdResponse{}, nil

}
