const express = require("express");
const router = express.Router();
const { createOrder } = require ('../controllers/orders')


//GET,POST,DELETE,PUT
router.post("/", createOrder)

module.exports = router