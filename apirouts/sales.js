const {Router} = require('express');
const {SalesModel} = require('../models/sales.js');


const router = Router();


router.get('/sales', async (req,res) => {


    try {

        const {storeLocation, customer_age, items_tags, customer_emailDomain, couponUsed} = req.query;

        const queryDb = {}


        if(storeLocation) {
            queryDb.storeLocation = storeLocation;

        if(storeLocation.indexOf('*') == storeLocation.length-1) {
            const storeLocationString = storeLocation.slice(0,-1);
            queryDb.storeLocation = {$regex: `${storeLocationString}.*`, $options: `i`};
        }

        if(storeLocation.indexOf('*') == 0) {
            const storeLocationString = storeLocation.slice(1);
            queryDb.storeLocation = {$regex: `.*${storeLocationString}`, $options: `i`};
        }

        if (storeLocation.includes('\*')) {
            const storeLocationString = storeLocation.split('\*');
            queryDb.storeLocation = {$regex: `^${storeLocationString[0]}.*${storeLocationString[1]}$`, $options: `i`};
        }}


        if(customer_age) {
            
            const customer_age_parsed= JSON.parse(customer_age);

            if(customer_age.split('gt').length -1 >= 2 || customer_age.split('lt').length-1 >= 2) {
                return res.status(400).send('задані кілька одинакових параметрів');
            }

            if(customer_age_parsed.gt> customer_age_parsed.lt) {
                return res.status(404).send('Значення gt > lt');
            }

            if (customer_age_parsed.gt) {
                customer_age_parsed['$gt'] = customer_age_parsed['gt'];
                delete customer_age_parsed['gt'];
            }

            if (customer_age_parsed.lt) {
                customer_age_parsed['$lt'] = customer_age_parsed['lt'];
                delete customer_age_parsed['lt'];
            }

            queryDb['customer.age'] = customer_age_parsed;
           

        }

        if (customer_emailDomain) {
            queryDb['customer.email'] = {$regex: `${customer_emailDomain}$`, $options: `i`};
        }

        if (items_tags) {
            const arrayOfTags = items_tags.split(',');
            queryDb["items.tags"] = {$in: arrayOfTags};
        }

        if (couponUsed) {
            queryDb.couponUsed = couponUsed;
        }


        const doc = await SalesModel.find(queryDb);                            
        // console.log(doc);
        res.status(200).send(doc);

    } catch (error) {
        console.log(error.toString());
        res.status(404).send('error');
    }

})




module.exports = {router};