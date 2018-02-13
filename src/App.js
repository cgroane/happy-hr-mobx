import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getDeals, getLocations} from './ducks/reducer';
import logo from './logo.svg';
import './App.css';
import router from './router';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deals: []
    }
  }
  componentDidMount() {
    this.props.getLocations()
  }
  render() {
    const deals = this.props.deals.map((cur, ind, arr) => {
      // make deal card here
      // use emotion
      return (
        <div key={ind} >
          {cur.title}
        </div>
      )
    })
    return (
      <div className="App">
        {router}
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {getLocations, getDeals})(App);
