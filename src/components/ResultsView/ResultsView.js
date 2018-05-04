import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux'
import PropTypes from 'prop-types'
import {css} from 'emotion';
import {Link, withRouter} from 'react-router-dom';
import moment from 'moment';
import {sortDeals, getLocations, setDistance, filterDeals, getDayOfWeek, getUserLocation, setDeals, reverseSort, setStatic} from './../../ducks/reducer';
import {viewDeals} from '../../firebase/getFBDeals';
import firestore from '../../config/fire';
import {initMap, setMarkers, updateDeals} from './ResultsViewService';
import DropdownMenu, {DropdownItemGroup, DropdownItem} from '@atlaskit/dropdown-menu';
import './ResultsView.css';
import resultStyle from './../styles/resultStyle';
import appStyle from './../styles/appStyle';
import resultsFunctions from './../utility/functions';
import ResultCard from './ResultCard/ResultCard';
import ResultsList from './ResultsList/ResultsList';
const google = window.google;

class ResultsView extends Component {
    static contextTypes = {
        store: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            day: "",
            deals: []
        }
    }
    componentDidMount() {
    const {firestore} = this.context.store;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.props.getUserLocation({lat:position.coords.latitude, lng:position.coords.longitude})
            })
        }
        var uluru = {
            lat: 32.813085, 
            lng: -96.762331
        }
        initMap.call(this, this.gmap, uluru);
        //set day of week
        let daysOfWeek = ["Monday", "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday", "Sunday"]
        let now = new Date();
        now = now.getDay();
        if (now == 0) {
            now = daysOfWeek[6]
        } else {
            now = daysOfWeek[now-1]
        }
        this.setState({
            day:now.toString()
        })
        
        console.log(this.props.day)
        
        firestore.get('deals').then((results) => {
            results.forEach((cur) => 
                cur.data()
            )   
        })

    }
    
   
    componentDidUpdate(prevProps, prevState) {
        if(this.props.deals.length !== prevProps.deals.length) {
            // get distance
            let deals = updateDeals.call(this, this.props.deals)
            this.props.setStatic(deals)
            // set distance in reducer
            // this.props.setDistance(deals)
            setMarkers.call(this, this.map, this.props.deals);
            
        }
        if (this.props.userLocation != prevProps.userLocation) {
            let deals = new Promise ((resolve, reject) => {
                resolve(updateDeals.call(this, this.props.deals))
            })
            // once you get userlocation and deals,
            // this.props.getLocations().then((response) => this.props.setDistance(response.data))
            // this.props.setDeals(viewDeals())
            // var newDeals= updateDeals.call(this, this.props.deals)
            // newDeals.sort((a ,b) => a.distance - b.distance)
            // this.props.setDistance(newDeals)
        }
    }
    render() {
        // creates card with props

        // const dealsList = this.props.deals.length ? resultsFunctions.mapToCard(this.props.deals): null
        // console.log(this.props.deals)

        return (
            <div className={`${resultStyle.resultsContainer}`} >
                <div className={`${resultStyle.header}`} >

                    <DropdownMenu 
                        trigger="Sort by distance"
                        triggerType="button"
                        shouldFlip={true}
                        position="right middle"
                        shouldFitContainer={true}
                        onOpenchange={e => console.log('dropdown opened', e)}
                    >
                        <DropdownItemGroup>
                            <DropdownItem value="shortestToLongest" onClick={() => this.props.sortDeals(this.props.deals)} >Shortest to Longest</DropdownItem>
                            <DropdownItem value="longestToShortest" onClick={() => this.props.reverseSort(this.props.deals)} >Longest to Shortest</DropdownItem>
                        </DropdownItemGroup>
                    </DropdownMenu>

                    <DropdownMenu 
                        trigger="Active?"
                        triggerType="button"
                        shouldFlip={false}
                        position="right middle"
                        onOpenchange={e => console.log('dropdown opened', e)}
                    >
                        <DropdownItemGroup>
                            <DropdownItem onClick={() => this.props.filterDeals(this.props.staticDeals)} >Active</DropdownItem>
                            <DropdownItem onClick={() => this.props.getDeals(this.props.staticDeals)} >Don't care</DropdownItem>
                        </DropdownItemGroup>
                    </DropdownMenu>
                </div>

                <ResultsList deals={this.props.deals} />

                <div className={`${resultStyle.mapContainer}`} >
                    <div id="gmap" ref={ref => (this.gmap = ref)} />
                </div>
                <div className={`${appStyle.footer}`} >
                    <Link to="/add_new" ><span>Add New Deal (cc: @Franklin Roosevelt)</span></Link>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, props) => {
    // console.log(state)
    // console.log(props)
    return {
        deals: state.firestore.ordered.deals
    }
}
ResultsView.defaultProps = {
    deals: []
}
export default compose (
    firestoreConnect([{collection:'deals'}]), 
    connect(mapStateToProps, {sortDeals, getLocations, setDistance, filterDeals, getDayOfWeek, getUserLocation, setDeals, reverseSort, setStatic})
)
(ResultsView)