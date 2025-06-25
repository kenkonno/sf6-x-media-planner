docker-compose down

docker volume rm dbdata_sf6-x-media-planner

docker volume create dbdata_sf6-x-media-planner

docker-compose build combo-planner_postgres
