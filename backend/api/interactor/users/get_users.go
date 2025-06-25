package users

import (
	"github.com/gin-gonic/gin"
	"github.com/kenkonno/sf6-x-media-planner/backend/api/openapi_models"
	"github.com/kenkonno/sf6-x-media-planner/backend/models/db"
	"github.com/kenkonno/sf6-x-media-planner/backend/repository"
	"github.com/samber/lo"
)

func GetUsersInvoke(c *gin.Context) openapi_models.GetUsersResponse {
	userRep := repository.NewUserRepository()

	userList := userRep.FindAll()

	return openapi_models.GetUsersResponse{
		List: lo.Map(userList, func(item db.User, index int) openapi_models.User {
			return openapi_models.User{
				Id:        item.Id,
				Nickname:  item.Nickname,
				Email:     item.Email,
				Password:  item.Password,
				Status:    item.Status,
				CreatedAt: item.CreatedAt,
				UpdatedAt: item.UpdatedAt,
			}
		}),
	}
}
