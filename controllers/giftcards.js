const { matchedData } = require("express-validator");
const { giftcardsModel } = require ("../models")
const {handleHttpError} = require ("../utils/handleError")

const getItems = async (req, res) => {
    try{
        const data = await giftcardsModel.find({})
    
        res.send({data})
    }catch(e){
        handleHttpError(res, "ERROR_GET_ITEMS")
    }
};

const getItem = async (req, res) => {
    try{
        req = matchedData(req)
        const {id} = req
        const data = await giftcardsModel.findById(id)
        res.send({data})
    } catch(e){
        handleHttpError(res,"ERROR_GET_ITEM")
    }
};

const createItems = async (req, res) => {
    try{
        const body = matchedData(req)
        const data = await giftcardsModel.create(body)
        res.send({data})
    }catch(e){
        handleHttpError(res, "ERROR_CREATE_ITEMS")
    }
};

const updateItems = async (req, res) => {
    try{
        const {id, ...body} = matchedData(req)
        const data = await giftcardsModel.findOneAndUpdate(
            id, body
        )
        res.send({data})
    }catch(e){
        handleHttpError(res, "ERROR_UPDATE_ITEMS")
    }
};

const deleteItems = async (req, res) => {
    try{
        req = matchedData(req)
        const {id} = req
        const data = await giftcardsModel.deleteOne({_id:id})
        res.send({data})
    } catch(e){
        console.log(e)
        handleHttpError(res,"ERROR_DELETE_ITEM")
    }
};

module.exports = { getItem, getItems, createItems, deleteItems, updateItems }