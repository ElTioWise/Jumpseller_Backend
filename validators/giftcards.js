const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")


const validatorCreateItem = [
    check("nameCustomer")
    .exists()
    .notEmpty(),
    check("giftcardCode")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorGetItem = [
    check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateItem, validatorGetItem };