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
- Now we have a basic server setup

---

## Setting Up routes and dummy controllers

- Create routes and controllers that will have methods to interact with database.
- Make a router for the trasnactions.js:

```javascript
const express = require("express");
const router = express.Router();

// The "/" will pretain to "/api/v1/transactions" route
router.get("/", (req, res) => res.send("hello"));

module.exports = router;
```

- Import this router in server.js. Whenever we make a request to this address, it will direct us to the transactions.js file

```javascript
const transactionRoutes = require("./routes/transactions");

// app.get("/", (req, res) => res.send("Hello"));
app.use("/api/v1/transactions", transactionRoutes);
```

- Check by making a request to http://localhost:5000/api/v1/transactions in POSTMAN to verify you are getting `hello` back.

- Define all the methods in a seprate controllers/transactions.s file to interact with the model and database.

```javascript
//  @desc Get all transactions
//  @route GET /api/v1/transactions
//  @access Public
exports.getTransactions = (req, res, next) => {
  res.send("GET tranactions");
};
```

- import the getTransactions controller in the routes. Any time we make a get request to the '/', it will hit the '/api/v1/transactions/' and call the getTransactions controller method. Verify by making a GET request in POSTMAN.

```javascript
const { getTransactions } = require("../controllers/transactions");

// router.get("/", (req, res) => res.send("hello"));
router.route("/").get(getTransactions);
```

- Make the controllers for adding and deleting the trnsactions in a similar way and test the routes in POSTMAN.

```javascript
//  @desc Add transaction
//  @route POST /api/v1/transactions
//  @access Public
exports.addTransaction = (req, res, next) => {
  res.send("POST tranaction");
};

//  @desc Delete transaction
//  @route DELETE /api/v1/transactions
//  @access Public
exports.deleteTransaction = (req, res, next) => {
  res.send("DELETE tranaction");
};
```

```javascript
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transactions");

router.route("/").get(getTransactions).post(addTransaction);

router.route("/:id").delete(deleteTransaction);
```

- All the routes are setup, next step is to bring in the model and setup database.

---

## Database

### Connecting to Database

- Sign up for mongodb Atlas online.
- Start a new project. Create a `cluster` on mongodb Atlas online. Go to collections and create a database `expensetracker` and collection `tranaction`.
- To connect o the database, choose the option "Connect Your Application" and copy the connection string. Paste it under the name of MONGO_URI in config.env file. Replace the pasword and database name.
- Create a `db.js` file in config folder, and connect to dtabase from here:
  - whenever we make a call to connect to database, it will return a promise so we use async/await and try/catch blocks to catch any errors.

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDB;
```

- import the connectDB in server.js and run it. verify the connection from terminal output.

### Creating Model

- create a TransactionSchema, ID will be created automatically by the mongoDB.

```javascript
const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true, //trims any whitespace
    required: [true, "Please add some text"],
  },
  amount: {
    type: Number,
    required: [true, "Please add a positive or negative number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
```

- import the Transaction model inside the transactions.js controller. We can use the mongoose methods like find, create and remove on database.
