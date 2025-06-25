package users

import (
	"github.com/gin-gonic/gin"
	"github.com/kenkonno/sf6-x-media-planner/backend/api/openapi_models"
	"github.com/kenkonno/sf6-x-media-planner/backend/repository"
	"strconv"
)

func DeleteUsersIdInvoke(c *gin.Context) (openapi_models.DeleteUsersIdResponse, error) {

	userRep := repository.NewUserRepository()

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return openapi_models.DeleteUsersIdResponse{}, err
	}

	userRep.Delete(int32(id))

	return openapi_models.DeleteUsersIdResponse{}, nil

}
