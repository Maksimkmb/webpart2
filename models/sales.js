const { Schema, model } = require("mongoose");

const schema = new Schema({
    id: {type :String},
    saleDate: {type :String},
    storeLocation: {type: String},
    items: [
        {name: String, tags: [String], price: Number, quantity: Number}
    ],
    customer: {
            gender:{type: String},
            age:{type: Number},
            email:{type: String},
            satisfaction:{type: Number}
    },
    couponUsed: {type :Boolean},
    purchaseMethod: {type :String}

})

const SalesModel = new model('sales', schema, 'sales');

module.exports = {SalesModel}