const { Schema, model } = require("mongoose");

const schema = new Schema({
    id: {type :String},
    name: {type :String},
    email: {type :String},
    password: {type :String}
})

const Users = new model('users', schema, 'users');

module.exports = {Users}