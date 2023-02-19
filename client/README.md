# client

This is a chat app to interact with a bot.<br>
Use Vue 3 as the main javascript framework.<br>


## Technologies

- [Vite](https://vitejs.dev/)
- [VueJS 3.0](https://vuejs.org/)
- [Axios](https://axios-http.com/)
- [Cypress](https://www.cypress.io/)
- [ESLint](https://eslint.org/)


## Installation or Project Setup

You should be installed Node.js

Just download all these files in one folder and run `npm install` in your console at the address of this folder.<br>


# Usage

### Dev server

This is great if you dont have a server to host the built files on, after doing the installation instructions run `npm run dev` in your console window and it will open a local dev server on port 5173 which you can access from `http://localhost:5173`

```sh
npm run dev
```

### Building or compile the project for production

This is only useable / possible if you have an actual server to run these built files on. Run `npm run build` in your console window and it will build the files into the `dist` folder. You can then upload these files to your server and it should work.

```sh
npm run build
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

Simply try the test, run `npm run test:e2e:dev`, this command line is for show all that you need to see in the test.
This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

this is a pretty cool tool to code formatter.
ESLint is an open source that helps you find and fix problems with your javascript code.

```sh
npm run lint
```
