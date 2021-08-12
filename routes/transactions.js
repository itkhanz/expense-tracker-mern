const express = require("express");
const router = express.Router();

const {
  getTransactions,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transactions");

// router.get("/", (req, res) => res.send("hello"));
router.route("/").get(getTransactions).post(addTransaction);

router.route("/:id").delete(deleteTransaction);

module.exports = router;
