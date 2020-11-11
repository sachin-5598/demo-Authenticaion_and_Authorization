# Auth from scratch

## Add JWT-based authentication and authorization to a Node/Express/Mongo app

### Authentication
* [x] Create Server
* [x] Setup basic express app
* [x] Add auth router
* [x] Create connection to DB
* [x] Create user with POST /auth/signup
  * [x] Validate required fields
  * [x] Check is user is unique
  * [x] Hashed password with bcrypt
  * [x] insert into DB
* [x] Create Client
* [x] Create landing page
  * [x] Link to both signup and login page
* [x] Create Sign Up Page
	* [x] Form with: username and password
	* [x] When form is submitted
		* [x] Validate username
			* [x] Display errors
		* [x] Validate password
			* [x] Display errors
		* [x] POST request to server
			* [x] Display errors
			* [x] If successful sign up
				* [x] Redirect to login page
* [x] Login user with POST /auth/login
	* [x] validate the user
	* [x] check if username in db
		* [x] compare password with hashed password in db
		* [x] Create and sign a JWT
      * [x] Respond with JWT
* [x] Create Login Page
	* [x] Form with: username and password
	* [x] When form is submitted
		* [x] Validate username
			* [x] Display errors
		* [x] Validate password
			* [x] Display errors
		* [x] POST request to server /auth/login
			* [x] Display errors
			* [x] If successful login
				* [x] Store the token in localStorage
				* [x] Redirect to the "dashboard"
* [x] If a logged in user visits the signup or login page, redirect them to the dashboard
* [x] If a non logged in user visits the dashboard, redirect to the login page
* [x] After sign up, immediately login
* [x] Show username on dashboard
* [ ] On homepage, show go to dashboard button instead of signup/login button
* [ ] If logged in:
	* [ ] Show logout button in header
	* [ ] Show user icon and username in header

### Development Setup

#### Server
```sh
cd server
cp .env.sample .env
npm install
npm run dev
```