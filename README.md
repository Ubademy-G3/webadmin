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
        │   ├── Chart.jsx
        │   ├── Dashboard.jsx
        │   ├── Deposits.jsx
        │   ├── Orders.jsx
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

#Local Environment

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


### Deployment

### `yarn build` fails to minify

You can try it out at <https://ubademy-webadmin-app.herokuapp.com/login>
