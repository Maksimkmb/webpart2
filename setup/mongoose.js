const mongoose = require('mongoose');

const setupDb = async (mongoURL) => {

 mongoose.connect(mongoURL).then(() =>{
    console.log('Mongo started');
 }).catch((err)=>{
    console.log(err, "Mongo error");
 })

};

module.exports = { setupDb };