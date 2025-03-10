# 🚀 Todos BE - Nest.js

> - 설치과정
>
> - 추가설치
> 
> - API

## 📌 설치과정

### 1. nest
```shell
nest new backend
```
### 2. work module
```shell
nest g resource
```
이후 work 라는 이름의 모듈 생성

## 📌 추가설치

### 🐘 Entity & DB 세팅
- `typeORM`
- `@nestjs/typeorm`
- `postgres`

#### `docker-compose.yaml`
- docker을 할용한 DB 세팅 진행 (`docker-compose.yaml`)

## 📌 API

1. Create work
- `POST` : `/works`
- `BODY` - workName : string, workDescription : string 필요

2. Get all works
- `GET` : `/works`

3. Update work status (상태 변경)
- `PATCH` : `/works/:id`
- `BODY` - newStatus: "SCHEDULED"|"IN_PROGRESS"|"COMPLETED" 필요

4. Update work (이름, 내용 변경)\
- `PUT` : `/works/:id`
- `BODY` - newWorkName : string, newWorkDescription : string 필요

5. Delete work
- `DELETE` : `/works/:id`
