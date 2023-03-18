const { Schema, model } = require("mongoose");

const schema = new Schema({
    _id: {type :String},
    theaterId: {type :Number},
    location:{
        address:{
            street1:{type: String},
            city:{type: String},
            state:{type: String},
            zipcode:{type: Number}
        },
        geo:{
            type:{type: String},
            coordinates:{
                0:{type: Number},
                1:{type: Number}
            }
        }
    }
})

const Theaters = new model('theaters', schema, 'theaters')
module.exports = {Theaters};