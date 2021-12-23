# Backoffice Web

Service dedicated to the administration of the app, AKA 'control panel'.
Different users with different profiles will access the back office through the same url, although the options that will be shown to each user will be different and will depend on their profile.

## Directory structure

```tree
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── index.jsx
    ├── logo.svg
    └── presentation
        ├── courses
        │   ├── CourseFilter.jsx
        │   ├── CourseProfile.jsx
        │   ├── Courses.jsx
        │   ├── CoursesTable.jsx
        │   ├── ModuleItem.jsx
        │   └── UserCard.jsx
        ├── dashboard
        │   ├── Dashboard.jsx
        │   └── Title.jsx
        ├── ForgotPassword.jsx
        ├── Layout.jsx
        ├── login
        │   ├── Login.css
        │   └── Login.jsx
        ├── NavBar.jsx
        ├── SearchBar.jsx
        ├── services
        │   ├── CreateServiceDialog.jsx
        │   ├── ServiceDialog.jsx
        │   ├── ServicesFilter.jsx
        │   ├── Services.jsx
        │   └── ServicesTable.jsx
        ├── TableFooter.jsx
        ├── TableFooter.module.css
        ├── transactions
        │   └── Transactions.jsx
        ├── users
        │   ├── CourseCard.jsx
        │   ├── CreateAdminDialog.jsx
        │   ├── UserProfile.jsx
        │   ├── Users.jsx
        │   └── UsersTable.jsx
        └── useTable.jsx
```

# Tech Stack

* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Local Environment

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

You can try it out at <https://ubademy-webadmin-app.herokuapp.com/login>
