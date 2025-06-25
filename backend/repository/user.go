package repository

import (
	"github.com/kenkonno/sf6-x-media-planner/backend/models/db"
	"github.com/kenkonno/sf6-x-media-planner/backend/repository/connection"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

// Auto generated start
func NewUserRepository() *UserRepository {

	return &UserRepository{connection.GetCon()}
}

type UserRepository struct {
	con *gorm.DB
}

func (r *UserRepository) FindAll() []db.User {
	var users []db.User

	result := r.con.Order("id ASC").Find(&users)
	if result.Error != nil {
		panic(result.Error)
	}
	return users
}

func (r *UserRepository) Find(id int32) db.User {
	var user db.User

	result := r.con.First(&user, id)
	if result.Error != nil {
		panic(result.Error)
	}
	return user
}

func (r *UserRepository) FindByAuth(email string, password string) db.User {
	var user db.User

	result := r.con.Where("email = ? AND password = ?", email, password).Find(&user)
	if result.Error != nil {
		panic(result.Error)
	}
	return user
}
func (r *UserRepository) FindByEmail(email string) db.User {
	var user db.User

	result := r.con.Where("email = ?", email).Find(&user)
	if result.Error != nil {
		panic(result.Error)
	}
	return user
}

func (r *UserRepository) Upsert(m db.User) {
	r.con.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "id"}},
		UpdateAll: true,
	}).Create(&m)
}

func (r *UserRepository) Delete(id int32) {
	r.con.Where("id = ?", id).Delete(db.User{})
}

// Auto generated end
