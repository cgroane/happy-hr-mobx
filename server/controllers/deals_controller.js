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
        res.status(200).send(deals)
    },
    addDeal: (req, res, next) => {
        
        deals.push(req.body);
        res.status(200).send(deals)
        .catch(() => res.status(500).send(deals))
    },
    generateCoordinates (req, res, next) {
        deals = deals.map((cur, ind, arr) => {
               return new Promise (function(resolve, reject) { geocodio.get('geocode',  {q: `${cur.restaurant.addressOne}, ${cur.restaurant.city}, ${cur.restaurant.state}, ${cur.restaurant.zip}`}, function(err, response) {
                        if (err) {
                            reject(err)
                            throw err;
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
        Promise.all(deals).then(results => res.status(200).send(results))
    },
    // function to calculate distance
    calcDistance (req, res, next) {
        //can just map into this and skip the geocoding. fuck.
        var userRests = req.body.deals.forEach((cur,ind, arr) => {
            axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${req.body.userLocation}&destinations=${cur.location}&key=${process.env.GOOGLE_KEY}`).then(response => {
                cur.response = response
                console.log(cur)
                return cur;
            })
            return cur
        })
        res.status(200).send(userRests)
        // var myLocation = req.body.userLocation;
        // var userRests = req.body.deals.map((cur, ind, arr) => {
        //     return new Promise ((resolve, reject) => {
        //         googleMapsClient.distanceMatrix({
        //         origins: [myLocation],
        //         destinations: [cur.location],
        //         units: 'imperial'
    
        //     }, (response, status) => {
        //         if (status == 'OK') {
        //             var origins = response.originAddresses;
        //             var destinations = response.destinationAddress;
        //             console.log(response.rows[0].elements[0].distance.text)
        //             let obj = response;
        //         } else {
        //             return status
        //         }
        //     })
        //     }
        //     ).then((obj) => {
        //         cur.distance = obj;
        //         return cur;
        //     })
        //     return cur;
        // })
        // Promise.all(userRests).then(results => res.status(200).send(results))
        
    }
}
// New+York+City,NY