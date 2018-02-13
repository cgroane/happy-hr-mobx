import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDeals, getLocations} from './../ducks/reducer';
import {initMap, setMarkers} from './ResultsViewService';
import './ResultsView.css';
const google = window.google;

class ResultsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: []
        }
    }
    componentDidMount() {
        var uluru = {lat: 32.813085, lng: -96.762331}
        initMap.call(this, this.gmap, uluru);
    }
    componentDidUpdate(prevProps, prevState) {

        if (this.props.deals != prevProps.deals) {
            setMarkers.call(this, this.map,this.props.deals)
        }

    }
    render() {
        const deals = this.props.deals.map((cur,ind, arr) => {
            return (
                <div key={cur.id} value={cur.id} > {cur.title} </div>
            )
        })
        return (
            <div>
                <div>{deals}</div>
                <div id="gmap" ref={ref => (this.gmap = ref)} />
            </div>
        )
    }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {getDeals, getLocations})(ResultsView);