import React, {Component} from 'react';
import {connect} from 'react-redux';
import {css} from 'emotion';
import {sortDeals, getLocations, setDistance, filterDeals} from './../../ducks/reducer';
import {initMap, setMarkers, updateDeals} from './ResultsViewService';
import DropdownMenu, {DropdownItemGroup, DropdownItem} from '@atlaskit/dropdown-menu';
import './ResultsView.css';
import resultStyle from './../styles/resultStyle';
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
        var uluru = {
            lat: 32.813085, 
            lng: -96.762331
        }
        initMap.call(this, this.gmap, uluru);

    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props.deals != prevProps.deals) {
            var deals = updateDeals.call(this, this.props.deals)
            this.props.setDistance(deals)
        }
        if (this.props.deals != prevProps.deals) {
            setMarkers.call(this, this.map, this.props.deals);
        }
        if (this.props.userLocation != prevProps.userLocation) {

// calculate distance between user and deal
            var newDeals= updateDeals.call(this, this.props.deals)

            newDeals.sort((a ,b) => a.distance - b.distance)
            this.props.setDistance(newDeals)
            // this.props.sortDeals(this.props.deals)
            // sort should not be done on mount - allow user to select this option
            // user will also be able to filter based on active or not -- need to get current date
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
                            <DropdownItem onClick={() => this.props.getLocations()} >Don't care</DropdownItem>
                        </DropdownItemGroup>
                    </DropdownMenu>
                </div>

                <div className={`${resultStyle.dealList}`} >{deals}</div>

                <div className={`${resultStyle.mapContainer}`} >
                    <div id="gmap" ref={ref => (this.gmap = ref)} />
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {sortDeals, getLocations, setDistance, filterDeals})(ResultsView);