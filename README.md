# Expense Tracker (MERN)

## Project Setup

- Create a backend for [Expense tracker app](https://github.com/itkhanz/expense-tracker-react) with Node and Express.js, and MongoDB as a database to store the transactions.
- Clone the react app and move all the dolers/files into a `client` folder.
- All the server code controllers and routes etc will be in the root directory.
- start a project with `npm init`.
- Install the dependencies with `npm i express dotenv mongoose colors morgan (logs the http methods in console)`
- Install the dev dependencies with `npm i -D nodemon concurrently`. nodemon will allows us to run the server without having to restart, and concurrently will allow us to run the backend and frontend react server on seprate ports at same time with single npm script.
- Add scripts (server.js is the main entry point for our app):
  ```javascripts
    "scripts": {
      "start": "node server",   //production
      "server": "nodemon server"    //development
    }
  ```
- Create a basic `server.js` file and `config.env` to store the environment variables:
  <details>
      <summary>Click to expand</summary>

  ```javascript
  const express = require("express");
  const dotenv = require("dotenv");
  const colors = require("colors");
  const morgan = require("morgan");

  dotenv.config({ path: "./config/config.env" });

  const app = express();

  app.get("/", (req, res) => res.send("Hello"));

  const PORT = process.env.PORT || 5000;

  app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
        .bold
    )
  );
  ```

  </details>

- Start the server with `npm run server`
- Make a get request to http://localhost:5000/ in POSTMAN to see if the server is running correctly.
-
