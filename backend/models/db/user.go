package db

import (
	"time"
)

type User struct {
	Id       *int32 `gorm:"primaryKey;autoIncrement"`
	Nickname string
	Email    string
	Password string
	Status   string // 夢を込めて有料会員ステータス

	CreatedAt time.Time
	UpdatedAt int64
}
