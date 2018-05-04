import {firestore} from '../config/fire'
const google = window.google;

export const addDeal = (deal) => {
    let {
        restaurant,
        title,
        details,
        days,
    } = deal;
    var address = `${deal.restaurant.address}, ${deal.restaurant.city}, ${deal.restaurant.state}, ${deal.restaurant.zip}`

    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({'address': address}, function (results, status) {
        if (status === 'OK') {
            let obj = results[0].geometry.location
            let newDealRef = firestore
                .collection('deals')
                .doc()

            newDealRef.set({
                id: newDealRef.id,
                restaurant: deal.restaurant,
                title: deal.title,
                details: deal.details,
                days: deal.days,
                lat: obj.lat(),
                lng: obj.lng()
            }) 
            console.log('lat long worked')
        } else {
            alert('invalid address')
        }
    })

    
}

export const viewDeals = () => {
    // fetch deals from firebase
    // return them here
    // set deals property in componentdidmount passing in an array represented by this function invoked
    var self = this
    firestore
        .collection('deals').get()
        .then(results => {
            let deals = []
            console.log(results)
            results.forEach((cur) => {
                console.log(cur.data())
                deals.push(cur.data());
            })
           return deals
        })
}