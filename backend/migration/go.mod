module github.com/kenkonno/sf6-x-media-planner/backend/migration

go 1.19

require (
	github.com/kenkonno/sf6-x-media-planner/backend/models v0.0.1
	github.com/kenkonno/sf6-x-media-planner/backend/repository v0.0.1
	golang.org/x/crypto v0.0.0-20220722155217-630584e8d5aa
)

require (
	github.com/jackc/chunkreader/v2 v2.0.1 // indirect
	github.com/jackc/pgconn v1.13.0 // indirect
	github.com/jackc/pgio v1.0.0 // indirect
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgproto3/v2 v2.3.1 // indirect
	github.com/jackc/pgservicefile v0.0.0-20200714003250-2b9c44734f2b // indirect
	github.com/jackc/pgtype v1.12.0 // indirect
	github.com/jackc/pgx/v4 v4.17.2 // indirect
	github.com/jinzhu/inflection v1.0.0 // indirect
	github.com/jinzhu/now v1.1.5 // indirect
	github.com/lib/pq v1.10.9 // indirect
	github.com/samber/lo v1.37.0 // indirect
	golang.org/x/exp v0.0.0-20220303212507-bbda1eaf7a17 // indirect
	golang.org/x/text v0.3.7 // indirect
	gorm.io/driver/postgres v1.4.5 // indirect
	gorm.io/gorm v1.24.2 // indirect
)

replace github.com/kenkonno/sf6-x-media-planner/backend/models v0.0.1 => ../models

replace github.com/kenkonno/sf6-x-media-planner/backend/repository v0.0.1 => ../repository
