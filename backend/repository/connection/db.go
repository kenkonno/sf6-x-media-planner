package connection

import (
	"fmt"
	"github.com/samber/lo"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
	"strings"
)

var con *gorm.DB

func GetCon() *gorm.DB {
	return con
}
func init() {
	con = openConnection()
}

func openConnection() *gorm.DB {
	fmt.Println("INITIALIZE DB CONNECTION")
	// connectionの取得
	host := os.Getenv("POSTGRES_HOST")
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	dbname := os.Getenv("POSTGRES_DB")
	port := os.Getenv("POSTGRES_PORT")
	fmt.Println(fmt.Sprintf("host=%s user=%s dbname=%s port=%s sslmode=prefer TimeZone=Asia/Tokyo", host, user, dbname, port))
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=prefer TimeZone=Asia/Tokyo", host, user, password, dbname, port)
	d, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	return d
}

func ReOpenConnection() {
	con = openConnection()
}

func GetConnection() *gorm.DB {
	return con
}

func BeginTransaction() {
	con.Begin()
}

func Commit() {
	con.Commit()
}

func CreateInParam(arrStr []string) string {
	return "(" + strings.Join(lo.Map(arrStr, func(item string, index int) string {
		return fmt.Sprintf("'%s'", item)
	}), ",") + ")"
}
func CreateInParamInt32(arrStr []int32) string {
	return "(" + strings.Join(lo.Map(arrStr, func(item int32, index int) string {
		return fmt.Sprintf("'%d'", item)
	}), ",") + ")"
}

type ConflictError struct {
	Type    string
	Message string
}

func (e ConflictError) Error() string {
	return e.Message
}
func NewConflictError() ConflictError {
	return ConflictError{
		"REPOSITORY_UPDATE_CONFLICT_ERROR",
		"ほかの操作によって更新されています。", // TODO: より適切なメッセージ
	}
}
