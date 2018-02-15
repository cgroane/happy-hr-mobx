import React, {Component} from 'react';
import {connect} from 'react-redux';
import {css} from 'emotion';
import {Link, withRouter} from 'react-router-dom';
import moment from 'moment';
import {sortDeals, getLocations, setDistance, filterDeals, getDayOfWeek, getUserLocation, getDeals} from './../../ducks/reducer';
import {initMap, setMarkers, updateDeals} from './ResultsViewService';
import DropdownMenu, {DropdownItemGroup, DropdownItem} from '@atlaskit/dropdown-menu';
import './ResultsView.css';
import resultStyle from './../styles/resultStyle';
import appStyle from './../styles/appStyle';
import resultsFunctions from './../utility/functions';
import ResultCard from './ResultCard/ResultCard';
const google = window.google;

class ResultsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            addModal: false
        }
    }
    componentDidMount() {
        // this.props.getLocations();
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
        let now = new Date();
        now = now.getDay();
        // now = moment().isoWeekday(now);
        this.props.getDayOfWeek(moment().isoWeekday(now))
        
        console.log(this.props.day)
    }
    
   
    componentDidUpdate(prevProps, prevState) {
        if(this.props.deals != prevProps.deals) {
            // get distance
            var deals = updateDeals.call(this, this.props.deals)
            //set distance in reducer
            this.props.setDistance(deals)
            setMarkers.call(this, this.map, this.props.deals);
        }
        if (this.props.userLocation != prevProps.userLocation) {
            this.props.getLocations()
            var newDeals= updateDeals.call(this, this.props.deals)
            newDeals.sort((a ,b) => a.distance - b.distance)
            this.props.setDistance(newDeals)
        }
    }
    render() {
        // creates card with props
        const deals = resultsFunctions.mapToCard(this.props.deals)

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
                            <DropdownItem value="longestToShortest" >Longest to Shortest</DropdownItem>
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
                            <DropdownItem onClick={() => this.props.filterDeals(this.props.deals, "Monday")} >Active</DropdownItem>
                            <DropdownItem onClick={() => this.props.getDeals(this.props.staticDeals)} >Don't care</DropdownItem>
                        </DropdownItemGroup>
                    </DropdownMenu>
                </div>

                <div className={`${resultStyle.dealList}`} >{deals}</div>

                <div className={`${resultStyle.mapContainer}`} >
                    <div id="gmap" ref={ref => (this.gmap = ref)} />
                </div>
                <div className={`${appStyle.footer}`} >
                    <Link to="/add_new" ><span>this is a footer</span></Link>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => state;
export default withRouter(connect(mapStateToProps, {sortDeals, getLocations, setDistance, filterDeals, getDayOfWeek, getUserLocation, getDeals})(ResultsView));