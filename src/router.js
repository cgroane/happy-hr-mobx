import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ResultsView from './components/ResultsView/ResultsView';

export default (
    <Switch>
        <Route exact path="/" component={ResultsView}/>
        {/* <Route path="/add_new" component={} /> */}
    </Switch>
)