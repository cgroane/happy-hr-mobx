var deals = require('./../models/deals');
var axios = require('axios');

var Geocodio = require('geocodio');
require('dotenv').config();

var config = {
    api_key: process.env.GEOCODIO_KEY
}
var googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_KEY
})
var geocodio = new Geocodio(config)

module.exports = {
    viewDeals: (req, res, next) => {
        res.status(200).send(deals).catch((err) => res.status(500).send(err))
    },
    addDeal: (req, res, next) => { 
        console.log(req.body)
        var dealPromise = Promise.resolve(
            deals.push(req.body)
            )
        
        console.log(deals);
        dealPromise.then(values => res.sendStatus(200).send(values)).catch(() => res.sendStatus(500).send())
        
        
    },
    generateCoordinates (req, res, next) {
        newDeals = deals.map((cur, ind, arr) => {
               return new Promise (function(resolve, reject) { geocodio.get('geocode',  {q: `${cur.restaurant.addressOne}, ${cur.restaurant.city}, ${cur.restaurant.state}, ${cur.restaurant.zip}`}, function(err, response) {
                   console.log(cur)
                        if (err) {
                            reject(cur)
                            // throw err;
                            console.log(err)
                        }
                        else {
                            var result = JSON.parse(response);
                            let obj = result.results[0].location;
                            resolve(obj)
                        }
                    }
                )}).then((obj) => {
                    cur.location = obj;
                    return cur;
                })
                return cur;
        })
        Promise.all(newDeals).then(results => res.status(200).send(results)).catch((err) => res.status(500).send(console.log(err)))
    },
    // function to calculate distance
    calcDistance (req, res, next) {
        
        var userRests = req.body.deals.forEach((cur,ind, arr) => {
            axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${req.body.userLocation}&destinations=${cur.location}&key=${process.env.GOOGLE_KEY}`).then(response => {
                cur.response = response
                console.log(cur)
                return cur;
            })
            return cur
        })
        res.status(200).send(userRests)
    }
}
