import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {css} from 'emotion';
import {Link, withRouter} from 'react-router-dom';
import {observer, inject} from 'mobx-react';
import {observable, action, computed,flow, when} from 'mobx';
import {
    // Link,
    DirectLink,
    Element,
    Events,
    animateScroll as scroll,
    scrollSpy,
    scroller
  } from "react-scroll";
import moment from 'moment';
import {sortDeals, getLocations, setDistance, filterDeals, getDayOfWeek, getUserLocation, setDeals, reverseSort, setStatic} from './../../ducks/reducer';
import {viewDeals} from '../../firebase/getFBDeals';
import {firestore} from '../../config/fire';
import {initMap, setMarkers, updateDeals} from './ResultsViewService';
import DropdownMenu, {DropdownItemGroup, DropdownItem} from '@atlaskit/dropdown-menu';
import './ResultsView.css';
import resultStyle from './../styles/resultStyle';
import appStyle from './../styles/appStyle';
import resultsFunctions from './../utility/functions';
import ResultCard from './ResultCard/ResultCard';
import ResultsList from './ResultsList/ResultsList';
import InfoBar from '../InfoBar/InfoBar';
import { StoreContext } from '../../index';
import observableDealsStore from '../../mobx/deals';
const google = window.google;


@observer class ResultsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: "",
            deals: [],
            mapOrList: true,
            height: 0,
            width: 0,
            selected: {
            }
        }
    }
    
    componentDidMount() {
        this.props.store.fetchDeals()
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
        if (this.state.width < 768) {
            this.setState({
                mapOrList: false
            })
        }
        Events.scrollEvent.register('begin', function () {
            // console.log('begin', arguments)
          })
          Events.scrollEvent.register('end', function () {
            // console.log('end', arguments)
          })
          scrollSpy.update();
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.props.store.getUserLocation({lat:position.coords.latitude, lng:position.coords.longitude})
            })
        }
        let uluru = {
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
        when(
            () => this.props.store.deals.length,
            () => setMarkers.call(this, this.map, this.props.store.deals)
        )
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
        Events.scrollEvent.remove("begin");
        Events.scrollEvent.remove("end");
      }
   
    componentDidUpdate(prevProps, prevState) {
        if(this.props.store.deals.length !== prevProps.store.deals.length) {

        }
        if (this.props.userLocation != undefined) {
            // this.props.setDistance(this.props.deals, this.props.userLocation)
            // let deals = updateDeals.call(this, this.props.deals)
            // this.props.setStatic(deals)
            // let deals = new Promise ((resolve, reject) => {
            //     resolve(updateDeals.call(this, this.props.deals))
            // })
            // once you get userlocation and deals,
            // this.props.getLocations().then((response) => this.props.setDistance(response.data))
            // this.props.setDeals(viewDeals())
            // var newDeals= updateDeals.call(this, this.props.deals)
            // newDeals.sort((a ,b) => a.distance - b.distance)
            // this.props.setDistance(newDeals)
        }
    }
    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }
    render() {
        let hideMap
        if (this.state.width < 768 && !this.state.mapOrList ) {
            hideMap = {
                display: 'none'
            }
        } else {
            hideMap = {
                display:'block',
                position: 'absolute',
                right: '0',
                left: '0',
                bottom:'20px',
                top: '0',
                width: '100vw',
                height: '100vh',
            }
        }
        
        const mapToggle = (
            <button className="map-toggle" onClick={() => this.setState({
                mapOrList: !this.state.mapOrList
            })} >
                {
                    this.state.mapOrList ? 'List View': 'Map View'
                }
            </button>
        )
        let infoBar;
        if (this.state.mapOrList && this.state.width < 768) {
            infoBar = 
            <InfoBar selected={this.state.selected} />
        } else {
            infoBar = null;
        }
        return (
            <div className={`${resultStyle.resultsContainer}`} >
                <div className={`${resultStyle.header}`} style={{boxSizing: 'border-box'}} >
                    Click on a marker to scroll to that location. Zoom out to see other locations.
                    <div>{mapToggle}</div>
                </div>
                <ResultsList deals={this.props.store.deals}  mapOrList={this.state.mapOrList}  dimensions={{height: this.state.height, width: this.state.width}} />
                <div className={`${resultStyle.mapContainer}`} style={hideMap} >
                <div className={`${resultStyle.mapContainer}`} >
                    <div id="gmap" ref={ref => (this.gmap = ref)} />
                </div>
                {'infoBar'}
                <div className={`${appStyle.footer}`} >
                    <Link to="/add_new" ><span>Add New Special</span></Link>
                </div>
            </div>
            </div>
        )
    }
}

export default ResultsView