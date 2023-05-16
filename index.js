const express = require('express');
const bodyParser = require('body-parser');
const Mongo = require('./setup/mongoose');
require('dotenv').config();

const app = express();


const GetSales = require('./apirouts/sales.js');

app.use(bodyParser.json());
const setup = async () =>{
    await Mongo.setupDb(process.env.MONGO_URL);
    app.use(GetSales.router);

    app.listen(process.env.PORT, ()=>{
        console.log("Sersver is started on PORT", process.env.PORT)});
}


setup();