var deals = require('./../models/deals');

// const google = window.google;
var Geocodio = require('geocodio');
require('dotenv').config();

var config = {
    api_key: process.env.GEOCODIO_KEY
}
var geocodio = new Geocodio(config)

module.exports = {
    viewDeals: (req, res, next) => {
        res.status(200).send(deals)
    },
    addDeal: (req, res, next) => {
        deals.push(req.body);
        res.status(200).send(deals)
        .catch(() => res.status(500).send())
    },
    generateCoordinates (req, res, next) {
        // var addresses = []
        // addresses = deals.map((cur, ind, arr) => {
        //     return {lineAddress:`${cur.restaurant.addressOne}, ${cur.restaurant.city}, ${cur.restaurant.state}, ${cur.restaurant.zip}`, }
        // })
        // for (var i = 0; i<deals.length-1; i++) {
        //     var location = new Promise((resolve, reject) => {
        //         geocodio.get('geocode', {q: `${deals[i].restaurant.addressOne}, ${deals[i].restaurant.city}, ${deals[i].restaurant.state}, ${deals[i].restaurant.zip}`}, function(err, response) {
        //             if (err) {
        //                 throw err;
        //             } else {
        //                 var result = JSON.parse(response)
        //                 console.log(result.results[0].location);
        //                 deals[i].location = result.results[0].location;
        //             }
        //         })
        //     })
        // }
        var newDeals = deals.map((cur, ind, arr) => {
                var location = new Promise (function(resolve, reject) { geocodio.get('geocode',  {q: `${cur.restaurant.addressOne}, ${cur.restaurant.city}, ${cur.restaurant.state}, ${cur.restaurant.zip}`}, function(err, response) {
                        if (err) {
                            reject(err)
                            throw err;
                        }
                        else {
                            var result = JSON.parse(response);
                            let obj = result.results[0].location;
                            // console.log(obj);
                            resolve(obj)
                        }
                    }
                )})
               cur.location = location.then(obj => {
                  return console.log(obj)
               })
               return cur;
        })
        
        return res.status(200).send(newDeals)
    },
    batchGeocode: (req, res, next) => {
        var addresses
    }
    // function to calculate distance
}
// response.results.map((cur, ind, arr) => cur.results[0].location