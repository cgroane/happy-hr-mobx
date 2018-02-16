// modal to add a deal
// show, hide with state
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {sortDeals, getLocations, setDistance} from './../../ducks/reducer';
import appStyle from './../styles/appStyle';
import AddNewStyle from './AddNewStyle';
import functions from './../utility/functions';
import './AddNew.css';

// const google = window.google;

class AddNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            details: '',
            newDays: [],
            name: '',
            addressOne: '',
            city: '',
            state: '',
            zip: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDaySelect = this.handleDaySelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleSubmit(event) {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
          }
        let id = getRandomInt(0, 100)
        event.preventDefault()
        let deal = {
            id: id,
            title: this.state.title,
            details: this.state.details,
            days: this.state.newDays,
            restaurant: {
                name: this.state.name,
                addressOne: this.state.addressOne,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip
            }
        }
        return axios.post('/api/deals', deal).then(() => {
            this.props.history.push('/')
            return this.props.getLocations()
        })
    }
    
    render() {
        const daysOptions = functions.daysBoxes(["Monday", "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday", "Sunday"], this.handleDaySelect)
        
        return (
            <div>
            <form id="newDeal" className={`${AddNewStyle.formContainer}`} >
                <input type="text" className={`${AddNewStyle.formText}`} ref={(ref) => this.title = ref} name="title" onChange={this.handleChange} placeholder="Headline..." />Title
                <input type="text" className={`${AddNewStyle.formText}`} ref={(ref) => this.details = ref} name="details" onChange={this.handleChange} placeholder="ex. 4-8pm..." />Details            
                <input type="text" className={`${AddNewStyle.formText}`} ref={(ref) => this.restaurant = ref} name="name" onChange={this.handleChange} placeholder="Name of bar or restaurant..." />Restaurant
                <input type="text" className={`${AddNewStyle.formText}`} ref={(ref) => this.address = ref} name="addressOne" onChange={this.handleChange} placeholder="Street address..." />Address
                <input type="text" className={`${AddNewStyle.formText}`} ref={(ref) => this.city = ref} name="city" onChange={this.handleChange} placeholder="City" />City
                <input type="text" className={`${AddNewStyle.formText}`} ref={(ref) => this.state1 = ref} name="state" onChange={this.handleChange} placeholder="ex. TX" />State
                <input type="text" className={`${AddNewStyle.formText}`} ref={(ref) => this.zip = ref} name="zip" onChange={this.handleChange} placeholder="5 numbers" />Zip Code
                
                <div className={`${AddNewStyle.checkBoxContainer}`} >
                    {daysOptions}
                </div>

                <div>
                    <button onClick={this.handleSubmit} >
                        Post
                    </button>
                </div>
            </form>
            <div className={`${appStyle.footer}`} >
                    <Link to="/" ><span>Back to home</span></Link>
                </div>
            </div>
        )
    }

}
const mapStateToProps = state => state
export default connect(mapStateToProps, {sortDeals, getLocations, setDistance}) (AddNew);