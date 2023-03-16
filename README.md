# Lost and Found
> Application for fast search of needful things

## Technologies
* Server:
  * Node.js
  * Express.js
  * SQLite
  * Sequelize
* Client:
  * Axios 
  * React Query
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
npm install
```

### Run both server and client

```shell
npm start
```

## Todo
* Architecture:
  * [x] Redirect to /login if not authorized.
  * [x] Material UI fancy design.
  * [x] Move to PostgresSQL.
  * [ ] [Use bcrypt for password hash](https://stackoverflow.com/questions/34120548/using-bcrypt-with-sequelize-model).
  * [ ] Use ReduxToolkit + RTKQuery.
  * Networking:
    * [x] Axios (get rid of credentials: include).
    * [x] [Centralized error handling with popup](https://tkdodo.eu/blog/react-query-error-handling).
    * [x] React query for API call status.
* Tooling:
  * [x] Deploy to render.com.
  * [ ] ESLint + Prettier.
  * [ ] Test API with Supertest.
* Upload:
  * [x] Upload photo form + server route.
  * [x] Spinner.
  * [x] Resize images on server side.
  * [x] Enter tags with whitespace.
  * [x] Filter already existing tags.
  * [x] Forbid selecting multiple images (mobile).
  * [ ] Form validation.
  * [ ] Show preview of file.
  * [ ] Clip sign should be clickable.
  * [ ] Make photo and upload https://mabelanger.github.io/react-html5-camera-photo/
* Home page.
  * [x] get all photos
  * [x] list of tags
  * [x] search by tag
  * [x] Spinner for tags, empty block if no.
  * [x] Spinner for images.
  * [x] Tile images for mobile.
  * [x] Show "deselect" button on tag.
  * [ ] Select multiple tags.
  * [ ] Pagination or infinite loading.
  * Photo block:
   * [ ] Show associated tags.
   * [ ] Buttons should fit mobile screens (use icons?).
   * [ ] Edit or "View details" page.
   * [ ] Delete button (with dialog).
* Login/registration pages:
  * [x] View password.
  * [x] Add capital letters.
  * [x] Fix blinking on login.

