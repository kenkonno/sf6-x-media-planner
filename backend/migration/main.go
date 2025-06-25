package main

import (
	"fmt"
	"github.com/kenkonno/sf6-x-media-planner/backend/models/db"
	"github.com/kenkonno/sf6-x-media-planner/backend/repository"
	"github.com/kenkonno/sf6-x-media-planner/backend/repository/connection"
	"golang.org/x/crypto/bcrypt"
	"time"
)

var con = connection.GetConnection()

func main() {
	migrate(db.User{})

	createDefaultUser()
}

func createDefaultUser() {
	userRep := repository.NewUserRepository()
	adminUser := userRep.FindByEmail("admin")
	if adminUser.Id == nil {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte("defaultpassword"), bcrypt.DefaultCost)
		if err != nil {
			panic(err)
		}

		userRep.Upsert(db.User{
			Nickname: "システム管理者",
			Password:            string(hashedPassword),
			Email:               "admin",
			Status:   "active",
			CreatedAt:           time.Time{},
			UpdatedAt:           0,
		})
	}
}

func migrate[T any](model T) {
	fmt.Println("############# Migrate Start")
	err := con.AutoMigrate(model)
	if err != nil {
		panic(err)
	}
}
