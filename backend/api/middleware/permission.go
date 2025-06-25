package middleware

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// 認証が不要なパスのリスト
var noAuthRequired = []string{
	"GET /api/userInfo",
	"POST /api/login",
	"POST /api/logout",
	"GET /api/featureOptions",
	"GET /api/featureOptions/:id",
}

// TODO: OpenApi定義から自動生成させる。
var rolesNeeded = map[string][]string{
	//"DELETE /api/departments/:id":         {constants.RoleAdmin, constants.RoleManager},
	//"DELETE /api/facilities/:id":          {constants.RoleAdmin, constants.RoleManager},
	//"DELETE /api/facilitySharedLinks/:id": {constants.RoleAdmin, constants.RoleManager},
	//"DELETE /api/featureOptions/:id": {}, // TODO: APIとして公開しちゃだめかも.管理画面作ったら特別なロールとして追加する
	//"DELETE /api/ganttGroups/:id":         {constants.RoleAdmin, constants.RoleManager},
	//"DELETE /api/holidays/:id":            {constants.RoleAdmin, constants.RoleManager},
	//"DELETE /api/milestones/:id":          {constants.RoleAdmin, constants.RoleManager},
	//"DELETE /api/operationSettings/:id":   {constants.RoleAdmin, constants.RoleManager},
	//"DELETE /api/processes/:id":           {constants.RoleAdmin, constants.RoleManager},
	//"DELETE /api/ticketUsers/:id":         {constants.RoleAdmin, constants.RoleManager},
	//"DELETE /api/tickets/:id":             {constants.RoleAdmin, constants.RoleManager},
	//"DELETE /api/units/:id":               {constants.RoleAdmin, constants.RoleManager},
	//"DELETE /api/users/:id":               {constants.RoleAdmin, constants.RoleManager},
	//"GET /api/all-tickets":                {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer},
	//"GET /api/defaultPileUps":             {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer},
	//"GET /api/departments":                {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"GET /api/departments/:id":            {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer},
	//"GET /api/facilities":                 {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"GET /api/facilities/:id":             {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"GET /api/facilitySharedLinks":        {constants.RoleAdmin, constants.RoleManager},
	//"GET /api/facilitySharedLinks/:id":    {constants.RoleAdmin, constants.RoleManager},
	////"GET /api/featureOptions":        {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	////"GET /api/featureOptions/:id":    {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"GET /api/ganttGroups":                {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"GET /api/ganttGroups/:id":            {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"GET /api/holidays":                   {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"GET /api/holidays/:id":               {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer},
	//"GET /api/milestones":                 {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"GET /api/milestones/:id":             {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"GET /api/operationSettings/:id":      {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"GET /api/pileUps":                    {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"GET /api/processes":                  {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"GET /api/processes/:id":              {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer},
	//"GET /api/scheduleAlerts":             {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer},
	//"GET /api/ticket-memo/:id":            {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer},
	//"GET /api/ticketUsers":                {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"GET /api/ticketUsers/:id":            {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"GET /api/tickets":                    {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"GET /api/tickets/:id":                {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer},
	//"GET /api/units":                      {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"GET /api/units/:id":                  {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer},
	////"GET /api/userInfo":                   {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"GET /api/users":                    {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"GET /api/users/:id":                {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker, constants.RoleViewer, constants.RoleGuest},
	//"POST /api/copyFacilitys":           {constants.RoleAdmin, constants.RoleManager},
	//"POST /api/departments":             {constants.RoleAdmin, constants.RoleManager},
	//"POST /api/departments/:id":         {constants.RoleAdmin, constants.RoleManager},
	//"POST /api/facilities":              {constants.RoleAdmin, constants.RoleManager},
	//"POST /api/facilities/:id":          {constants.RoleAdmin, constants.RoleManager},
	//"POST /api/facilitySharedLinks":     {constants.RoleAdmin, constants.RoleManager},
	//"POST /api/facilitySharedLinks/:id": {constants.RoleAdmin, constants.RoleManager},
	//"POST /api/featureOptions":     {}, // TODO: APIとして公開しちゃだめかも.管理画面作ったら特別なロールとして追加する
	//"POST /api/featureOptions/:id": {}, // TODO: APIとして公開しちゃだめかも.管理画面作ったら特別なロールとして追加する
	//"POST /api/ganttGroups":             {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker},
	//"POST /api/ganttGroups/:id":         {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker},
	//"POST /api/holidays":                {constants.RoleAdmin, constants.RoleManager},
	//"POST /api/holidays/:id":            {constants.RoleAdmin, constants.RoleManager},
	////"POST /api/login":                     {constants.RoleAdmin, constants.RoleManager},
	////"POST /api/logout":                     {constants.RoleAdmin, constants.RoleManager},
	//"POST /api/milestones":            {constants.RoleAdmin, constants.RoleManager},
	//"POST /api/milestones/:id":        {constants.RoleAdmin, constants.RoleManager},
	//"POST /api/operationSettings/:id": {constants.RoleAdmin, constants.RoleManager},
	//"POST /api/processes":             {constants.RoleAdmin, constants.RoleManager},
	//"POST /api/processes/:id":         {constants.RoleAdmin, constants.RoleManager},
	//"POST /api/ticket-memo/:id":       {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker},
	//"POST /api/ticketUsers":           {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker},
	//"POST /api/tickets":               {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker},
	//"POST /api/tickets/:id":           {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker},
	//"POST /api/units":                 {constants.RoleAdmin, constants.RoleManager},
	//"POST /api/units/:id":             {constants.RoleAdmin, constants.RoleManager},
	//"POST /api/users":                 {constants.RoleAdmin, constants.RoleManager},
	//"POST /api/users/:id":             {constants.RoleAdmin, constants.RoleManager, constants.RoleWorker},
	//"POST /api/users/upload":          {constants.RoleAdmin, constants.RoleManager},
	//"POST /api/units/duplicate":       {constants.RoleAdmin, constants.RoleManager},
}

func RoleBasedAccessControl() gin.HandlerFunc {
	return func(c *gin.Context) {

		path := c.FullPath()
		method := c.Request.Method

		fullPath := method + " " + path

		// 認証不要なパスかチェック
		for _, noAuthPath := range noAuthRequired {
			if noAuthPath == fullPath {
				c.Next()
				return
			}
		}

		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"status": "no permission to this resource"})
	}
}
