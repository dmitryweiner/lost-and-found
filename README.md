# Lost and Found
> Application for fast search of needful things

### [Live web-application](https://lost-and-found-6l4m.onrender.com/) (hosted by [render.com](https://render.com/)) 

## Technologies
* Server:
  * [Node.js](https://nodejs.org/en)
  * [Express.js](https://expressjs.com/)
  * [PostgresSQL](https://www.postgresql.org/)
  * [Sequelize](https://sequelize.org/)
* Client:
  * [React.js](https://react.dev/)
  * [React Query](https://react-query-v3.tanstack.com/)
  * [Axios](https://axios-http.com/docs/intro)
  * [MaterialUI](https://mui.com/)

## Use cases

### Registration
* Anonymous user can enter username and password.
* User should repeat password.
* User can sing up.

### Login
* User can enter username and password.
* User should be able to sign in.

### Main page
* This page should be accessible only to logged user. 
If user not logged in, she should be redirected to login page.
* User can view all her tags.
  * Tags are selectable.
  * If clicked, photos should be filtered by the selected tag. 
* User can view all her photos.
  * Photos should show associated tags.
* User can go to upload page.

### Upload page
* This is protected page.
* User can select photo from local disk.
* User can add associated tags.
* User can upload photo.

### Photo page
* This is protected page.
* This page is accessible from clicking on the photo.
* User can view photo and associated tags.
* User can delete photo via dialog.

### Profile page
* This is protected page.
* This page is accessible from clicking on the username.
* User can view all tags and delete them.
* User can view amount of photos.
* User can change password.

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
* `POST` create photo
* `GET /:id` get photo by ID
* `GET /?query=abc` search photos by a query string
* `PUT /:id` update photo
* `DELETE /:id` delete photo

### /tag
* `GET /` get all tags of the user
* `DELETE /:id` delete tag

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
# don't forget to edit .env files and to add API URL and database credentials 
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
  * [x] Change favicon.
  * [x] [Use bcrypt for password hash](https://stackoverflow.com/questions/34120548/using-bcrypt-with-sequelize-model).
  * [x] Use JWT token 
    * https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
    * https://developer.okta.com/blog/2019/02/14/modern-token-authentication-in-node-with-express
    * https://dev.to/mihaiandrei97/jwt-authentication-using-axios-interceptors-55be
    * https://medium.com/@ryanchenkie_40935/react-authentication-how-to-store-jwt-in-a-cookie-346519310e81
  * [ ] Create nice color scheme https://bareynol.github.io/mui-theme-creator/
  * [ ] Change theme.
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
  * [x] Form validation.
  * [x] Show preview of photo on upload https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
* Home page.
  * [x] get all photos
  * [x] list of tags
  * [x] search by tag
  * [x] Spinner for tags, empty block if no.
  * [x] Spinner for images.
  * [x] Tile images for mobile.
  * [x] Show "deselect" button on tag.
  * [ ] Show "Upload your photos" as [alert](https://mui.com/material-ui/react-alert/) which is visible if there are no photos or user not closed it.
  * [ ] Select multiple tags.
  * [ ] Pagination or infinite loading.
  * Photo block:
    * [x] Show associated tags.
    * [x] Edit or "View details" page.
* View details page:
  * [x] Delete button (with dialog).
* Login/registration pages:
  * [x] View password.
  * [x] Add capital letters.
  * [x] Fix blinking on login.
* Profile page:
  * [ ] view all tags and delete them (dialog).
  * [ ] view amount of photos.
  * [ ] change password.

