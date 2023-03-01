# Lost and Found
## Application for fast search of needful things

## Technologies

## Server API
### /user
* `POST` register
* `GET /` get current user
* `GET /:id` get current user by ID
### /auth
* `POST` authentication
* `GET` get current authentication status
* `DELETE` finish sesstion
### /file
* `POST` upload file
### /photo
* `POST` create photo record
* `PUT /:id` update photo record
* `GET /:id` get photo by ID
* `GET /?query=abc` search photos by a query string

## Development
### Installation

```shell
npm i
```

### Run both server and client

```shell
npm start
```
