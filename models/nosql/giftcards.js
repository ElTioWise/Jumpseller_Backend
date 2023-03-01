const mongoose = require("mongoose")

const GiftcardScheme = new mongoose.Schema(
    {
        nameCustomer:{
            type:String
        },
        giftcardCode:{
            type:String,
            unique:true
        },
        status:{
            type:["active", "used"],
            default: "active"
        },
    },
    {
        timestamps:true,
        versionKey:false
    }
)

module.exports = mongoose.model("giftcards",GiftcardScheme)