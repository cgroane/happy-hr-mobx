import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {css} from 'emotion';
import {getLocations, getUserLocation} from './ducks/reducer';
import logo from './logo.svg';
import appStyle from './components/styles/appStyle';
import router from './router';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deals: []
    }
  }
  componentDidMount() {
    this.props.getLocations();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.props.getUserLocation({lat:position.coords.latitude, lng:position.coords.longitude})
      })
    }
  }
  render() {
    return (
      <div className={appStyle.app} >
        <div className={`${appStyle.header}`} >
          This is a header.
        </div>
        <div className={`${appStyle.appContainer}`} >{router}</div>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {getLocations, getUserLocation})(App);
