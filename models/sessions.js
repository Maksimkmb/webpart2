const { Schema, model } = require("mongoose");


const schema = new Schema({
    _id: {type :String},
    user_id: {type: String},
    jwt: {type: String}
})

const Session = new model('sessions', schema, 'sessions');

module.exports = {Session};

