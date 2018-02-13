import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Page from './components/Page';
import story from './story.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deals: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3001/api/deals').then((response) => this.setState({deals: response.data}))
  }
  render() {
    const stories = story.map((cur, ind, arr) => {
      return (
        <div>
          {cur.text}
        </div>
      )
    })
    const deals = this.state.deals.map((cur, ind, arr) => {
      return (
        <div key={ind} >
          {cur.title}
        </div>
      )
    })
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>{deals}</div>
        <p className="App-intro">
          {/* <Page /> */}
        </p>
      </div>
    );
  }
}

export default App;
