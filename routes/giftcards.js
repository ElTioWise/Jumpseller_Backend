const express = require("express");
const router = express.Router();
const { getItems, getItem, createItems, deleteItems, updateItems } = require ('../controllers/giftcards')
const { validatorCreateItem, validatorGetItem } = require('../validators/giftcards')


//GET,POST,DELETE,PUT

router.get("/", getItems)

router.get("/:id",validatorGetItem, getItem)

router.post("/", validatorCreateItem, createItems)

router.put("/:id", validatorGetItem, validatorCreateItem, updateItems)

router.delete("/:id", validatorGetItem, deleteItems)

module.exports = router