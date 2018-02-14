import React, {Component} from 'react';
import {connect} from 'react-redux';
import {css} from 'emotion';
import {sortDeals, getLocations, setDistance} from './../../ducks/reducer';
import {initMap, setMarkers} from './ResultsViewService';
import './ResultsView.css';
import resultStyle from './../styles/resultStyle';
import resultsFunctions from './../utility/functions';
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
        var uluru = {
            lat: 32.813085, 
            lng: -96.762331
        }
        initMap.call(this, this.gmap, uluru);

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.deals != prevProps.deals) {
            setMarkers.call(this, this.map, this.props.deals);
        }
        if (this.props.userLocation != prevProps.userLocation) {
            // distance between a user and the locations of the deals is variable. Calculate the distance using the Google Maps API DistanceMatrixService and set the result onto each object. 
            // the new array of objects will be stored in the the reducer, it overwrites the basic deals array
            var newDeals = [];
            newDeals = this.props.deals.map((cur, ind, arr) => {
                var self = this;
                var service = new google.maps.DistanceMatrixService();
                service.getDistanceMatrix(
                    {
                        origins: [self.props.userLocation],
                        destinations: [cur.location],
                        unitSystem: google.maps.UnitSystem.IMPERIAL,
                        travelMode: 'DRIVING'
                    }, (response, status) => {
                        if (status == 'OK') {
                            console.log(response)
                            cur.distance = response.rows[0].elements[0].distance.text;
                        }
                    }
                )
                console.log(cur)
                return cur;
            })
            newDeals.sort((a ,b) => a.distance - b.distance)
            this.props.setDistance(newDeals)
            this.props.sortDeals(this.props.deals)
        }
    }
    render() {
        // define details modal -- variable that is null if this.props.selected is null.

        // create list item to render to left of map
        
        const deals = this.props.deals.map((cur,ind, arr) => {
            return (
                <div key={cur.id} value={cur.id} className={`${resultStyle.dealCard}`} >
                    <div>
                        <h1>{cur.title}</h1>
                    </div>
                    <ul> 
                        {resultsFunctions.days(cur.days)}
                    </ul>
                </div>
            )
        })
        return (
            <div className={`${resultStyle.resultsContainer}`} >
                <div className={`${resultStyle.dealList}`} >{deals}</div>
                <div className={`${resultStyle.mapContainer}`} >
                    <div id="gmap" ref={ref => (this.gmap = ref)} />
                </div>
                
            </div>
        )
    }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {sortDeals, getLocations, setDistance})(ResultsView);