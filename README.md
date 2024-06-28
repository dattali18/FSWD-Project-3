# FSWD-Project-3

This repository contains the code for the third project in the Full Stack Web Development course. The project aims to simulate a backend in `JavaScript` and a front end as a Single Page Application (SPA).

## Project Description

The goal of this project is to build a web application that showcases the skills and knowledge acquired throughout the course. The application will consist of a backend server implemented in `JavaScript` and a frontend client built as a SPA.

## Author

[Daniel Attali](https://github.com/dattali18)

## Separation of concern

we have separated the project into two part
- client
- server

### Server

**components**

- `src/databases/`
    - `contact.js` - create a table in a database using `localStorage` for the contacts
    - `currentUser.js` - create a table in a database using `localStorage` for the logged in user
    - `contacts.js` - create a table in a database using `localStorage` for the contacts
    - `database.js` - will represent a database with all of the tables above

- `src/routes/`
    - `contactsRouts.js` - this will have all the routes for the contact in the `RestAPI`, for example `GET /api/contacts`
    - `usersRouts.js` - this will have all the routes for the users in the `RestAPI`, for example `GET /api/currentUser`

### Client

**components**

- `src/pages/`
    - `home.js` - this will handle the logic for the home page
    - `login.js` - this will handle the logic for the form and login of the user in our app
    - `signup.js` - this will handle the logic for the form and registration of the user in our app
    - `contactForm.js` - this will handle the logic for the form and adding contacts in our app

- `src/utils/`
    - `fajax.js` - in this file we define a class that will simulate `Aajax` request (Fajax - Fake Aajax)


## Project Structure

The project follows a specific structure to ensure organization and maintainability. Here's an overview of the project structure:

```bash
.
├── README.md
├── client
│   ├── public
│   │   ├── assets
│   │   │   ├── images
│   │   │   │   └── user-icon.png
│   │   │   └── styles
│   │   │       ├── contacts.css
│   │   │       ├── footer.css
│   │   │       ├── forms.css
│   │   │       ├── header.css
│   │   │       └── main.css
│   │   └── index.html
│   └── src
│       ├── index.js
│       ├── pages
│       │   ├── contactForm.js
│       │   ├── home.js
│       │   ├── login.js
│       │   └── signup.js
│       └── utils
│           ├── fajax.js
│           └── navigation.js
├── favicon.png
└── server
    ├── server.js
    └── src
        ├── databases
        │   ├── contacts.js
        │   ├── currentUser.js
        │   ├── database.js
        │   └── users.js
        ├── routes
        │   ├── contactsRouts.js
        │   └── usersRouts.js
        └── utils

14 directories, 23 files
```
