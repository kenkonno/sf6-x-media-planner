FROM golang:1.19

# コンテナ作業ディレクトリの変更
WORKDIR /go/src/github.com/kenkonno/sf6-x-media-planner/backend/migration/

COPY ./migration/ ./
COPY ./models/ ../models/
COPY ./repository/ ../repository/
RUN go mod download
CMD ["go","run","./main.go"]