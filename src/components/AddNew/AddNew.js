import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {addDeal, getDeals} from '../../firebase/getFBDeals';
import {sortDeals, getLocations, setDistance} from './../../ducks/reducer';
import appStyle from './../styles/appStyle';
import AddNewStyle from './AddNewStyle';
import functions from './../utility/functions';
import './AddNew.css';
import { firestore } from '../../config/fire';
import { observer } from 'mobx-react';

const google = window.google;

@observer
class AddNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            details: '',
            newDays: [],
            name: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            placeID: '',
            photos: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDaySelect = this.handleDaySelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.props.store.fetchDeals()
    }
    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        })
    }
    handleDaySelect (event) {   
        console.log(event)
        // event.target.checked = !event.target.checked;
        if(!this.state.newDays.find(x => x == event.target.value)) {
        this.setState({
            newDays: [...this.state.newDays,event.target.value]
        })
    } else {
        var filterDay = this.state.newDays.filter(x => x != event.target.value)
            this.setState({
                    newDays: filterDay
            })
        }
    }
    
    handleRestaurant = (event) => {
        this.setState({
            name: event.target.value
        })
        var autocomplete = new google.maps.places.Autocomplete(this.restaurant)
        var that = this
        autocomplete.addListener('place_changed', function() {
            var place = autocomplete.getPlace()
            if (!place.geometry) {
                alert('not good')
            }
            // place.split(',')
            var address = place.formatted_address.split(',')
            console.log(place)
            address[2] = address[2].split(' ')
            that.assignValue(that.city, address[1])
            that.assignValue(that.state1, address[2][1])
            that.assignValue(that.address, address[0])
            that.assignValue(that.restaurant, place.name)
            that.assignValue(that.zip, address[2][2])
            if (place.photos) {
                that.setState({
                    placeID: place.place_id,
                    photos: place.photos.map(cur =>{
                        let newPhoto = {
                            height: cur.height,
                            htmlAttributions: cur.html_attributions,
                            width: cur.width
                        }
                        return newPhoto
                    })
                })
            } else {
                that.setState({
                    placeID: place.place_id
                })
            }
            
        })
        console.log(this.city)
        
    }
    assignValue = (target, text) => {
        
        target.value = text
        this.setState({[target.name]: text})
    }
    handleSubmit(event) {
        // firestore
        event.preventDefault()
        let deal = {
            restaurant: {
                name: this.state.name,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                city: this.state.city,
                zip: this.state.zip
            },
            title: this.state.title,
            details: this.state.details,
            days: this.state.newDays,
            placeID: this.state.placeID,
            photos: this.state.photos
        };

        for (let prop in deal) {
            var checkFields;
            if (!deal[prop]) {
                checkFields = false;
                break;
            } else {
                checkFields = true;
            }   
        } 
         if(checkFields){
            let address = `${deal.restaurant.address}, ${deal.restaurant.city}, ${deal.restaurant.state}, ${deal.restaurant.zip}`
        var geocoder = new google.maps.Geocoder;
        const that = this;
        geocoder.geocode({'address': address}, function(results, status) {
            if (status=== 'OK' ) {
                let obj = results[0].geometry.location
                let newDealRef = firestore.collection('deals').add({
                        restaurant: deal.restaurant,
                        title: deal.title,
                        days: deal.days,
                        lat: obj.lat(),
                        lng: obj.lng(),
                        placeID: deal.placeID,
                        details: deal.details,
                        photos: deal.photos
                    }).then(() => {
                        alert('Success! Go back to home page')
                        that.props.store.fetchDeals()
                    })
                console.log('lat lng worked')
            } else {
                alert('invalid address')
            }
        })
        } else {
            alert(`If you leave any fields blank, the goecoder won't work properly and you might break my server. Fill them all out, not too hard. Also there's no data validation on the backend. So if you enter a bogus restaurant name and address and city, you also might break my server. Thank you for cooperating!`)
        }
        
    }
    
    render() {
        const daysOptions = functions.daysBoxes(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], this.handleDaySelect)
        
        return (
           <div className="addNew" >
            <form id="newDeal" className={`${AddNewStyle.formContainer}`} >
                            
                <input type="text" className={`${AddNewStyle.formText}`} ref={(ref) => this.restaurant = ref} name="name" onChange={this.handleRestaurant} placeholder="Name of bar or restaurant..." />Restaurant
                <input type="text" className={`${AddNewStyle.formText}`} ref={(ref) => this.address = ref} name="address" onChange={this.handleChange} placeholder="Street address..." />Address
                <input type="text" className={`${AddNewStyle.formText}`} ref={(ref) => this.city = ref} name="city" onChange={this.handleChange} placeholder="City" />City
                <input type="text" className={`${AddNewStyle.formText}`} ref={(ref) => this.state1 = ref} name="state" onChange={this.handleChange} placeholder="ex. TX" />State
                <input type="text" className={`${AddNewStyle.formText}`} ref={(ref) => this.zip = ref} name="zip" onChange={this.handleChange} placeholder="5 numbers" />Zip Code
                <input type="text" className={`${AddNewStyle.formText}`} ref={(ref) => this.title = ref} name="title" onChange={this.handleChange} placeholder="Headline..." />Title
                <input type="text" className={`${AddNewStyle.formText}`} ref={(ref) => this.details = ref} name="details" onChange={this.handleChange} placeholder="ex. 4-8pm..." />Details
                <div className={`${AddNewStyle.checkBoxContainer}`} >
                    {daysOptions}
                </div>

                <div style={{marginBottom: '30px'}} >
                    <button  className="map-toggle"  onClick={this.handleSubmit}  style={{marginBottom: '60px'}} >
                        Post
                    </button>
                </div>
            </form>
        <div>{this.props.store.dealCount}</div>
            <div className={`${appStyle.footer}`} >
                    <Link to="/" ><span>Back to home</span></Link>
                </div>
            </div>
        )
    }

}
export default (AddNew);