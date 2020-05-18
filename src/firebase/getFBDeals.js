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

export const viewDeals = (string) => {
    console.log(string)
    firestore
    .collection('deals').get()
    .then(results => {
        let deals = []
            results.forEach((cur) => {
                const deal = cur.data();
                console.log(deal)
                deals.push(deal);
            })
            return deals
        })
}