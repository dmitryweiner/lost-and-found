# Lost and Found
> Application for fast search of needful things

## Technologies
* Server:
  * Node.js
  * Express.js
  * SQLite
  * Sequelize
* Client:
  * React.js
  * MaterialUI

## Use cases
### Registration
### Login
### Upload photo
### Search photo

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

### /tag
* `POST` create photo record
* `PUT /:id` update photo record
* `GET /:id` get photo by ID
* `GET /?query=abc` search photos by a query string

## Database

### User
* ID
* username
* password
* created_at

### Token
* ID
* token
* user_id
* created_at

### Photo
* ID
* user_id
* name
* created_at

### Tag
* ID
* user_id
* name
* created_at

### Photo to Tag
* photo_id
* tag_id

## Development
### Installation

```shell
npm i
```

### Run both server and client

```shell
npm start
```

## Todo
* Upload photo form + server route.
* Main page: 
  * get first 10 photos
  * list of tags
  * search by tag
* React query for API call status.
* [Centralized error handling with popup](https://tkdodo.eu/blog/react-query-error-handling). 
* Check auth status on startup.
  * Redirect to /login if not authorized.
