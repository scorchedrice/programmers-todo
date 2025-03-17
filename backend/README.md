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

### 📝 works - 해야할 일을 관리하는 API

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

### 🧑‍🤝‍🧑 users - 회원가입을 담당하는 로직

- 직접적으로 요청하지 않습니다. 모든 요청은 auth를 통해 진행됩니다.
- 실제 회원이 등록되는 과정 등이 구현되어 있습니다.
  - 추후 auth를 무시하고 회원 등록하는 과정을 방지하는 과정 구현이 필요합니다.

### 🔒 auth - 권한을 확인하는 API

관련 로직을 모두 완성하지 못했습니다. 토큰을 반환하는 것 까진 구현했으나, 로그인한 유저만 work를 등록할 수 있도록 하는 등의 기능은 아직 구현하지 못했습니다. (25.03.17 기준)

- rawToken : `{email}:{password}`를 base64 변환한 값 

1. accessToken, refreshToken 요청
- `POST` : `/auth/token/access` or `/auth/token/refresh`
- `@Headers` : `authorization rawToken`;

2. 로그인
- `POST` : `/auth/login/email`
  - `@Headers` : `authorization rawToken`
  - `@Body` : email : string, password : string

3. 회원가입
- `Post` : `/auth/register/email`
  - `@Body` : email : string, password :string