import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {css} from 'emotion';
import {getLocations, getUserLocation} from './ducks/reducer';
import {Link, withRouter} from 'react-router-dom'
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
    
  }
  render() {
    
    return (
      
      <div className={`${appStyle.app}`} >
        
        <div className={`${appStyle.appContainer}`} >{router}</div>
        
      </div>
    );
  }
}
// const mapStateToProps = state => state;
export default (App);
