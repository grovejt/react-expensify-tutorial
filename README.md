# Description

Re-worked version of the expensify app from Udemy course: "The Complete React Developer Course (w/ Hooks and Redux)".

- Original Course: https://www.udemy.com/course/react-2nd-edition/
- Original Course Source Code: https://github.com/andrewjmead/react-course-2-indecision-app
- Updated Source Code (this project): https://github.com/grovejt/react-expensify-tutorial

- Web Dev Guidelines and Cheat Sheets: https://github.com/andrewjmead/web-dev-cheatsheets

## Setup Notes:

Note: the following variables need to be set in a file named .env.development using your firebase main project setting
and also in a file named .env.test using your test project settings:

- REACT_APP_FIREBASE_API_KEY=
- REACT_APP_FIREBASE_AUTH_DOMAIN=
- REACT_APP_FIREBASE_DATABASE_URL=
- REACT_APP_FIREBASE_PROJECT_ID=
- REACT_APP_FIREBASE_STORAGE_BUCKET=
- REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
- REACT_APP_FIREBASE_APP_ID=
- REACT_APP_FIREBASE_MEASUREMENT_ID=

## Changes/Differences:

- Built using create-react-app instead of custom webpack build.
  - This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Uses hooks for state and only functional components
- Uses firestore instead of firebase for persistence, collections by username and documents to store expenses.
- Uses newer version of redux-mock-store: getActions instead of done
- Uses build in env variable handling from create-react-app
- Uses reacet-app-polyfill instead of babel polyfill for supporting older browsers.

![Context Diagram](docs/ContextDiagram.png)

## Misc Notes

- React Router: https://reacttraining.com/react-router/
- For cross browser testing I used free tier of LambdaTest
  - lambdatest.com
- Babel
  - https://babeljs.io/repl

## ToDo

- configure to run heroku deployment under a sub-domain of jackgrove.com
- add JSDoc's
- add configuration to use an embedded database vs the firestore database
- add CI/CD pipeline (perhaps move from heroku to firebase?)
- perhaps redo with react-native.
- add test coverage
- enable test cases that test state (enzyme doesn't support hooks very well, perhaps switch these to test-react-app?)
  - see https://kentcdodds.com/blog/why-i-never-use-shallow-rendering
  - https://blog.sapegin.me/all/react-testing-1-best-practices/
  - https://blog.sapegin.me/all/react-testing-2-jest-and-enzyme/
  - https://blog.sapegin.me/all/react-testing-3-jest-and-react-testing-library/
- Add confirmation modal when removing expense.
- Show number of hidden expenses in /dashboard summary.
- Add support for another social login system (GitHub, Facebook, Twitter, ...)
- ...

## References

- Reference working app: https://budget-app.mead.io/
- Reference code: https://github.com/andrewjmead/react-course-2-expensify-app

# Pre-reqs:

- Node (I used 12.14.1)
- Yarn (I used 1.21.1) - https://yarnpkg.com/

# Quick Start:

- after cloning run: > yarn install <br/>
- run dev build on local server: > yarn dev <br/>

# To run production build:

- Express

  - \> yarn build
  - \> yarn prod
  - link: http://localhost:3012/

- Serve
  - \> npm install -g server (run once only)
  - \> yarn build
  - \> yarn start-serve
  - link: http://localhost:3011

# Misc Notes:

- Airbnb style guide: https://github.com/airbnb/javascript
- diagrams done with https://www.draw.io/ and stored in /docs folder.

# Dependency Notes:

- Express

  - \> yarn add express <br/>

- History - The history library lets you easily manage session history anywhere JavaScript runs.

  - \> yarn add history
  - https://www.npmjs.com/package/history

- Redux

  - \> yarn add redux
  - \> yarn add react-redux

- Redux Imutable State
  - \> yarn add redux-immutable-state-invariant
- Thunk

  - https://github.com/reduxjs/redux-thunk

- Moment - Parse, validate, manipulate, and display dates and times in JavaScript.

  - https://momentjs.com/

- Number - format numbers

  - http://numeraljs.com/
  - \> yarn add numeral

- react-app-polyfill

  - \> yarn add react-app-polyfill
  - add these imports to index.js:
    - import 'react-app-polyfill/ie9';
    - import 'react-app-polyfill/ie11';
    - import 'react-app-polyfill/stable';

- UUID - generate unique identifiers (no longer used since switching over to firestore database)

  - \> yarn add uuid

* Firebase (for the google firestore database)

  - \> yarn add firebase <br/>
  - https://firebase.google.com/ <br/>
  - https://firebase.google.com/docs/firestore/quickstart?authuser=0 <br/>

* Chalk - Terminal string styling done right

  - \> yarn add chalk --dev
    - https://www.npmjs.com/package/chalk

* Heroku

  - https://devcenter.heroku.com/
  - \> brew tap heroku/brew && brew install heroku
  - \> heroku login
  - \> heroku create grovejt-expensify
  - \> git push heroku master
  - \> heroku open (or the url from the push output above - https://grovejt-expensify.herokuapp.com)
  - \> heroku logs
  - heroku config
  - heroku config:set KEY1=value1 KEY2=value2 ...

# Testing Notes:

- VS Code

  - VS Code Setup: https://www.basefactor.com/using-visual-studio-code-to-debug-jest-based-unit-tests

- Jest: (testing)

  - https://jestjs.io/
  - Bundled with create-react-app
  - Snapshot libraries for test component rendering

- Jest Dom:
  - allows you to do things like:
    - expect(element).toHaveTextContent(/react/i)
  - learn more: https://github.com/testing-library/jest-dom
  - import "@testing-library/jest-dom/extend-expect";

* Enzyme: (for testing components)

  - by airbnb https://airbnb.io/enzyme/
  - \> yarn add enzyme enzyme-adapter-react-16 react-test-renderer enzyme-to-json --dev

- Redux Mock Store
  - A mock store for testing Redux async action creators and middleware. The mock store will create an array of dispatched actions which serve as an action log for tests.
  - https://github.com/dmitry-zaets/redux-mock-store
  - > yarn add redux-mock-store --dev

---

# Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.<br /> Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br /> See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn start`

Runs the app in the production mode using an express node server.<br /> Open [http://localhost:3012](http://localhost:3012) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors in the console.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# Data Model

- Collection named 'users'
  - which contains a document for each user named with their uid
    - which contains a sub-collection named 'expenses
      - which contains an expense document for each expense with a firestore generated doc id.
        - within the expense document is the expense object.

### Expense Object:

```
// Definition:
 {
  description: String, default ''
  note: String, default ''
  amount: integer (in cents), default 0
  createdAt: moment integer, default 0
}

// Example:
 {
  description: 'Gum',
  note: '',
  amount: 195,
  createdAt: moment(0).subtract(4, 'days').valueOf()
}
```
