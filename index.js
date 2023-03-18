const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { setupDb } = require('./setup/mongoose');
const {Users} = require('./models/users.js')

const app = express();
const {Theaters} = require('./models/theater.js')
const {Session} = require('./models/sessions.js')

app.use(bodyParser.json());

const setup = async () => {

  await setupDb(process.env.MONGO_URL);

 app.get('/users',async  (req, res) =>{
  const {email,name} = req.query;

  const queryDB = {}

  if(email)
  {
    queryDB.email = email
  }

  if(name)
  {
    queryDB.name = name;
  }


  const doc = await Users.find(queryDB);

  res.status(200).send(doc);
 } );




 app.get('/sessions', async (req,res)=>{
  const {userId} = req.query;

  const queryDB = {}

  if(userId)
  {
    queryDB.userId = userId;
  }

  

  const doc = await Session.find(queryDB);

  res.status(200).send(doc);
 });




 app.get('/theaters', async (req,res)=>{
  const {zipcode,city, lattitude, longitude} = req.query;


if(zipcode)
{
  queryDB["location.address.zipcode"] = zipcode;
}
if(city)
{
  queryDB["location.address.city"] = city;
}
if(lattitude)
{
  queryDB["location.geo.0"] = lattitude;
}
if(longitude)
{
  queryDB["location.geo.1"] = longitude;
}

  const doc = await Theaters.find(queryDB);

  res.status(200).send(doc);
 });


 app.get('/theaters/:id', async (req,res) =>{
  const{id} = req.params;

  const user = await Theaters.findOne({id});

  if(!user)
  {
    res.status(400).send("User was not found");
  }

  res.status(200).send(user);
 })

  app.listen(process.env.PORT, () => {
    console.log('SERVER STARTED ON', process.env.PORT);
  });
};

setup();
